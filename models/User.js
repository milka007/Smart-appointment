const mongoose=require('mongoose')
const Schema=mongoose.Schema



const User = new Schema({
    user_name:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true,
        unique:true
    },
    
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    
    age:{
        type:Number,
        required:true
    }
})


module.exports=mongoose.model("User",User)
