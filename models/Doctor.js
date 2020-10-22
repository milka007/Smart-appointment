const mongoose=require('mongoose')
const Schema=mongoose.Schema


const Doctor = new Schema({
    doctor_name:{
        type:String,
        required:true
    },
    doctor_id:{
        type:String,
        required:true,
        unique:true
    },
    specialization:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    slot:{
        type:Array,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    fee:{
        type:Number,
        required:true
    }
})







module.exports=mongoose.model("Doctor",Doctor)
