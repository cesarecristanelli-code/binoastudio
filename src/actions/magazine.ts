"use server";

import prisma from "@/lib/prisma";
import { Result } from "@/types/actions.types";
import { Magazine } from "@/generated/prisma/client";
import { generateResult } from "@/lib/utils";
import { Resend } from "resend";
import { MagazineEmail } from "@/components/binoazione-section/newsletter/emails/MagazineEmail"
import { createElement } from "react";
import { render } from "@react-email/render";

// Recupera tutti i magazine salvati nel DB ordinati per numero.
export async function getMagazines(): Promise<Result<Magazine[]>> {
    try {
        const magazines = await prisma.magazine.findMany({
            orderBy: {
                numero: "asc", // o "desc" se vuoi prima i più recenti
            },
        });

        return generateResult(true, "Magazines recuperati", null, magazines);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("Errore nel recupero dei magazine:", errorMessage);

        return generateResult(false, "Errore dal server", errorMessage);
    }
}

// Funzione helper per dividere un array in blocchi (max 100 per la Batch API di Resend)
function chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

const resend = new Resend(process.env.RESEND_API_KEY);

interface CreateMagazineInput {
    numero: number;
    titolo: string;
    pdfUrl: string;
    coverUrl?: string;
}

export async function createNewMagazineEmail(data: CreateMagazineInput): Promise<Result<Magazine>> {
    try {
        // 1. Salva il nuovo numero sul Database
        const newMagazine = await prisma.magazine.create({
            data: {
                numero: Number(data.numero),
                titolo: data.titolo,
                pdfUrl: data.pdfUrl,
                coverUrl: data.coverUrl || null,
            },
        });

        // 2. Recupera tutti gli iscritti attivi con la loro lingua preferita
        const subscribers = await prisma.newsletterSubscriber.findMany({
            where: { isSubscribed: true },
            select: { email: true, lang: true },
        });

        if (subscribers.length === 0) {
            return generateResult(
                true,
                "Magazine inserito, nessun iscritto a cui inviare l'email",
                null,
                newMagazine
            );
        }

        const senderEmail = process.env.SENDER_EMAIL || "Binòazine <newsletter@binoastudio.com>";
        const numeroFormatted = Number(data.numero);

        // 3. Prepara il payload con l'HTML personalizzato per CIASCUN utente
        const emailPayloads = await Promise.all(
            subscribers.map(async (sub) => {
                const lang = (sub.lang === "en" ? "en" : "it") as "it" | "en";

                const subject =
                    lang === "en"
                        ? `The new Binòazine issue is out: ${data.titolo}!`
                        : `È uscito il nuovo numero di Binòazine: ${data.titolo}!`;

                // Renderizza il template passando la mail specifica dell'utente
                const emailHtml = await render(
                    createElement(MagazineEmail, {
                        numero: numeroFormatted,
                        titolo: data.titolo,
                        pdfUrl: data.pdfUrl,
                        lang: lang,
                        email: sub.email, // Passa l'email per il link di disiscrizione
                    })
                );

                return {
                    from: senderEmail,
                    to: [sub.email],
                    subject: subject,
                    html: emailHtml,
                };
            })
        );

        // 4. Invia le email usando la Batch API di Resend (divise in blocchi da max 100)
        const batches = chunkArray(emailPayloads, 100);

        for (const batch of batches) {
            await resend.batch.send(batch);
        }

        return generateResult(
            true,
            "Magazine inserito ed Email personalizzate inviate a tutti gli iscritti",
            null,
            newMagazine
        );
    } catch (error) {
        console.error("Errore durante la creazione del magazine:", error);
        return generateResult(false, "Errore dal server", error);
    }
}