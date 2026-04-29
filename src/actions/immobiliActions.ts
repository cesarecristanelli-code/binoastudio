"use server";

import z, { prettifyError } from "zod";
import { requireAuth } from "@/actions/auth";
import prisma from "@/lib/prisma";
import { ClasseEnergetica, Contratto, Prisma, StatoImmobile, TipoImmobile, Immobile, ImmagineImmobile } from "@/generated/prisma/client";
import { Result } from "@/types/actions.types";
import { UTApi } from "uploadthing/server";
import { generateSlug } from "@/lib/utils";

const immobiliSchema = z.object({
  // Info base
  nome: z.string().trim().min(1, "Il nome non può essere vuoto"),
  descrizione: z.string().trim().min(10, "La descrizione è troppo corta"),

  // Localizzazione -- queste servono solo per la logica del Form, ma non finiscono nel model Immobile
  regioneId: z.string().trim().min(1, "Seleziona una regione"),
  provinciaId: z.string().trim().min(1, "Seleziona una provincia"),

  // questi invece finiscono nel model Immobile
  comuneId: z.string().trim().min(1, "Selezione un comune"),
  zonaId: z.string().trim().nullable().optional(),

  indirizzo: z.string().trim().min(3, "Indirizzo obbligatorio"),
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),

  // Caratteristiche Economiche
  prezzo: z.coerce.number().positive("Il prezzo deve essere un numero positivo"),
  speseCondominiali: z.coerce.number().nonnegative("Le spese condominiai devono essere un numero positivo").optional().nullable(),
  contratto: z.enum(Contratto),
  tipo: z.enum(TipoImmobile),

  // Misure e spazi
  metratura: z.coerce.number().int().positive("Inserisci la metratura"),
  numeroLocali: z.coerce.number().int().positive("Inserisci il numero di locali").min(1),
  numeroBagni: z.coerce.number().int().positive("Inserisci il numero di bagni").min(1),
  piano: z.string().trim().optional().nullable(),
  totalePiani: z.coerce.number().int().optional().nullable(),

  // Opzioni e Comfort
  ascensore: z.preprocess((val) => val === "on" || val === true, z.boolean().default(false)),
  giardino: z.preprocess((val) => val === "on" || val === true, z.boolean().default(false)),
  arredo: z.preprocess((val) => val === "on" || val === true, z.boolean().default(false)),

  boxAuto: z.coerce.number().int().default(0),
  numeroTerrazzi: z.coerce.number().int().nonnegative().default(0),
  numeroBalconi: z.coerce.number().int().nonnegative().default(0),


  stato: z.enum(StatoImmobile),
  classeEnergetica: z.enum(ClasseEnergetica),
  immagini: z
    .array(z.url({ protocol: /^https?$/, hostname: z.regexes.domain }))
    .min(1, "Devi inserire almeno una foto"),
});

// === INSERT ===
export async function insertImmobile(formData: FormData): Promise<Result<null>> {
  await requireAuth();

  const rawData = Object.fromEntries(formData.entries());
  const fotoArray = formData.getAll("foto") as string[];

  const dataToValidate = { ...rawData, foto: fotoArray };

  try {
    const validazione = immobiliSchema.safeParse(dataToValidate);

    if (!validazione.success) {
      const errors = prettifyError(validazione.error);
      console.log(
        "Errore validazione dati: ",
        errors
      );
      return { success: false, message: "Errore nell'inserimento dei dati" };
    } else {
      console.log("Validazione dei dati corretta: ", validazione.data);
    }

    const { regioneId, provinciaId, immagini, ...immobileData } = validazione.data;
    const baseSlug = generateSlug(immobileData.nome);

    await prisma.immobile.create({
      data: {
        ...immobileData,
        slug: `${baseSlug}-${Date.now()}`,
        immagini: {
          create: immagini.map((url, index) => ({
            url: url,
            isCover: index === 0,
          })),
        },
      },
    });

    console.log("Inserimento nel DB riuscito!")
    return { success: true, message: "Immobile inserito", data: null };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "Esiste già un immobile con questo nome",
      };
    }
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Errore durante il salvataggio",
    };
  }
}

