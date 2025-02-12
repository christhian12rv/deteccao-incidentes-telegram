/*
  Warnings:

  - Added the required column `updatedAt` to the `TelegramChannel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TelegramChannel" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "TelegramMessage" (
    "id" SERIAL NOT NULL,
    "telegramId" INTEGER NOT NULL,
    "sendingDate" TIMESTAMP(3) NOT NULL,
    "telegramChannelId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TelegramMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TelegramMessage" ADD CONSTRAINT "TelegramMessage_telegramChannelId_fkey" FOREIGN KEY ("telegramChannelId") REFERENCES "TelegramChannel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
