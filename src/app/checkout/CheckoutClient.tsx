'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Trash2, ArrowLeft, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Gateway {
  id: string;
  title: string;
  description: string;
}

export default function CheckoutClient() {
  const { items, total, count, removeItem, updateQty, clearCart } = useCart();
  const router = useRouter();

  const [gateways, setGateways] = useState<Gateway[]>([]);
  const [selectedGateway, setSelectedGateway] = useState<string>('cod');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingGateways, setIsFetchingGateways] = useState(true);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address_1: '',
    city: 'Dubai',
    country: 'AE',
  });

  useEffect(() => {
    fetch('/api/gateways')
      .then(res => res.json())
      .then((data: Gateway[]) => {
        if (Array.isArray(data)) {
          setGateways(data);
          const cod = data.find(g => g.id === 'cod');
          if (cod) setSelectedGateway('cod');
          else if (data.length > 0) setSelectedGateway(data[0].id);
        }
        setIsFetchingGateways(false);
      })
      .catch(() => setIsFetchingGateways(false));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setIsLoading(true);
    
    const gateway = gateways.find(g => g.id === selectedGateway);

    const orderData = {
      payment_method: selectedGateway,
      payment_method_title: gateway?.title || 'Payment',
      set_paid: false,
      billing: formData,
      shipping: formData,
      line_items: items.map(item => ({
        product_id: typeof item.id === 'string' ? parseInt(item.id) : item.id,
        quantity: item.quantity
      }))
    };

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const order = await res.json();

      if (res.ok) {
        clearCart();
        router.push(`/checkout/success?order_id=${order.id}&method=${selectedGateway}`);
      } else {
        alert(order.error || 'Error creating order');
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert('Network error. Please try again.');
      setIsLoading(false);
    }
  };

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
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark">Checkout</h1>
          <p className="text-gray-500 mt-1">Complete your order securely</p>
        </div>

        <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Form & Cart */}
          <div className="flex-1 space-y-8">
            
            {/* Billing Details */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-dark mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
                Billing Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input required type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input required type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                  <input required type="text" name="address_1" value={formData.address_1} onChange={handleInputChange} placeholder="House number and street name" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Town / City *</label>
                  <select name="city" value={formData.city} onChange={handleInputChange} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                    <option value="Dubai">Dubai</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ajman">Ajman</option>
                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                    <option value="Fujairah">Fujairah</option>
                    <option value="Umm Al Quwain">Umm Al Quwain</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input type="text" disabled value="United Arab Emirates" className="w-full border border-gray-200 bg-gray-50 text-gray-500 rounded-xl px-4 py-3 cursor-not-allowed" />
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-dark mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
                Order Items
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                    <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                      <Image src={item.image} alt={item.nameEn} width={64} height={64} className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-dark text-sm line-clamp-2">{item.nameEn}</h3>
                      <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-primary font-bold block">AED {(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Payment & Summary */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm sticky top-24 space-y-6">
              
              <h2 className="text-xl font-bold text-dark border-b border-gray-100 pb-4">Order Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal ({count} items)</span>
                  <span className="font-medium text-dark">AED {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-dark pt-4 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-primary">AED {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-bold text-dark mb-4">Payment Method</h3>
                
                {isFetchingGateways ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-12 bg-gray-100 rounded-xl"></div>
                    <div className="h-12 bg-gray-100 rounded-xl"></div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {gateways.map(gw => (
                      <label key={gw.id} className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${selectedGateway === gw.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/30'}`}>
                        <div className="flex items-center h-5">
                          <input 
                            type="radio" 
                            name="payment_method" 
                            value={gw.id} 
                            checked={selectedGateway === gw.id}
                            onChange={() => setSelectedGateway(gw.id)}
                            className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" 
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm text-dark">{gw.title}</div>
                          {gw.description && <div className="text-xs text-gray-500 mt-1" dangerouslySetInnerHTML={{ __html: gw.description }} />}
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || isFetchingGateways}
                className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-secondary transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>Place Order <ShieldCheck className="w-5 h-5" /></>
                )}
              </button>

              <div className="flex flex-col items-center justify-center gap-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-bit SSL encrypted & secure</span>
                </div>
                <Link href="/shop" className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition-colors font-medium mt-2">
                  <ArrowLeft className="w-4 h-4" /> Return to Shop
                </Link>
              </div>

            </div>
          </div>

        </form>
      </div>
    </section>
  );
}