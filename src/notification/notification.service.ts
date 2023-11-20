import { Injectable, Logger } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { MAIL_FROM } from "src/utils/constants";
import transporter from "src/config/mailer.config";
import { ConfigService } from "@nestjs/config";
import { AppConfig } from "src/config/app.config";

@Injectable()
export class NotificationService {
  constructor(private configService: ConfigService){
  }
  public async sendInvitationCode(email: string): Promise<string> {
    const hashedEmail = await this.hashEmail(email);
    const invitationCode = this.generateInvitationCode(hashedEmail);
    const activationLink = `https://artisan.com.ng/activate?code=${invitationCode}`;

    // Compose email
    const mailOptions = {
      from: MAIL_FROM,
      to: email,
      subject: "Account Activation",
      text: `Click the following link to activate your account: ${activationLink}`,
    };
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return invitationCode;
  }

  private async hashEmail(email: string): Promise<string> {
    const SALT = this.configService.get<string>(AppConfig.APP_SALT)||10;
    console.log("Data from environment::::::::", SALT);

    return await bcrypt.hash(email, SALT);
  }

  private generateInvitationCode(hashedEmail: string): string {
    return `${hashedEmail}-${this.generateRandomString(10)}`;
  }

  private generateRandomString(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
}
