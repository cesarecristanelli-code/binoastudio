import { getImmobile } from "@/actions/immobiliActions";
import { notFound } from "next/navigation";

export default async function UpdateForm({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const immobile = await getImmobile(id);

  if (!immobile) return notFound();

  return (
    <section className="flex w-full h-[300px] items-center justify-center">
      <form className="flex size-[100px] border-2 border-black">
        <p>Form di Aggiornamento in arrivo!</p>
      </form>
    </section>
  );
}
