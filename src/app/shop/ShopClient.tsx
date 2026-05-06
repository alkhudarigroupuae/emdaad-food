'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, SlidersHorizontal, Star } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { parseProductName, getLocalizedName } from '@/lib/productName';

interface Props {
  products: any[];
  categories: any[];
  priceRange: { min: number; max: number };
}

export default function ShopClient({ products, categories, priceRange }: Props) {
  const { t, language } = useLanguage();
  const [maxPrice, setMaxPrice] = useState(priceRange.max);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
    setCurrentPage(1);
  };

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const price = parseFloat(p.price || '0');
      const inPrice = price >= priceRange.min && price <= maxPrice;
      const inCat =
        selectedCategories.length === 0 ||
        p.categories?.some((c: any) => selectedCategories.includes(c.id));
      return inPrice && inCat;
    });

    if (sortBy === 'price_asc') result = [...result].sort((a, b) => parseFloat(a.price || '0') - parseFloat(b.price || '0'));
    if (sortBy === 'price_desc') result = [...result].sort((a, b) => parseFloat(b.price || '0') - parseFloat(a.price || '0'));
    if (sortBy === 'name') result = [...result].sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [products, maxPrice, selectedCategories, sortBy, priceRange.min]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="w-full lg:w-64 flex-shrink-0 space-y-5">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-base font-bold text-dark mb-4 pb-4 border-b border-gray-100 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-primary" /> Categories
          </h3>
          <ul className="space-y-1">
            <li>
              <label className="flex items-center gap-3 cursor-pointer group py-1.5">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 accent-primary"
                  checked={selectedCategories.length === 0}
                  onChange={() => setSelectedCategories([])}
                />
                <span className="text-gray-600 group-hover:text-primary transition-colors text-sm font-medium">{t('allProducts')}</span>
                <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{products.length}</span>
              </label>
            </li>
            {categories.map((cat: any) => (
              <li key={cat.id}>
                <label className="flex items-center gap-3 cursor-pointer group py-1.5">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 accent-primary"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                  />
                  <span
                    className="text-gray-600 group-hover:text-primary transition-colors text-sm flex-1"
                    dangerouslySetInnerHTML={{ __html: cat.name }}
                  />
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{cat.count}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-base font-bold text-dark mb-1 pb-4 border-b border-gray-100">{t('priceRange')}</h3>
          <div className="pt-4 space-y-4">
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              step={1}
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary bg-gray-200"
            />
            <div className="flex justify-between items-center text-sm font-semibold text-gray-600">
              <span className="bg-gray-100 px-3 py-1 rounded-lg">AED {priceRange.min}</span>
              <span className="text-primary font-bold">—</span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg">AED {maxPrice}</span>
            </div>
            {maxPrice < priceRange.max && (
              <button
                onClick={() => setMaxPrice(priceRange.max)}
                className="text-xs text-gray-400 hover:text-primary transition-colors w-full text-center"
              >
                Reset filter
              </button>
            )}
          </div>
        </div>

        <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20">
          <h3 className="text-base font-bold text-dark mb-2">Wholesale Orders?</h3>
          <p className="text-sm text-gray-600 mb-4">Contact us for bulk pricing and special wholesale deals.</p>
          <Link href="/contact" className="block text-center bg-primary text-white py-2.5 rounded-xl font-semibold hover:bg-secondary transition-colors text-sm">
            Get Wholesale Quote
          </Link>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            Showing <span className="font-semibold text-dark">
              {filtered.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}
              -
              {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}
            </span> of <span className="font-semibold text-dark">{filtered.length}</span> results
          </p>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-gray-50 border border-gray-200 text-gray-700 rounded-xl focus:ring-primary focus:border-primary block px-4 py-2.5 outline-none text-sm"
          >
            <option value="latest">Sort by: Latest</option>
            <option value="name">Sort by: Name</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-500 mb-2">No products found</h3>
            <p className="text-gray-400 mb-6">Try adjusting the price range or category filters</p>
            <button
              onClick={() => { setMaxPrice(priceRange.max); setSelectedCategories([]); }}
              className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-secondary transition-colors text-sm"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {paginatedProducts.map((p: any) => (
              <Link
                href={`/product/${p.id}`}
                key={p.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
              >
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  {p.on_sale && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">Sale</div>
                  )}
                  <Image
                    src={p.images?.[0]?.src || 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?q=80&w=400&h=400&fit=crop'}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    {(p.categories?.[0]?.name || 'Category').replace(/&amp;/g, '&')}
                  </p>
                  <h3
                    className="font-semibold text-sm leading-snug text-dark group-hover:text-primary transition-colors line-clamp-2 min-h-[40px]"
                  >
                    {getLocalizedName(parseProductName(p.name), language)}
                  </h3>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      {p.on_sale && p.regular_price && (
                        <span className="text-xs text-gray-400 line-through">AED {p.regular_price}</span>
                      )}
                      <span className="text-primary font-bold">AED {p.price || '0.00'}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-10 h-10 rounded-xl font-bold flex items-center justify-center border transition-colors ${
                  currentPage === page
                    ? 'bg-primary text-white border-primary shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
