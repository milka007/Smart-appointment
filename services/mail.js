  
const nodemailer = require("nodemailer");

exports.sendMailer = function (to, subject, text,attachments=null) { 
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "mail@gmail.com",
        pass: "password"
    },
    secure: true

  });
  

  let mailOptions = {
    from: '"Smart Appointment"<mail@gmail.com>',
    to: to,
    subject: subject,
    text: text, 
    attachments
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err); 
    } else {
      console.log("Email successfully sent:::" + info.response);
    }
  });
};
