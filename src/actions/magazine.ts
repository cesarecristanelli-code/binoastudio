"use server";

import prisma from "@/lib/prisma";
import { Result } from "@/types/actions.types";
import { Magazine } from "@/generated/prisma/client";
import { generateResult } from "@/lib/utils";

/**
 * Recupera tutti i magazine salvati nel DB ordinati per numero.
 */
export async function getMagazines(): Promise<Result<Magazine[]>> {
    try {
        const magazines = await prisma.magazine.findMany({
            orderBy: {
                numero: "asc", // o "desc" se vuoi prima i più recenti
            },
        });

        return generateResult(true, "Magazines recuperati", null, magazines);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("Errore nel recupero dei magazine:", errorMessage);

        return generateResult(false, "Errore dal server", errorMessage);
    }
}