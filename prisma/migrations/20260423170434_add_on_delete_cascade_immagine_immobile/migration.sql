-- DropForeignKey
ALTER TABLE "ImmagineImmobile" DROP CONSTRAINT "ImmagineImmobile_immobileId_fkey";

-- AddForeignKey
ALTER TABLE "ImmagineImmobile" ADD CONSTRAINT "ImmagineImmobile_immobileId_fkey" FOREIGN KEY ("immobileId") REFERENCES "Immobile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
