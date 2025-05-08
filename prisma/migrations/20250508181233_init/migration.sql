-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'ANALYST', 'User');

-- CreateTable
CREATE TABLE "UserAuthentication" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "passwordChangedAt" TIMESTAMP(6),
    "firstName" TEXT,
    "lastName" TEXT,
    "address" TEXT,
    "birthday" TIMESTAMP(6),
    "gender" TEXT,
    "language" TEXT,
    "email" TEXT,
    "phone" TEXT,

    CONSTRAINT "UserAuthentication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogData" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "sourceIP" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" TEXT NOT NULL,
    "destinationIP" TEXT NOT NULL,
    "protocol" TEXT NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "LogData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAuthentication_username_key" ON "UserAuthentication"("username");
