'use client';

import React, { useState } from 'react';
import { MapPin, X } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { GALLERY_ITEMS } from '@/lib/mock-data';
import ResilientImage from '@/components/ResilientImage';

export default function GalleryPage() {
  const { lang, t } = useApp();
  const [filter, setFilter] = useState<'all' | 'bangladesh' | 'international'>('all');
  const [lightboxItem, setLightboxItem] = useState<(typeof GALLERY_ITEMS)[0] | null>(null);

  const items = GALLERY_ITEMS.filter(
    (item) => filter === 'all' || item.category === filter
  );

  return (
    <div className="pb-16 space-y-10">
      <div className="bg-[#10283B] text-white py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <p className="text-xs font-bold text-[#F9C91D] tracking-wider">
            {lang === 'bn' ? 'ট্রাভেল ফটো গ্যালারি' : 'DESTINATION PHOTO GALLERY'}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            {lang === 'bn'
              ? 'দেশ ও বিদেশের মনোরম ভ্রমণ গন্তব্যের ছবি'
              : 'Scenic Travel Moments Across Bangladesh & Abroad'}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Filter Segmented Control */}
        <div className="inline-flex items-center gap-1 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          {(['all', 'bangladesh', 'international'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                filter === tab
                  ? 'bg-[#10283B] text-[#F9C91D]'
                  : 'text-slate-600 hover:text-[#10283B]'
              }`}
            >
              {tab === 'all'
                ? lang === 'bn'
                  ? 'সব ছবি'
                  : 'All Photos'
                : tab === 'bangladesh'
                ? lang === 'bn'
                  ? 'বাংলাদেশ'
                  : 'Bangladesh'
                : lang === 'bn'
                ? 'আন্তর্জাতিক'
                : 'International'}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxItem(item)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 border border-slate-200 text-left shadow-xs hover:shadow-xl transition-all"
            >
              <ResilientImage
                src={item.image}
                alt={t(item.title)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10283B]/85 via-transparent to-transparent flex flex-col justify-end p-4">
                <p className="text-xs font-bold text-white">{t(item.title)}</p>
                <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#F9C91D]" />
                  <span>{t(item.location)}</span>
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl"
          >
            <div className="relative aspect-[16/9] bg-slate-900">
              <ResilientImage
                src={lightboxItem.image}
                alt={t(lightboxItem.title)}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#10283B]">
                  {t(lightboxItem.title)}
                </h3>
                <p className="text-xs text-slate-500">{t(lightboxItem.location)}</p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-[#10283B]"
              >
                {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
