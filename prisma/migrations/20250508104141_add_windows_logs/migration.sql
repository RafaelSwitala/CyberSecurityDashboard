-- CreateTable
CREATE TABLE "WindowsLog" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "host" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "eventID" INTEGER NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "WindowsLog_pkey" PRIMARY KEY ("id")
);
