import React, { useState } from 'react'
import axios from 'axios'

const Signup = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const from = {name,email,password}
        try{
            const res = await axios.post('',form)
        }
        catch(e){
            console.log(e)
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
  </form>
  )
}

export default Signup
