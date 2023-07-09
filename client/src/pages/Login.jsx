import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };

     const res= await axios.post('https://koskill-9gt8.onrender.com/api/user/login', loginData);
     console.log(res)

     if(res.data.success){
        console.log(res);
        window.alert("User Login Sucessfully")
        localStorage.setItem('auth', res.data.token);
        navigate('/')
      }else{
       window.alert("Incorrect credential")
      }
      
    } catch (error) {
      window.alert("Something Went wrong")
        console.log(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>Not Register! <a href="/register">Click here</a></p>
    </div>
  );
};

export default Login;
