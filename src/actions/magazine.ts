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

        // Separa gli indirizzi email in base alla lingua ("it" ed "en")
        const itEmails = subscribers.filter((sub) => sub.lang === "it").map((sub) => sub.email);
        const enEmails = subscribers.filter((sub) => sub.lang === "en").map((sub) => sub.email);

        const senderEmail = process.env.SENDER_EMAIL || "Binòazine <newsletter@binoastudio.com>";
        const numeroFormatted = Number(data.numero);

        const emailPromises = [];

        // 3. Invio per gli iscritti in ITALIANO
        if (itEmails.length > 0) {
            const emailHtmlIt = await render(
                createElement(MagazineEmail, {
                    numero: numeroFormatted,
                    titolo: data.titolo,
                    pdfUrl: data.pdfUrl,
                    lang: "it",
                })
            );

            emailPromises.push(
                resend.emails.send({
                    from: senderEmail,
                    to: "cesare.cristanelli@gmail.com",
                    bcc: itEmails,
                    subject: `È uscito il nuovo numero di Binòazine: ${data.titolo}!`,
                    html: emailHtmlIt,
                })
            );
        }

        // 4. Invio per gli iscritti in INGLESE
        if (enEmails.length > 0) {
            const emailHtmlEn = await render(
                createElement(MagazineEmail, {
                    numero: numeroFormatted,
                    titolo: data.titolo,
                    pdfUrl: data.pdfUrl,
                    lang: "en",
                })
            );

            emailPromises.push(
                resend.emails.send({
                    from: senderEmail,
                    to: "cesare.cristanelli@gmail.com",
                    bcc: enEmails,
                    subject: `The new Binòazine issue is out: ${data.titolo}!`,
                    html: emailHtmlEn,
                })
            );
        }

        // Esegue i due invii in parallelo
        await Promise.all(emailPromises);

        return generateResult(true, "Magazine inserito ed Email inviate nelle rispettive lingue", null, newMagazine);
    } catch (error) {
        console.error("Errore durante la creazione del magazine:", error);
        return generateResult(false, "Errore dal server", error);
    }
}