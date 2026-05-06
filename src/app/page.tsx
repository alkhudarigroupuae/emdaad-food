import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ShoppingCart, Star, Truck, Shield, Award, ArrowRight } from 'lucide-react';
import { getProducts, getCategories } from '@/lib/woocommerce';
import { parseProductName, getLocalizedName } from '@/lib/productName';
import { cookies } from 'next/headers';

export const revalidate = 60;

export default async function Home() {
  const products = await getProducts(8);
  const categories = await getCategories();

  const cookieStore = await cookies();
  const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en';

  const safeProducts = Array.isArray(products) ? products : [];
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <>
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2000&auto=format&fit=crop"
            alt="Premium Food Products"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-24">
          <div className="max-w-3xl">
            <span className="inline-block bg-primary/90 backdrop-blur-md px-5 py-2 rounded-full text-white font-semibold tracking-wider uppercase text-xs mb-6 shadow-xl">
              Premium Syrian & Lebanese Food
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white leading-tight">
              Emdaad
              <span className="block text-primary font-light text-4xl md:text-5xl mt-2">Food Trading</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed max-w-xl">
              Experience the authentic taste of Syrian and Lebanese foodstuff.
              Premium quality products delivered straight to your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                aria-label="Shop our products"
                title="Browse Emdaad Food Trading Shop"
                className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-secondary transition-all duration-300 shadow-2xl shadow-primary/30 flex items-center gap-3 text-base hover:scale-105 transform w-fit"
              >
                Shop Now <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/about"
                aria-label="Learn More About Emdaad Food Trading"
                title="Learn More About Emdaad Food Trading"
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all duration-300 flex items-center gap-3 text-base w-fit"
              >
                Learn More
              </Link>
            </div>

            <div className="flex flex-wrap gap-8 mt-12">
              <div className="text-white">
                <div className="text-3xl font-extrabold text-primary">500+</div>
                <div className="text-sm text-gray-300">Products</div>
              </div>
              <div className="text-white">
                <div className="text-3xl font-extrabold text-primary">100%</div>
                <div className="text-sm text-gray-300">Authentic</div>
              </div>
              <div className="text-white">
                <div className="text-3xl font-extrabold text-primary">UAE</div>
                <div className="text-sm text-gray-300">Wide Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white text-center">
            <div className="flex items-center justify-center gap-3">
              <Truck className="w-6 h-6 flex-shrink-0" />
              <span className="font-semibold">Fast Delivery Across UAE</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-6 h-6 flex-shrink-0" />
              <span className="font-semibold">100% Secure Payments</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Award className="w-6 h-6 flex-shrink-0" />
              <span className="font-semibold">Premium Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {safeCategories.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold text-dark mb-4">Browse Categories</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our premium selection of authentic Syrian and Lebanese food products
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {safeCategories.slice(0, 6).map((cat: any, i: number) => (
                <Link
                  key={cat.id || i}
                  href={`/shop?category=${cat.id}`}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 overflow-hidden text-center"
                >
                  <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
                    {cat.image?.src ? (
                      <Image
                        src={cat.image.src}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10 group-hover:bg-primary transition-colors duration-300">
                        <span className="text-3xl font-bold text-primary group-hover:text-white transition-colors">
                          {cat.name?.charAt(0) || 'C'}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-3">
                    <h3
                      className="text-sm font-bold text-dark group-hover:text-primary transition-colors leading-tight"
                      dangerouslySetInnerHTML={{ __html: cat.name }}
                    ></h3>
                    <p className="text-xs text-gray-400 mt-0.5">{cat.count || 0} items</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <h2 className="text-4xl font-bold text-dark mb-4">Featured Products</h2>
              <div className="w-20 h-1 bg-primary mb-4 rounded-full"></div>
              <p className="text-gray-600">Handpicked premium selections from our finest collection</p>
            </div>
            <Link
              href="/shop"
              className="text-primary font-semibold hover:text-secondary transition-colors flex items-center gap-2 flex-shrink-0"
            >
              View all products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {safeProducts.length > 0 ? safeProducts.map((p: any) => (
              <Link
                href={`/product/${p.id}`}
                key={p.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  {p.on_sale && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                      Sale
                    </div>
                  )}
                  <Image
                    src={p.images?.[0]?.src || 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?q=80&w=400&h=400&fit=crop&crop=center'}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-5">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    {(p.categories?.[0]?.name || 'Category').replace(/&amp;/g, '&')}
                  </p>
                  <h3
                    className="text-base font-semibold text-dark mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2 min-h-[48px]"
                  >
                    {p.name.replace(/<[^>]+>/g, '').split(' | ')[0].trim()}
                  </h3>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      {p.on_sale && p.regular_price && (
                        <span className="text-sm text-gray-400 line-through">AED {p.regular_price}</span>
                      )}
                      <span className="text-lg font-bold text-primary">AED {p.price || '0.00'}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            )) : (
              <div className="col-span-full text-center py-16">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-500 mb-2">Products Loading...</h3>
                <p className="text-gray-400">Please wait while we fetch our finest collection</p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-secondary transition-all duration-300 shadow-xl shadow-primary/20 inline-flex items-center gap-3 hover:scale-105 transform"
            >
              View All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-dark mb-4">Why Choose Emdaad Food</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <Award className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Premium Quality</h3>
              <p className="text-gray-600 leading-relaxed">We carefully select the finest ingredients directly from trusted suppliers in Syria and Lebanon, ensuring authentic taste and premium quality in every product.</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <Shield className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Secure Payment</h3>
              <p className="text-gray-600 leading-relaxed">Enjoy safe and convenient payment options for both wholesale and retail customers with multiple payment methods and secure transaction processing.</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <Truck className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">Quick and reliable delivery across the UAE with professional handling, ensuring your products arrive fresh and on time, every time.</p>
            </div>
          </div>
        </div>
      </section>

      {safeProducts.length > 0 && (
        <section className="py-20 bg-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Our Products Gallery</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
              Explore our premium collection of authentic Syrian and Lebanese food products
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {safeProducts
                .filter((p: any) => p.images?.[0]?.src)
                .slice(0, 8)
                .map((p: any) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer bg-gray-800 block"
                  >
                    <Image
                      src={p.images[0].src}
                      alt={p.name?.replace(/<[^>]+>/g, '') || 'Product'}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-contain p-3 group-hover:scale-110 transition-transform duration-700 bg-white/5"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                        <h3
                          className="text-sm font-bold line-clamp-1"
                          dangerouslySetInnerHTML={{ __html: p.name }}
                        />
                        <p className="text-xs text-primary font-semibold mt-1">AED {p.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>

            <Link
              href="/shop"
              className="mt-10 inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-secondary transition-colors shadow-xl"
            >
              View All Products
            </Link>
          </div>
        </section>
      )}

      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Order?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Browse our full catalog of authentic Syrian and Lebanese food products. Wholesale and retail orders available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-xl inline-flex items-center gap-2"
            >
              Browse Products <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
