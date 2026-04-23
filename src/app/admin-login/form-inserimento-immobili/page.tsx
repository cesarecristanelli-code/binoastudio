import FormInserimento from "@/components/admin-section/FormInserimento";
import { requireAuth } from "@/actions/auth";

export default async function InsertPropertyPage() {
  await requireAuth();

  return (
    <section className="flex items-center justify-center py-80">
      <FormInserimento />
    </section>
  );
}
