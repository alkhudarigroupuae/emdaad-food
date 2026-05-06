import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Lock, Database, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Emdaad Food Trading at https://emdaadfood.com/.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

const sections = [
  {
    icon: <Database className="w-6 h-6 text-primary" />,
    title: 'Information We Collect',
    text: 'We may collect information you provide through contact forms, checkout flows, quote requests, newsletter subscriptions, and direct communication with Emdaad Food Trading.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: 'How We Use Information',
    text: 'We use collected information to respond to inquiries, process orders, improve customer service, manage business communication, and support website functionality and security.',
  },
  {
    icon: <Lock className="w-6 h-6 text-primary" />,
    title: 'Cookies and Analytics',
    text: 'This website may use cookies, analytics tools, and similar technologies to understand performance, improve user experience, and support secure sessions on https://emdaadfood.com/.',
  },
  {
    icon: <Mail className="w-6 h-6 text-primary" />,
    title: 'Contact and Requests',
    text: 'If you have privacy-related questions or want to request an update or removal of your personal information, contact us at info@emdaadfood.com.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="bg-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-gray-400 gap-2 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Privacy Policy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-300 max-w-3xl text-lg">
            This Privacy Policy explains how Emdaad Food Trading collects, uses, and protects information when you visit or interact with https://emdaadfood.com/.
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
              <h2 className="text-2xl font-bold text-dark mb-3">Data Protection</h2>
              <p className="text-gray-600 leading-relaxed">
                We apply reasonable technical and organizational measures to protect information handled through our website. No internet transmission or storage system is guaranteed to be fully secure, but we work to keep data protected and access limited to appropriate business use.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-dark mb-3">Third-Party Services</h2>
              <p className="text-gray-600 leading-relaxed">
                The website may rely on third-party tools or platforms for hosting, analytics, payments, or communication. Those services may process data according to their own policies when required to provide website functionality.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-dark mb-3">Updates to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this page from time to time to reflect changes in operations, services, or legal requirements. Continued use of the website after updates means you accept the revised policy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
