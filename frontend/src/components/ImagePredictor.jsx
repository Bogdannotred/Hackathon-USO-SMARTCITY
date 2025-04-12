import React, { useState } from "react";

const ImagePredictor = () => {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const API_URL = "https://detect.roboflow.com/NUME_MODEL/VERSIUNE?api_key=API_KEY";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResults(data.predictions);
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Roboflow AI Image Detection</h2>

      <input type="file" onChange={handleImageChange} />
      <br />
      <button onClick={handleSubmit} style={{ marginTop: "1rem" }}>
        Trimite imaginea
      </button>

      {imageUrl && (
        <div style={{ position: "relative", display: "inline-block", marginTop: "2rem" }}>
          <img src={imageUrl} alt="Upload" width="500" />
          {results.map((prediction, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                left: prediction.x - prediction.width / 2,
                top: prediction.y - prediction.height / 2,
                width: prediction.width,
                height: prediction.height,
                border: "2px solid red",
                color: "red",
                fontWeight: "bold",
                pointerEvents: "none",
              }}
            >
              <span style={{ backgroundColor: "rgba(0,0,0,0.5)", padding: "2px 4px" }}>
                {prediction.class} ({Math.round(prediction.confidence * 100)}%)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImagePredictor;
