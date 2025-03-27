import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WebhookDocument = Webhook & Document;

@Schema()
export class Webhook {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true, type:Object })
  payload: object;

  @Prop({ default: Date.now })
  receivedAt: Date;
}

export const WebhookSchema = SchemaFactory.createForClass(Webhook);
