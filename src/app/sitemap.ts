import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/woocommerce';
import { blogPosts } from '@/lib/blogData';

const BASE_URL = 'https://emdaadfood.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static Routes
  const routes = ['', '/about', '/shop', '/contact', '/blog', '/privacy-policy', '/terms-of-service'].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Fetch Products for Sitemap
  let productsSitemap: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts(100); // Fetch top 100 products for sitemap
    if (Array.isArray(products)) {
      productsSitemap = products.map((product: any) => ({
        url: `${BASE_URL}/product/${product.id}`,
        lastModified: new Date(product.date_modified || new Date()).toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      }));
    }
  } catch (error) {
    console.error('Error generating products sitemap:', error);
  }

  // Blog Posts Sitemap
  const blogSitemap: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...productsSitemap, ...blogSitemap];
}
