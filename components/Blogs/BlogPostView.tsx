"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { getBlogPosts, BLOG_POSTS } from "@/data/blogs";

interface Props {
  slug: string;
}

export default function BlogPostView({ slug }: Props) {
  const { isArabic, t } = useLanguage();
  const allPosts = getBlogPosts(isArabic);
  const post = allPosts.find((p) => p.slug === slug) || BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return null;
  }

  const otherPosts = allPosts.filter((p) => p.slug !== post.slug);

  return (
    <article className="bg-white min-h-screen">
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <Image
          alt={post.title}
          fill
          className="object-cover"
          src={post.image}
          priority
        />
        <div className="absolute inset-0 bg-black/60 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-12 w-full">
            <span className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-6 inline-block">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight uppercase tracking-tighter max-w-4xl">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-zinc-100">
              <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center font-bold text-zinc-400 text-xs">
                BAB
              </div>
              <div>
                <p className="text-zinc-900 font-bold text-sm uppercase tracking-tight">
                  {isArabic ? "الفريق الفني المتخصص" : "Technical Team"}
                </p>
                <div className="flex items-center gap-3 text-zinc-400 text-xs uppercase">
                  <span>{post.date}</span>
                  {post.readTime && <span>• {post.readTime}</span>}
                </div>
              </div>
            </div>
            <div className="prose prose-lg max-w-none text-zinc-800 leading-relaxed prose-headings:text-zinc-900 prose-headings:font-black prose-headings:uppercase prose-strong:text-zinc-900 prose-h3:text-2xl prose-img:rounded-2xl">
              {post.content.map((paragraph, idx) => (
                <p key={idx} className="mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-12">
            <div className="sticky top-24">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-8 bg-red-600" />
                <h2 className="text-2xl font-black text-zinc-900 uppercase tracking-tighter">
                  {isArabic ? "المزيد من المقالات" : "More Insights"}
                </h2>
              </div>
              <div className="space-y-8">
                {otherPosts.map((p) => (
                  <Link
                    key={p.slug}
                    className="group flex gap-4 items-start"
                    href={`/blogs/${p.slug}`}
                  >
                    <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                      <Image
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        src={p.image}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1">
                        {p.category}
                      </span>
                      <h3 className="text-sm font-bold text-zinc-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2 uppercase">
                        {p.title}
                      </h3>
                      <p className="text-[10px] text-zinc-400 mt-2 uppercase font-medium">
                        {p.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-12 bg-zinc-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-black uppercase mb-2">
                    {isArabic ? "هل تحتاج إلى صيانة لسيارتك؟" : "Need a Repair?"}
                  </h3>
                  <p className="text-zinc-400 text-xs mb-6 leading-relaxed">
                    {isArabic
                      ? "احصل على خدمات صيانة احترافية في ورشتنا بالمنطقة الصناعية 5، الشارقة."
                      : "Get expert car maintenance at our Sharjah Industrial Area 5 workshop."}
                  </p>
                  <Link
                    className="inline-block bg-red-600 hover:bg-red-700 text-white text-[10px] font-black px-6 py-3 rounded-lg uppercase tracking-widest transition-all"
                    href="/booking"
                  >
                    {t.common.bookAppointment}
                  </Link>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
