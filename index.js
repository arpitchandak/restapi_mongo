const express = require('express')
const mongoose = require('mongoose')
const httperror = require('http-errors')
const app = express()

const dotenv = require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    user: process.env.USERNM,
    pass: process.env.PASS,
    dbName: process.env.DB_NAME
})
.then( () => {
    console.log('mongodb connected...')
})
.catch( err => console.log(err.message)) //jab apn nai network access mai koi whitelist ipaddress ya anywhere ip address nh idaala ho mongodb atlas database mai

const ProductRoute = require('./routes/Product.route')
app.use('/data',ProductRoute)


app.use((req,res,next) => {
    next(httperror(400, "Not Found"))
 })

 app.use((error,req,res,next) => {
   
    res.status(error.status || 500 )
    res.send({
        error:{
            status: error.status || 500,
            message: error.message
        }
    })
 })

const PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})