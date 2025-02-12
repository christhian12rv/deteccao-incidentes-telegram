import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { TelegramMessageService } from 'src/telegram-message/telegram-message.service';

@Module({
  providers: [TelegramService, TelegramMessageService],
  controllers: [TelegramController],
  exports: [TelegramService],
})
export class TelegramModule {}
