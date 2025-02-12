declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TELEGRAM_PHONE_NUMBER: string;
      TELEGRAM_PASSWORD: string;
      TELEGRAM_API_ID: number;
      TELEGRAM_API_HASH: string;
      TELEGRAM_STORE_SESSION: string;
      LAST_MESSAGES_LIMIT: number;
      PORT: number;
    }
  }
}

export {};
