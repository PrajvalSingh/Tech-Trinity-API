/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Comment_username_key" ON "Comment"("username");
