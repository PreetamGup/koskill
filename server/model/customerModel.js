const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },

  email: {
    type: String,
    required: [true, "Name is required"],
  },
  
  phone:{
    type: Number,
    required:[true, "Phone no. is required"]
  },

  address:{
    type: String,
    required: [true, "Address is required"],
  },

  creationDate:{
    type: Date,
    default : new Date()
  }
  

}, );

const CustomerModel = mongoose.model("Customer", CustomerSchema);

module.exports = CustomerModel;