// === GET ===
export async function getImmobile(
  identifier: string,
  isSlug: boolean = false,
): Promise<(Immobile & { immagini: ImmagineImmobile[] }) | null> {
  try {
    const immobile = await prisma.immobile.findUnique({
      where:
        isSlug ? { slug: identifier } : { id: identifier }
      ,
      include: {
        immagini: true,
      },
    });
    return immobile;
  } catch (error) {
    console.log("Errore nel recupero dati dell'immobile: ", error);
    return null;
  }
}

const utapi = new UTApi();

export async function getAllImmobili(): Promise<Immobile[] | null> {
  try {
    const immobili = await prisma.immobile.findMany({
      include: {
        immagini: true,
      },
    });
    if (!immobili) return null;
    return immobili;
  } catch (error) {
    console.log(
      "Errore nel recupero del catalogo: ",
      error instanceof Error ? error.message : "Errore generico",
    );
    return null;
  }
}

// === UPDATE ===
export async function updateImmobile(
  immobileId: string,
  formData: FormData,
): Promise<Result<null>> {
  await requireAuth();

  const nome = formData.get("nome") as string;
  const prezzo = formData.get("prezzo") as string;
  const indirizzo = formData.get("indirizzo") as string;
  const metratura = formData.get("metratura") as string;
  const numeroBagni = formData.get("numeroBagni") as string;
  const numeroLocali = formData.get("numeroLocali") as string;
  const descrizione = formData.get("descrizione") as string;
  const nuoviUrls = formData.getAll("immagini") as string[];

  try {
    const validazione = immobiliSchema.safeParse({
      nome: nome,
      prezzo: Number(prezzo),
      indirizzo: indirizzo,
      metratura: Number(metratura),
      numeroBagni: Number(numeroBagni),
      numeroLocali: Number(numeroLocali),
      descrizione: descrizione,
      immagini: nuoviUrls,
    });

    if (!validazione.success) {
      console.log(
        "Errore validazione dati: ",
        validazione.error.issues.map((i) => i.message).join(", "),
      );
      return { success: false, message: "Errore nell'inserimento dei dati" };
    }
    const nuovoSlug = validazione.data.nome.toLowerCase().split(" ").join("-");

    const immobilePrecedente = await getImmobile(immobileId);

    if (!immobilePrecedente)
      return { success: false, message: "Immobile non trovato" };

    const immaginiDaEliminare = immobilePrecedente.immagini.filter(
      (imgVecchia: { url: string }) => !validazione.data.immagini.includes(imgVecchia.url),
    );

    if (immaginiDaEliminare.length > 0) {
      const keys = immaginiDaEliminare.map((img: { url: string }) => {
        const parts = img.url.split("/");
        return parts[parts.length - 1];
      });

      await utapi.deleteFiles(keys);
    }

    const response = await prisma.immobile.update({
      where: {
        id: immobileId,
      },
      data: {
        nome: validazione.data.nome,
        prezzo: validazione.data.prezzo,
        indirizzo: validazione.data.indirizzo,
        metratura: validazione.data.metratura,
        numeroBagni: validazione.data.numeroBagni,
        numeroLocali: validazione.data.numeroLocali,
        descrizione: validazione.data.descrizione,
        slug: nuovoSlug,
        immagini: {
          deleteMany: {},
          create: validazione.data.immagini.map((url, index) => ({
            url: url,
            isCover: index === 0,
          })),
        },
      },
    });

    if (!response) {
      return {
        success: false,
        message: "Errore interno al server durante l'aggiornamento",
      };
    }

    return { success: true, message: "Immobile aggiornato", data: null };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "Esiste già un immobile con questo nome",
      };
    }

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Errore durante l'aggiornamento",
    };
  }
}

// === DELETE ===
export async function deleteImmobile(immobileId: string): Promise<Result<null>> {
  await requireAuth();

  try {
    const immobile = await getImmobile(immobileId);

    if (!immobile) return { success: false, message: "Immobile non trovato" };

    const keys = immobile.immagini.map((img) => {
      const parts = img.url.split("/");
      return parts[parts.length - 1];
    });

    await utapi.deleteFiles(keys);

    await prisma.immobile.delete({
      where: {
        id: immobileId,
      },
    });

    return { success: true, message: "Immobile eliminato", data: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Errore sconosciuto";
    console.log("Errore durante l'eliminazione: ", errorMessage);
    return { success: false, message: errorMessage };
  }
}
