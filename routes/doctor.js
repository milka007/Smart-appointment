const express = require('express');
const Doctor = require('../models/Doctor');
const router = express.Router();
const idCreator = require('../services/idCreator')

router.get('/getDetails/:doctor_id',async (req,res)=>{
    try{  
        const {doctor_id} = req.params
        var data = await Doctor.find({doctor_id:doctor_id})
        res.status(200).json(data)
    }
    catch(err){
        res.status(500)
        console.log(err.message)
    }
})
router.post('/', async (req, res) => {
    try {
        const { doctor_name, specialization, phone, email, address, fee, slot } = req.body
        var data = await Doctor.find().sort({ doctor_id: -1 }).limit(1)
        
        if (data.length==0) { 
            
            var doctor_id = "DR0001"
            data = await Doctor.create({
                doctor_name,
                doctor_id,
                specialization,
                phone,
                email,
                slot,
                address, 
                fee
            })

            res.status(200).json({
                success: true
            })
        }
        else { 
            doctor_id = data[0].doctor_id 
            doctor_id = idCreator.idCreator(doctor_id)
            data = await Doctor.create({
                doctor_name,
                doctor_id,
                specialization,
                phone,
                email,
                slot,
                address,
                fee
            })

            res.status(200).json({
                success: true
            })
        }


    }
    catch (err) {
        console.log(err.message)
        res.status(500)
    }


})
router.get('/getAllDoctors', async (req, res) => {

    try {
        var data = await Doctor.find()
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err.message)
        res.status(500)
    }



})


module.exports = router;