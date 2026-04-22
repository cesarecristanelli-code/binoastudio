import z from "zod";
import { requireAuth } from "@/actions/auth";

const immobiliSchema = z.object({
  nome: z.string(),
  prezzo: z.number(),
  indirizzo: z.string(),
  metratura: z.number(),
  numeroBagni: z.number(),
  numeroLocali: z.number(),
  descrizione: z.string(),
  foto: z.string(),
});

export async function insertImmobile(formData: FormData) {
  const session = await requireAuth();

  const files = formData.getAll("foto") as File[];
}
