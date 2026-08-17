"use client";

import { subscribeNewsletter } from "@/actions/newsletter";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function NewsletterForm() {
  const t = useTranslations("Binoazine");

  const params = useParams();
  const currentLang = (params?.lang as string) || "it";

  const [isPending, setIsPending] = useState(false);
  const [feedback, setFeedback] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsPending(true);
    setFeedback(null);

    const formElement = e.currentTarget as HTMLFormElement;
    const formData = new FormData(formElement);

    try {
      const subRes = await subscribeNewsletter(formData);

      setFeedback({
        success: subRes.success,
        message: subRes.message,
      });

      if (subRes.success) {
        formElement.reset();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error;
      console.error(
        "Errore in frontend durante l'iscrizione alla newsletter: ",
        errorMessage,
      );
      setFeedback({
        success: false,
        message: "Errore durante l'iscrizione",
      });
    } finally {
      setIsPending(false);
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  return (
    <section className="px-6 md:px-20">
      <div className="bg-[#3C3833] text-[#F5F4F0] p-10 md:p-16 max-w-6xl mx-auto flex flex-col items-center text-center gap-12 rounded-3xl">
        {/* Testo del Form */}
        <div className="w-full max-w-3xl">
          <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-[#F5F4F0] leading-snug whitespace-pre-line">
            {t("binoazineForm.content")}
          </h2>
        </div>

        {/* Input e Bottone */}
        <div className="w-full max-w-2xl">
          <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
            {/* Campo nascosto per passare il parametro  lang */}
            <input type="hidden" name="lang" value={currentLang} />

            <input
              type="text"
              placeholder="Nome"
              name="nome"
              disabled={isPending}
              className="bg-transparent border-b border-[#F5F4F0]/30 py-3 px-2 text-[#F5F4F0] placeholder-[#F5F4F0]/50 focus:outline-none focus:border-[#F5F4F0] transition-colors"
              required
            />
            <input
              type="email"
              placeholder="Indirizzo Email"
              name="email"
              disabled={isPending}
              className="bg-transparent border-b border-[#F5F4F0]/30 py-3 px-2 text-[#F5F4F0] placeholder-[#F5F4F0]/50 focus:outline-none focus:border-[#F5F4F0] transition-colors"
              required
            />

            {/* Messaggio d'esito (Successo o Errore) */}
            {feedback?.message && (
              <div
                className={`p-4 rounded-2xl text-sm font-medium transition-all ${
                  feedback.success
                    ? "bg-emerald-900/50 text-emerald-200 border border-emerald-500/30"
                    : "bg-red-900/50 text-red-200 border border-red-500/30"
                }`}
              >
                {feedback.message}
              </div>
            )}

            {/* Bottone */}
            <button
              type="submit"
              disabled={isPending}
              className="group mx-auto text-sm md:text-base inline-flex items-center gap-2 font-semibold uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-300 cursor-pointer bg-white text-black hover:bg-gray-200 w-fit mt-4"
            >
              {isPending ? "Subscribing..." : t("binoazineForm.button")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
