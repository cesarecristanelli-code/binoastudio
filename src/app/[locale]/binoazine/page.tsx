import { getMagazines } from "@/actions/magazine";
import BinoazineHeader from "@/components/binoazione-section/BinoazineHeader";
import BinoazinePreviews from "@/components/binoazione-section/BinoazinePreviews";
import BinoazineForm from "@/components/binoazione-section/newsletter/BinoazineForm";
import { getTranslations } from "next-intl/server";

export default async function BinoazinePage() {
  const response = await getMagazines();
  const magazines = response.success && response.data ? response.data : [];
  const t = await getTranslations("Binoazine");
  return (
    <main className="min-h-screen bg-[#F5F4F0] text-[#3C3833] pt-32 pb-20">
      {/* 1. SEZIONE TITOLO CENTRATO CON EFFETTO PROFONDITÀ */}
      <BinoazineHeader mainContent={t("mainContent")} />
      {/* 3. SEZIONE ANTEPRIMA RIVISTE (TITOLO CENTRATO H2) */}
      <BinoazinePreviews magazines={magazines} />
      {/* 4. SEZIONE NEWSLETTER ALLARGATA (SEMPRE IN COLONNA) */}
      <BinoazineForm />
    </main>
  );
}
