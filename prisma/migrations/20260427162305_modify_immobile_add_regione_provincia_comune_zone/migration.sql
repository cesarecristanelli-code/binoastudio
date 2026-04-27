/*
  Warnings:

  - You are about to alter the column `prezzo` on the `Immobile` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - Added the required column `comuneId` to the `Immobile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Immobile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Immobile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatoImmobile" AS ENUM ('NUOVO', 'BUONO', 'RISTRUTTURATO', 'DA_RISTRUTTURARE');

-- CreateEnum
CREATE TYPE "ClasseEnergetica" AS ENUM ('A4', 'A3', 'A2', 'A1', 'B', 'C', 'D', 'E', 'F', 'G');

-- CreateEnum
CREATE TYPE "Contratto" AS ENUM ('VENDITA', 'AFFITTO');

-- CreateEnum
CREATE TYPE "TipoImmobile" AS ENUM ('APPARTAMENTO', 'VILLA', 'LOFT', 'UFFICIO', 'COMMERCIALE');

-- DropIndex
DROP INDEX "User_password_key";

-- AlterTable
ALTER TABLE "Immobile" ADD COLUMN     "arredato" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ascensore" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "boxAuto" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "classeEnergia" "ClasseEnergetica" NOT NULL DEFAULT 'G',
ADD COLUMN     "comuneId" TEXT NOT NULL,
ADD COLUMN     "contratto" "Contratto" NOT NULL DEFAULT 'VENDITA',
ADD COLUMN     "giardino" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "numeroBalconi" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "numeroTerrazzi" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "piano" TEXT,
ADD COLUMN     "speseCondominiali" DOUBLE PRECISION,
ADD COLUMN     "stato" "StatoImmobile" NOT NULL DEFAULT 'BUONO',
ADD COLUMN     "tipo" "TipoImmobile" NOT NULL DEFAULT 'APPARTAMENTO',
ADD COLUMN     "totalePiani" INTEGER,
ADD COLUMN     "zonaId" TEXT,
ALTER COLUMN "prezzo" SET DATA TYPE DECIMAL(12,2);

-- CreateTable
CREATE TABLE "Regione" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Regione_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provincia" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" VARCHAR(2) NOT NULL,
    "regioneId" TEXT NOT NULL,

    CONSTRAINT "Provincia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comune" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "cap" VARCHAR(5) NOT NULL,
    "provinciaId" TEXT NOT NULL,

    CONSTRAINT "Comune_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zona" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "comuneId" TEXT NOT NULL,
    "cap" TEXT,

    CONSTRAINT "Zona_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Regione_nome_key" ON "Regione"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Provincia_nome_key" ON "Provincia"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Provincia_sigla_key" ON "Provincia"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "Comune_slug_key" ON "Comune"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Zona_slug_key" ON "Zona"("slug");

-- CreateIndex
CREATE INDEX "ImmagineImmobile_immobileId_isCover_idx" ON "ImmagineImmobile"("immobileId", "isCover");

-- AddForeignKey
ALTER TABLE "Provincia" ADD CONSTRAINT "Provincia_regioneId_fkey" FOREIGN KEY ("regioneId") REFERENCES "Regione"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comune" ADD CONSTRAINT "Comune_provinciaId_fkey" FOREIGN KEY ("provinciaId") REFERENCES "Provincia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zona" ADD CONSTRAINT "Zona_comuneId_fkey" FOREIGN KEY ("comuneId") REFERENCES "Comune"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Immobile" ADD CONSTRAINT "Immobile_comuneId_fkey" FOREIGN KEY ("comuneId") REFERENCES "Comune"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Immobile" ADD CONSTRAINT "Immobile_zonaId_fkey" FOREIGN KEY ("zonaId") REFERENCES "Zona"("id") ON DELETE SET NULL ON UPDATE CASCADE;
