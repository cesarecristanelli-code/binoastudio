import { getImmobile } from "@/actions/immobiliActions";
import { notFound } from "next/navigation";
import { requireAuth } from "@/actions/auth";
import FormAggiornamento from "@/components/admin-section/FormAggiornamento";

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

  const immobile = await getImmobile(id);

  if (!immobile) return notFound();

  return (
    <section className="flex w-full items-center justify-center my-32">
      <FormAggiornamento immobile={immobile} />
    </section>
  );
}
