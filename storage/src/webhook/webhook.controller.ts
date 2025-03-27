import { Body, Controller, Post } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
    constructor(private readonly webhookService: WebhookService) {}

    @Post('logs')
    async handeWebHook(@Body() data: any){
        await this.webhookService.logWebhookEvent(data);

        return { message: 'Webhook received', success: true, content:data };
    }

}
