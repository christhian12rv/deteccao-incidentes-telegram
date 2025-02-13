import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Api, TelegramClient } from 'telegram';
import { StoreSession } from 'telegram/sessions';
import input from 'input';
import * as moment from 'moment-timezone';
import config from 'src/configs/config';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTelegramMessageDto } from 'src/telegram-message/dtos/CreateTelegramMessageDto';
import { TelegramMessageService } from 'src/telegram-message/telegram-message.service';
import { Cron } from '@nestjs/schedule';
import { TelegramJoinChannelDto } from './dtos/TelegramJoinChannelDto';
import { CreateTelegramChannelDto } from '../telegram-channel/dtos/CreateTelegramChannelDto';
import { TelegramChannelService } from 'src/telegram-channel/telegram-channel.service';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);

  private client: TelegramClient;
  private storeSession: StoreSession;
  private readonly apiId: number = config.telegramApiId;
  private readonly apiHash: string = config.telegramApiHash;

  constructor(
    private readonly prisma: PrismaService,
    private readonly telegramMessageService: TelegramMessageService,
    private readonly telegramChannelService: TelegramChannelService,
  ) {
    this.storeSession = new StoreSession('telegram_session');
    this.client = new TelegramClient(
      this.storeSession,
      this.apiId,
      this.apiHash,
      {
        connectionRetries: 5,
      },
    );
  }

  @Cron(config.startMessagesCaptureCronJobExpression)
  public async startMessagesCapture(): Promise<string> {
    await this.connectTelegramAccount();

    const channels = await this.prisma.telegramChannel.findMany();

    for (const channel of channels) {
      this.logger.log(
        `Capturing last ${config.lastMessagesLimit} messages of channel ${channel.name} (${channel.username})...`,
      );

      let messages = await this.client.getMessages(channel.username, {
        limit: config.lastMessagesLimit,
      });

      const lastMessageSent = await this.prisma.telegramMessage.findFirst({
        where: {
          telegramChannelId: channel.id,
        },
        orderBy: {
          sendingDate: 'desc',
        },
      });

      if (!!lastMessageSent) {
        messages = messages.filter(
          (message) =>
            moment(new Date(message.date * 1000))
              .tz('America/Sao_Paulo')
              .toDate() > lastMessageSent.sendingDate,
        );
      }

      if (messages.length > 0) {
        this.logger.log(`Saving ${messages.length} new messages...`);
      } else {
        this.logger.log('There are no new messages');
      }

      for (const message of messages) {
        if (!message.message) {
          continue;
        }

        const telegramMessage: CreateTelegramMessageDto = {
          telegramId: message.id,
          message: this.cleanMessage(message.message),
          sendingDate: moment(new Date(message.date * 1000))
            .tz('America/Sao_Paulo')
            .toDate(),
          telegramChannelId: channel.id,
        };

        try {
          await this.telegramMessageService.create(telegramMessage);
        } catch (error) {
          this.logger.error(
            `There was an error saving message of id ${telegramMessage.telegramId} from ${channel.name} channel`,
          );
        }
      }
    }

    this.logger.log('Finished messages capturing');

    return 'Finished messages capturing';
  }

  private async connectTelegramAccount(): Promise<void> {
    await this.client.connect();

    if (!(await this.client.checkAuthorization())) {
      await this.client.start({
        phoneNumber: async () => config.telegramPhoneNumber,
        password: async () => config.telegramPassword,
        phoneCode: async () =>
          await input.text('Please enter the code you received:'),
        onError: (err) => this.logger.log(err),
      });

      this.client.session.save();
    }

    this.logger.log('Successfully connected to Telegram!');
  }

  private cleanMessage(message): string {
    const cleanedMessage = message
      .replace(/\\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return cleanedMessage;
  }

  public async joinChannel(body: TelegramJoinChannelDto): Promise<any> {
    const channelExists = await this.prisma.telegramChannel.findFirst({
      where: {
        username: body.channelUsername,
      },
    });

    if (!!channelExists) {
      throw new BadRequestException('The bot is already part of this channel');
    }
    
    await this.connectTelegramAccount();

    let channel: Api.TypeUpdates = null;

    try {
      channel = await this.client.invoke(
        new Api.channels.JoinChannel({
          channel: body.channelUsername,
        }),
      );
    } catch (error) {}

    if (!channel) {
      throw new BadRequestException('Channel not found');
    }

    const newChannel: CreateTelegramChannelDto = {
      name: channel.toJSON()['chats'][0].title,
      username: body.channelUsername,
    };

    return await this.telegramChannelService.create(newChannel);
  }
}
