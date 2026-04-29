import { Result } from "@/types/actions.types";

export function generateResult<T>(success: true, message: string, error: null | undefined, data: T): Result<T>;
export function generateResult<T>(success: false, message: string, error?: unknown): Result<T>;

export function generateResult<T>(success: boolean, message: string, error?: unknown, data?: T): Result<T> {
    if (success) {
        return { success: true, message, data: data as T };
    }

    const errorMessage = error instanceof Error ? error.message : "Errore sconosciuto";
    return { success: false, message: `${message}: ${errorMessage}` };
}


export function generateSlug(nome: string): string {
    return nome.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Rimuove caratteri speciali
        .replace(/[\s_-]+/g, '-')  // Sostituisce spazi e underscore con un singolo -
        .replace(/^-+|-+$/g, '');  // Rimuove trattini all'inizio/fine
}