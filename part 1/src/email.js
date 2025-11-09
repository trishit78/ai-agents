import nodemailer from 'nodemailer';

import dotenv from 'dotenv';

dotenv.config()

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user:process.env.USER ,
        pass: process.env.PASSWORD
    }
});





export const  init = ({body,subject,toEmail})=>{
    const mailOptions = {
  from: `${toEmail}`,
  to: `${toEmail}`,
  subject: `${subject}`,
  text: `${body}`
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

}

