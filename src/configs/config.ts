import 'dotenv/config';

export default {
  telegramPhoneNumber: process.env.TELEGRAM_PHONE_NUMBER,
  telegramPassword: process.env.TELEGRAM_PASSWORD,
  telegramApiId: Number(process.env.TELEGRAM_API_ID),
  telegramApiHash: process.env.TELEGRAM_API_HASH,
  telegramStoreSession: process.env.TELEGRAM_STORE_SESSION,
  lastMessagesLimit: Number(process.env.LAST_MESSAGES_LIMIT),
  port: Number(process.env.PORT),
};
