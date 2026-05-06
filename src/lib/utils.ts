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

/**
 * Trasforma stringhe tipo "NUOVA_COSTRUZIONE" in "Nuova costruzione"
 */
export function formatEnum(value: string | null | undefined): string {
    if (!value) return "N/D";

    // 1. Sostituisce i trattini bassi con spazi
    // 2. Trasforma tutto in minuscolo
    const lower = value.replace(/_/g, " ").toLowerCase();

    // 3. Rende maiuscola solo la prima lettera della stringa
    return lower.charAt(0).toUpperCase() + lower.slice(1);
}