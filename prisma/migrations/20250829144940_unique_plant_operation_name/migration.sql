/*
  Warnings:

  - A unique constraint covering the columns `[name,plantId]` on the table `operation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `plant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "operation_name_plantId_key" ON "public"."operation"("name", "plantId");

-- CreateIndex
CREATE UNIQUE INDEX "plant_name_key" ON "public"."plant"("name");
