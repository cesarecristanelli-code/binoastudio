/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `ImmagineImmobile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ImmagineImmobile_path_key" ON "ImmagineImmobile"("path");
