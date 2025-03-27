import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type WebhookDocument = Webhook & Document;

@Schema()
export class Webhook {
  @Prop({ required: true })
  eventType: string;

  @Prop({ required: true, type:MongooseSchema.Types.Mixed })
  payload: object;

  @Prop({ default: Date.now, index:true })
  receivedAt: Date;
}

export const WebhookSchema = SchemaFactory.createForClass(Webhook);
