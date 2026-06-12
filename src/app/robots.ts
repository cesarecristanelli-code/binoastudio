import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/*_next/*',      // Blocca la scansione dei file di build interni di Next.js
        '/api/*',         // Se hai delle API route, evita che Google le indicizzi
      ],
    },
    sitemap: 'https://binoastudio.com/sitemap.xml',
  }
}