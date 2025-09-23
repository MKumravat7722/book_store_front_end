import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(login({ email, password }));
      if (result.type.includes('Success')) {
        navigate('/dashboard'); 
      } else {
        setError(result.error[0]);
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  const styles = {
    formContainer: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      background: "#fff",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "10px",
      background: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      marginBottom: "10px",
    },
    secondaryButton: {
      width: "100%",
      padding: "10px",
      background: "#6c757d",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
    error: {
      color: "red",
      marginBottom: "10px",
    },
  };

  return (
    <form onSubmit={handleLogin} style={styles.formContainer}>
      <h2 style={styles.heading}>Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Login</button>

      <button
        type="button"
        style={styles.secondaryButton}
        onClick={() => navigate('/signup')}
      >
        Sign Up
      </button>
    </form>
  );
}
