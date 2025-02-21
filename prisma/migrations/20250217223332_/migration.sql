/*
  Warnings:

  - You are about to drop the `TelegramChannel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TelegramMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TelegramMessage" DROP CONSTRAINT "TelegramMessage_telegramChannelId_fkey";

-- DropTable
DROP TABLE "TelegramChannel";

-- DropTable
DROP TABLE "TelegramMessage";

-- CreateTable
CREATE TABLE "telegram_channel" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "telegram_channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "telegram_message" (
    "id" SERIAL NOT NULL,
    "telegramId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "sendingDate" TIMESTAMP(3) NOT NULL,
    "telegramChannelId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "telegram_message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "telegram_channel_username_key" ON "telegram_channel"("username");

-- AddForeignKey
ALTER TABLE "telegram_message" ADD CONSTRAINT "telegram_message_telegramChannelId_fkey" FOREIGN KEY ("telegramChannelId") REFERENCES "telegram_channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
