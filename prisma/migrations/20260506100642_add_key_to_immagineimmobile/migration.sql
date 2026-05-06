/*
  Warnings:

  - The values [PREDISPOSIZIONE] on the enum `Raffrescamento` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[key]` on the table `ImmagineImmobile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `ImmagineImmobile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Raffrescamento_new" AS ENUM ('AUTONOMO', 'CENTRALIZZATO', 'ASSENTE');
ALTER TABLE "public"."Immobile" ALTER COLUMN "raffrescamento" DROP DEFAULT;
ALTER TABLE "Immobile" ALTER COLUMN "raffrescamento" TYPE "Raffrescamento_new" USING ("raffrescamento"::text::"Raffrescamento_new");
ALTER TYPE "Raffrescamento" RENAME TO "Raffrescamento_old";
ALTER TYPE "Raffrescamento_new" RENAME TO "Raffrescamento";
DROP TYPE "public"."Raffrescamento_old";
ALTER TABLE "Immobile" ALTER COLUMN "raffrescamento" SET DEFAULT 'ASSENTE';
COMMIT;

-- AlterTable
ALTER TABLE "ImmagineImmobile" ADD COLUMN     "key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ImmagineImmobile_key_key" ON "ImmagineImmobile"("key");
