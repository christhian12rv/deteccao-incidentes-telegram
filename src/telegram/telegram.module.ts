import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramMessageService } from 'src/telegram-message/telegram-message.service';

@Module({
  providers: [TelegramService, TelegramMessageService],
  controllers: [],
  exports: [TelegramService],
})
export class TelegramModule {}
