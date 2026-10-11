'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ShieldAlert, ArrowRight } from 'lucide-react';
import { useApp } from '@/lib/app-context';

export default function ReviewsPage() {
  const { lang, t, reviews } = useApp();

  return (
    <div className="pb-16 space-y-10">
      <div className="bg-[#10283B] text-white py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <p className="text-xs font-bold text-[#F9C91D] tracking-wider">
            {lang === 'bn'
              ? 'ডেমো কাস্টমার রিভিউ · নমুনা কন্টেন্ট (DEMO TESTIMONIALS)'
              : 'SAMPLE CUSTOMER TESTIMONIALS · DEMO CONTENT ONLY'}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            {lang === 'bn'
              ? 'গ্রাহক অভিজ্ঞতা ও রিভিউ প্রিভিউ (ডেমো)'
              : 'Customer Reviews & Testimonials (Sample Demo Content)'}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-xs text-amber-950">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
          <span>
            {lang === 'bn'
              ? 'বিজ্ঞপ্তি: নিচে প্রদর্শিত সকল রিভিউ শুধুমাত্র প্রোটোটাইপ লেআউট পরীক্ষার জন্য যুক্ত করা নমুনা ডেমো কন্টেন্ট। এগুলো কোনো যাচাইকৃত গ্রাহকের বক্তব্য নয়।'
              : 'Notice: All testimonials displayed below are fictional sample entries created strictly for frontend layout evaluation.'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1 text-[#F9C91D]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-mono">{rev.date}</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{t(rev.comment)}</p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-sm font-bold text-[#10283B]">{rev.customerName}</p>
                <p className="text-xs text-slate-500">
                  {t(rev.roleOrCity)} · {t(rev.tourTitle)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 text-center">
          <Link
            href="/tours/bangladesh"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F9C91D] text-[#10283B] font-extrabold text-xs sm:text-sm"
          >
            <span>{lang === 'bn' ? 'ট্যুর প্যাকেজগুলো দেখুন' : 'Explore Tour Packages'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
