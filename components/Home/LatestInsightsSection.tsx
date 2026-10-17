"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Wrench } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogs";

export default function LatestInsightsSection() {
  const featured = BLOG_POSTS[1] || BLOG_POSTS[0];
  const sideArticles = BLOG_POSTS.filter((b) => b.slug !== featured.slug).slice(0, 4);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-red-600 text-xs font-black uppercase tracking-[0.25em] mb-3 block">
            Automotive Knowledge
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-[900] text-zinc-900 leading-tight uppercase tracking-tight mb-4">
            Latest Insights
          </h2>
          <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto">
            We cover essential tips and technical guides to help you keep your vehicle performing at its highest level in the UAE.
          </p>
        </div>

        {/* 2-Column Grid: Featured Post on Left, Side Posts on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: Featured Large Card */}
          <div className="border border-zinc-200/90 rounded-2xl overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="p-8">
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold mb-4">
                <span>{featured.date}</span>
                <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                <span className="text-red-600">Bab Al Bustan Workshop</span>
              </div>

              <Link href={`/blogs/${featured.slug}`}>
                <h3 className="text-zinc-900 font-bold text-2xl sm:text-3xl leading-tight mb-6 group-hover:text-red-600 transition-colors uppercase">
                  {featured.title}
                </h3>
              </Link>

              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black mb-6">
                <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-lg uppercase tracking-wider">
                  <Wrench className="w-3 h-3" />
                  <span>{featured.category}</span>
                </div>
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                {featured.excerpt}
              </p>

              <Link
                href={`/blogs/${featured.slug}`}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: Stack of 4 Side Articles */}
          <div className="flex flex-col gap-4">
            {sideArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blogs/${article.slug}`}
                className="group p-5 bg-zinc-50 border border-zinc-200/80 rounded-2xl flex gap-5 items-center hover:bg-white hover:border-red-600/30 hover:shadow-md transition-all duration-300"
              >
                <div className="relative w-28 h-24 sm:w-32 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-zinc-900">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="flex flex-col justify-center flex-grow">
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium mb-1">
                    <span className="text-red-600 font-bold uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  <h4 className="text-zinc-900 font-bold text-sm sm:text-base leading-snug group-hover:text-red-600 transition-colors uppercase line-clamp-2">
                    {article.title}
                  </h4>

                  <span className="mt-2 text-xs font-bold text-zinc-500 group-hover:text-red-600 inline-flex items-center gap-1 transition-colors">
                    Read More <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Insights Button */}
        <div className="text-center mt-12">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 btn-primary px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-red-600/20"
          >
            <span>View All Insights & Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
