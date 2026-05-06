'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Trash2, ArrowLeft, ExternalLink, Shield, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';

const WC_URL = process.env.NEXT_PUBLIC_WC_URL || 'https://emdaadfood.com';

function buildWcCheckoutUrl(items: ReturnType<typeof useCart>['items']): string {
  if (items.length === 0) return `${WC_URL}/checkout`;
  const params = items
    .map((item) => `add-to-cart=${item.id}&quantity=${item.quantity}`)
    .join('&');
  return `${WC_URL}/checkout?${params}`;
}

export default function CheckoutClient() {
  const { items, total, count, removeItem, updateQty } = useCart();
  const [checkoutUrl, setCheckoutUrl] = useState(`${WC_URL}/checkout`);

  useEffect(() => {
    setCheckoutUrl(buildWcCheckoutUrl(items));
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-300" />
        </div>
        <h1 className="text-2xl font-bold text-dark mb-3">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Add some products before checking out.</p>
        <Link href="/shop" className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-secondary transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">

          <div className="flex-1 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                    <Image src={item.image} alt={item.nameEn} width={80} height={80} className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-dark text-sm line-clamp-2 mb-1">{item.nameEn}</h3>
                    <p className="text-xs text-gray-400 mb-2">{item.category}</p>
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 w-fit">
                      <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600 text-sm font-bold rounded-l-lg">−</button>
                      <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600 text-sm font-bold rounded-r-lg">+</button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-primary font-bold">AED {(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                    <button onClick={() => removeItem(item.id)} className="text-red-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
              <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-800 mb-1">Secure Checkout via WooCommerce</p>
                <p className="text-xs text-amber-700">You will be redirected to our secure store to complete your order with your preferred payment method (Tap Payment, PayPal, Cash on Delivery, etc.)</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24 space-y-5">
              <h2 className="text-xl font-bold text-dark flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" /> Order Summary
              </h2>

              <div className="space-y-3 border-b border-gray-100 pb-5">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal ({count} items)</span>
                  <span className="font-medium text-dark">AED {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-dark pt-2">
                  <span>Total</span>
                  <span className="text-primary">AED {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-gray-500 font-medium text-center">Available Payment Methods</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { src: '/paypal.png', alt: 'PayPal' },
                    { src: '/visa.png', alt: 'Visa' },
                    { src: '/mastercard.png', alt: 'Mastercard' },
                  ].map((p) => (
                    <div key={p.alt} className="bg-gray-50 border border-gray-200 rounded-xl p-2 flex items-center justify-center h-10">
                      <Image src={p.src} alt={p.alt} width={40} height={20} className="h-5 w-auto object-contain" />
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
                  <span>Cash on Delivery</span>
                  <span>•</span>
                  <span>Tap Payment</span>
                </div>
              </div>

              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-secondary transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2 text-base"
              >
                Go to Secure Checkout <ExternalLink className="w-5 h-5" />
              </a>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <Lock className="w-3.5 h-3.5" />
                <span>256-bit SSL encrypted & secure</span>
              </div>

              <Link href="/shop" className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors font-medium">
                <ArrowLeft className="w-4 h-4" /> Continue Shopping
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
