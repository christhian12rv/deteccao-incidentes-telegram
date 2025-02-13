import 'dotenv/config';

export default {
  port: Number(process.env.PORT),
  telegramPhoneNumber: process.env.TELEGRAM_PHONE_NUMBER,
  telegramPassword: process.env.TELEGRAM_PASSWORD,
  telegramApiId: Number(process.env.TELEGRAM_API_ID),
  telegramApiHash: process.env.TELEGRAM_API_HASH,
  lastMessagesLimit: Number(process.env.LAST_MESSAGES_LIMIT),
  startMessagesCapturingCronJobExpression: process.env.START_MESSAGES_CAPTURING_CRONJOB_EXPRESSION,
};
