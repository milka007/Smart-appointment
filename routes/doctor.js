const express = require('express');
const Doctor = require('../models/Doctor');
const router = express.Router();
const idCreator = require('../services/idCreator')

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

            res.json({
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

            res.json({
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
        res.json(data)
    }
    catch (err) {
        console.log(err.message)
        res.status(500)
    }



})


module.exports = router;