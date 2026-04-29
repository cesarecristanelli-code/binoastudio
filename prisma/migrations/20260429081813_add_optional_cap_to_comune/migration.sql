/*
  Warnings:

  - You are about to drop the column `arredato` on the `Immobile` table. All the data in the column will be lost.
  - You are about to drop the column `classeEnergia` on the `Immobile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comune" ALTER COLUMN "cap" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Immobile" DROP COLUMN "arredato",
DROP COLUMN "classeEnergia",
ADD COLUMN     "arredo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "classeEnergetica" "ClasseEnergetica" NOT NULL DEFAULT 'G';
