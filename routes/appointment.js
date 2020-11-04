const express = require('express');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const idCreator = require('../services/idCreator');
const router = express.Router();

router.get('/allAppointments/:doctorId', async (req, res) => {
    try{
        const { doctorId } = req.params
        var data = await Appointment.find({doctor_id:doctorId})
        console.log(data)
        res.json(data)
        
    }
    catch(err){
        console.log(err.message)
    }
   
})


router.post('/createAppointment', async (req, res) => {  // to create a new appointment for a person
    try {
        var appointment_id

        var { doctor_id, user_id, time, date } = req.body  // we are getting the doctor details which the person has booked ,
        var bookdate = new Date(date)
        bookdate.setHours(0,0,0,0)
        date=bookdate 
        var isDocId = await Doctor.findOne({ doctor_id })  // 
        // console.log(isDocId)
        if (!isDocId) { // same reason. if we find any data we will proceed. if we dont find we will return giving a msg
            res.json({
                success: false,
                message: "invalid doctor"
            })
            return; 

        }
        var isSlotValid = false
        var slot = isDocId.slot

        // for (var i = 0; i < slot.length; i++) {  here we are macthing the time slot which the user is trying to book with the doctors slot. right?
        //     if (slot[i] == time)
        //     { 
        //         isSlotValid = true
        //         break
        //     }
        // }
        // if (isSlotValid)
        //     console.log(true)
        // else
        //     console.log(false)

        var slotIndex = slot.indexOf(time)
        if (slotIndex == -1) {
            res.json({
                success: false,
                message: "invlalid slot"
            })
            return;

        } 

        var isSlotAllreadyExists = await Appointment.findOne({ $and: [{ doctor_id }, { time }, { date }] })
        if (isSlotAllreadyExists) {
            res.json({
                success: false,
                message: "Already booked"
            })
            return;
        }
        // console.log(isSlotAllreadyExists) 

        var data = await Appointment.find().sort({ appointment_id: -1 }).limit(1)
        if (data.length == 0) {
            appointment_id = "AP0001"
        }
        else {
            appointment_id = data[0].appointment_id
            appointment_id = idCreator.idCreator(appointment_id)
        }
        data = await Appointment.create({ 

            doctor_id,
            appointment_id,
            user_id,
            time,
            date
        })

        res.json({
            success: true
        })
    }
    catch (err) {
        console.log(err.message)
    }


})



module.exports = router;