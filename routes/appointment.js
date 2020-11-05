const express = require('express');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const idCreator = require('../services/idCreator');
const router = express.Router();
const {authenticateToken} = require('../services/auth')
const {sendMailer} = require('../services/mail')

router.get('/myAppointments' ,authenticateToken, async (req,res)=>{
    try{
        const user_id = req.user.user_id
        var data = await Appointment.find({user_id})
        var appd = []
        for(var i=0;i<data.length;i++){
            var doctor_id = data[i].doctor_id
        const doctordata = await Doctor.findOne({doctor_id})
        var newdata = {}
        newdata.doctor_name = doctordata.doctor_name

        newdata.address = doctordata.address
        newdata.fee = doctordata.fee
        newdata.appointment_id = data[i].appointment_id
        newdata.time = data[i].time
        newdata.date= data[i].date
        newdata.bookedon = data[i].bookedon
        appd.push(newdata)
        }
        
        res.json(appd) 
    }
  catch(err){

      console.log(err.message)
  }

})
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


router.post('/createAppointment',authenticateToken, async (req, res) => {  // to create a new appointment for a person
    try {
        var appointment_id
        var user_id = req.user.user_id
        var { doctor_id, time, date } = req.body  
        var bookdate = new Date(date)
        bookdate.setHours(0,0,0,0)
        date=bookdate 
        var isDocId = await Doctor.findOne({ doctor_id })  
        if (!isDocId) { 
            res.json({
                success: false,
                message: "invalid doctor"
            })
            return; 

        } 
        var slot = isDocId.slot

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