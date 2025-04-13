"use client";
import React, { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "./firebase"; // Importă funcțiile necesare din firebase.ts
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      if (isRegistering) {
        // Register new user
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User registered:", email);
      } else {
        // Add your actual login logic here
        console.log("Logging in...", email);
      }
      setIsLoading(false);
      navigate("/home"); // Redirect to the home page after successful login or registration
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoContainer}>
            <h1 className={styles.logo}>Wild Park</h1>
          </div>
        </div>
      </header>
      <div className={styles.pageWrapper}>
        <div className={styles.formCard}>
          <h1 className={styles.formTitle}>
            {isRegistering ? "Sign Up" : "Sign In"}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.inputLabel}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onInput={(event) => setEmail(event.target.value)}
                className={styles.inputField}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.inputLabel}>
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onInput={(event) => setPassword(event.target.value)}
                className={styles.inputField}
              />
            </div>
            {errorMessage ? (
              <div className={styles.errorMessage}>{errorMessage}</div>
            ) : null}
            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? (
                <span>Processing...</span>
              ) : (
                <span>{isRegistering ? "Sign Up" : "Sign In"}</span>
              )}
            </button>
            <div className={styles.forgotPasswordContainer}>
              <button
                className={styles.forgotPasswordLink}
                onClick={(e) => {
                  e.preventDefault(); // Prevent default link behavior (not needed anymore with Link)
                  setIsRegistering(!isRegistering); // Toggle between Sign In and Sign Up
                }}
              >
                {isRegistering
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
