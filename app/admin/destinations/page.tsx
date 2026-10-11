'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import ResilientImage from '@/components/ResilientImage';

export default function AdminDestinationsPage() {
  const { lang, t, destinations } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#10283B]">
          {lang === 'bn' ? 'গন্তব্য তালিকা (ডেমো)' : 'Destinations Directory (Demo)'}
        </h1>
        <p className="text-xs text-slate-500">
          {lang === 'bn'
            ? 'বাংলাদেশ ও আন্তর্জাতিক ভ্রমণ গন্তব্যের তালিকা।'
            : 'Domestic and international destinations configured in the prototype.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
          >
            <div className="aspect-[16/10] bg-slate-100">
              <ResilientImage
                src={dest.image}
                alt={t(dest.name)}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 space-y-2 text-xs">
              <span className="uppercase font-mono font-bold text-[#16A6A6]">
                {dest.type}
              </span>
              <h3 className="text-sm font-extrabold text-[#10283B]">{t(dest.name)}</h3>
              <p className="text-slate-500 line-clamp-2">{t(dest.shortDescription)}</p>
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="font-mono text-slate-400">/{dest.slug}</span>
                <Link
                  href={`/destinations/${dest.slug}`}
                  className="inline-flex items-center gap-1 font-bold text-[#10283B] hover:text-[#EF174F]"
                >
                  <span>Preview</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
