"use server";

import { prettifyError } from "zod";
import { requireAuth } from "@/actions/auth";
import prisma from "@/lib/prisma";
import { Prisma, Immobile, ImmagineImmobile } from "@/generated/prisma/client";
import { Result, ImmobileExtended } from "@/types/actions.types";
import { UTApi } from "uploadthing/server";
import { generateResult, generateSlug } from "@/lib/utils";
import { immobiliSchema } from "@/lib/schemas/immobili";
import { revalidatePath } from "next/cache";

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
            key: fileKeys[index],
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

  const rawData = Object.fromEntries(formData.entries());
  const oldImmagini = formData.getAll("oldImmagini") as string[];
  const newImmagini = formData.getAll("immagini") as string[];
  const newKeys = formData.getAll("fileKeys") as string[];

  const allImmagini = [...oldImmagini, ...newImmagini]

  const dataToValidate = { ...rawData, immagini: allImmagini };

  try {
    const currentImmobile = await getImmobile(immobileId);

    if (!currentImmobile) return generateResult(false, "Immobile non trovato");

    console.log(dataToValidate)
    const validazione = immobiliSchema.safeParse(dataToValidate);

    if (!validazione.success) {
      console.log("Errore durane la validazione dei dati: ", prettifyError(validazione.error))
      throw new Error("Dati non validi")
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { regioneId, provinciaId, immagini, ...immobileData } = validazione.data;
    console.log("Dati per prisma: ", immobileData);

    const immaginiDaEliminare = currentImmobile.immagini.filter((dbImg) => {
      return !oldImmagini.includes(dbImg.url)
    })

    await prisma.immobile.update({
      where: {
        id: immobileId,
      },
      data: {
        ...immobileData,
        immagini: {
          deleteMany: {},
          create: [
            ...currentImmobile.immagini
              .filter((img) => !immaginiDaEliminare.some(d => d.id === img.id))
              .map((img) => ({ url: img.url, key: img.key, isCover: img.isCover })),
            ...newImmagini.map((url, index) => ({
              url: url,
              key: newKeys[index],
            }))
          ]
        }
      }
    })

    if (immaginiDaEliminare.length > 0) {
      const keysToDelete = immaginiDaEliminare.map((img) => img.key);
      await utapi.deleteFiles(keysToDelete);
    }

    revalidatePath("/vendita");

    return generateResult(true, "Immobile aggiornato", null, null);

  } catch (error) {
    if (newKeys.length > 0) await utapi.deleteFiles(newKeys);

    console.error("Errore nell'update: ", error);
    return generateResult(false, "Errore durante l'aggiornamento", error);
  }
}

// ==== DELETE ====
export async function deleteImmobile(immobileId: string): Promise<Result<null>> {
  await requireAuth();

  try {
    const immobile = await getImmobile(immobileId);

    if (!immobile) return generateResult(false, "Immobile non trovato");

    const fileKeys = immobile.immagini.map((img) => img.key);

    if (fileKeys.length > 0) {
      await utapi.deleteFiles(fileKeys);
    }

    await prisma.immobile.delete({
      where: { id: immobileId }
    })

    revalidatePath("/vendita");

    return generateResult(true, "Immobile eliminato", null, null)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : error;
    console.error("Errore durante la cancellazione: ", errorMessage);
    return generateResult(false, "Errore durante la cancellazione: ", errorMessage)
  }
}
