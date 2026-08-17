"use client";
import { unsubscribeNewsletter } from "@/actions/newsletter";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function UnsubscribePage() {
  const t = useTranslations("Unsubscribe");

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const handleUnsubscribe = () => {
    if (!email) return;

    startTransition(async () => {
      const res = await unsubscribeNewsletter(email);
      setStatus({ success: res.success, message: res.message });
    });
  };

  return (
    <main className="min-h-screen bg-[#F5F4F0] text-[#3C3833] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-[#EAE8E3] p-8 text-center">
        <h1 className="text-2xl font-bold uppercase tracking-wider mb-2">
          {t("title")}
        </h1>
        <p className="text-sm text-[#8C857B] mb-6">{t("description")}</p>

        {!email ? (
          <p className="text-red-600 text-sm font-medium">
            {t("errorMissingEmail")}
          </p>
        ) : status?.success ? (
          <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-sm border border-emerald-200">
            {status.message || t("successMsg")}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-[#F5F4F0] p-3 rounded-lg text-xs tracking-wide">
              <span className="text-[#8C857B] block mb-1">
                {t("emailLabel")}
              </span>
              <strong className="text-[#3C3833] text-sm break-all">
                {email}
              </strong>
            </div>

            {status?.success === false && (
              <p className="text-red-600 text-sm font-medium">
                {status.message}
              </p>
            )}

            <button
              onClick={handleUnsubscribe}
              disabled={isPending}
              className="w-full bg-[#3C3833] hover:bg-[#11100e] text-white font-semibold py-3 px-6 rounded-xl text-sm uppercase tracking-wider transition-all disabled:opacity-50"
            >
              {isPending ? t("submitting") : t("buttonText")}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
