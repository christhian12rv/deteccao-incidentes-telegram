declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      TELEGRAM_PHONE_NUMBER: string;
      TELEGRAM_PASSWORD: string;
      TELEGRAM_API_ID: number;
      TELEGRAM_API_HASH: string;
      LAST_MESSAGES_LIMIT: number;
      START_MESSAGES_CAPTURING_CRONJOB_EXPRESSION: string;
    }
  }
}

export {};
