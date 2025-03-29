import { Body, Controller, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { Webhook } from './webhook.schema';
import { sendToDiscord } from '../../../src/server';
import { SmsService } from './sms.service';
@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('logs')
  async handeWebHook(@Body() data: Webhook) {
    const event = data;
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.eventId;
        console.log(`PaymentIntent ${paymentIntent} was successful.`);
        break;
      case 'payment_method.attached':
        const paymentMethod = event.eventId;
        console.log(
          `PaymentMethod ${paymentMethod} was attached to a customer.`,
        );
        break;
      case 'payment_intent.created':
        const newPaymentIntent = event.eventId;
        console.log(`PaymentIntent ${newPaymentIntent} was created.`);
        break;
      case 'payment_intent.canceled':
        const canPaymentIntent = event.eventId;
        console.log(`PaymentIntent ${canPaymentIntent} was canceled.`);
        break;
      case 'payment_intent.processing':
        const processPaymentIntent = event.eventId;
        console.log(
          `PaymentIntent ${processPaymentIntent} is being processed.`,
        );
        break;
      default:
        console.log(`Unhandled event type ${event}`);
        return;
    }
    const smsService = new SmsService();
    await smsService.sendSms('+213542470211', 'Webhook event received!');
    await this.webhookService.logWebhookEvent(data);
    await sendToDiscord(event);
    return { message: 'Webhook received', success: true, content: data };
  }
}
