import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';
import * as dotenv from 'dotenv';
dotenv.config(); 
@Injectable()
export class SmsService {
  private twilioClient: Twilio.Twilio;

  constructor() {
    const accountSid = `AC455b0117f211b6362a55911e6653d62e`;
    const authToken = `c1f6b2eca695c0276da56a4a233fcb20`;
    if (!accountSid || !authToken) {
      throw new Error("Twilio credentials are missing!");
    }

    this.twilioClient = Twilio(accountSid, authToken);
  }


  async sendSms(to: string, message: string) {
    try {
      const result = await this.twilioClient.messages.create({
        body: message,
        from: `+18456225734`,
        to: to,
      });
      console.log('SMS sent to', result.sid);
    } catch (error) {
      console.error('Failed to send SMS:', error);
    }
  }
}
