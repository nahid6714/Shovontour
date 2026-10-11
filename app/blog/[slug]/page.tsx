'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import ResilientImage from '@/components/ResilientImage';

export default function BlogArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { lang, t, blogs } = useApp();

  const article = blogs.find((b) => b.slug === slug) || blogs[0];

  return (
    <div className="pb-16 space-y-10">
      <div className="bg-[#10283B] text-white py-12 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F9C91D] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'সকল ট্রাভেল গাইডে ফিরে যান' : 'Back to Travel Guides'}</span>
          </Link>

          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span className="text-[#16A6A6] font-bold">{t(article.category)}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishDate}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {t(article.readTime)}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
            {t(article.title)}
          </h1>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-slate-200 border border-slate-200 shadow-sm">
          <ResilientImage
            src={article.image}
            alt={t(article.title)}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-5 shadow-xs">
          {article.content.map((para, idx) => (
            <p
              key={idx}
              className="text-sm sm:text-base text-slate-700 leading-relaxed"
            >
              {t(para)}
            </p>
          ))}

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              {lang === 'bn' ? 'লেখক:' : 'Author:'} {article.author}
            </span>
            <Link
              href="/tours/bangladesh"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#F9C91D] text-[#10283B] font-bold text-xs"
            >
              {lang === 'bn' ? 'ট্যুর প্যাকেজগুলো দেখুন' : 'Explore Tour Packages'}
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
