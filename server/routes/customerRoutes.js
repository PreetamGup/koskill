const router= require('express').Router()
const authMiddleware = require('../middleware/authMiddleware')
const {addNewCustomer, getAllCustomer, getCustomerDetails, updateCustomer, deleteCustomer}= require('../controller/customerController')

// Requiring ObjectId from mongoose npm package
const ObjectId = require('mongoose').Types.ObjectId;




//for getting Single Customer data
router.get('/singleCustomer/:id',authMiddleware ,getCustomerDetails)

//for getting all customer data
router.get('/allCustomer',authMiddleware, getAllCustomer)

//for creating new customer
router.post('/addnewCustomer',authMiddleware, addNewCustomer)

//for updating customer,
router.put('/updateCustomer/:id',authMiddleware, updateCustomer)

//for Deleting Customer
router.delete('/deleteCustomer/:id',authMiddleware, deleteCustomer)



module.exports= router