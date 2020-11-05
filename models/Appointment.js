const mongoose=require('mongoose')
const Schema=mongoose.Schema

const Appointment = new Schema({
    appointment_id:{
        type:String,
        required:true,
        unique:true
    },
    doctor_id:{
        type:String,
        required:true, 
        
    },
    user_id:{
        type:String,
        required:true,
        
    },
   
    time:{
        type:String,
        required:true
    },
    date:{ 
        type:Date,
        required:true
    },
    bookedon:{
        type:Date,
        default:new Date()
    }

})





module.exports=mongoose.model("Appointment",Appointment)
