-- CreateTable
CREATE TABLE "Vpn" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vpnAddress" TEXT NOT NULL,
    "vpnName" TEXT NOT NULL,
    "vpnUsername" TEXT NOT NULL,
    "vpnPassword" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "userInfo" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Vpn_vpnAddress_key" ON "Vpn"("vpnAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Vpn_vpnName_key" ON "Vpn"("vpnName");
