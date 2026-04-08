"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

export default async function insertImmobile(formData: FormData) {

    try {
        const nome = formData.get("nome") as string;
        const prezzo = Number(formData.get("prezzo"));
        const indirizzo = formData.get("indirizzo") as string;
        const metratura = Number(formData.get("metratura"));
        const numeroBagni = Number(formData.get("numero-bagni"));
        const numeroLocali = Number(formData.get("numero-locali"));
        const descrizione = formData.get("descrizione") as string;
        const files = formData.getAll("foto") as File[];

        // Controlli
        if (!nome) throw new Error("Nome dell'immoble non valido");
        if (prezzo <= 0) throw new Error("Il prezzo non è valido");
        if (!indirizzo) throw new Error("Indirizzo non valido");
        if (metratura <= 0) throw new Error("Metratura non valida");
        if (numeroBagni <= 0) throw new Error("Numero dei bagni non valido");
        if (numeroLocali <= 0) throw new Error("Numero dei locali non valido");
        if (!descrizione) throw new Error("Descrizione non valida");
        if (!files || files.length <= 0)
            throw new Error("Devi inserire almeno 1 immagine");
        // Fine controlli


        const nuovoImmobile = await prisma.immobile.create({
            data: {
                nome,
                prezzo,
                indirizzo,
                metratura,
                numeroBagni,
                numeroLocali,
                descrizione
            }
        })

        // Creo il percorso per dove salvare le foto
        const uploadDir = path.join(process.cwd(), "public/uploads");

        // Verifico che la cartella esista
        await fs.mkdir("public/uploads", { recursive: true });

        const immaginiData = []

        for (const file of files) {
            if (file.size === 0) continue;

            // Creo il nome del file univoco
            const fileName = `${Date.now()}-${file.name}`;
            const filePath = path.join(uploadDir, fileName)

            // Trasformo il file in un Buffer (memoria temporanea), pronto a essere messo nel FileSystem
            const buffer = Buffer.from(await file.arrayBuffer())
            await fs.writeFile(filePath, buffer)

            // Salvo i dati nel mio array immaginiData
            immaginiData.push({
                path: `/uploads/${fileName}`,
                immobileId: nuovoImmobile.id,
            });

        }

        // metto i dati nel db
        if (immaginiData.length > 0) {
            await prisma.immaginiImmobile.createMany({
                data: immaginiData,
            })
        }

        revalidatePath("/vendita")
        return {success: true, message: `Dati caricati nel DB con successo:\n\t${nuovoImmobile}\n\t${immaginiData}`}
    } catch (error) { 
        const errorMessage =
        error instanceof Error
          ? error.message
          : "Errore durante il caricamento dell'immobile. Riprova";

          return {success: false, message: errorMessage}
    }

}   