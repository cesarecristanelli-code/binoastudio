import z from "zod";
import { ClasseEnergetica, Contratto, StatoImmobile, TipoImmobile, StatoOccupazione, Riscaldamento, Raffrescamento, ClasseCatastale } from "@/generated/prisma/client";


export const immobiliSchema = z.object({
    // Info base
    nome: z.string().trim().min(1, "Il nome non può essere vuoto"),
    descrizione: z.string().trim().min(10, "La descrizione è troppo corta"),

    // Localizzazione -- queste servono solo per la logica del Form, ma non finiscono nel model Immobile
    regioneId: z.string().trim().min(1, "Seleziona una regione"),
    provinciaId: z.string().trim().min(1, "Seleziona una provincia"),

    // questi invece finiscono nel model Immobile
    comuneId: z.string().trim().min(1, "Selezione un comune"),
    zonaId: z.preprocess(
        (val) => (val === "" ? null : val), // Se è una stringa vuota divente null
        z.string().trim().nullable().optional()
    ),

    indirizzo: z.string().trim().min(3, "Indirizzo obbligatorio"),
    lat: z.coerce.number().min(-90).max(90),
    lng: z.coerce.number().min(-180).max(180),

    // Caratteristiche Economiche
    prezzo: z.coerce.number().positive("Il prezzo deve essere un numero positivo"),
    speseCondominiali: z.preprocess(
        (val) => (val === "" ? null : val),
        z.coerce.number()
            .nonnegative("Le spese devono essere positive")
            .nullable()
            .optional()
    ),
    contratto: z.enum(Contratto),
    tipo: z.enum(TipoImmobile),

    // Misure e spazi
    metratura: z.coerce.number().int().positive("Inserisci la metratura"),
    numeroLocali: z.coerce.number().int().positive("Inserisci il numero di locali"),
    numeroBagni: z.coerce.number().int().positive("Inserisci il numero di bagni"),
    piano: z.preprocess(
        (val) => (val === "" ? null : val),
        z.string().trim().nullable().optional()
    ),
    totalePiani: z.preprocess(
        (val) => (val === "" ? null : val),
        z.coerce.number().int().nullable().optional()
    ),
    annoCostruzione: z.coerce.number().int().min(1000).max(new Date().getFullYear() + 5),

    // Opzioni e Comfort
    ascensore: z.preprocess((val) => val === "on" || val === true, z.boolean().default(false)),
    giardino: z.preprocess((val) => val === "on" || val === true, z.boolean().default(false)),
    arredo: z.preprocess((val) => val === "on" || val === true, z.boolean().default(false)),
    accessoDisabili: z.preprocess((val) => val === "on" || val === true, z.boolean().default(false)),

    boxAuto: z.coerce.number().int().default(0),
    postiAuto: z.coerce.number().int().default(0),
    numeroTerrazzi: z.coerce.number().int().nonnegative().default(0),
    numeroBalconi: z.coerce.number().int().nonnegative().default(0),

    riscaldamento: z.enum(Riscaldamento),
    raffrescamento: z.enum(Raffrescamento),


    stato: z.enum(StatoImmobile),
    statoOccupazione: z.enum(StatoOccupazione),
    classeEnergetica: z.enum(ClasseEnergetica),
    classeCatastale: z.preprocess(
        (val) => (val === "" ? null : val),
        z.enum(ClasseCatastale).nullable().optional()
    ),
    immagini: z
        .array(z.url({ protocol: /^https?$/, hostname: z.regexes.domain }))
        .min(1, "Devi inserire almeno una foto"),
});

export type ImmobiliSchemaType = z.infer<typeof immobiliSchema>;