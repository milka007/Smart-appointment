const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://milka007:Milka@123@cluster0.iwuap.mongodb.net/SmartApp?retryWrites=true&w=majority", {
    useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
       console.log('Database sucessfully connected')
    },
    error => {
       console.log('Database could not connected: ' + error)
    }
 )
 const doctorRoute = require('./routes/doctor')
 const userRoute = require('./routes/user')
 const appointmentRoute = require('./routes/appointment')
var app = express() 
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: false
 }));
 
 
 app.use(express.static('public'))
 app.use('/doctor',doctorRoute)  
 app.use('/user',userRoute) 
 app.use('/appointment',appointmentRoute) 

 
 app.listen(3000,()=>{
    console.log("connected to port number 3000");
    }); 