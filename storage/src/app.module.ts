import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookModule } from './webhook/webhook.module';
import * as dotenv from 'dotenv';
dotenv.config(); 

@Module({
  imports: [
    MongooseModule.forRoot(
      `${process.env.DB_URI}`,
    ),
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
