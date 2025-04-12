import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // ✅ Adăugat

// Configurația Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAW4eaK4GkZqOMgTk7cpRZlGulYHxnT-DA",
  authDomain: "test-e2175.firebaseapp.com",
  projectId: "test-e2175",
  storageBucket: "test-e2175.firebasestorage.app",
  messagingSenderId: "550404273650",
  appId: "1:550404273650:web:44d9f21e1a0edb9c61676b",
  measurementId: "G-QJ4982M398"
};

// Inițializarea Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Adăugat

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword };
  