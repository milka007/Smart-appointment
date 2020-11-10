const express = require('express');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const idCreator = require('../services/idCreator');
const router = express.Router();
const { authenticateToken } = require('../services/auth')
const { sendMailer } = require('../services/mail')
const puppeteer = require('puppeteer')

router.get('/myAppointments', authenticateToken, async (req, res) => {
    try {
        const user_id = req.user.user_id
        var data = await Appointment.find({ user_id })
        var appd = []
        for (var i = 0; i < data.length; i++) {
            var doctor_id = data[i].doctor_id
            const doctordata = await Doctor.findOne({ doctor_id })
            var newdata = {}
            newdata.doctor_name = doctordata.doctor_name

            newdata.address = doctordata.address
            newdata.fee = doctordata.fee
            newdata.appointment_id = data[i].appointment_id
            newdata.time = data[i].time
            newdata.date = data[i].date
            newdata.bookedon = data[i].bookedon
            appd.push(newdata)
        }

        res.status(200).json(appd)
    }
    catch (err) {
        res.status(500)
        console.log(err.message)
    }

})
router.get('/allAppointments/:doctorId', async (req, res) => {
    try {
        const { doctorId } = req.params
        var data = await Appointment.find({ doctor_id: doctorId })
        res.status(200).json(data)

    }
    catch (err) {
        res.status(500)
        console.log(err.message)
    } 

})


router.post('/createAppointment', authenticateToken, async (req, res) => {  
    try {
        var appointment_id
        var user_id = req.user.user_id
        var { doctor_id, time, date } = req.body
        var bookdate = new Date(date)
        bookdate.setHours(0, 0, 0, 0)
        date = bookdate
        var isDocId = await Doctor.findOne({ doctor_id })
        if (!isDocId) {
            res.status(200).json({
                success: false,
                message: "invalid doctor"
            })
            return;

        }
        var slot = isDocId.slot

        var slotIndex = slot.indexOf(time)
        if (slotIndex == -1) {
            res.status(200).json({
                success: false,
                message: "invlalid slot"
            })
            return;

        }

        var isSlotAllreadyExists = await Appointment.findOne({ $and: [{ doctor_id }, { time }, { date }] })
        if (isSlotAllreadyExists) {
            res.status(200).json({
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
        const doctordata = await Doctor.findOne({doctor_id})
        const userdata = await User.findOne({user_id})
        var html = `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>

<body>
   Dear ${userdata.user_name},<br>
   &nbsp;&nbsp;&nbsp;&nbsp;Your Appointment is confirmed for Doctor ${doctordata.doctor_name}.Your Appointment is scheduled on ${date}
   at ${time}. See you in Clinic. <br>
   Thank You <br><br>
   <b>
   Smart Appointment,<br>
   Dr. ${doctordata.doctor_name} <br>
   Clinic Address - ${doctordata.address} <br>
   Phone Number - ${doctordata.phone} <br>
   Email - ${doctordata.email}



   </b>

</body>

</html>
        `
        const browser = await puppeteer.launch({
            args: ["--no-sandbox"],
        });
        const page = await browser.newPage();
        await page.setContent(html)
        const buffer = await page.pdf({

            path: "appointment.pdf",
            format: "A4",
            printBackground: true,
        });
        let pdfdata = Uint8Array.from(Buffer.from(buffer))
        sendMailer(userdata.email,"Appointment confirmed","Test",[{filename:"appointment.pdf",content:pdfdata}])
        res.status(200).json({

            success: true
        }) 
    }
    catch (err) {
        res.status(500)
        console.log(err.message)
    }


})



module.exports = router;
