import Link from 'next/link';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default async function CheckoutSuccess({ searchParams }: { searchParams: Promise<{ order_id?: string }> }) {
  const params = await searchParams;
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-12 h-12 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold text-dark mb-4">Order Confirmed!</h1>
      <p className="text-gray-500 max-w-md mb-2">
        Thank you for your purchase. Your order has been received and is now being processed.
      </p>
      {params.order_id && (
        <p className="text-gray-600 font-medium mb-8">
          Order ID: <span className="text-dark">#{params.order_id}</span>
        </p>
      )}
      
      <div className="flex gap-4">
        <Link href="/shop" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary transition-colors flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}
