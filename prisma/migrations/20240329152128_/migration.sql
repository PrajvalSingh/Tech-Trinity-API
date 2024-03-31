-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "has_liked" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_access_token_key" ON "User"("access_token");
