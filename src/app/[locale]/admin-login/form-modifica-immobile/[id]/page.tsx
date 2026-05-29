import { notFound } from "next/navigation";
import { requireAuth } from "@/actions/auth";
import FormImmobile from "@/components/admin-section/inserimento/FormImmobile";
import prisma from "@/lib/prisma";

export default async function UpdateForm({
  params,
}: {
  params: { id: string };
}) {
  await requireAuth();
  const { id } = await params;

  if (!id) {
    return (
      <section className="flex w-full items-center justify-center my-32">
        <p className="text-lg font-medium opacity-80 italic text-center">
          ID dell&apos;immobile non trovato
        </p>
      </section>
    );
  }

  const immobile = await prisma.immobile.findUnique({
    where: {
      id: id,
    },
    include: {
      comune: true,
      zona: true,
      immagini: true,
    },
  });

  if (!immobile) return notFound();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, prezzo, ...sinthImmobile } = immobile;

  const initialData = { ...sinthImmobile, prezzo: Number(prezzo) };

  return (
    <section className="flex w-full items-center justify-center my-32">
      <FormImmobile initialData={initialData} />
    </section>
  );
}
