/*
  Warnings:

  - Added the required column `action` to the `LogData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationIP` to the `LogData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protocol` to the `LogData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `LogData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LogData" ADD COLUMN     "action" TEXT NOT NULL,
ADD COLUMN     "destinationIP" TEXT NOT NULL,
ADD COLUMN     "protocol" TEXT NOT NULL,
ADD COLUMN     "reason" TEXT NOT NULL;
