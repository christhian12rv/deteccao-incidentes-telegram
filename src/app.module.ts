import { Module } from '@nestjs/common';
import { TelegramModule } from './telegram/telegram.module';
import { PrismaModule } from './database/prisma.module';
import { TelegramMessageModule } from './telegram-message/telegram-message.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TelegramChannelModule } from './telegram-channel/telegram-channel.module';

@Module({
  imports: [
    TelegramModule,
    { module: PrismaModule, global: true },
    ScheduleModule.forRoot(),
    TelegramMessageModule,
    TelegramChannelModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
