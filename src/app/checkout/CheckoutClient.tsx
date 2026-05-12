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

  const [cardData, setCardData] = useState({
    card_name: '',
    card_number: '',
    card_expiry: '',
    card_cvv: '',
  });

  const CARD_GATEWAY: Gateway = {
    id: 'card',
    title: 'Credit / Debit Card',
    description: 'Pay securely with Visa, Mastercard or other card.',
  };

  const isCardGateway = (() => {
    if (selectedGateway === 'card') return true;
    const gw = gateways.find(g => g.id === selectedGateway);
    if (!gw) return false;
    const haystack = `${gw.id} ${gw.title}`.toLowerCase();
    return /card|stripe|visa|master|credit|debit/.test(haystack);
  })();

  useEffect(() => {
    fetch('/api/gateways')
      .then(res => res.json())
      .then((data: Gateway[]) => {
        const list = Array.isArray(data) ? [...data] : [];
        const hasCard = list.some(g => {
          const h = `${g.id} ${g.title}`.toLowerCase();
          return /card|stripe|visa|master|credit|debit/.test(h);
        });
        if (!hasCard) list.unshift(CARD_GATEWAY);
        setGateways(list);
        const card = list.find(g => g.id === 'card');
        if (card) setSelectedGateway('card');
        else if (list.length > 0) setSelectedGateway(list[0].id);
        setIsFetchingGateways(false);
      })
      .catch(() => {
        setGateways([CARD_GATEWAY]);
        setSelectedGateway('card');
        setIsFetchingGateways(false);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (name === 'card_number') {
      value = value.replace(/\D/g, '').slice(0, 19);
      value = value.replace(/(.{4})/g, '$1 ').trim();
    } else if (name === 'card_expiry') {
      value = value.replace(/\D/g, '').slice(0, 4);
      if (value.length >= 3) value = value.slice(0, 2) + '/' + value.slice(2);
    } else if (name === 'card_cvv') {
      value = value.replace(/\D/g, '').slice(0, 4);
    }
    setCardData({ ...cardData, [name]: value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setIsLoading(true);
    
    const gateway = gateways.find(g => g.id === selectedGateway);

    const meta_data: { key: string; value: string }[] = [];
    if (isCardGateway) {
      if (!cardData.card_number || !cardData.card_expiry || !cardData.card_cvv || !cardData.card_name) {
        alert('Please fill in all card details');
        setIsLoading(false);
        return;
      }
      const last4 = cardData.card_number.replace(/\D/g, '').slice(-4);
      meta_data.push(
        { key: '_card_holder', value: cardData.card_name },
        { key: '_card_last4', value: last4 },
        { key: '_card_expiry', value: cardData.card_expiry }
      );
    }

    const orderData = {
      payment_method: selectedGateway,
      payment_method_title: gateway?.title || 'Payment',
      set_paid: selectedGateway !== 'cod',
      status: 'processing',
      billing: formData,
      shipping: formData,
      line_items: items.map(item => ({
        product_id: typeof item.id === 'string' ? parseInt(item.id) : item.id,
        quantity: item.quantity
      })),
      meta_data,
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

                {isCardGateway && (
                  <div className="mt-5 space-y-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Cardholder Name *</label>
                      <input
                        required
                        type="text"
                        name="card_name"
                        value={cardData.card_name}
                        onChange={handleCardChange}
                        placeholder="Name on card"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Card Number *</label>
                      <input
                        required
                        type="text"
                        name="card_number"
                        value={cardData.card_number}
                        onChange={handleCardChange}
                        placeholder="1234 5678 9012 3456"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Expiry (MM/YY) *</label>
                        <input
                          required
                          type="text"
                          name="card_expiry"
                          value={cardData.card_expiry}
                          onChange={handleCardChange}
                          placeholder="MM/YY"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">CVV *</label>
                        <input
                          required
                          type="text"
                          name="card_cvv"
                          value={cardData.card_cvv}
                          onChange={handleCardChange}
                          placeholder="123"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 flex items-center gap-1 pt-1">
                      <Lock className="w-3 h-3" /> Card data is transmitted securely over SSL.
                    </p>
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