'use client';

import React from 'react';
import { Tag } from 'lucide-react';
import { useApp } from '@/lib/app-context';

export default function AdminOffersPage() {
  const { lang, showToast } = useApp();

  const demoOffers = [
    {
      code: 'THURSDAY-DEMO',
      title: 'Thursday Weekend Group Tour Highlight',
      discount: 'Sample Group Rate',
      status: 'Active Demo',
    },
    {
      code: 'FAMILY-COMBO',
      title: 'Family 4+ Travelers Package Bundle',
      discount: 'Custom Child Seat Option',
      status: 'Active Demo',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#10283B]">
          {lang === 'bn' ? 'প্রমোশনাল অফার ও ক্যাম্পেইন (ডেমো)' : 'Promotional Campaigns (Demo)'}
        </h1>
        <p className="text-xs text-slate-500">
          {lang === 'bn'
            ? 'নমুনা প্রমোশনাল ক্যাম্পেইন তালিকা।'
            : 'Sample promotional campaign configurations for prototype review.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {demoOffers.map((off, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between gap-4 shadow-xs"
          >
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#EF174F]">
                <Tag className="w-3.5 h-3.5" />
                {off.code}
              </span>
              <h3 className="text-sm font-extrabold text-[#10283B]">{off.title}</h3>
              <p className="text-xs text-slate-500">{off.discount}</p>
            </div>
            <button
              type="button"
              onClick={() => showToast('Demo campaign status toggled', 'info')}
              className="px-3 py-1.5 rounded-xl bg-teal-50 text-[#16A6A6] text-xs font-bold"
            >
              {off.status}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
