const cryptoJS = require('crypto-js')
const express = require('express')
const router = express.Router()
const Speakeasy = require('speakeasy')
const mailer = require('../service/email')
const User = require('../model/User')
const { resolveHostname } = require('nodemailer/lib/shared')
const { create } = require('../models/User')



router.post('/generateOTP', (req, res) => {
    var email = req.body.email //yaha email . baki sb v waise hi lerhe

    var secret = Speakeasy.generateSecret({ length: 20 }); //generating secret 20 letter
    otpSecret = secret.base32;
    otp = Speakeasy.totp({   //otp create
        secret: otpSecret,    //secret use krhe for otp generating
        encoding: "base32",
        digits: 4, // 4 digit otp
        window: 0,
        step: 180  //validity time in sec

    });
    mailer.sendMailer(email, "Verification code", `Your OTP is ${otp}`)  //using send mailer to send otp to user email user ka 
    // console.log(otp)
    res.json({ // frontend me response . uska kam bataiyega
        secret: otpSecret,
    })

})
router.post('/verifyOTP/:secret/:OTP', async (req, res) => {
   
    try {
        const { email, password, name, phone, age } = req.body
        const { secret, OTP } = req.params
        console.log(email, password, name, secret, OTP)
        isCorrectOTP = Speakeasy.totp.verify({
            secret: secret,
            encoding: "base32",
            token: OTP,
            window: 0,
            digits: 4,
            step: 180


        });
        const enPassword = cryptoJS.SHA256(password).toString()
        if (isCorrectOTP == false) {
            res.status(200).json({
                success: false
            })
            return;
        }
        var data = await User.findOne({ email })
        if (data) {
            res.json({
                success: false,
                message: " email id already exists"
            })
        } 
        else {
           
            var data = await User.create({
                email,
                name,
                password: enPassword,
                phone,
                age
            })
            console.log(data)
            res.status(200).json({
                success: true
            })



        }
    } 
    catch (err) {
        console.log(err.message)
    }


})
router.get('/getname', (req, res) => {

})

router.post('/login', (req, res) => {
    var { email, password } = req.body
    const enPassword = cryptoJS.SHA256(password).toString()
    User.findOne({ email })

        .then(data => {
            if (!data) {
                res.json({
                    success: false,
                    message: "Email id does not exist"
                })
                return;
            }
            if (enPassword == data.password) {
                res.json({
                    success: true
                })
            }
            else {
                res.json({
                    success: false,
                    message: "invalid password"
                })
            }
            console.log(data.password)
        }).catch(err => {
            console.log(err.message)
            res.status(500)
        })

})





module.exports = router