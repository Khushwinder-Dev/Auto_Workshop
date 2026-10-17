"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Wrench, Search } from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/data/blogs";

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Maintenance", "Repair", "Safety", "Inspection"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCat =
      selectedCategory === "All" ||
      post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-white">
      {/* Page Hero Banner */}
      <section className="relative w-full h-[55vh] min-h-[420px] overflow-hidden flex flex-col justify-center items-center bg-black pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-hero.png"
            alt="Blogs Bab Al Bustan Auto Workshop"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#120505]/75 backdrop-brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>

        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Technical Insights
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight uppercase leading-tight text-white mb-4">
            Our <span className="text-red-500">Blogs</span>
          </h1>
          <p className="max-w-xl mx-auto text-zinc-300 text-sm md:text-base font-normal leading-relaxed">
            Essential car care advice, seasonal guides, and mechanical insights written by our Sharjah technical team.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-200">
          {/* Categories Pill Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-full pl-10 pr-4 py-2.5 text-xs sm:text-sm text-zinc-900 outline-none focus:border-red-600 focus:bg-white transition-all"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 rounded-2xl border border-zinc-200">
            <Wrench className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-zinc-900 uppercase">No articles found</h3>
            <p className="text-zinc-500 text-sm mt-1">Try a different search term or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl overflow-hidden border border-zinc-200 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
              >
                <div className="relative h-60 w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-md uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-red-600" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <Link href={`/blogs/${post.slug}`}>
                      <h2 className="text-lg sm:text-xl font-bold text-zinc-900 uppercase leading-snug mb-3 group-hover:text-red-600 transition-colors">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-100">
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Professional Car Care You Can Trust CTA */}
      <section className="bg-[#050505] py-20 px-6 border-t border-zinc-900 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-red-500 text-xs font-black uppercase tracking-[0.25em] mb-3 block">
            Certified Workshop
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight mb-6">
            Professional Car Care You Can Trust
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
            Don&#39;t let small engine or brake warning signs turn into costly breakdowns. Book your vehicle inspection with Bab Al Bustan in Sharjah Industrial Area 5.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="btn-primary text-white font-bold text-xs uppercase tracking-widest px-10 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform"
            >
              Book an Appointment
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest px-10 py-4 rounded-full border border-white/20 transition-all"
            >
              Contact Workshop
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
