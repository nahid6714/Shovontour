'use client';

import React from 'react';
import { useApp } from '@/lib/app-context';
import ResilientImage from '@/components/ResilientImage';

export default function AdminCategoriesPage() {
  const { lang, t, categories, showToast } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#10283B]">
          {lang === 'bn' ? 'ট্যুর ক্যাটাগরি তালিকা (ডেমো)' : 'Tour Categories (Demo Catalog)'}
        </h1>
        <p className="text-xs text-slate-500">
          {lang === 'bn'
            ? 'হোমপেজ ও ফিল্টারে ব্যবহৃত ৮টি ট্যুর ক্যাটাগরি।'
            : '8 primary travel categories displayed on the homepage and search filters.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
          >
            <div className="aspect-[16/9] bg-slate-100">
              <ResilientImage
                src={cat.image}
                alt={t(cat.name)}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <p className="text-xs font-mono text-[#16A6A6]">slug: {cat.slug}</p>
              <h3 className="text-sm font-bold text-[#10283B]">{t(cat.name)}</h3>
              <p className="text-xs text-slate-500">{t(cat.subtitle)}</p>
              <button
                type="button"
                onClick={() =>
                  showToast(
                    lang === 'bn'
                      ? `${t(cat.name)} ক্যাটাগরি সক্রিয় আছে`
                      : `${t(cat.name)} category is active`,
                    'info'
                  )
                }
                className="w-full mt-2 py-2 rounded-xl bg-[#F4F8FB] hover:bg-slate-200 text-xs font-bold text-[#10283B]"
              >
                Active in Catalog ({cat.count} items)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
