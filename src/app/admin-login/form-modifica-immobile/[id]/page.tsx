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
  const { id } = params;

  const immobile = await getImmobile(id);

  if (!immobile) return notFound();

  return (
    <section className="flex w-full h-[300px] items-center justify-center">
      <FormAggiornamento immobile={immobile} />
    </section>
  );
}
