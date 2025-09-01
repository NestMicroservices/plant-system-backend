/*
  Warnings:

  - A unique constraint covering the columns `[volume,operationId]` on the table `costconfig` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "costconfig_volume_operationId_key" ON "public"."costconfig"("volume", "operationId");
