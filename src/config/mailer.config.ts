import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587, // or 465 for SSL
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USERNAME, // your email
    pass: process.env.MAIL_PASSWORD, // your email password or an app-specific password
  },
});

export default transporter;
