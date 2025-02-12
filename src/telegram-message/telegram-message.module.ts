import { Module } from '@nestjs/common';
import { TelegramMessageService } from './telegram-message.service';

@Module({
  providers: [TelegramMessageService],
})
export class TelegramMessageModule {}
