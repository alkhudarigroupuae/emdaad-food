import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import CheckoutClient from './CheckoutClient';

export const metadata: Metadata = {
  title: 'Checkout | Emdaad Food Trading',
  description: 'Complete your order from Emdaad Food Trading.',
};

export default function CheckoutPage() {
  return (
    <>
      <div className="bg-dark text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop"
            alt="Emdaad Food Trading Checkout"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center text-sm text-gray-400 gap-2 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Checkout</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Checkout</h1>
          <p className="text-gray-300 max-w-2xl text-lg">Review your items and proceed to our secure payment gateway.</p>
        </div>
      </div>
      <CheckoutClient />
    </>
  );
}
