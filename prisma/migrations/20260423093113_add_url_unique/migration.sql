/*
  Warnings:

  - You are about to drop the column `path` on the `ImmagineImmobile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `ImmagineImmobile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `ImmagineImmobile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ImmagineImmobile_path_key";

-- AlterTable
ALTER TABLE "ImmagineImmobile" DROP COLUMN "path",
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ImmagineImmobile_url_key" ON "ImmagineImmobile"("url");
