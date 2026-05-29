import CardImmobile from "@/components/vendita-section/CardImmbolie";
import CardFooter from "@/components/vendita-section/CradImmobileFooter";
import { getAllImmobili } from "@/actions/immobiliActions";
import React from "react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("VenditaPage");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function CatalogoPage() {
  const t = await getTranslations("VenditaPage");
  const immobili = await getAllImmobili();
  if (!immobili || immobili.length === 0)
    return (
      <div className="w-full h-96 flex flex-col justify-center items-center my-52">
        <div>
          <h1 className="text-5xl font-bold tracking-wide uppercase mb-10">
            {t("heading")}
          </h1>
        </div>
        <p className="text-2xl font-medium opacity-70 tracking-wide italic">
          {t("emptyPageText")}
        </p>
      </div>
    );
  return (
    <div className="w-full min-h-96 flex flex-col justify-center my-52">
      <h1 className="text-3xl font-bold traking-wide uppercase my-10">
        {t("heading")}
      </h1>
      <div className="w-full flex justify-center items-center p-10">
        {immobili.map((immobile, index) => (
          <React.Fragment key={index}>
            <CardImmobile immobile={immobile}>
              <CardFooter
                metratura={immobile.metratura}
                numeroBagni={immobile.numeroBagni}
                numeroLocali={immobile.numeroLocali}
              />
            </CardImmobile>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
