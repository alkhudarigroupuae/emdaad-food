import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/checkout/'], // Prevent indexing checkout and API routes
    },
    sitemap: 'https://emdaadfood.com/sitemap.xml',
  };
}
