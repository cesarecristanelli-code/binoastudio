import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
    throw new Error("Manca la variabile d'ambiente RESEND_API_KEY nel file .env");
}

export const resend = new Resend(process.env.RESEND_API_KEY);