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

export async function sendWelcomeEmail(email: string, nome: string): Promise<Result<CreateEmailResponseSuccess>> {

    // 1. Renderizziamo il componente React in stringa HTML
    const emailHtml = await render(createElement(WelcomeEmail, { nome }));
    const { data, error } = await resend.emails.send({
        from: process.env.SENDER_EMAIL || "Binoazine <onboarding@resend.dev>",
        to: [email],
        subject: "Benvenuto su Binoazine!",
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
        email: formData.get("email")
    };


    const validated = subscriberSchema.safeParse(rawData);

    if (!validated.success) {
        console.error("Dati form newsletter non validi: ", validated.error);
        return generateResult(false, "Dati form non validi");
    }

    const { nome, email } = validated.data;

    try {
        await prisma.newsletterSubscriber.upsert({
            where: { email },
            update: {
                nome,
                isSubscribed: true,
            },
            create: {
                nome,
                email,
                isSubscribed: true,
            },
        });

        const sendWelcomeRes = await sendWelcomeEmail(email, nome);

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