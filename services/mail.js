  
const nodemailer = require("nodemailer");

exports.sendMailer = function (to, subject, text) { 
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "milkashazadi827@gmail.com",
        pass: "shazadimilkha"
    }
  });
  let mailOptions = {
    from: '"Smart Appointment"<milkashazadi827@gmail.com>',
    to: to,
    subject: subject,
    text: text, 
    
  };

  
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email successfully sent:::" + info.response);
    }
  });
};