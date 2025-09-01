-- CreateTable
CREATE TABLE "public"."plant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."operation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "plantId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "operation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."costconfig" (
    "id" SERIAL NOT NULL,
    "operationId" INTEGER NOT NULL,
    "volume" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "costconfig_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."operation" ADD CONSTRAINT "operation_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "public"."plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."costconfig" ADD CONSTRAINT "costconfig_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "public"."operation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
