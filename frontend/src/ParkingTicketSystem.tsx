"use client";
import React, { useState, useEffect } from "react";
import styles from "./ParkingTicketSystem.module.css";

// Payment Modal Component
const PaymentModal = ({
  onClose,
  onPayment,
  amount,
  paymentDetails,
  setPaymentDetails,
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button className={styles.backButton} onClick={onClose}>
            Înapoi
          </button>
          <h3 className={styles.modalTitle}>Detalii Plată</h3>
          <div className={styles.spacer}></div>
        </div>
        <div className={styles.paymentForm}>
          <div>
            <label className={styles.inputLabel}>Număr Card</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={paymentDetails.cardNumber}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  cardNumber: e.target.value,
                })
              }
              className={styles.paymentInput}
            />
          </div>
          <div>
            <label className={styles.inputLabel}>Titular Card</label>
            <input
              type="text"
              placeholder="John Doe"
              value={paymentDetails.cardHolder}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  cardHolder: e.target.value,
                })
              }
              className={styles.paymentInput}
            />
          </div>
          <div className={styles.inputGroup}>
            <div>
              <label className={styles.inputLabel}>Data Expirării</label>
              <input
                type="text"
                placeholder="MM/YY"
                value={paymentDetails.expiryDate}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    expiryDate: e.target.value,
                  })
                }
                className={styles.paymentInput}
              />
            </div>
            <div>
              <label className={styles.inputLabel}>CVV</label>
              <input
                type="text"
                placeholder="123"
                value={paymentDetails.cvv}
                onChange={(e) =>
                  setPaymentDetails({ ...paymentDetails, cvv: e.target.value })
                }
                className={styles.paymentInput}
              />
            </div>
          </div>
          <div className={styles.paymentActions}>
            <button className={styles.payButton} onClick={onPayment}>
              <span>Plătește </span>
              <span>Lei</span>
              <span>{amount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Active Ticket Component
const ActiveTicket = ({ ticket, timeLeft, formatTime }) => {
  const isLowTime = timeLeft < 300;

  return (
    <div className={styles.activeTicket}>
      <h3 className={styles.activeTicketTitle}>Tichet Activ</h3>
      <p>
        <span>ID Tichet: </span>
        <span>{ticket.id}</span>
      </p>
      <p
        className={`${styles.timeRemaining} ${isLowTime ? styles.lowTime : ""}`}
      >
        <span>Timp Rămas: </span>
        <span>{formatTime(timeLeft)}</span>
      </p>
    </div>
  );
};

// Fine Item Component
const FineItem = ({ fine, onPayClick }) => {
  return (
    <div className={styles.fineItem}>
      <div>
        <p className={styles.fineDescription}>{fine.description}</p>
        <p className={styles.fineDate}>{fine.date}</p>
      </div>
      <div className={styles.fineActions}>
        <p className={styles.fineAmount}>
          <span>{fine.amount}</span>
          <span>Lei</span>
        </p>
        <button className={styles.payFineButton} onClick={onPayClick}>
          Plătește Amenda
        </button>
      </div>
    </div>
  );
};

// Main Component
function ParkingTicketSystem() {
  const [ticket, setTicket] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });
  const [fines, setFines] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [pricePerHour, setPricePerHour] = useState(5);

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

  useEffect(() => {
    // Simulate loading fines
    setFines([
      {
        id: 1,
        amount: 100,
        date: "2024-01-15",
        description: "Amenzi parcare",
      },
    ]);
  }, []);

  return (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        onClick={() => window.history.back()}
      >
        Înapoi la Pagina Anterioară
      </button>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Cumpără Tichet</h2>
        {!ticket ? (
          <div className={styles.purchaseForm}>
            <div className={styles.formFields}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel}>
                  Număr de Înmatriculare
                </label>
                <input
                  type="text"
                  placeholder="Exemplu: B 123 ABC"
                  className={styles.registrationInput}
                />
              </div>

              <div className={styles.formField}>
                <label className={styles.fieldLabel}>Zona de Parcare</label>
                <select className={styles.zoneSelect}>
                  <option value="">Selectează zona</option>
                  <option value="zona-0">Zona 0 - Centru</option>
                  <option value="zona-1">Zona 1 - Semicentral</option>
                  <option value="zona-2">Zona 2 - Periferie</option>
                </select>
              </div>

              <label className={styles.durationLabel}>
                <span>Durata Parcării (minute):</span>
                <select
                  value={selectedDuration}
                  onChange={(e) =>
                    setSelectedDuration(parseInt(e.target.value))
                  }
                  className={styles.durationSelect}
                >
                  <option value="30">30 minute</option>
                  <option value="60">1 oră</option>
                  <option value="120">2 ore</option>
                  <option value="180">3 ore</option>
                  <option value="240">4 ore</option>
                </select>
              </label>
            </div>

            <div className={styles.priceSummary}>
              <span className={styles.priceLabel}>Cost Total</span>
              <div className={styles.priceAmount}>
                <span className={styles.currency}>Lei</span>
                <span className={styles.amount}>{calculatePrice()}</span>
              </div>
            </div>

            <button className={styles.purchaseButton} onClick={showPayment}>
              Cumpără Tichet Parcare
            </button>

            {showPaymentModal && (
              <PaymentModal
                onClose={hidePayment}
                onPayment={handlePayment}
                amount={calculatePrice()}
                paymentDetails={paymentDetails}
                setPaymentDetails={setPaymentDetails}
              />
            )}
          </div>
        ) : (
          <ActiveTicket
            ticket={ticket}
            timeLeft={timeLeft}
            formatTime={formatTime}
          />
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Amenzile Tale</h2>
        {fines.length > 0 ? (
          <div className={styles.finesList}>
            {fines.map((fine) => (
              <FineItem key={fine.id} fine={fine} onPayClick={showPayment} />
            ))}
          </div>
        ) : (
          <p>Nu s-au găsit amenzi.</p>
        )}
      </section>
    </div>
  );
}

export default ParkingTicketSystem;
