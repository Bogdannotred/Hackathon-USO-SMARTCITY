import { Link } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  return (
    <div className="container">
      <form className="form">
        <h2 className="form-title">Login</h2>

        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="you@example.com" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="••••••••" required />

        <button type="submit">Login</button>

        <p className="register-link">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
