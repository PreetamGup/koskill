const express= require('express')
const dotenv = require('dotenv')
const cors= require('cors')


const connectDB = require('./config/db')

const bodyParser = require('body-parser')

const app = express()

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

dotenv.config();

//connection to database
connectDB()



app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/customer', require('./routes/customerRoutes'))




app.listen('5050', ()=>{
    console.log("Server is listening on Port 5050")
})