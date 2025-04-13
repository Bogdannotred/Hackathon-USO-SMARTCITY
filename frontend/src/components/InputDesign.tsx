import * as React from "react";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import styles from "./InputDesign.module.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

interface Prediction {
  class: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
  class_id: number;
  detection_id: string;
}

interface RoboflowResponse {
  predictions?: Prediction[];
  error?: string;
  time?: number;
  image?: {
    width: number;
    height: number;
  };
}

function InputDesign() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageResults, setImageResults] = useState<RoboflowResponse | null>(
    null
  );
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [previewSize, setPreviewSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const status = useMemo(() => {
    return imageResults?.predictions?.some(
      (prediction) =>
        prediction.class.toLowerCase().includes("ocupat") ||
        prediction.class.toLowerCase().includes("car")
    );
  }, [imageResults]);

  useEffect(() => {
    async function setParkingSport() {
      await updateDoc(doc(db, "parking-spots", "1"), {
        status: status ? "occupied" : "available",
      });
      console.log("updating parking spot", status);
    }

    setParkingSport();
  }, [status]);

  // Update preview size when image loads or window resizes
  useEffect(() => {
    const updatePreviewSize = () => {
      if (imageRef.current) {
        setPreviewSize({
          width: imageRef.current.clientWidth,
          height: imageRef.current.clientHeight,
        });
      }
    };

    window.addEventListener("resize", updatePreviewSize);
    return () => window.removeEventListener("resize", updatePreviewSize);
  }, []);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setSelectedFile(file);
      setIsUploading(true);
      setError(null);
      setImageResults(null);
      setImageDimensions(null);

      // Get image dimensions
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImageDimensions({
          width: img.width,
          height: img.height,
        });
      };

      // Convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64data = reader.result?.toString().split(",")[1];

        if (!base64data) {
          setError("Failed to process image");
          setIsUploading(false);
          return;
        }

        try {
          const response = await axios({
            method: "POST",
            url: "https://serverless.roboflow.com/haha-9wqsa/1",
            params: {
              api_key: "TFZHzUqQCKVUwGVocnYo",
            },
            data: base64data,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          });

          if (response.data.error) {
            setError(response.data.error);
          } else {
            setImageResults(response.data);
          }
        } catch (error) {
          console.error("API Error:", error);
          setError(
            error instanceof Error
              ? error.message
              : "Failed to process image. Please verify your API key and model ID."
          );
        } finally {
          setIsUploading(false);
        }
      };
      reader.onerror = () => {
        setError("Failed to read image file");
        setIsUploading(false);
      };
    },
    []
  );

  // Calculate scale factor for bounding boxes
  const getScaleFactor = React.useCallback(() => {
    if (!imageDimensions || !previewSize.width) return 1;
    return previewSize.width / imageDimensions.width;
  }, [imageDimensions, previewSize.width]);

  const handleImageLoad = React.useCallback(() => {
    if (imageRef.current) {
      setPreviewSize({
        width: imageRef.current.clientWidth,
        height: imageRef.current.clientHeight,
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.fileUploadSection}>
        <h2 className={styles.sectionTitle}>Document Detection</h2>

        <div className={styles.fileUpload}>
          <input
            type="file"
            id="documentUpload"
            accept="image/*"
            onChange={handleFileUpload}
            className={styles.fileInput}
            disabled={isUploading}
          />
          <label htmlFor="documentUpload" className={styles.fileLabel}>
            {selectedFile ? selectedFile.name : "Choose an image to analyze"}
          </label>
        </div>

        {isUploading && (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            Processing your image...
          </div>
        )}

        {error && <div className={styles.error}>{error}</div>}

        {selectedFile && (
          <div className={styles.previewContainer}>
            <div className={styles.preview} style={{ position: "relative" }}>
              <img
                ref={imageRef}
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className={styles.previewImage}
                onLoad={handleImageLoad}
              />

              {imageResults?.predictions?.map((prediction) => {
                const scale = getScaleFactor();
                const isOccupied = prediction.class
                  .toLowerCase()
                  .includes("ocupat");

                return (
                  <div
                    key={prediction.detection_id}
                    className={styles.detectionBox}
                    style={{
                      left: `${
                        (prediction.x - prediction.width / 2) * scale
                      }px`,
                      top: `${
                        (prediction.y - prediction.height / 2) * scale
                      }px`,
                      width: `${prediction.width * scale}px`,
                      height: `${prediction.height * scale}px`,
                      border: `2px solid ${isOccupied ? "#FF0000" : "#00FF00"}`,
                      backgroundColor: `${
                        isOccupied
                          ? "rgba(255, 0, 0, 0.1)"
                          : "rgba(0, 255, 0, 0.1)"
                      }`,
                    }}
                  >
                    <span className={styles.classLabel}>
                      {prediction.class} (
                      {Math.round(prediction.confidence * 100)}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {imageResults && (
        <div className={styles.results}>
          <h3 className={styles.resultsTitle}>Detection Results</h3>

          <div className={styles.stats}>
            <p>Processing time: {imageResults.time?.toFixed(3)} seconds</p>
            {imageDimensions && (
              <p>
                Original dimensions: {imageDimensions.width} ×{" "}
                {imageDimensions.height}px
              </p>
            )}
          </div>

          {imageResults.predictions?.length ? (
            <div className={styles.legend}>
              <div className={styles.legendItem}>
                <div className={styles.liberColorBox} />
                <span>Liber (Empty)</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.ocupatColorBox} />
                <span>Ocupat (Occupied)</span>
              </div>
            </div>
          ) : (
            <p>No objects detected in this image.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default InputDesign;
