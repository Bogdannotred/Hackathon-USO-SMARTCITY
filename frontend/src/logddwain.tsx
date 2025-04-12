import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { auth, signInWithEmailAndPassword } from './firebase'; // Importă funcțiile necesare

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Pentru gestionarea erorilor
  const navigate = useNavigate(); // Hook-ul pentru navigare

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Autentifică utilizatorul cu email și parolă folosind Firebase
      await signInWithEmailAndPassword(auth, email, password);

      // După autentificare, redirecționează utilizatorul
      navigate('/home'); // Redirecționează utilizatorul la pagina de dashboard (sau altă pagină)
    } catch (err: any) {
      setError('Error logging in: ' + err.message); // Gestionează erorile
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form-title">Login</h2>

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

        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Afișează erorile dacă există */}

        <button type="submit">Login</button>

        <p className="register-link">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
