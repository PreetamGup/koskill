const CustomerModel= require('../model/customerModel')


const getAllCustomer= async(req, res)=>{
  try {
    const allCustomer = await CustomerModel.find({})

    return res.status(200).json({
      allCustomer,
      success:true,
    })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Fetching all customer failed ${error.message}`,
    })
    
  }

}


const getCustomerDetails= async(req, res)=>{
  try {
    const customerId=req.params.id
    const customerDetails = await CustomerModel.findById(customerId)

    return res.status(200).json({
      customerDetails,
      success:true,
    })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Fetching customer detail failed ${error.message}`,
    })
    
  }

}



const addNewCustomer = async (req, res)=>{

  try {

    const existedCustomer = await CustomerModel.findOne({ email: req.body.email});
    if (existedCustomer) {
      return res.status(200).send({
        message: "Customer already exists",
        success: false,
      });
    }


    const newCustomer = new CustomerModel(req.body)
    await newCustomer.save();

   return res.status(201).json({
      message: "New Customer Added Successfully",
      success: true,
    })

  } catch (error) {
    console.log(error)

  return res.status(400).json({
      success: false,
      message: `Customer creation is failed ${error.message}`,
    })
  }
}


const updateCustomer = async(req, res)=>{

  try {
   const cusId= req.params.id
   const response= await CustomerModel.updateOne({_id:cusId}, req.body)
   if(response.modifiedCount===1){

    return  res.status(200).json({
      message:"Customer Update Successfully",
      success: true
    })
   }
   else{

    return res.status(400).json({
      message:"Customer Not Exists",
      success: false
    })

   }
    
  } catch (error) {
    console.log(`Update error ${error}`)
    return res.status(500).json({
      message:`Update Error ${error}`,
      success: false
    })
  }

}

const deleteCustomer= async(req, res)=>{
  
  try {
    const cusId= req.params.id
    const response= await CustomerModel.deleteOne({_id:cusId})
    
    if(response.deletedCount===1){

      return res.status(200).json({
        message:"Customer Details Deleted",
        success: true
      })
    }
    else{

      return res.status(404).json({
        message:"Customer Not Exits",
        success: false
      })

    }




  } catch (error) {
    console.log(`Delete error ${error}`)
    return res.status(404).json({
      message:"Deleteing error",
      success: false
    })
  }

}


module.exports={addNewCustomer, getCustomerDetails, getAllCustomer, updateCustomer, deleteCustomer}