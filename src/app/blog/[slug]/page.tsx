import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Calendar, User, ArrowLeft } from 'lucide-react';
import { getPostBySlug } from '@/lib/blogData';
import { notFound } from 'next/navigation';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found | Emdaad Food Trading' };
  }

  return {
    title: `${post.title} | Emdaad Food Trading`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="bg-dark text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center pt-8">
          <div className="flex items-center justify-center text-sm text-gray-400 gap-2 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{post.category}</span>
          </div>
          <span className="inline-block bg-primary/20 text-primary border border-primary/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight max-w-3xl mx-auto">{post.title}</h1>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-300">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {post.date}</span>
            <span className="flex items-center gap-2"><User className="w-4 h-4 text-primary" /> {post.author}</span>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden mb-12 shadow-xl -mt-32 relative z-20 border-4 border-white">
            <img
              src={post.image}
              alt={post.title}
              className="w-full aspect-[21/9] object-cover"
            />
          </div>
          
          <div 
            className="prose prose-lg prose-primary max-w-none prose-headings:font-bold prose-headings:text-dark prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-secondary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-medium transition-colors">
              <ArrowLeft className="w-5 h-5" /> Back to all articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
