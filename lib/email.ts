
import nodemailer from 'nodemailer';

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
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


  return await transporter.sendMail({
    from: `noreply <${process.env.MAIL_USER}>`,
    ...payload,
  });
}