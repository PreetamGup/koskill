import React from "react";
import Navbar from "../component/Navbar";
import { useState } from "react";
import axios from "axios";

const NewCustomer = () => {
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [address, setaddress] = useState("")



  const handleSumbit=async(e)=>{
    e.preventDefault()

    if(!name || !email || !phone || !address){
      return window.alert("All field required")
    }

    try {
      const response = await axios.post(`http://localhost:5050/api/customer/addnewCustomer`,{name, email, phone, address}, {headers:{
        Authorization: "Bearer " + localStorage.getItem("auth"),
        }})
      
        console.log(response)

        if(response.data.success){
          window.alert("New Customer added Successfully")
          setname("");
          setemail("")
          setaddress("")
          setphone("")
        }


    } catch (error) {
      console.log(`Error ${error}`)
      window.alert(`Error ${error}`)

    }


  }


  return (
    <div className="customerContainer">
      <Navbar />
      <div className="newCustomerForm">
        <h2>Customer Creation Form</h2>

        <form onSubmit={(e) => handleSumbit(e)}>
          <label htmlFor="customerName">
            {"Name :- "}
            <input
              type="text"
              value={name}
              id="customerName"
              onChange={(e) => setname(e.target.value)}
            />
          </label>
          <br />
          <br />

          <label htmlFor="customerEmail">
            {"Email :- "}
            
            <input
              type="text"
              value={email}
              id="customerEmail"
              onChange={(e) => setemail(e.target.value)}
            />
          </label>
          <br />
          <br />

          <label htmlFor="customerPhone">
            {"Phone :- "}
            
            <input
              type="number"
              id="customerPhone"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              maxLength={10}
            />
          </label>
          <br />
          <br />

          <label htmlFor="customerAddress">
            {"Address :- "}
            
            <input
              type="text"
              value={address}
              id="customerAddress"
              onChange={(e) => setaddress(e.target.value)}
            />
          </label>
          <br />
          <br />

          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NewCustomer;
