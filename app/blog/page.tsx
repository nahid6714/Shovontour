'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import ResilientImage from '@/components/ResilientImage';

export default function BlogListingPage() {
  const { lang, t, blogs } = useApp();

  return (
    <div className="pb-16 space-y-12">
      <div className="bg-[#10283B] text-white py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <p className="text-xs font-bold text-[#F9C91D] tracking-wider">
            {lang === 'bn' ? 'ট্রাভেল গাইড ও ভ্রমণ ব্লগ' : 'TRAVEL GUIDE & EDITORIAL'}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            {lang === 'bn'
              ? 'ভ্রমণ প্রস্তুতি, ভিসা চেকলিস্ট ও গন্তব্য গাইড'
              : 'Travel Guides, Visa Checklists & Destination Tips'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
            {lang === 'bn'
              ? 'দেশ ও বিদেশে ভ্রমণের আগে প্রয়োজনীয় প্রস্তুতি, বাজেট পরিকল্পনা এবং ভিসা আবেদনের নির্দেশনামূলক প্রবন্ধ।'
              : 'Practical travel tips, packing checklists, and visa preparation guides.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-lg transition-shadow"
          >
            <div>
              <div className="aspect-[16/10] bg-slate-100 overflow-hidden">
                <ResilientImage
                  src={article.image}
                  alt={t(article.title)}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#16A6A6] font-medium">
                  <span>{t(article.category)}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-500">{t(article.readTime)}</span>
                </div>
                <h2 className="text-lg font-extrabold text-[#10283B] leading-snug">
                  <Link href={`/blog/${article.slug}`} className="hover:text-[#16A6A6]">
                    {t(article.title)}
                  </Link>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {t(article.excerpt)}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">{article.publishDate}</span>
              <Link
                href={`/blog/${article.slug}`}
                className="inline-flex items-center gap-1 font-bold text-[#10283B] hover:text-[#EF174F]"
              >
                <span>{lang === 'bn' ? 'সম্পূর্ণ পড়ুন' : 'Read Article'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
