import { Injectable } from '@nestjs/common';
import { Webhook, WebhookDocument } from './webhook.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class WebhookService {
  constructor(
    @InjectModel(Webhook.name) private webhookModel: Model<WebhookDocument>,
  ) {}

  async logWebhookEvent(data: any): Promise<void> {
    console.log('Received Webhook Event:', data);

    const webHook = new this.webhookModel({
      eventId: data.id,
      type: data.type,
      fullPayload: data,
    });

    await webHook.save();
    console.log('Webhook event saved successfully in MongoDB');
  }
}
