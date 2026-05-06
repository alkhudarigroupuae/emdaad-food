import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL('https://emdaadfood.com'),
  title: {
    default: "Emdaad Food Trading | Authentic Syrian & Lebanese Food",
    template: "%s | Emdaad Food Trading",
  },
  description: "Emdaad Food Trading - Your trusted partner for premium authentic Syrian and Lebanese foodstuff in the UAE. Wholesale and retail orders available. منتجات غذائية سورية ولبنانية.",
  keywords: [
    "Syrian food", "Lebanese food", "Middle Eastern food",
    "wholesale food UAE", "Arabic food Dubai", "Emdaad Food Trading",
    "منتجات سورية", "منتجات لبنانية", "إمداد للتجارة الغذائية",
    "продукты питания ОАЭ", "alimentation syrienne", "comida siria libanesa",
  ],
  alternates: {
    canonical: "/",
    languages: {
      'en':       '/',
      'ar':       '/',
      'fr':       '/',
      'ru':       '/',
      'es':       '/',
      'x-default':'/',
    },
  },
  openGraph: {
    title: "Emdaad Food Trading | Authentic Syrian & Lebanese Food",
    description: "Premium authentic Syrian and Lebanese food products in the UAE. منتجات غذائية سورية ولبنانية.",
    url: "https://emdaadfood.com",
    siteName: "Emdaad Food Trading",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: '/icon.png',
        width: 800,
        height: 600,
        alt: 'Emdaad Food Trading Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Emdaad Food Trading",
    description: "Premium authentic Syrian and Lebanese food products in the UAE.",
    images: ['/icon.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with your Google Search Console code
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#f16122',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-gray-50 text-gray-800 flex flex-col min-h-screen">
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
