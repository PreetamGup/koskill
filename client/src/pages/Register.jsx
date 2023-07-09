import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate= useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await axios.post('http://localhost:5050/api/user/register', {name, email, password, image:JSON.stringify(image), file});
      const response = await axios.post('https://koskill-9gt8.onrender.com/api/user/register', {name, email, password});

      console.log(response)
      if (response.data.success) {
        // Form submission successful
        console.log('Form submitted successfully');
        window.alert("Register sucessfully");
        navigate("/login")
      } else {
        // Form submission failed
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h1>Register Form</h1>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />

      <button type="submit">Submit</button>
      
    </form>
    <p>Already Register? <a href='/login'>Login Here </a></p>
    </>
  );
}

export default Register;
