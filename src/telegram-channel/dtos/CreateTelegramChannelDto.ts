import { z } from 'zod';

export const createTelegramChannelSchema = z.object({
  name: z.string(),
  username: z.string(),
});

export type CreateTelegramChannelDto = z.infer<
  typeof createTelegramChannelSchema
>;
