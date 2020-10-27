const express = require('express');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const idCreator = require('../services/idCreator');
const router = express.Router();



router.post('/createAppointment', async (req, res) => {
    try {
        var appointment_id

        const { doctor_id, user_id, time, date } = req.body
        var isDocId = await Doctor.findOne({ doctor_id })
        // console.log(isDocId)
        if (!isDocId) {
            res.json({
                success: false,
                message: "invalid data"
            })
            return;

        }
        var f = 0
        var slot = isDocId.slot
        for (var i = 0; i < slot.length; i++) {
            if (slot[i] == time)
            {
                 f = 1
                break
            }
             

        }
        if (f)
            console.log(true)
        else
            console.log(false)

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