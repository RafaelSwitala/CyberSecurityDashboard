-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'ANALYST');

-- CreateTable
CREATE TABLE "UserAuthentication" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAuthentication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogData" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "sourceIP" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogData_pkey" PRIMARY KEY ("id")
);

/*
INSERT INTO UserAuthentication (username, password, role) VALUES
('admin', 'hashed_password_1', 'ADMIN'),
('analyst', 'hashed_password_2', 'ANALYST');

INSERT INTO LogData (message, port, sourceIP) VALUES
('Test log entry 1', 8080, '192.168.1.1'),
('Test log entry 2', 8081, '192.168.1.2');
*/
-- CreateIndex
CREATE UNIQUE INDEX "UserAuthentication_username_key" ON "UserAuthentication"("username");
