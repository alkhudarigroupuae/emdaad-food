import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Star, CheckCircle2, Heart, GitCompare, Package, Truck, Shield } from 'lucide-react';
import { getProductById } from '@/lib/woocommerce';
import { parseProductName, buildProductSeoTitle, buildProductDescription } from '@/lib/productName';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';
import type { Product, WithContext } from 'schema-dts';

export const revalidate = 60;

const BASE_URL = 'https://emdaadfood.com';

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    return { title: 'Product Not Found | Emdaad Food Trading' };
  }

  const nameParts = parseProductName(product.name);
  const category = (product.categories?.[0]?.name || 'Food').replace(/&amp;/g, '&');
  const price = product.price || '0.00';
  const image = product.images?.[0]?.src;

  const seoTitle = buildProductSeoTitle(nameParts, category);
  const seoDescription = buildProductDescription(nameParts, category, price);

  const productUrl = `${BASE_URL}/product/${id}`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      nameParts.en,
      nameParts.ar,
      category,
      'Syrian food',
      'Lebanese food',
      'UAE food',
      'Dubai grocery',
      'منتجات سورية',
      'منتجات لبنانية',
      'متجر إمداد',
    ].filter(Boolean),
    alternates: {
      canonical: productUrl,
      languages: {
        'en':    productUrl,
        'ar':    productUrl,
        'fr':    productUrl,
        'ru':    productUrl,
        'es':    productUrl,
        'x-default': productUrl,
      },
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: productUrl,
      siteName: 'Emdaad Food Trading',
      type: 'website',
      ...(image && {
        images: [{ url: image, width: 800, height: 800, alt: nameParts.en }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      ...(image && { images: [image] }),
    },
  };
}

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    notFound();
  }

  const nameParts = parseProductName(product.name);
  const mainImage = product.images?.[0]?.src || 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?q=80&w=800&h=800&fit=crop';
  const thumbnails = product.images?.slice(0, 4) || [];
  const category = (product.categories?.[0]?.name || 'Category').replace(/&amp;/g, '&');
  const price = product.price || '0.00';
  const regularPrice = product.regular_price;
  const onSale = product.on_sale && regularPrice && regularPrice !== price;

  const discount = onSale && regularPrice
    ? Math.round(((parseFloat(regularPrice) - parseFloat(price)) / parseFloat(regularPrice)) * 100)
    : null;

  const rating = parseFloat(product.average_rating) || 4.8;
  const ratingCount = product.rating_count || 0;
  const fullStars = Math.floor(rating);

  const hasArabicName = nameParts.ar && nameParts.ar !== nameParts.en;

  const jsonLd: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: nameParts.en,
    description: product.short_description?.replace(/<[^>]+>/g, '') || nameParts.en,
    image: mainImage,
    sku: product.sku || id,
    brand: { '@type': 'Brand', name: 'Emdaad Food Trading' },
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: 'AED',
      availability: product.stock_status === 'instock'
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${BASE_URL}/product/${id}`,
    },
    aggregateRating: rating > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: rating.toFixed(1),
      reviewCount: ratingCount || 1,
    } : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-gray-50 border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-sm text-gray-500 gap-2 flex-wrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/shop?category=${product.categories?.[0]?.id}`} className="hover:text-primary transition-colors">{category}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-dark font-medium line-clamp-1">{nameParts.en}</span>
        </div>
      </div>

      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="flex-1 w-full">
              <div className="aspect-square rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden mb-4 relative shadow-sm">
                {discount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-4 py-1.5 rounded-full z-10 shadow-sm">
                    -{discount}%
                  </div>
                )}
                <Image
                  src={mainImage}
                  alt={nameParts.en}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-6"
                />
              </div>
              {thumbnails.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                  {thumbnails.map((img: any, i: number) => (
                    <div key={i} className={`relative w-24 h-24 rounded-xl border-2 overflow-hidden cursor-pointer flex-shrink-0 bg-gray-50 ${i === 0 ? 'border-primary' : 'border-gray-200 hover:border-primary/50'} transition-colors`}>
                      <Image 
                        src={img.src} 
                        fill 
                        sizes="96px"
                        className="object-contain p-2" 
                        alt={`${nameParts.en} - image ${i + 1}`} 
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="mb-6 border-b border-gray-100 pb-6">
                <p className="text-sm text-primary font-bold tracking-wider uppercase mb-2">{category}</p>

                <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2 leading-tight">
                  {nameParts.en}
                </h1>
                {hasArabicName && (
                  <h2 className="text-xl text-gray-500 font-medium mb-4" dir="rtl" lang="ar">
                    {nameParts.ar}
                  </h2>
                )}

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < fullStars ? 'fill-current' : 'text-gray-300'}`} />
                    ))}
                    <span className="text-sm font-medium text-gray-500 ml-2">
                      ({rating.toFixed(1)} / 5.0){ratingCount > 0 ? ` - ${ratingCount} Reviews` : ''}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-6">
                  <span className="text-4xl font-extrabold text-primary">AED {price}</span>
                  {onSale && regularPrice && (
                    <span className="text-xl text-gray-400 line-through font-medium">AED {regularPrice}</span>
                  )}
                </div>
              </div>

              <div className="mb-8">
                {product.short_description ? (
                  <div
                    className="text-gray-600 leading-relaxed mb-6 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.short_description }}
                  ></div>
                ) : (
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Premium quality product from Emdaad Food Trading. Authentic Syrian and Lebanese foodstuff, carefully sourced and delivered to your doorstep.
                  </p>
                )}
                <ul className="space-y-2 text-sm text-gray-600">
                  {product.stock_status === 'instock' && (
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> In Stock - Ready to Ship</li>
                  )}
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> 100% Authentic Product</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Imported from the Levant</li>
                </ul>
              </div>

              <AddToCartButton product={{
                id: product.id,
                nameEn: nameParts.en,
                nameFull: nameParts.full,
                price: price,
                image: mainImage,
                category,
              }} />

              <div className="flex items-center gap-6 pt-6 border-t border-gray-100 mb-8">
                <button className="flex items-center gap-2 text-gray-500 hover:text-primary font-medium transition-colors">
                  <Heart className="w-5 h-5" /> Wishlist
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-primary font-medium transition-colors">
                  <GitCompare className="w-5 h-5" /> Compare
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-600">Fast Delivery</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-600">Secure Payment</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <Package className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-600">Quality Assured</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm space-y-2">
                {product.sku && (
                  <div className="flex"><span className="font-bold w-24 text-gray-700">SKU:</span> <span className="text-gray-500">{product.sku}</span></div>
                )}
                <div className="flex"><span className="font-bold w-24 text-gray-700">Category:</span> <Link href={`/shop?category=${product.categories?.[0]?.id}`} className="text-primary hover:underline">{category}</Link></div>
                {product.tags && product.tags.length > 0 && (
                  <div className="flex"><span className="font-bold w-24 text-gray-700">Tags:</span> <span className="text-gray-500">{product.tags.map((t: any) => t.name).join(', ')}</span></div>
                )}
              </div>
            </div>
          </div>

          {product.description && (
            <div className="mt-16 border-t border-gray-100 pt-12">
              <h2 className="text-2xl font-bold text-dark mb-6">Product Description</h2>
              <div
                className="prose prose-gray max-w-none text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
