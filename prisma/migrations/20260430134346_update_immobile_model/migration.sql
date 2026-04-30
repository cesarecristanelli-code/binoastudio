/*
  Warnings:

  - Added the required column `annoCostruzione` to the `Immobile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatoOccupazione" AS ENUM ('LIBERO', 'OCCUPATO_PROPRIETARIO', 'LOCATO', 'A_REDDITO');

-- CreateEnum
CREATE TYPE "Riscaldamento" AS ENUM ('AUTONOMO', 'CENTRALIZZATO', 'CENTRALIZZATO_CONTABILIZZATO', 'POMPA_DI_CALORE', 'ASSENTE');

-- CreateEnum
CREATE TYPE "Raffrescamento" AS ENUM ('AUTONOMO', 'CENTRALIZZATO', 'PREDISPOSIZIONE', 'ASSENTE');

-- CreateEnum
CREATE TYPE "ClasseCatastale" AS ENUM ('SIGNORILE', 'CIVILE', 'ECONOMICA', 'POPOLARE', 'ULTRA_POPOLARE', 'RUSTICO', 'VILLA', 'VILLINO');

-- AlterTable
ALTER TABLE "Immobile" ADD COLUMN     "accessoDisabili" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "annoCostruzione" INTEGER NOT NULL,
ADD COLUMN     "classeCatastale" "ClasseCatastale",
ADD COLUMN     "postiAuto" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "raffrescamento" "Raffrescamento" NOT NULL DEFAULT 'ASSENTE',
ADD COLUMN     "riscaldamento" "Riscaldamento" NOT NULL DEFAULT 'AUTONOMO',
ADD COLUMN     "statoOccupazione" "StatoOccupazione" NOT NULL DEFAULT 'LIBERO';
