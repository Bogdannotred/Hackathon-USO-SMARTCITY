"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./InputDesign.module.css";

function InputDesign() {
  const [ticket, setTicket] = useState(() => null);
  const [timeLeft, setTimeLeft] = useState(() => 0);
  const [showPaymentModal, setShowPaymentModal] = useState(() => false);
  const [paymentDetails, setPaymentDetails] = useState(() => ({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  }));
  const [fines, setFines] = useState(() => []);
  const [selectedFile, setSelectedFile] = useState(() => null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(() => false);
  const [selectedDuration, setSelectedDuration] = useState(() => 30);
  const [pricePerHour, setPricePerHour] = useState(() => 5);

  function calculatePrice() {
    return (selectedDuration / 60) * pricePerHour;
  }

  function startCountdown() {
    const duration = selectedDuration * 60; // convert minutes to seconds
    setTimeLeft(duration);
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setTicket(null);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }

  function showPayment() {
    setShowPaymentModal(true);
  }

  function hidePayment() {
    setShowPaymentModal(false);
  }

  function handlePayment() {
    if (
      paymentDetails.cardNumber &&
      paymentDetails.cardHolder &&
      paymentDetails.expiryDate &&
      paymentDetails.cvv
    ) {
      setTicket({
        id: Math.random().toString(36).substr(2, 9),
        purchaseTime: new Date().toISOString(),
      });
      startCountdown();
      hidePayment();
    }
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  function handleFileUpload(event) {
    setSelectedFile(event.target.files[0]);
  }

  function startVideo() {
    setIsVideoPlaying(true);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleDurationChange(duration) {
    setSelectedDuration(duration);
  }

  useEffect(() => {
    // Simulate loading fines
    setFines([
      {
        id: 1,
        amount: 100,
        date: "2024-01-15",
        description: "Parking violation",
      },
      {
        id: 2,
        amount: 50,
        date: "2024-01-10",
        description: "Speed limit exceeded",
      },
    ]);
  }, []);

  return (
    <div className={styles.container}>
      {!ticket && !showPaymentModal && (
        <div className={styles.parkingOptions}>
          <h2 className={styles.sectionTitle}>Select Parking Duration</h2>
          <div className={styles.durationSelector}>
            <button
              className={`${styles.durationButton} ${selectedDuration === 30 ? styles.selected : ""}`}
              onClick={() => handleDurationChange(30)}
            >
              30 min
            </button>
            <button
              className={`${styles.durationButton} ${selectedDuration === 60 ? styles.selected : ""}`}
              onClick={() => handleDurationChange(60)}
            >
              1 hour
            </button>
            <button
              className={`${styles.durationButton} ${selectedDuration === 120 ? styles.selected : ""}`}
              onClick={() => handleDurationChange(120)}
            >
              2 hours
            </button>
          </div>

          <div className={styles.priceInfo}>
            <p>Price: ${calculatePrice().toFixed(2)}</p>
            <p>Rate: ${pricePerHour.toFixed(2)}/hour</p>
          </div>

          <button className={styles.payButton} onClick={showPayment}>
            Pay Now
          </button>
        </div>
      )}

      {ticket && (
        <div className={styles.activeTicket}>
          <h2 className={styles.sectionTitle}>Active Parking Ticket</h2>
          <div className={styles.ticketInfo}>
            <p>Ticket ID: {ticket.id}</p>
            <p>
              Purchase Time: {new Date(ticket.purchaseTime).toLocaleString()}
            </p>
            <p className={styles.timeLeft}>
              Time Remaining: {formatTime(timeLeft)}
            </p>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className={styles.paymentModal}>
          <h2 className={styles.sectionTitle}>Payment Details</h2>
          <div className={styles.paymentForm}>
            <div className={styles.formGroup}>
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cardHolder">Card Holder</label>
              <input
                type="text"
                id="cardHolder"
                name="cardHolder"
                value={paymentDetails.cardHolder}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                />
              </div>
            </div>

            <div className={styles.paymentSummary}>
              <p>Duration: {selectedDuration} minutes</p>
              <p>Total: ${calculatePrice().toFixed(2)}</p>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.cancelButton} onClick={hidePayment}>
                Cancel
              </button>

              <button className={styles.confirmButton} onClick={handlePayment}>
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.finesSection}>
        <h2 className={styles.sectionTitle}>Outstanding Fines</h2>
        {fines.length > 0 ? (
          <ul className={styles.finesList}>
            {fines.map((fine) => (
              <li key={fine.id} className={styles.fineItem}>
                <div className={styles.fineDetails}>
                  <p className={styles.fineDescription}>{fine.description}</p>
                  <p className={styles.fineDate}>{fine.date}</p>
                </div>
                <p className={styles.fineAmount}>${fine.amount.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noFines}>No outstanding fines</p>
        )}
      </div>

      <div className={styles.fileUploadSection}>
        <h2 className={styles.sectionTitle}>Upload Documents</h2>
        <div className={styles.fileUpload}>
          <input
            type="file"
            id="documentUpload"
            onChange={handleFileUpload}
            className={styles.fileInput}
          />
          <label htmlFor="documentUpload" className={styles.fileLabel}>
            {selectedFile ? selectedFile.name : "Choose a file"}
          </label>
        </div>
        {selectedFile && (
          <p className={styles.selectedFileName}>
            Selected: {selectedFile.name}
          </p>
        )}
      </div>

      <div className={styles.videoSection}>
        <h2 className={styles.sectionTitle}>Parking Tutorial</h2>
        <div className={styles.videoContainer}>
          {!isVideoPlaying ? (
            <div className={styles.videoPlaceholder} onClick={startVideo}>
              <div className={styles.playButton}>▶</div>
              <p>Click to play tutorial video</p>
            </div>
          ) : (
            <div className={styles.videoPlayer}>
              <p>Video is playing...</p>
              <button
                className={styles.pauseButton}
                onClick={() => setIsVideoPlaying(false)}
              >
                Pause
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InputDesign;
