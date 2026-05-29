import FormImmobile from "@/components/admin-section/inserimento/FormImmobile";
import { requireAuth } from "@/actions/auth";

export default async function InsertPropertyPage() {
  await requireAuth();

  return (
    <section className="flex items-center justify-center py-80">
      <FormImmobile />
    </section>
  );
}
