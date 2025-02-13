import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import {
  CreateTelegramChannelDto,
  createTelegramChannelSchema,
} from './dtos/CreateTelegramChannelDto';
import ValidationError from 'src/errors/ValidationError';
import { TelegramChannel } from '@prisma/client';

@Injectable()
export class TelegramChannelService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateTelegramChannelDto): Promise<TelegramChannel> {
    const parsedBody = createTelegramChannelSchema.safeParse(body);

    if (!parsedBody.success) {
      throw new ValidationError(`Validation failed: ${parsedBody.error}`);
    }

    return await this.prisma.telegramChannel.create({
      data: {
        name: body.name,
        username: body.username,
      },
    });
  }
}
