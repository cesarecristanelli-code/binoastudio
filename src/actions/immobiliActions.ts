"use server";

import z from "zod";
import { requireAuth } from "@/actions/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { Result, Immobile } from "@/types/actions.types";
import { UTApi } from "uploadthing/server";

const immobiliSchema = z.object({
  nome: z.string().trim().min(1, "Il nome non può essere vuoto"),
  indirizzo: z.string().trim().min(5),

  prezzo: z.number().positive(),
  metratura: z.number().int().nonnegative(),
  numeroBagni: z.number().int().nonnegative(),
  numeroLocali: z.number().int().nonnegative(),

  //Campi con default
  numeroBalconi: z.number().int().nonnegative().default(0),
  numeroTerrazzi: z.number().int().nonnegative().default(0),
  ascensore: z.boolean().default(false),
  giardino: z.boolean().default(false),
  boxAuto: z.number().int().default(0),
  arredo: z.boolean().default(false),

  //Campi opzionali
  piano: z.string().trim().optional().or(z.literal("")),
  pianiCondominio: z.number().int().optional().nullable(),
  speseCondominiali: z.number().positive().optional().nullable(),

  stato: z.string().trim().min(5).max(16).toUpperCase(),
  classeEnergetica: z.string().trim().min(1).max(2).toUpperCase(),
  descrizione: z.string().trim().min(10, "La descrizione è troppo corta"),
  foto: z
    .array(z.url({ protocol: /^https?$/, hostname: z.regexes.domain }))
    .min(1, "Devi inserire almeno una foto"),
});

// === INSERT ===
export async function insertImmobile(formData: FormData): Promise<Result> {
  await requireAuth();

  const datiImmobile = {
    nome: formData.get("nome") as string,
    indirizzo: formData.get("indirizzo") as string,
    descrizione: formData.get("descrizione") as string,

    prezzo: Number(formData.get("prezzo") as string),
    metratura: Number(formData.get("metratura") as string),
    numeroBagni: Number(formData.get("numeroBagni") as string),
    numeroLocali: Number(formData.get("numeroLocali") as string),
    numeroBalconi: Number(formData.get("numeroBalconi") as string),
    numeroTerrazzi: Number(formData.get("numeroTerrazzi") as string),
    ascensore: formData.get("ascensore") === "on",
    giardino: formData.get("giardino") === "on",
    boxAuto: Number(formData.get("boxAuto") as string),
    arredo: formData.get("arredo") === "on",
    piano: Number(formData.get("piano") as string),
    pianiCondominio: Number(formData.get("pianiCondominio") as string),
    stato: formData.get("stato") as string,
    classeEnergetica: formData.get("classeEnergetica") as string,

    foto: formData.getAll("foto") as string[],
  }

  // const nome = formData.get("nome") as string;
  // const indirizzo = formData.get("indirizzo") as string;

  // const prezzo = formData.get("prezzo") as string;
  // const metratura = formData.get("metratura") as string;
  // const numeroBagni = formData.get("numeroBagni") as string;
  // const numeroLocali = formData.get("numeroLocali") as string;



  // const descrizione = formData.get("descrizione") as string;
  // const fotoUrl = formData.getAll("foto") as string[];

  try {
    const validazione = immobiliSchema.safeParse(datiImmobile);

    if (!validazione.success) {
      console.log(
        "Errore validazione dati: ",
        validazione.error.issues.map((i) => i.message).join(", "),
      );
      return { success: false, message: "Errore nell'inserimento dei dati" };
    } else {
      console.log("Validazione dei dati corretta: ", validazione.data);
    }

    await prisma.immobile.create({
      data: {
        nome: validazione.data.nome,
        prezzo: validazione.data.prezzo,
        indirizzo: validazione.data.indirizzo,
        metratura: validazione.data.metratura,
        numeroBagni: validazione.data.numeroBagni,
        numeroLocali: validazione.data.numeroLocali,
        descrizione: validazione.data.descrizione,
        slug: validazione.data.nome.toLowerCase().split(" ").join("-"),
        immagini: {
          create: validazione.data.foto.map((url, index) => ({
            url: url,
            isCover: index === 0,
          })),
        },
      },
    });

    console.log("Inserimento nel DB riuscito!")
    return { success: true, message: "Immobile inserito" };
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
): Promise<Immobile | null> {
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
): Promise<Result> {
  await requireAuth();

  const nome = formData.get("nome") as string;
  const prezzo = formData.get("prezzo") as string;
  const indirizzo = formData.get("indirizzo") as string;
  const metratura = formData.get("metratura") as string;
  const numeroBagni = formData.get("numeroBagni") as string;
  const numeroLocali = formData.get("numeroLocali") as string;
  const descrizione = formData.get("descrizione") as string;
  const nuoviUrls = formData.getAll("foto") as string[];

  try {
    const validazione = immobiliSchema.safeParse({
      nome: nome,
      prezzo: Number(prezzo),
      indirizzo: indirizzo,
      metratura: Number(metratura),
      numeroBagni: Number(numeroBagni),
      numeroLocali: Number(numeroLocali),
      descrizione: descrizione,
      foto: nuoviUrls,
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
      (imgVecchia) => !validazione.data.foto.includes(imgVecchia.url),
    );

    if (immaginiDaEliminare.length > 0) {
      const keys = immaginiDaEliminare.map((img) => {
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
          create: validazione.data.foto.map((url, index) => ({
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

    return { success: true, message: "Immobile aggiornato" };
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
export async function deleteImmobile(immobileId: string): Promise<Result> {
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

    return { success: true, message: "Immobile eliminato" };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Errore sconosciuto";
    console.log("Errore durante l'eliminazione: ", errorMessage);
    return { success: false, message: errorMessage };
  }
}
