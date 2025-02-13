import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './configs/config';
import { ZodFilter } from './filters/ZodFilter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ZodFilter());
  await app.listen(config.port ?? 3000);
}
bootstrap();
