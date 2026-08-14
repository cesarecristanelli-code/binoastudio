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

        // 2. Recupera tutti gli iscritti alla newsletter
        const subscribers = await prisma.newsletterSubscriber.findMany({
            select: { email: true },
        });

        const emails = subscribers.map((sub) => sub.email);
        const emailHtml = await render(createElement(MagazineEmail, { numero: Number(data.numero), titolo: data.titolo, pdfUrl: data.pdfUrl }));

        // 3. Invia la mail usando il componente React
        if (emails.length > 0) {
            await resend.emails.send({
                from: process.env.SENDER_EMAIL || "Binòazine <newsletter@binoastudio.com>",
                to: "cesare.cristanelli@gmail.com",
                bcc: emails, // Tutela la privacy degli iscritti
                subject: `È uscito il nuovo numero di Binòazine: ${data.titolo}!`,
                html: emailHtml
            });
        }

        return generateResult(true, "Magazine inserito e Email inviata", null, newMagazine);
    } catch (error) {
        console.error("Errore durante la creazione del magazine:", error);
        return generateResult(false, "Errore dal server", error)
    }
}