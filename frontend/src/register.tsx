import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './RegisterForm.css';
import { auth, createUserWithEmailAndPassword } from './firebase'; // Asigură-te că ai importat corect funcțiile din firebase.ts

function RegisterForm() {
  const navigate = useNavigate(); // Hook-ul pentru navigare
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Pentru gestionarea erorilor

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Crează un utilizator cu email și parolă folosind Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      
      // După ce utilizatorul a fost creat, navighează către pagina de login
      navigate('/login');
    } catch (err: any) {
      setError('Error creating account: ' + err.message); // Gestionează erorile de la Firebase
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form-title">Create an Account</h2>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Afișează erorile, dacă există */}

        <button type="submit">Register</button>

        <p className="register-link">
          You have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
