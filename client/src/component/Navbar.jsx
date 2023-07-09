import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  function handleLogout(){
    localStorage.removeItem("auth")
    navigate("/login")
  }

  return (
    <div className='navContainer'>
      <Link to={"/"}><span>Home</span></Link>  
      <Link to={"/NewCustomer"}><span>Add New Customer</span></Link>
      <span onClick={handleLogout}>Logout</span>
    </div>
  )
}

export default Navbar