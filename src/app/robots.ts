// src/app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    //   disallow: '/private', // Qui puoi mettere cartelle che vuoi nascondere
    },
    sitemap: 'https://binoastudio.com/sitemap.xml',
  }
}