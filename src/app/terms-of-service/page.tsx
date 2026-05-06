import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, FileText, ShieldCheck, ShoppingBag, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Emdaad Food Trading at https://emdaadfood.com/.',
  alternates: {
    canonical: '/terms-of-service',
  },
};

const sections = [
  {
    icon: <FileText className="w-6 h-6 text-primary" />,
    title: 'Website Use',
    text: 'By using https://emdaadfood.com/, you agree to use the website lawfully and in a way that does not harm the platform, its users, or business operations of Emdaad Food Trading.',
  },
  {
    icon: <ShoppingBag className="w-6 h-6 text-primary" />,
    title: 'Products and Orders',
    text: 'Product details, pricing, and availability may change without prior notice. Orders remain subject to review, confirmation, stock availability, and any applicable payment or delivery terms.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: 'Intellectual Property',
    text: 'Website content, branding, design elements, text, and media published by Emdaad Food Trading may not be copied, redistributed, or reused without prior written permission.',
  },
  {
    icon: <AlertCircle className="w-6 h-6 text-primary" />,
    title: 'Liability',
    text: 'We aim to keep information accurate and the website available, but we do not guarantee uninterrupted service, error-free content, or suitability for every business purpose.',
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <div className="bg-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-gray-400 gap-2 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Terms of Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-300 max-w-3xl text-lg">
            These Terms of Service govern access to and use of https://emdaadfood.com/ and related services provided by Emdaad Food Trading.
          </p>
        </div>
      </div>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {sections.map((section) => (
              <div key={section.title} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  {section.icon}
                </div>
                <h2 className="text-xl font-bold text-dark mb-3">{section.title}</h2>
                <p className="text-gray-600 leading-relaxed">{section.text}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-dark mb-3">Payments and Fulfillment</h2>
              <p className="text-gray-600 leading-relaxed">
                Checkout, payment processing, and order fulfillment may be handled through integrated commerce systems. Completion of an order does not create a guarantee until payment and availability are confirmed.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-dark mb-3">External Links and Third Parties</h2>
              <p className="text-gray-600 leading-relaxed">
                This website may contain links or integrations operated by third parties. We are not responsible for the content, terms, or privacy practices of external services outside https://emdaadfood.com/.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-dark mb-3">Contact</h2>
              <p className="text-gray-600 leading-relaxed">
                For legal or service-related questions regarding these terms, contact Emdaad Food Trading at info@emdaadfood.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
