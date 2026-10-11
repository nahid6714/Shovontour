'use client';

import React from 'react';
import { useApp } from '@/lib/app-context';
import { GALLERY_ITEMS } from '@/lib/mock-data';
import ResilientImage from '@/components/ResilientImage';

export default function AdminGalleryPage() {
  const { lang, t } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#10283B]">
          {lang === 'bn' ? 'ফটো গ্যালারি ম্যানেজমেন্ট (ডেমো)' : 'Travel Photo Gallery Assets'}
        </h1>
        <p className="text-xs text-slate-500">
          {lang === 'bn'
            ? 'পাবলিক গ্যালারিতে প্রদর্শিত হাই-রেজোলিউশন ট্রাভেল ফটোগ্রাফি।'
            : 'High-resolution destination photographs used across the prototype.'}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {GALLERY_ITEMS.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
          >
            <div className="aspect-[4/3]">
              <ResilientImage
                src={item.image}
                alt={t(item.title)}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 text-xs">
              <p className="font-bold text-[#10283B] truncate">{t(item.title)}</p>
              <p className="text-slate-400 text-[11px]">{t(item.location)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
