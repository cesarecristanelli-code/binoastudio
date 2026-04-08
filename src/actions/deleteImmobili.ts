"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export default async function deleteImmobile(id: string) {
    try {
        await prisma.immobile.delete({
            where: { id: id }
        })

        revalidatePath("/vendita")
        return { success: true, message: "Immobile eliminato con successo" }
    } catch (error) {
        console.log("Delete error: ", error)
        return { success: false, message: error instanceof Error ? error.message : "Errore durante la cancellazione" }
    }
}