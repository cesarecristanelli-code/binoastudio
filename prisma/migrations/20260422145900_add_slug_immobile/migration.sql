/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Immobile` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `Immobile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Immobile" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Immobile_slug_key" ON "Immobile"("slug");
