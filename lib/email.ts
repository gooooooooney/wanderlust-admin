
import nodemailer from 'nodemailer';

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
}

const smtpOptions = {
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT || "994"),
  secure: true, // use SSL
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PWD,
  },
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT || "587"),
  secure: false, 
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PWD,
  },
});

export const sendEmail = async (payload: EmailPayload) => {


  try {
    const res = await transporter.sendMail({
      from: `noreply <${process.env.MAIL_USER}>`,
      ...payload,
    });
  } catch (error) {
    console.log("error sending email:", error)
  }
}