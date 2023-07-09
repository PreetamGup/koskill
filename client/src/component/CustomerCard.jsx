import React, { useState } from 'react'
import {AiOutlineEye, AiOutlineDelete} from 'react-icons/ai'
import {LuEdit} from 'react-icons/lu'
import { Button, Modal } from 'antd';
import axios from 'axios';

const CustomerCard = ({customer, allCustomerData}) => {
  const [isModalViewOpen, setIsModalViewOpen] = useState(false)
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [name, setname] = useState(customer.name)
  const [email, setemail] = useState(customer.email)
  const [phone, setphone] = useState(customer.phone)
  const [address, setaddress] = useState(customer.address)

  



  const handleEdit=async(e, cusId)=>{
    e.preventDefault();

    try {
      const response = await axios.put(`https://koskill-9gt8.onrender.com/api/customer/updateCustomer/${cusId}`,{name, email, phone, address}, {headers:{
      Authorization: "Bearer " + localStorage.getItem("auth"),
      }})
    
      console.log(response)
    
    setIsModalEditOpen(false)
  

    if(response.data.success){
      allCustomerData()
      setTimeout(() => {
        window.alert("Customer detail update Successfully")
      }, 1000);
    }

    } catch (error) {
      console.log(error)
      window.alert(`Error ${error}`)
    }
    
  }


  const handleDelete=async(cusId)=>{
    try {
      const response = await axios.delete(`https://koskill-9gt8.onrender.com/api/customer/deletecustomer/${cusId}`, {headers:{
      Authorization: "Bearer " + localStorage.getItem("auth"),
      }})
    

      if(response.data.success){
        allCustomerData()
        window.alert("Customer data deleted Successfully")

        
      }


    } catch (error) {
      console.log(error)
      window.alert(`Error ${error}`)
    }
  }
 

  return (
    <>
    <div className='customerCard'>
        <p>{customer.name} <br />
           From:- {customer.address} <br />
           Created On:- {customer.creationDate.split("T")[0].split("-").reverse().join("-")}

        </p>
        <p><AiOutlineEye onClick={()=>setIsModalViewOpen(true)}/> <LuEdit onClick={()=> setIsModalEditOpen(true)}/> <AiOutlineDelete onClick={()=>handleDelete(customer._id)}/></p>
    </div>

    <Modal title="Customer Details" open={isModalViewOpen} onOk={()=> setIsModalViewOpen(false)} onCancel={()=> setIsModalViewOpen(false)}  cancelButtonProps={{ style: { display: 'none' } }}>
        <form>
          <label htmlFor="customerName"> {"Name :- "} 
            <input type="text" value={customer.name} id='customerName' disabled/>
          </label>
          <br /><br />

          <label htmlFor="customerEmail"> {"Email :- "}
            <input type="text" value={customer.email} id='customerEmail' disabled/>
          </label>
          <br /><br />

          <label htmlFor="customerPhone">{"Phone :- "}
            <input type="number" value={customer.phone} id='customerPhone' disabled/>
          </label>
          <br /><br />

          <label htmlFor="customerAddress"> {"Address :- "} 
            <input type="text" value={customer.address} id='customerAddress' disabled/>
          </label>
        </form>
      </Modal>


      <Modal title="Edit Customer Details" open={isModalEditOpen}  onCancel={()=>setIsModalEditOpen(false)} footer={null} >
        <form onSubmit={(e)=>handleEdit(e, customer._id)}>
          <label htmlFor="customerName"> {"Name :- "} 
            <input type="text" defaultValue={customer.name} id='customerName'  onChange={(e)=> setname(e.target.value)}/>
          </label>
          <br /><br />

          <label htmlFor="customerEmail"> {"Email :- "}
            <input type="text" defaultValue={customer.email} id='customerEmail' onChange={(e)=> setemail(e.target.value)}/>
          </label>
          <br /><br />

          <label htmlFor="customerPhone"> {"Phone :- "}
            <input type="number" defaultValue={customer.phone} id='customerPhone' onChange={(e)=> setphone(e.target.value)} maxLength={10}/>
          </label>
          <br /><br />

          <label htmlFor="customerAddress"> {"Address :- "}
            <input type="text" defaultValue={customer.address} id='customerAddress' onChange={(e)=> setaddress(e.target.value)} />
          </label>
          <br />
          <br />

          <input type="submit" />

        </form>
      </Modal>


    </>
  )
}

export default CustomerCard