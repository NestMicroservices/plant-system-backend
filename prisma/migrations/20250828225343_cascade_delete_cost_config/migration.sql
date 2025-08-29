-- DropForeignKey
ALTER TABLE "public"."costconfig" DROP CONSTRAINT "costconfig_operationId_fkey";

-- AddForeignKey
ALTER TABLE "public"."costconfig" ADD CONSTRAINT "costconfig_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "public"."operation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
