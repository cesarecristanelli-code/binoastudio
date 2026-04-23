"use server";

import z from "zod";
import { requireAuth } from "@/actions/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { Result, Immobile } from "@/types/actions.types";

const immobiliSchema = z.object({
  nome: z.string(),
  prezzo: z.number(),
  indirizzo: z.string(),
  metratura: z.number(),
  numeroBagni: z.number(),
  numeroLocali: z.number(),
  descrizione: z.string(),
  foto: z.array(z.string()),
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

export async function updateImmobile(immobile: Immobile): Promise<Result> {
  await requireAuth();

  try {
    const validazione = immobiliSchema.safeParse({
      nome: immobile.nome,
      prezzo: Number(immobile.prezzo),
      indirizzo: immobile.indirizzo,
      metratura: Number(immobile.metratura),
      numeroBagni: Number(immobile.numeroBagni),
      numeroLocali: Number(immobile.numeroLocali),
      descrizione: immobile.descrizione,
      foto: immobile.immagini.map((i) => i.url),
    });

    if (!validazione.success) {
      console.log(
        "Errore validazione dati: ",
        validazione.error.issues.map((i) => i.message).join(", "),
      );
      return { success: false, message: "Errore nell'inserimento dei dati" };
    }

    const nuovoSlug = immobile.nome.toLowerCase().split(" ").join("-");

    const response = await prisma.immobile.update({
      where: {
        id: immobile.id,
      },
      data: {
        nome: immobile.nome,
        prezzo: immobile.prezzo,
        indirizzo: immobile.indirizzo,
        metratura: immobile.metratura,
        numeroBagni: immobile.numeroBagni,
        numeroLocali: immobile.numeroLocali,
        descrizione: immobile.descrizione,
        slug: nuovoSlug,
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
