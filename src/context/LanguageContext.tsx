'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar' | 'fr' | 'ru' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    shop: 'Shop',
    about: 'About Us',
    blog: 'Blog',
    contact: 'Contact Us',
    search: 'Search',
    cart: 'Shopping Cart',
    emptyCart: 'Your cart is empty',
    addProducts: 'Add some products to get started',
    continueShopping: 'Continue Shopping',
    subtotal: 'Subtotal',
    proceedCheckout: 'Proceed to Checkout',
    categories: 'Categories',
    priceRange: 'Price Range',
    allProducts: 'All Products',
    wholesale: 'Wholesale Orders?',
    getQuote: 'Get Wholesale Quote',
    sortByLatest: 'Sort by: Latest',
    sortByPriceAsc: 'Price: Low to High',
    sortByPriceDesc: 'Price: High to Low',
    sale: 'Sale',
    addToCart: 'Add to Cart',
    viewDetails: 'View Details',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    newsletter: 'Newsletter',
    subscribe: 'Subscribe',
  },
  ar: {
    home: 'الرئيسية',
    shop: 'المتجر',
    about: 'من نحن',
    blog: 'المدونة',
    contact: 'اتصل بنا',
    search: 'بحث',
    cart: 'عربة التسوق',
    emptyCart: 'عربة التسوق فارغة',
    addProducts: 'أضف بعض المنتجات للبدء',
    continueShopping: 'متابعة التسوق',
    subtotal: 'المجموع الفرعي',
    proceedCheckout: 'إتمام الطلب',
    categories: 'الأقسام',
    priceRange: 'نطاق السعر',
    allProducts: 'كل المنتجات',
    wholesale: 'طلبات الجملة؟',
    getQuote: 'احصل على عرض سعر',
    sortByLatest: 'الترتيب: الأحدث',
    sortByPriceAsc: 'السعر: من الأقل للأعلى',
    sortByPriceDesc: 'السعر: من الأعلى للأقل',
    sale: 'تخفيض',
    addToCart: 'أضف للسلة',
    viewDetails: 'عرض التفاصيل',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    newsletter: 'النشرة البريدية',
    subscribe: 'اشتراك',
  },
  fr: {
    home: 'Accueil',
    shop: 'Boutique',
    about: 'À Propos',
    blog: 'Blog',
    contact: 'Contact',
    search: 'Recherche',
    cart: 'Panier',
    emptyCart: 'Votre panier est vide',
    addProducts: 'Ajoutez des produits pour commencer',
    continueShopping: 'Continuer les achats',
    subtotal: 'Sous-total',
    proceedCheckout: 'Passer à la caisse',
    categories: 'Catégories',
    priceRange: 'Gamme de prix',
    allProducts: 'Tous les produits',
    wholesale: 'Commandes de gros ?',
    getQuote: 'Obtenir un devis',
    sortByLatest: 'Trier par: Plus récent',
    sortByPriceAsc: 'Prix: Croissant',
    sortByPriceDesc: 'Prix: Décroissant',
    sale: 'Solde',
    addToCart: 'Ajouter au panier',
    viewDetails: 'Voir les détails',
    privacyPolicy: 'Politique de confidentialité',
    termsOfService: 'Conditions d\'utilisation',
    newsletter: 'Bulletin',
    subscribe: 'S\'abonner',
  },
  ru: {
    home: 'Главная',
    shop: 'Магазин',
    about: 'О нас',
    blog: 'Блог',
    contact: 'Контакты',
    search: 'Поиск',
    cart: 'Корзина',
    emptyCart: 'Ваша корзина пуста',
    addProducts: 'Добавьте товары, чтобы начать',
    continueShopping: 'Продолжить покупки',
    subtotal: 'Подытог',
    proceedCheckout: 'Оформить заказ',
    categories: 'Категории',
    priceRange: 'Диапазон цен',
    allProducts: 'Все товары',
    wholesale: 'Оптовые заказы?',
    getQuote: 'Получить оптовую квоту',
    sortByLatest: 'Сортировка: Новейшие',
    sortByPriceAsc: 'Цена: по возрастанию',
    sortByPriceDesc: 'Цена: по убыванию',
    sale: 'Распродажа',
    addToCart: 'В корзину',
    viewDetails: 'Подробнее',
    privacyPolicy: 'Политика конфиденциальности',
    termsOfService: 'Условия использования',
    newsletter: 'Рассылка',
    subscribe: 'Подписаться',
  },
  es: {
    home: 'Inicio',
    shop: 'Tienda',
    about: 'Sobre Nosotros',
    blog: 'Blog',
    contact: 'Contacto',
    search: 'Buscar',
    cart: 'Carrito',
    emptyCart: 'Tu carrito está vacío',
    addProducts: 'Añade productos para empezar',
    continueShopping: 'Seguir comprando',
    subtotal: 'Subtotal',
    proceedCheckout: 'Proceder al pago',
    categories: 'Categorías',
    priceRange: 'Rango de precios',
    allProducts: 'Todos los productos',
    wholesale: '¿Pedidos al por mayor?',
    getQuote: 'Obtener cotización',
    sortByLatest: 'Ordenar por: Más reciente',
    sortByPriceAsc: 'Precio: Menor a Mayor',
    sortByPriceDesc: 'Precio: Mayor a Menor',
    sale: 'Oferta',
    addToCart: 'Añadir al carrito',
    viewDetails: 'Ver detalles',
    privacyPolicy: 'Política de Privacidad',
    termsOfService: 'Términos de Servicio',
    newsletter: 'Boletín',
    subscribe: 'Suscribirse',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLangState] = useState<Language>('en');

  useEffect(() => {
    // Check if there is a saved language in cookies or localStorage
    const saved = localStorage.getItem('emdaad_lang') as Language;
    if (saved && translations[saved]) {
      setLangState(saved);
      document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = saved;
    } else {
      // Default to English
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLangState(lang);
    localStorage.setItem('emdaad_lang', lang);
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    window.location.reload(); 
  };

  const t = (key: string) => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
