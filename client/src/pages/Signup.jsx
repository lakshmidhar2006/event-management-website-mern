import React, { useState } from 'react'
import axios from 'axios'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = { name, email, password }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData)
      setMessage('Registration successful!')
      console.log(res.data)
      // Optionally reset form
      setName('')
      setEmail('')
      setPassword('')
    } catch (error) {
      console.error(error)
      setMessage(error.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      <button type="submit">Register</button>
      {message && <p>{message}</p>}
    </form>
  )
}

export default Signup
