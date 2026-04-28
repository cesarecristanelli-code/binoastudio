"use server";

import { Regione, Provincia, Comune, Zona } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { Result } from "@/types/actions.types";

export type ProvinciaSubset = Pick<Provincia, "id" | "nome">;
export type ComuneSubset = Pick<Comune, "id" | "nome">;
export type ZonaSubset = Pick<Zona, "id" | "nome">;


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

        return { success: true, message: "Regioni recuperate con successo", data: response };

    } catch (error) {
        return { success: false, message: "Errore durante il recupero delle regioni: " + (error instanceof Error ? error.message : "Errore sconosciuto") };
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

        return { success: true, message: "Provincie recuperate con successo", data: response };
    } catch (error) {
        return { success: false, message: "Errore durante il recuper delle provincie: " + (error instanceof Error ? error.message : "Errore sconosciuto") };
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

        return { success: true, message: "Comuni recuperati con successo", data: response };
    } catch (error) {
        return { success: false, message: "Errore durante il recupero dei comuni: " + (error instanceof Error ? error.message : "Errore sconosciuto") };
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
            return { success: true, message: "Nessuna zona disponibile per questo comune", data: [] };
        }

        return { success: true, message: "Zone recuperate con successo", data: response };
    } catch (error) {
        return { success: false, message: "Errore durante il recupero delle zone: " + (error instanceof Error ? error.message : "Errore sconosciuto") };
    }
}