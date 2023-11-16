import * as nodemailer from 'nodemailer';
import { EnvService } from 'src/env/env.service';
import { AppConfig } from './app.config';
const envService = new EnvService();
console.log("The host is:::::", envService.get(AppConfig.MAIL_HOST))
const transporter = nodemailer.createTransport({
  host: envService.get(AppConfig.MAIL_HOST),
  port: 587, // or 465 for SSL
  secure: false, // true for 465, false for other ports
  auth: {
    user: envService.get(AppConfig.MAIL_USERNAME), // your email
    pass: envService.get(AppConfig.MAIL_PASSWORD), // your email password or an app-specific password
  },
});

export default transporter;
