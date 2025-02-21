/*
  Warnings:

  - Added the required column `author` to the `telegram_message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "telegram_message" ADD COLUMN     "author" TEXT NOT NULL;
