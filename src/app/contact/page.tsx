import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Emdaad Food Trading',
  description: 'Get in touch with Emdaad Food Trading for wholesale inquiries, partnerships, and more. Located in Dubai, UAE.',
};

export default function Contact() {
  return (
    <>
      <div className="bg-dark text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1600&auto=format&fit=crop"
            alt="Contact Emdaad Food Trading"
            className="w-full h-full object-cover opacity-25"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center text-sm text-gray-400 gap-2 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Contact Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-gray-300 max-w-2xl text-lg">We would love to hear from you. Reach out for wholesale inquiries, partnerships, or any questions.</p>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: <Phone className="w-7 h-7 text-primary" />,
                title: 'Phone',
                value: '+971 50 114 1181',
                sub: 'Call us directly',
                href: 'tel:+971501141181',
              },
              {
                icon: <Mail className="w-7 h-7 text-primary" />,
                title: 'Email',
                value: 'info@emdaadfood.com',
                sub: 'Reply within 24 hours',
                href: 'mailto:info@emdaadfood.com',
              },
              {
                icon: <MapPin className="w-7 h-7 text-primary" />,
                title: 'Location',
                value: 'Dubai, UAE',
                sub: 'United Arab Emirates',
                href: 'https://maps.google.com/?q=Dubai,UAE',
              },
              {
                icon: <Clock className="w-7 h-7 text-primary" />,
                title: 'Working Hours',
                value: 'Mon – Sat',
                sub: '9:00 AM – 6:00 PM',
                href: null,
              },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-dark mb-1">{item.title}</h3>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-gray-700 font-medium hover:text-primary transition-colors block">{item.value}</a>
                ) : (
                  <p className="text-gray-700 font-medium">{item.value}</p>
                )}
                <p className="text-sm text-gray-400 mt-1">{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl">
                <h2 className="text-2xl font-bold text-dark mb-2">Send us a Message</h2>
                <p className="text-gray-500 mb-8">Fill out the form below and we will get back to you shortly.</p>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="+971 50 000 0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-700">
                      <option value="">Select a subject</option>
                      <option value="wholesale">Wholesale Inquiry</option>
                      <option value="retail">Retail Order</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={5}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>
                  <button
                    type="button"
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-secondary transition-colors shadow-lg shadow-primary/30 text-lg flex items-center justify-center gap-2"
                  >
                    Send Message <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.1799870085!2d55.2707828!3d25.2048493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Emdaad Food Trading Location - Dubai, UAE"
                ></iframe>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-dark mb-6">Quick Contact</h3>
                <div className="space-y-4">
                  <a href="tel:+971501141181" className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-primary/5 hover:border-primary/20 border border-transparent transition-all group">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Call us</p>
                      <p className="text-dark font-semibold">+971 50 114 1181</p>
                    </div>
                  </a>

                  <a href="mailto:info@emdaadfood.com" className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-primary/5 hover:border-primary/20 border border-transparent transition-all group">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Email us</p>
                      <p className="text-dark font-semibold">info@emdaadfood.com</p>
                    </div>
                  </a>

                  <a href="https://wa.me/971501141181" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl hover:bg-green-100 border border-green-100 transition-all group">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">W</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">WhatsApp</p>
                      <p className="text-dark font-semibold">Chat with us</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
