import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramMessageService } from 'src/telegram-message/telegram-message.service';
import { TelegramController } from './telegram.controller';
import { TelegramChannelService } from 'src/telegram-channel/telegram-channel.service';

@Module({
  providers: [TelegramService, TelegramMessageService, TelegramChannelService],
  controllers: [TelegramController],
  exports: [TelegramService],
})
export class TelegramModule {}
