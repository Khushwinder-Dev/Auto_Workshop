import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Calendar, Clock, ArrowLeft, ArrowRight, Wrench, CheckCircle } from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/data/blogs";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Blog Not Found | Bab Al Bustan" };

  return {
    title: `${post.title} | Bab Al Bustan Auto Maintenance`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const moreInsights = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 4);

  return (
    <article className="bg-white min-h-screen">
      {/* Article Hero Banner */}
      <div className="relative h-[45vh] md:h-[55vh] w-full bg-black pt-20">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-12 w-full">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white uppercase font-bold tracking-widest mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Blogs</span>
            </Link>

            <div>
              <span className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-4 inline-block">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight uppercase tracking-tight max-w-4xl drop-shadow-lg">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Article Body */}
          <div className="lg:col-span-8">
            {/* Author Meta */}
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-zinc-100">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center font-black text-xs">
                BAB
              </div>
              <div>
                <p className="text-zinc-900 font-bold text-sm uppercase tracking-tight">
                  Bab Al Bustan Technical Team
                </p>
                <div className="flex items-center gap-2 text-xs text-zinc-400 uppercase mt-0.5">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Content Paragraphs */}
            <div className="prose prose-lg max-w-none text-zinc-700 leading-relaxed space-y-6 text-base sm:text-lg">
              {post.content.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Post CTA Box */}
            <div className="mt-12 p-8 bg-zinc-50 border border-zinc-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-bold text-zinc-900 text-lg uppercase tracking-tight">
                  Have questions about this article?
                </h3>
                <p className="text-zinc-500 text-xs sm:text-sm mt-1">
                  Our certified mechanics in Sharjah Industrial Area 5 are ready to help.
                </p>
              </div>

              <Link
                href="/booking"
                className="btn-primary text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg shadow-red-600/30 whitespace-nowrap"
              >
                Book Inspection
              </Link>
            </div>
          </div>

          {/* Right Aside: More Insights & Booking Callout */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="sticky top-28 space-y-10">
              {/* More Insights */}
              <div>
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-zinc-200">
                  <div className="w-2 h-7 bg-red-600 rounded-xs" />
                  <h2 className="text-xl font-black text-zinc-900 uppercase tracking-tight">
                    More Insights
                  </h2>
                </div>

                <div className="space-y-6">
                  {moreInsights.map((other) => (
                    <Link
                      key={other.slug}
                      href={`/blogs/${other.slug}`}
                      className="group flex gap-4 items-start"
                    >
                      <div className="relative w-24 h-20 flex-shrink-0 overflow-hidden rounded-xl bg-zinc-100 border border-zinc-200">
                        <Image
                          src={other.image}
                          alt={other.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider mb-1">
                          {other.category}
                        </span>
                        <h3 className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2 uppercase">
                          {other.title}
                        </h3>
                        <span className="text-[10px] text-zinc-400 mt-1 uppercase font-medium">
                          {other.date}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Need a Repair Widget */}
              <div className="bg-zinc-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl border border-zinc-800">
                <div className="relative z-10">
                  <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.25em] mb-2 block">
                    Immediate Support
                  </span>
                  <h3 className="text-2xl font-black uppercase mb-3 tracking-tight">
                    Need a Repair?
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
                    Get expert car maintenance and diagnostics at our Sharjah Industrial Area 5 workshop.
                  </p>
                  <Link
                    href="/booking"
                    className="inline-block btn-primary text-white text-xs font-black px-6 py-3.5 rounded-xl uppercase tracking-widest shadow-lg shadow-red-600/30 transition-all hover:scale-105"
                  >
                    Appointment
                  </Link>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-600/15 rounded-full blur-2xl" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
