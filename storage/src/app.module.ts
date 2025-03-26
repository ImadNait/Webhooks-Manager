import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookController } from './webhook/webhook.controller';
import { WebhookService } from './webhook/webhook.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://imad:imad552006@webhooks.8ha9j.mongodb.net/'),
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
