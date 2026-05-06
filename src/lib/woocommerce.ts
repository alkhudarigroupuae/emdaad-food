import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Helper function to safely get environment variables during build time
const getEnv = (key: string) => {
  if (typeof process !== 'undefined' && process.env[key]) {
    return process.env[key];
  }
  return 'dummy_key_for_build'; // Fallback during build time
};

// Initialize the WooCommerce API client
const WooCommerceRestApiAny: any = WooCommerceRestApi;
const api = new WooCommerceRestApiAny({
  url: getEnv('WOOCOMMERCE_URL') !== 'dummy_key_for_build' ? getEnv('WOOCOMMERCE_URL') : 'https://admin.emdaadfood.com',
  consumerKey: getEnv('WOOCOMMERCE_CONSUMER_KEY'),
  consumerSecret: getEnv('WOOCOMMERCE_CONSUMER_SECRET'),
  version: "wc/v3"
});

const isBuildTime = getEnv('WOOCOMMERCE_CONSUMER_KEY') === 'dummy_key_for_build';

function toImageProxyUrl(src?: string) {
  if (!src) return src;
  try {
    const siteUrl = new URL(process.env.WOOCOMMERCE_URL || "https://admin.emdaadfood.com");
    const imageUrl = new URL(src);
    if (imageUrl.origin === siteUrl.origin) {
      return imageUrl.pathname.startsWith("/wp-content/uploads/")
        ? `/api/wc-images${imageUrl.pathname.replace("/wp-content/uploads", "")}${imageUrl.search}`
        : src;
    }
    return src;
  } catch {
    return src;
  }
}

/**
 * Fetch all products from WooCommerce
 */
export async function getProducts(limit = 10) {
  if (isBuildTime) return []; // Prevent failing during Vercel build
  
  try {
    const response = await api.get("products", {
      per_page: limit,
      status: "publish",
    });
    
    const products = response.data || [];
    
    // Map image URLs to a same-origin proxy route to avoid external image restrictions.
    const processedProducts = products.map((product: any) => ({
      ...product,
      images: product.images?.map((image: any) => ({
        ...image,
        src: toImageProxyUrl(image.src)
      }))
    }));
    
    return processedProducts;
  } catch (error) {
    console.error("Error fetching products from WooCommerce:", error);
    return [];
  }
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id: number) {
  if (isBuildTime) return null; // Prevent failing during Vercel build
  
  try {
    const response = await api.get(`products/${id}`);
    const product = response.data;
    return {
      ...product,
      images: product?.images?.map((image: any) => ({
        ...image,
        src: toImageProxyUrl(image.src)
      })) || []
    };
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

/**
 * Get min and max prices from all products
 */
export async function getProductPriceRange(): Promise<{ min: number; max: number }> {
  if (isBuildTime) return { min: 0, max: 1000 };
  
  try {
    const [cheapest, priciest] = await Promise.all([
      api.get("products", { per_page: 1, status: "publish", orderby: "price", order: "asc" }),
      api.get("products", { per_page: 1, status: "publish", orderby: "price", order: "desc" }),
    ]);
    const min = Math.floor(parseFloat(cheapest.data?.[0]?.price || "0"));
    const max = Math.ceil(parseFloat(priciest.data?.[0]?.price || "1000"));
    return { min, max };
  } catch {
    return { min: 0, max: 1000 };
  }
}

/**
 * Fetch all product categories
 */
export async function getCategories() {
  if (isBuildTime) return [];
  
  try {
    const response = await api.get("products/categories", {
      per_page: 100,
      hide_empty: true,
    });
    const categories = response.data || [];
    return categories.map((cat: any) => ({
      ...cat,
      image: cat.image
        ? { ...cat.image, src: toImageProxyUrl(cat.image.src) }
        : null,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
