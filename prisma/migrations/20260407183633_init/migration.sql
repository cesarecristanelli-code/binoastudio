-- CreateTable
CREATE TABLE "Immobile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "prezzo" INTEGER NOT NULL,
    "indirizzo" TEXT NOT NULL,
    "metratura" INTEGER NOT NULL,
    "numeroLocali" INTEGER NOT NULL,
    "numeroBagni" INTEGER NOT NULL,
    "descrizione" TEXT
);

-- CreateTable
CREATE TABLE "ImmaginiImmobile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "isCover" BOOLEAN NOT NULL DEFAULT false,
    "immobileId" TEXT NOT NULL,
    CONSTRAINT "ImmaginiImmobile_immobileId_fkey" FOREIGN KEY ("immobileId") REFERENCES "Immobile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
