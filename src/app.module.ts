import { Module } from '@nestjs/common';
import { TelegramModule } from './telegram/telegram.module';
import { PrismaModule } from './database/prisma.module';
import { TelegramMessageModule } from './telegram-message/telegram-message.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TelegramModule,
    { module: PrismaModule, global: true },
    TelegramMessageModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
