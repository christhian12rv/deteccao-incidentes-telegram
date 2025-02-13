import { z } from 'zod';

export const telegramJoinChannelSchema = z.object({
  channelUsername: z.string(),
});

export type TelegramJoinChannelDto = z.infer<typeof telegramJoinChannelSchema>;
