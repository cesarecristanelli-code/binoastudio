import { z } from "zod";

export const subscriberSchema = z.object({
    nome: z.string().trim().min(1, "Il nome è obbligatorio"),
    email: z
        .email("Inserisci un indirizzo email valido")
        .trim()
        .toLowerCase(),
    lang: z.enum(["it", "en"], {
        error: "La lingua deve essere 'it' o 'en'",
    }),
});