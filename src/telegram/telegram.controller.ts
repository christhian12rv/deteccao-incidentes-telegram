import { Body, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/ZodValidationPipe';
import {
  TelegramJoinChannelDto,
  telegramJoinChannelSchema,
} from './dtos/TelegramJoinChannelDto';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(
    private readonly telegramService: TelegramService,
  ) {}

  @Post('/start-messages-capture')
  startMessagesCapture(): Promise<string> {
    return this.telegramService.startMessagesCapture();
  }

  @Post('/join-channel')
  joinChannel(
    @Body(new ZodValidationPipe(telegramJoinChannelSchema))
      body: TelegramJoinChannelDto,
  ): any {
    return this.telegramService.joinChannel(body);
  }
}
