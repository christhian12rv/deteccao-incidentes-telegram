/*
  Warnings:

  - Added the required column `message` to the `TelegramMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TelegramMessage" ADD COLUMN     "message" TEXT NOT NULL;
