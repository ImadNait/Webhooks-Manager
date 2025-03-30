import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';
import * as dotenv from 'dotenv';
dotenv.config(); 
@Injectable()
export class SmsService {
  private twilioClient: Twilio.Twilio;

  constructor() {
    const accountSid = `${process.env.TWILIO_ACCOUNT_SID}`;
    const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;
    if (!accountSid || !authToken) {
      throw new Error("Twilio credentials are missing!");
    }

    this.twilioClient = Twilio(accountSid, authToken);
  }


  async sendSms(to: string, message: string) {
    try {
      const result = await this.twilioClient.messages.create({
        body: message,
        from: `${process.env.TWILIO_PHONE_NUMBER}`,
        to: to,
      });
      console.log('SMS sent to', result.sid);
    } catch (error) {
      console.error('Failed to send SMS:', error);
    }
  }
}
