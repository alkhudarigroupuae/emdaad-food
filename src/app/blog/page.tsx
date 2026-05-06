import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Calendar, User, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/blogData';

export const metadata: Metadata = {
  title: 'Blog | Emdaad Food Trading',
  description: 'Read the latest news, recipes, and guides about authentic Syrian and Lebanese food.',
};

export default function BlogPage() {
  return (
    <>
      <div className="bg-dark text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1600&auto=format&fit=crop"
            alt="Blog Emdaad Food Trading"
            className="w-full h-full object-cover opacity-25"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center text-sm text-gray-400 gap-2 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-gray-300 max-w-2xl text-lg">Discover recipes, health benefits, and the rich history of Levantine cuisine.</p>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">
                <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden block">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                    {post.category}
                  </div>
                </Link>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {post.author}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="block group-hover:text-primary transition-colors">
                    <h2 className="text-xl font-bold text-dark mb-3 line-clamp-2 leading-snug">{post.title}</h2>
                  </Link>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors text-sm w-fit mt-auto"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
