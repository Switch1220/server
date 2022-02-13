-- CreateTable
CREATE TABLE "Vpn" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vpnAddress" TEXT NOT NULL,
    "vpnName" TEXT NOT NULL,
    "vpnUsername" TEXT NOT NULL,
    "vpnPassword" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "userInfo" TEXT
);
