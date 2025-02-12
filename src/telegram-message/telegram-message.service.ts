import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import {
  CreateTelegramMessageDto,
  createTelegramMessageSchema,
} from './dtos/CreateTelegramMessageDto';
import ValidationError from 'src/errors/ValidationError';
import { TelegramMessage } from '@prisma/client';

@Injectable()
export class TelegramMessageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateTelegramMessageDto): Promise<TelegramMessage> {
    const parsedBody = createTelegramMessageSchema.safeParse(body);

    if (!parsedBody.success) {
      throw new ValidationError(`Validation failed: ${parsedBody.error}`);
    }

    return await this.prisma.telegramMessage.create({
      data: {
        telegramId: body.telegramId,
        message: body.message,
        sendingDate: body.sendingDate,
        telegramChannelId: body.telegramChannelId,
      },
    });
  }
}
