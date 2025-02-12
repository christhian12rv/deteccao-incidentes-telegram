import { Controller, Post, Body, Logger } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  private readonly logger = new Logger(TelegramService.name);

  constructor(private readonly telegramService: TelegramService) {}

  // Rota para receber o Webhook
  @Post('webhook')
  handleWebhook(@Body() body: any): string {
    this.logger.log('Webhook recebeu a mensagem:', body);
    // Aqui você pode processar ou armazenar as mensagens recebidas
    return 'Mensagem recebida com sucesso!';
  }
}
