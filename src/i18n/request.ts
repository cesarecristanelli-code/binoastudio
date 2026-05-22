import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// 1. Definiamo in modo rigido le lingue supportate dall'agenzia
const locales = ['it', 'en'];

export default getRequestConfig(async ({ requestLocale }) => {
    // 2. Controllo di sicurezza: se qualcuno prova a digitare /fr/ o /de/, 
    // restituisce la pagina di errore 404 nativa di Next.js
    const locale = await requestLocale;
    if (!locale || !locales.includes(locale)) {
        notFound();
    }

    return {
        locale: locale as string,
        // 3. Importiamo dinamicamente solo il file JSON che serve in questo momento
        messages: (await import(`../../messages/${locale}.json`)).default
    };
});