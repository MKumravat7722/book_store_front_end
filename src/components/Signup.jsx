import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(signup({ name, email, password, role }));
      if (result.type.includes('Success')) {
        navigate('/login');
      } else {
        setError(result.error?.[0] || 'Signup failed');
      }
    } catch {
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
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      textAlign: "center",
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
    select: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "14px",
      background: "blue",
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
    },
    error: {
      color: "red",
      marginBottom: "10px",
      textAlign: "center",
    },
  };

  return (
    <form onSubmit={handleSignup} style={styles.formContainer}>
      <h2 style={styles.heading}>Sign Up</h2>
      {error && <p style={styles.error}>{error}</p>}

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={styles.input}
      />
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
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={styles.select}
      >
        <option value="user">User</option>
        <option value="author">Author</option>
      </select>

      <button type="submit" style={styles.button}>Sign Up</button>
    </form>
  );
}
