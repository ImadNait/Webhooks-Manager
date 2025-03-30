import { Body, Controller, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { sendToDiscord } from '../../../src/server';
import { SmsService } from './sms.service';
import { sendEmail } from './nodemailer.service';
import * as dotenv from 'dotenv';
dotenv.config(); 
@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('logs')
  async handeWebHook(@Body() data: any) {
    const event = data;
    console.log("this is the webhoook: ", event);  
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object.id;
        console.log(`PaymentIntent ${paymentIntent} was successful.`);
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object.id;
        console.log(
          `PaymentMethod ${paymentMethod} was attached to a customer.`,
        );
        break;
      case 'payment_intent.created':
        const newPaymentIntent = event.data.object.id;
        console.log(`PaymentIntent ${newPaymentIntent} was created.`);
        break;
      case 'payment_intent.canceled':
        const canPaymentIntent = event.data.object.id;
        console.log(`PaymentIntent ${canPaymentIntent} was canceled.`);
        break;
      case 'payment_intent.processing':
        const processPaymentIntent = event.data.object.id;
        console.log(
          `PaymentIntent ${processPaymentIntent} is being processed.`,
        );
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
        return;
    }
    const smsService = new SmsService();
    await smsService.sendSms(`${process.env.TWILIO_PHONE_NUMBER}`, 'Webhook event received!');

    sendEmail(`${process.env.RECEIVER_EMAIL}`,"Webhook received",`Webhook of type ${event.type} has been delivered to you successfully.`)
    
    await this.webhookService.logWebhookEvent(data);
    
    await sendToDiscord(event);
    
    return { message: 'Webhook received', success: true, content: data };
  }
}
