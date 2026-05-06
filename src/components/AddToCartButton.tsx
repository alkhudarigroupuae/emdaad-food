'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface Props {
  product: {
    id: number;
    nameEn: string;
    nameFull: string;
    price: string;
    image: string;
    category: string;
  };
}

export default function AddToCartButton({ product }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.nameFull,
      nameEn: product.nameEn,
      price: product.price,
      image: product.image,
      category: product.category,
    }, qty);

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-dark transition-colors font-bold text-xl"
        >
          −
        </button>
        <input
          type="number"
          value={qty}
          min="1"
          onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
          className="w-12 text-center bg-transparent font-bold text-lg focus:outline-none"
        />
        <button
          onClick={() => setQty((q) => q + 1)}
          className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-dark transition-colors font-bold text-xl"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAdd}
        className={`flex-1 px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg flex items-center justify-center gap-2 text-lg ${
          added
            ? 'bg-green-500 shadow-green-200 text-white'
            : 'bg-primary shadow-primary/30 text-white hover:bg-secondary'
        }`}
      >
        {added ? (
          <>
            <Check className="w-5 h-5" /> Added to Cart!
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" /> Add to Cart
          </>
        )}
      </button>
    </div>
  );
}
