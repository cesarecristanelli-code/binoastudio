import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("PrivacyPage");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default function Privacy() {
  const t = useTranslations("PrivacyPage");
  return (
    <div className="container mx-auto p-6">
      <h1 className=" mt-52 text-3xl font-bold w-full text-center uppercase">
        {t("heading")}
      </h1>
      <div className="p-24 w-full flex items-center justify-center text-lg">
        {t("privacyText")}
      </div>
    </div>
  );
}
