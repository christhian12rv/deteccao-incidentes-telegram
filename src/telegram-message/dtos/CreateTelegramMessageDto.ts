import { z } from 'zod';

export const createTelegramMessageSchema = z.object({
  telegramId: z.number(),
  message: z.string(),
  sendingDate: z.date(),
  telegramChannelId: z.number(),
});

export type CreateTelegramMessageDto = z.infer<
  typeof createTelegramMessageSchema
>;
