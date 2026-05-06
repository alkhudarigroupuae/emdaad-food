import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-gray-300 pt-16 pb-8 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="mb-6">
              <Image
                src="/logo-white.png"
                alt="Emdaad Food Trading"
                width={200}
                height={96}
                className="h-24 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted partner for authentic Syrian and Lebanese foodstuff. Delivering premium quality ingredients directly from the Levant to your business.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-sm font-bold">
                f
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-sm font-bold">
                in
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-sm font-bold">
                𝕏
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-base mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span> Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/shop', label: 'Shop' },
                { href: '/blog', label: 'Blog' },
                { href: '/contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 text-sm">
                    <ChevronRight className="w-3.5 h-3.5" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-base mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span> Top Categories
            </h4>
            <ul className="space-y-3">
              {[
                'Dairy & Cheese',
                'Olives & Olive Oil',
                'Tea & Coffee',
                'Pickles & Preserves',
                'Spices & Herbs',
              ].map((cat) => (
                <li key={cat}>
                  <Link href="/shop" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 text-sm">
                    <ChevronRight className="w-3.5 h-3.5" /> {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-base mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span> Newsletter
            </h4>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary transition-colors w-full placeholder:text-gray-500"
              />
              <button
                type="submit"
                className="bg-primary text-white font-bold py-3 rounded-xl hover:bg-secondary transition-colors w-full text-sm shadow-lg shadow-primary/20"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Emdaad Food Trading. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
