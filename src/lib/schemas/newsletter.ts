import { z } from "zod";

export const subscriberSchema = z.object({
    nome: z.string().trim().min(1, "Il nome è obbligatorio"),
    email: z
        .string()
        .trim()
        .email("Inserisci un indirizzo email valido")
        .toLowerCase(),
});