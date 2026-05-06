'use client';

import { useCart } from '@/context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const WC_URL = process.env.NEXT_PUBLIC_WC_URL || 'https://emdaadfood.com';

function buildWcCheckoutUrl(items: ReturnType<typeof useCart>['items']): string {
  if (items.length === 0) return `${WC_URL}/checkout`;
  const params = items
    .map((item) => `add-to-cart=${item.id}&quantity=${item.quantity}`)
    .join('&');
  return `${WC_URL}/checkout?${params}`;
}

export default function CartDrawer() {
  const { items, count, total, isOpen, closeCart, removeItem, updateQty } = useCart();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-dark">Shopping Cart</h2>
            {count > 0 && (
              <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">{count}</span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-500">Your cart is empty</h3>
            <p className="text-gray-400 text-sm">Add some products to get started</p>
            <button
              onClick={closeCart}
              className="mt-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-secondary transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <div className="w-20 h-20 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                    <Image
                      src={item.image}
                      alt={item.nameEn}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-dark leading-snug line-clamp-2 mb-1">{item.nameEn}</h4>
                    <p className="text-xs text-gray-400 mb-3">{item.category}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-primary font-bold text-sm">
                          AED {(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-gray-100 space-y-4 bg-white">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Subtotal ({count} items)</span>
                <span className="text-2xl font-extrabold text-dark">AED {total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-400">Shipping and taxes calculated at checkout</p>
              <a
                href={buildWcCheckoutUrl(items)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-secondary transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2 text-base"
              >
                Proceed to Checkout <ExternalLink className="w-5 h-5" />
              </a>

              <div className="flex items-center gap-3 text-xs text-gray-400 justify-center">
                <Image src="/paypal.png" alt="PayPal" width={40} height={20} className="h-5 w-auto object-contain opacity-60" />
                <Image src="/visa.png" alt="Visa" width={40} height={16} className="h-4 w-auto object-contain opacity-60" />
                <Image src="/mastercard.png" alt="Mastercard" width={40} height={20} className="h-5 w-auto object-contain opacity-60" />
              </div>
              <button
                onClick={closeCart}
                className="w-full border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
