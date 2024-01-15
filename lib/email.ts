
import nodemailer from 'nodemailer';

type EmailPayload = {
  from?: string;
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

export const sendEmail = (payload: EmailPayload) => {

  // https://stackoverflow.com/questions/65631481/nodemailer-in-vercel-not-sending-email-in-production
  transporter.sendMail({
    from: 'noreply',
    ...payload
  })
  return Promise.resolve(true)
  // return new Promise((resolve, reject) => {
  //   transporter.sendMail(payload, (error, info) => {
  //     if (error) {
  //       reject(error);
  //     } else {
  //       resolve(info);
  //     }
  //   });
  // }
  // )
}