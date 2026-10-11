'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft, Search } from 'lucide-react';
import { useApp } from '@/lib/app-context';

export default function NotFound() {
  const { lang } = useApp();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#F4F8FB]">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 text-center shadow-sm space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#F9C91D]/20 text-[#10283B] flex items-center justify-center mx-auto">
          <Compass className="w-9 h-9 text-[#EF174F]" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold tracking-wider text-[#16A6A6]">ERROR 404</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#10283B]">
            {lang === 'bn'
              ? 'দুঃখিত! কাঙ্ক্ষিত পেজটি খুঁজে পাওয়া যায়নি'
              : 'Page Not Found'}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            {lang === 'bn'
              ? 'আপনি যে ভ্রমণ গন্তব্য বা পেজটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা এই প্রোটোটাইপে ভিন্ন লিংকে রয়েছে।'
              : 'The destination or page you are looking for may have moved or does not exist.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-bold text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'bn' ? 'হোমপেজে ফিরে যান' : 'Back to Homepage'}</span>
          </Link>
          <Link
            href="/tours/bangladesh"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#10283B] hover:bg-[#163852] text-white font-semibold text-sm transition-colors"
          >
            <Search className="w-4 h-4 text-[#F9C91D]" />
            <span>{lang === 'bn' ? 'সকল প্যাকেজ দেখুন' : 'Explore Packages'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
