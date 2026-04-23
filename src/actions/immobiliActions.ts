"use server";

import z from "zod";
import { requireAuth } from "@/actions/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { Result, Immobile } from "@/types/actions.types";
import { UTApi } from "uploadthing/server";

const immobiliSchema = z.object({
  nome: z.string().min(1, "Il nome non può essere vuoto"),
  prezzo: z.number().positive(),
  indirizzo: z.string().min(5),
  metratura: z.number().int(),
  numeroBagni: z.number().int(),
  numeroLocali: z.number().int(),
  descrizione: z.string(),
  foto: z
    .array(z.url({ protocol: /^https?$/, hostname: z.regexes.domain }))
    .min(1, "Devi inserire almeno una foto"),
});

export async function insertImmobile(formData: FormData): Promise<Result> {
  const session = await requireAuth();

  const nome = formData.get("nome") as string;
  const prezzo = formData.get("prezzo") as string;
  const indirizzo = formData.get("indirizzo") as string;
  const metratura = formData.get("metratura") as string;
  const numeroBagni = formData.get("numeroBagni") as string;
  const numeroLocali = formData.get("numeroLocali") as string;
  const descrizione = formData.get("descrizione") as string;
  const fotoUrl = formData.getAll("foto") as string[];

  try {
    const validazione = immobiliSchema.safeParse({
      nome: nome,
      prezzo: Number(prezzo),
      indirizzo: indirizzo,
      metratura: Number(metratura),
      numeroBagni: Number(numeroBagni),
      numeroLocali: Number(numeroLocali),
      descrizione: descrizione,
      foto: fotoUrl,
    });

    if (!validazione.success) {
      console.log(
        "Errore validazione dati: ",
        validazione.error.issues.map((i) => i.message).join(", "),
      );
      return { success: false, message: "Errore nell'inserimento dei dati" };
    }

    const immobile = await prisma.immobile.create({
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

export async function getImmobile(
  immobileId: string,
): Promise<Immobile | null> {
  try {
    const immobile = await prisma.immobile.findUnique({
      where: {
        id: immobileId,
      },
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
