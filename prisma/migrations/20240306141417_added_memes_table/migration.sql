/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Meme" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Meme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Meme_id_key" ON "Meme"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Meme_image_key" ON "Meme"("image");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
