import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './configs/config';
import { ZodFilter } from './filters/ZodFilter';
import { Logger } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ZodFilter());
  await app.listen(config.port ?? 3000);

  logger.log('Server running on port ' + config.port + '...');
}
bootstrap();
