const nodemailer = require("nodemailer");
const dotenv=require('dotenv').config({path:'../config/config.env'})
const transporter = nodemailer.createTransport({
  service: 'gmail',

  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail=async(options)=> {
  // send mail with defined transport object
  const message = await transporter.sendMail({
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>` , // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
  });

  
  console.log("Message sent: %s", message.messageId);

}

module.exports=sendEmail;