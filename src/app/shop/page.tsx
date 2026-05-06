import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getProducts, getCategories, getProductPriceRange } from '@/lib/woocommerce';
import ShopClient from './ShopClient';

export const metadata: Metadata = {
  title: 'Shop | Emdaad Food Trading',
  description: 'Browse our full catalog of authentic Syrian and Lebanese food products. Wholesale and retail available.',
};

export const revalidate = 60;

export default async function Shop() {
  const [products, categories, priceRange] = await Promise.all([
    getProducts(100),
    getCategories(),
    getProductPriceRange(),
  ]);

  const safeProducts = Array.isArray(products) ? products : [];
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <>
      <div className="bg-dark text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop"
            alt="Shop Emdaad Food Trading"
            className="w-full h-full object-cover opacity-25"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center text-sm text-gray-400 gap-2 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Shop</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-gray-300 max-w-2xl text-lg">Authentic Syrian and Lebanese food products – wholesale and retail</p>
        </div>
      </div>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ShopClient
            products={safeProducts}
            categories={safeCategories}
            priceRange={priceRange}
          />
        </div>
      </section>
    </>
  );
}
