import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import axios from "axios";
import CustomerCard from "../component/CustomerCard";

const Home = () => {
  const [allCustomer, setallCustomer] = useState([]);
  const [sortedData, setSortedData] = useState([])
  const [searchBy, setsearchBy]= useState({
    search:"none",
    searchText:""
  });
  

  const allCustomerData = async () => {
    try {
      const response = await axios.get(
        "https://koskill-9gt8.onrender.com/api/customer/allcustomer",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth"),
          },
        }
      );

      if (response.data.success) {
        setallCustomer([...response.data.allCustomer]);
        setSortedData([...response.data.allCustomer])
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleSort = async (sortValue) => { 

    if (sortValue === "name") {
     let sortedCus =  allCustomer.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      });

      setSortedData([...sortedCus])
     
      
    } else if (sortValue === "createdDate") {
     let sortedCus = allCustomer.sort((a, b) => {
        if (a.creationDate < b.creationDate) {
          return -1;
        }
        if (a.creationDate > b.creationDate) {
          return 1;
        }
        return 0;
      });
      
      setSortedData([...sortedCus])
   
    } 
    else {
      setSortedData([...allCustomer])
     
    }
  };

  // console.log(sortedData)

  useEffect(() => {
    allCustomerData();
  }, []);

  return (
    <div className="homeContainer">
      <Navbar />
      <div className="searchandsort">

        <label htmlFor="searchBy">{"Search By:- "}
          <select name="search" id="searchBy" onChange={(e)=>setsearchBy({...searchBy, search:e.target.value})}>
            <option selected value="none">None</option>
            <option value="name">name</option>
            <option value="email">email</option>
            <option value="address">address</option>

          </select>
          <input type="text" onChange={(e)=> setsearchBy({...searchBy,searchText:e.target.value})} />
        </label>

        <label htmlFor="">
          {"Sort By:- "}
          <select
            name="sort"
            id="sortBy"
            onChange={(e) => {
              handleSort(e.target.value);
            }}
          >
            <option value="none">None</option>
            <option value="name">Name</option>
            <option value="createdDate">Creation Date</option>
          </select>
        </label>
      </div>
      <div className="mainContainer">
        {sortedData.filter(customer=> {
          if(searchBy.search==="none"){
            return true
          }else{
           return (customer[`${searchBy.search}`]).toLowerCase().includes(searchBy.searchText.toLowerCase())
          }
        }).map((customer, idx) => {
          return (
            <CustomerCard
              key={customer._id}
              customer={customer}
              allCustomerData={allCustomerData}
            />
          );
        })}
      </div>

      <div className="pageNo"></div>
    </div>
  );
};

export default Home;
