import React, { useState } from 'react';

const Payments = () => {
  const [ticketPurchased, setTicketPurchased] = useState(false);
  const [cardDetails, setCardDetails] = useState({ name: '', cardNumber: '', expiry: '', cvv: '' });
  const [file, setFile] = useState(null);

  // Funcția pentru a gestiona încărcarea fișierelor
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files ? event.target.files[0] : null;
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  // Funcția pentru a simula achiziționarea unui bilet
  const handlePurchase = () => {
    setTicketPurchased(true);
  };

  // Funcția pentru a gestiona detaliile cardului
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>Plătește pentru Biletul de Parcare</h2>

      {ticketPurchased ? (
        <div>
          <h3>Biletul tău a fost achiziționat cu succes!</h3>
          <p>Detalii Bilet:</p>
          <ul>
            <li>Loc de parcare: Zona A</li>
            <li>Preț: 10 RON</li>
            <li>Durata: 2 ore</li>
          </ul>
          <h4>Plată:</h4>
          <p>Introducerea detaliilor cardului pentru a finaliza plata:</p>
          <input
            type="text"
            name="name"
            placeholder="Nume pe card"
            value={cardDetails.name}
            onChange={handleCardChange}
            style={{ marginBottom: '10px' }}
          />
          <input
            type="text"
            name="cardNumber"
            placeholder="Număr card"
            value={cardDetails.cardNumber}
            onChange={handleCardChange}
            style={{ marginBottom: '10px' }}
          />
          <input
            type="text"
            name="expiry"
            placeholder="Expirare (MM/YY)"
            value={cardDetails.expiry}
            onChange={handleCardChange}
            style={{ marginBottom: '10px' }}
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={cardDetails.cvv}
            onChange={handleCardChange}
            style={{ marginBottom: '10px' }}
          />
          <button onClick={handlePurchase}>Plătește acum</button>

          <div style={{ marginTop: '20px' }}>
            <h4>Plată rapidă cu Google Pay sau Apple Pay:</h4>
            <button style={{ padding: '10px', backgroundColor: '#4285F4', color: 'white' }}>Google Pay</button>
            <button style={{ padding: '10px', backgroundColor: '#000', color: 'white', marginLeft: '10px' }}>
              Apple Pay
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3>Încărcați fișierul pentru a începe procesul de plată</h3>
          <input
            type="file"
            onChange={handleFileUpload}
            style={{ marginBottom: '10px' }}
          />
          {file && <p>Fișierul încărcat: {file.name}</p>}
          <button onClick={handlePurchase} style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
            Cumpără bilet
          </button>
        </div>
      )}
    </div>
  );
};

export default Payments;
