"use server";

import { resend } from "@/lib/resend";
import { WelcomeEmail } from "@/components/binoazione-section/newsletter/emails/WelcomeEmail";
import { Result } from "@/types/actions.types";
import { subscriberSchema } from "@/lib/schemas/newsletter";
import { generateResult } from "@/lib/utils";
import prisma from "@/lib/prisma";
import { CreateEmailResponseSuccess } from "resend";
import { render } from "@react-email/render";
import { createElement } from "react";

// Fallback URL nel caso in cui non sia presente alcun magazine nel database
const DEFAULT_PDF_URL = "https://hjn88qj8d6.ufs.sh/f/03v8dNmaKnZ62dtOg47Sqv4Cpk5YwjXyHsZKUQ3NWgL9mteI";

export async function sendWelcomeEmail(
    email: string,
    nome: string,
    pdfUrl: string,
    lang: "it" | "en" = "it"
): Promise<Result<CreateEmailResponseSuccess>> {

    // Cambia "subject" a sconda della lingua
    const subject = lang === "it" ? "Benvenuto su Binòazine!" : "Welcome to Binòazine!";

    // 1. Renderizziamo il componente React in stringa HTML ()
    const emailHtml = await render(
        createElement(WelcomeEmail, {
            nome: nome,
            pdfUrl: pdfUrl,
            lang: lang
        })
    );
    const { data, error } = await resend.emails.send({
        from: process.env.SENDER_EMAIL || "Binòazine <newsletter@binoastudio.com>",
        to: [email],
        subject: subject,
        html: emailHtml,
    });

    if (error) {
        console.error("Errore nell'invio email con Resend:", error);
        return generateResult(false, "Errore nell'invio della WelcomeEail", error);
    }

    return generateResult(true, "WelcomeEmail inviata", null, data);
}

export async function subscribeNewsletter(formData: FormData): Promise<Result<null>> {
    const rawData = {
        nome: formData.get("nome"),
        email: formData.get("email"),
        lang: formData.get("lang") || "it",
    };


    const validated = subscriberSchema.safeParse(rawData);

    if (!validated.success) {
        console.error("Dati form newsletter non validi: ", validated.error);
        return generateResult(false, "Dati form non validi");
    }

    const { nome, email, lang } = validated.data;

    try {
        // 1. Salva o aggiorna l'iscritto nel DB
        await prisma.newsletterSubscriber.upsert({
            where: { email },
            update: {
                nome,
                lang,
                isSubscribed: true,
            },
            create: {
                nome,
                email,
                lang,
                isSubscribed: true,
            },
        });

        // 2. Recupera l'ultimo numero del magazine pubblicato
        const latestMagazine = await prisma.magazine.findFirst({
            orderBy: {
                numero: "desc",
            },
        });

        // Usa il pdfUrl dell'ultimo magazine se esiste, altrimenti usa il fallback
        const pdfUrl = latestMagazine?.pdfUrl || DEFAULT_PDF_URL;

        // 3. Invia la mail di benvenuto passando il link al PDF
        const sendWelcomeRes = await sendWelcomeEmail(email, nome, pdfUrl, lang as "it" | "en");

        if (!sendWelcomeRes.success) {
            console.error("Iscrizione completata, ma non è stato possibile inviare la mail di benvenuto")
            return generateResult(true, "Iscrizione completata, ma non è stato possibile inviare la mail di benvenuto", null, null);
        }

        return generateResult(true, "Iscrizone alla newsletter completata", null, null);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : error;
        console.error("Errore server action della newsletter: ", errorMessage);
        return generateResult(false, "Errore durante l'iscrione alla newsletter", errorMessage);
    }

}