const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://milka007:Milka@123@cluster0.iwuap.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true
 }).then(() => {
       console.log('Database sucessfully connected')
    },
    error => {
       console.log('Database could not connected: ' + error)
    }
 )

var app = express() 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
 }));

 
 app.listen(4000,()=>{
    console.log("connected to port number 4000");
    });