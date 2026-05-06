import Link from 'next/link';
import { CheckCircle2, ShoppingBag, Clock, Phone } from 'lucide-react';

const COD_METHODS = ['cod'];

export default async function CheckoutSuccess({ searchParams }: { searchParams: Promise<{ order_id?: string; method?: string }> }) {
  const params = await searchParams;
  const isCod = !params.method || COD_METHODS.includes(params.method);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className={`w-24 h-24 ${isCod ? 'bg-green-100' : 'bg-blue-100'} rounded-full flex items-center justify-center mb-6`}>
        {isCod ? (
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        ) : (
          <Clock className="w-12 h-12 text-blue-500" />
        )}
      </div>

      <h1 className="text-3xl font-bold text-dark mb-4">
        {isCod ? 'Order Confirmed!' : 'Order Received!'}
      </h1>

      {params.order_id && (
        <p className="text-gray-500 font-medium mb-4">
          Order ID: <span className="text-dark font-bold">#{params.order_id}</span>
        </p>
      )}

      {isCod ? (
        <div className="max-w-md space-y-3 mb-8">
          <p className="text-gray-500">
            Thank you for your order. Our delivery team will contact you shortly to confirm your delivery time.
          </p>
          <p className="text-gray-500">
            Please have your payment ready upon delivery.
          </p>
        </div>
      ) : (
        <div className="max-w-md bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 space-y-3">
          <div className="flex items-center justify-center gap-2 text-blue-700 font-semibold mb-2">
            <Phone className="w-5 h-5" />
            <span>Payment Confirmation</span>
          </div>
          <p className="text-gray-600 text-sm">
            Your order has been received. Our team will contact you shortly via WhatsApp or phone to complete your payment securely.
          </p>
          <p className="text-gray-500 text-xs">
            You will also receive a confirmation email with your order details.
          </p>
        </div>
      )}

      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          href="/shop"
          className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary transition-colors flex items-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}
