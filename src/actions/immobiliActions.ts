"use server";

import { prettifyError } from "zod";
import { requireAuth } from "@/actions/auth";
import prisma from "@/lib/prisma";
import { Prisma, Immobile, ImmagineImmobile } from "@/generated/prisma/client";
import { Result, ImmobileExtended } from "@/types/actions.types";
import { UTApi } from "uploadthing/server";
import { generateSlug } from "@/lib/utils";
import { immobiliSchema } from "@/lib/schemas/immobili";

const utapi = new UTApi();



// === INSERT ===
export async function insertImmobile(formData: FormData): Promise<Result<null>> {
  await requireAuth();

  const rawData = Object.fromEntries(formData.entries());
  const immaginiArray = formData.getAll("immagini") as string[];
  const fileKeys = formData.getAll("fileKeys") as string[];

  const dataToValidate = { ...rawData, immagini: immaginiArray };

  try {
    console.log("Dati arrivati allo schema: ", dataToValidate)
    const validazione = immobiliSchema.safeParse(dataToValidate);

    if (!validazione.success) {
      const errors = prettifyError(validazione.error);
      console.log(
        "Errore validazione dati: ",
        errors
      );
      throw new Error((Object.values(errors).join(". ")))
    } else {
      console.log("Validazione dei dati corretta: ", validazione.data);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { regioneId, provinciaId, immagini, ...immobileData } = validazione.data;

    //gestione dello slug
    const subSlug = await prisma.comune.findUnique({
      where: { id: immobileData.comuneId },
      include: {
        zone: immobileData.zonaId ? { where: { id: immobileData.zonaId } } : false,
      }
    });

    if (!subSlug) throw new Error("Località non trovata durante la gestione dello slug")

    const slugZona = subSlug.zone?.[0]?.slug || null;
    const slugComune = subSlug.slug;

    const baseSlug = generateSlug(`${immobileData.nome} ${slugZona ? slugZona : slugComune}`);

    const shortId = Math.random().toString(36).substring(2, 6);
    const uniqueSlug = `${baseSlug}-${shortId}`;

    await prisma.immobile.create({
      data: {
        ...immobileData,
        slug: uniqueSlug,
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
    if (fileKeys.length > 0) await utapi.deleteFiles(fileKeys);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "Esiste già un immobile con questo nome",
      };
    }
    const errorMessage = error instanceof Error ? error.message : "Errore sconosciuto";
    return {
      success: false,
      message: `Errore durante l'inserimento dell'immobile: ${errorMessage}`
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



export async function getAllImmobili(): Promise<ImmobileExtended[] | null> {
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
