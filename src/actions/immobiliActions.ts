"use server";

import z from "zod";
import { requireAuth } from "@/actions/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

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

export async function insertImmobile(formData: FormData) {
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
