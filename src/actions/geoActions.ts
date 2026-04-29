"use server";

import { Regione, Provincia, Comune, Zona } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { Result } from "@/types/actions.types";
import { generateResult, generateSlug } from "@/lib/utils";

export type ProvinciaSubset = Pick<Provincia, "id" | "nome">;
export type ComuneSubset = Pick<Comune, "id" | "nome">;
export type ZonaSubset = Pick<Zona, "id" | "nome">;





// ==== GET ====
export async function getRegioni(): Promise<Result<Regione[]>> {
    try {
        const response = await prisma.regione.findMany({
            select: {
                id: true,
                nome: true,
            },
            orderBy: {
                nome: "asc",
            }
        });

        return generateResult(true, "Regioni recuperate con successo", null, response);

    } catch (error) {
        return generateResult(false, "Errore durante il recupero delle regioni", error);
    }
}

export async function getProvinceByRegione(regioneId: string): Promise<Result<ProvinciaSubset[]>> {
    try {
        const response = await prisma.provincia.findMany({
            where: {
                regioneId: regioneId
            },
            select: {
                id: true,
                nome: true,
            },
            orderBy: {
                nome: "asc",
            }
        });

        return generateResult(true, "Provincie recuperate con successo", null, response);
    } catch (error) {
        return generateResult(false, "Errore durante il recupero delle provincie", error);
    }
}

export async function getComuneByProvincia(provinciaId: string): Promise<Result<ComuneSubset[]>> {
    try {
        const response = await prisma.comune.findMany({
            where: {
                provinciaId: provinciaId,
            },
            select: {
                id: true,
                nome: true,
            },
            orderBy: {
                nome: "asc",
            }
        });

        return generateResult(true, "Comuni recuperati con successo", null, response);
    } catch (error) {
        return generateResult(false, "Errore durante il recupero dei comuni", error);
    }
}

export async function getZonaByComune(comuneId: string): Promise<Result<ZonaSubset[]>> {
    try {
        const response = await prisma.zona.findMany({
            where: {
                comuneId: comuneId,
            },
            select: {
                id: true,
                nome: true,
            },
            orderBy: {
                nome: "asc",
            }
        });

        if (response.length === 0) {
            return generateResult(true, "Nessuna zona disponibile per questo comune", null, []);
        }

        return generateResult(true, "Zone recuperate con successo", null, response);
    } catch (error) {
        return generateResult(false, "Errore durante il recupero delle zone", error);
    }
}

// ==== INSERT ====
export async function insertRegione(nome: string): Promise<Result<Regione>> {
    const nomePulito = nome.trim();

    if (!nomePulito) {
        return generateResult(false, "Il nome della regione non può essere vuoto", null);
    }
    try {
        const response = await prisma.regione.upsert({
            where: { nome: nomePulito },
            update: {},
            create: { nome: nomePulito },
        });

        return generateResult(true, "Regione inserita correttamente", null, response);
    } catch (error) {
        return generateResult(false, "Errore durante l'inserimento della regione", error);
    }
}

export async function insertProvincia(nome: string, sigla: string, regioneId: string): Promise<Result<Provincia>> {
    const nomePulito = nome.trim();
    const siglaPulita = sigla.trim().toUpperCase();

    if (!nomePulito || !siglaPulita) {
        return generateResult(false, "Tutti i campi sono obbligatori", null);
    }

    try {
        const response = await prisma.provincia.upsert({
            where: {
                sigla: siglaPulita,
            },
            update: { nome: nomePulito },
            create: {
                nome: nomePulito,
                sigla: siglaPulita,
                regioneId: regioneId,
            }
        });

        return generateResult(true, "Provincia inserita correttamente", null, response);
    } catch (error) {
        return generateResult(false, "Errore durante l'inserimento della provincia", error);
    }
}

export async function insertComune(nome: string, provinciaId: string, cap?: string): Promise<Result<Comune>> {
    const nomePulito = nome.trim();
    const capPulito = cap ? cap.trim() : null;

    if (!nomePulito) {
        return generateResult(false, "Il nome del comune non può essere vuoto", null);
    }

    try {
        const siglaProvincia = await prisma.provincia.findUnique({
            where: {
                id: provinciaId,
            },
            select: {
                sigla: true,
            }
        })

        if (!siglaProvincia) return generateResult(false, "Provincia non trovata", null);

        const baseSlug = generateSlug(nomePulito);

        const response = await prisma.comune.create({
            data: {
                nome: nomePulito,
                provinciaId: provinciaId,
                cap: capPulito,
                slug: `${baseSlug}-${siglaProvincia.sigla.toLocaleLowerCase()}`,
            }
        });

        return generateResult(true, "Comune inserito correttamente", null, response);

    } catch (error) {
        return generateResult(false, "Errore durante l'inserimento del comune", error);
    }
}

export async function insertZona(nome: string, comuneId: string, cap?: string): Promise<Result<Zona>> {
    const nomePulito = nome.trim();
    const capPulito = cap ? cap.trim() : null;

    if (!nomePulito) {
        return generateResult(false, "Il nome della zona non può essere vuoto", null);
    }


    try {
        const slugComune = await prisma.comune.findUnique({
            where: {
                id: comuneId,
            },
            select: {
                slug: true,
            }
        });

        if (!slugComune) return generateResult(false, "Comune non trovato", null);

        const baseSlug = generateSlug(nomePulito);

        const response = await prisma.zona.create({
            data: {
                nome: nomePulito,
                comuneId: comuneId,
                cap: capPulito,
                slug: `${baseSlug}-in-${slugComune.slug}`
            }
        });

        return generateResult(true, "Zona inserita correttamente", null, response);

    } catch (error) {
        return generateResult(false, "Errore durante l'inserimento della zona", error);
    }
}