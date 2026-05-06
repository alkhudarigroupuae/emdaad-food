import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Award, Users, Globe, Leaf, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Emdaad Food Trading',
  description: 'Learn about Emdaad Food Trading - Your trusted partner for authentic Syrian and Lebanese food products in the UAE.',
};

export default function About() {
  return (
    <>
      <div className="bg-dark text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516100882582-96c3a05fe590?q=80&w=1600&auto=format&fit=crop"
            alt="About Emdaad Food Trading"
            className="w-full h-full object-cover opacity-25"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center text-sm text-gray-400 gap-2 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">About Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Emdaad Food Trading</h1>
          <p className="text-gray-300 max-w-2xl text-lg">Your trusted partner for authentic Middle Eastern foodstuff in the UAE.</p>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <span className="text-primary font-bold uppercase text-sm tracking-wider">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-dark">Bringing Authentic Flavors to Your Table</h2>
              <div className="w-16 h-1 bg-primary mb-8 rounded-full"></div>
              <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                <p>Emdaad Food Trading was established with a clear vision: to bring the authentic taste of Syrian and Lebanese cuisine to businesses and consumers across the UAE.</p>
                <p>We source only the highest quality ingredients directly from the heart of the Levant, ensuring that every product we distribute meets our strict standards for authenticity and flavor.</p>
                <p>From premium olive oils and traditional cheeses to aromatic teas and spices, our extensive catalog represents the rich culinary heritage of the Middle East.</p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6">
                {[
                  { label: 'Products', value: '500+' },
                  { label: 'Happy Clients', value: '200+' },
                  { label: 'Years Experience', value: '10+' },
                  { label: 'UAE Cities', value: '7+' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-gray-50 p-5 rounded-2xl border border-gray-100 text-center">
                    <div className="text-3xl font-extrabold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="relative">
                <div className="absolute inset-0 bg-primary translate-x-4 translate-y-4 rounded-3xl opacity-20"></div>
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop"
                  alt="About Emdaad Food Trading"
                  className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3] relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-dark mb-4">Our Values</h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do at Emdaad Food Trading</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Award className="w-8 h-8 text-primary group-hover:text-white transition-colors" />,
                title: 'Quality First',
                desc: 'We never compromise on quality. Every product is carefully selected and tested before reaching our customers.',
              },
              {
                icon: <Leaf className="w-8 h-8 text-primary group-hover:text-white transition-colors" />,
                title: 'Authenticity',
                desc: 'Our products are sourced directly from trusted suppliers in Syria and Lebanon, preserving true heritage flavors.',
              },
              {
                icon: <Users className="w-8 h-8 text-primary group-hover:text-white transition-colors" />,
                title: 'Partnership',
                desc: 'We build long-term relationships with our clients, offering personalized service and flexible wholesale solutions.',
              },
              {
                icon: <Globe className="w-8 h-8 text-primary group-hover:text-white transition-colors" />,
                title: 'Reliability',
                desc: 'Consistent supply, timely delivery, and transparent communication are the foundation of our operations.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-dark mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1625134673337-519d4d10b313?q=80&w=1000&auto=format&fit=crop"
                alt="Our Products"
                className="rounded-3xl shadow-xl w-full object-cover aspect-[4/3]"
              />
            </div>
            <div className="flex-1">
              <span className="text-primary font-bold uppercase text-sm tracking-wider">What We Offer</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-dark">Premium Product Categories</h2>
              <div className="w-16 h-1 bg-primary mb-8 rounded-full"></div>
              <div className="space-y-4">
                {[
                  'Dairy & Cheese – Authentic Levantine varieties',
                  'Olives & Olive Oil – Cold-pressed premium quality',
                  'Tea & Coffee – Traditional aromatic blends',
                  'Pickles & Preserves – Traditional homemade style',
                  'Spices & Herbs – Fresh and aromatic selections',
                  'Specialty Foods – Unique Middle Eastern products',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/shop"
                className="mt-8 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-secondary transition-colors shadow-lg shadow-primary/20 inline-flex items-center gap-2"
              >
                Browse Our Catalog <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Partner with Us?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Whether you are a retailer, restaurant, or food distributor, we have the right solution for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-xl inline-flex items-center gap-2"
            >
              Get in Touch <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/shop"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
