'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { useApp } from '@/lib/app-context';

export default function AdminReviewsPage() {
  const { lang, t, reviews } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#10283B]">
          {lang === 'bn'
            ? 'কাস্টমার রিভিউ মডারেশন (ডেমো কন্টেন্ট)'
            : 'Customer Reviews (Sample Demo Content)'}
        </h1>
        <p className="text-xs text-slate-500">
          {lang === 'bn'
            ? 'হোমপেজ ও রিভিউ পেজে প্রদর্শিত নমুনা টেস্টিমোনিয়াল তালিকা।'
            : 'Sample testimonials marked clearly as demo content.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs text-xs"
          >
            <div className="flex items-center justify-between">
              <strong className="text-[#10283B] text-sm">{r.customerName}</strong>
              <span className="inline-flex items-center gap-1 text-[#F9C91D] font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                {r.rating}.0
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed">{t(r.comment)}</p>
            <p className="text-slate-400 font-mono">{r.date} · Demo Approved</p>
          </div>
        ))}
      </div>
    </div>
  );
}
