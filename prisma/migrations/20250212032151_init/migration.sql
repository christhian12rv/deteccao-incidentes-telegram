-- CreateTable
CREATE TABLE "TelegramChannel" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "username" TEXT NOT NULL,

    CONSTRAINT "TelegramChannel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TelegramChannel_username_key" ON "TelegramChannel"("username");
