import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const navigate = useNavigate()

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setEmailValid(false);
      setMessage('Please enter a valid email address.');
      return;
    }

    const formData = { name, email, password };

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage('Registration successful!');
      console.log(res.data);
      setName('');
      setEmail('');
      setPassword('');
      setEmailValid(true);
      navigate('/')
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-title">Sign Up</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="signup-input"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailValid(true);
          }}
          placeholder="Email"
          required
          className={`signup-input ${emailValid ? '' : 'invalid-input'}`}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="signup-input"
        />

        <button type="submit" className="signup-button">Register</button>
        {message && <p className="signup-message">{message}</p>}
      </form>
    </div>
  );
};

export default Signup;
