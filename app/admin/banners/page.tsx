'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/app-context';
import ResilientImage from '@/components/ResilientImage';

export default function AdminBannersPage() {
  const { lang, t, settings } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#10283B]">
            {lang === 'bn' ? 'হোমপেজ স্প্লিট হিরো ব্যানার প্রিভিউ' : 'Homepage Split Hero Banners'}
          </h1>
          <p className="text-xs text-slate-500">
            {lang === 'bn'
              ? 'বাংলাদেশ ও আন্তর্জাতিক ট্যুরের স্প্লিট ব্যানার কনফিগারেশন।'
              : 'Preview and manage the domestic and international split hero panels.'}
          </p>
        </div>
        <Link
          href="/admin/settings"
          className="px-4 py-2 rounded-xl bg-[#F9C91D] text-[#10283B] font-extrabold text-xs"
        >
          Edit Banner Text
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="aspect-[16/9]">
            <ResilientImage
              src="/images/hero_bangladesh.jpg"
              alt="Bangladesh Hero"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5 space-y-1">
            <span className="text-xs font-bold text-[#16A6A6]">LEFT SPLIT PANEL</span>
            <h3 className="text-lg font-extrabold text-[#10283B]">
              {t(settings.heroBangladeshHeading)}
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="aspect-[16/9]">
            <ResilientImage
              src="/images/hero_international.jpg"
              alt="International Hero"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5 space-y-1">
            <span className="text-xs font-bold text-[#EF174F]">RIGHT SPLIT PANEL</span>
            <h3 className="text-lg font-extrabold text-[#10283B]">
              {t(settings.heroInternationalHeading)}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
