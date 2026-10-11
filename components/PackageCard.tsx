'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Clock, Bus, Building2, Calendar, ArrowRight } from 'lucide-react';
import { TourPackage } from '@/lib/types';
import { useApp } from '@/lib/app-context';
import ResilientImage from './ResilientImage';

interface PackageCardProps {
  pkg: TourPackage;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const { lang, t, formatBdt, favorites, toggleFavorite } = useApp();
  const isFav = favorites.includes(pkg.id);

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full w-full min-w-0">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <ResilientImage
          src={pkg.image}
          alt={t(pkg.title)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10283B]/75 via-transparent to-transparent" />

        {/* Favorite button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(pkg.id);
          }}
          aria-label={lang === 'bn' ? 'পছন্দের তালিকায় রাখুন' : 'Save package'}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm ${
            isFav
              ? 'bg-[#EF174F] text-white'
              : 'bg-white/90 text-[#10283B] hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
        </button>

        {/* Bottom overlay location & duration */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-medium min-w-0">
          <span className="truncate">{t(pkg.destinationName)}</span>
          <span aria-hidden="true" className="mx-1.5 opacity-60 shrink-0">·</span>
          <span className="inline-flex items-center gap-1 shrink-0">
            <Clock className="w-3.5 h-3.5 text-[#F9C91D]" />
            {t(pkg.durationText)}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4 min-w-0">
        <div className="space-y-2.5 min-w-0">
          {/* Unboxed clean metadata line */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#16A6A6] font-medium">
            <span>
              {pkg.type === 'bangladesh'
                ? lang === 'bn'
                  ? 'বাংলাদেশ ট্যুর'
                  : 'Bangladesh Tour'
                : lang === 'bn'
                ? 'আন্তর্জাতিক ট্যুর'
                : 'International Tour'}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500">
              {lang === 'bn' ? 'নমুনা মূল্য ও তথ্য' : 'Sample Pricing'}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-[#10283B] leading-snug group-hover:text-[#16A6A6] transition-colors line-clamp-2 break-words">
            <Link href={`/packages/${pkg.slug}`}>{t(pkg.title)}</Link>
          </h3>

          <div className="space-y-1.5 pt-1 text-xs text-slate-600 min-w-0">
            <p className="flex items-center gap-2 min-w-0">
              <Bus className="w-3.5 h-3.5 text-[#16A6A6] shrink-0" />
              <span className="truncate">{t(pkg.transportHighlight)}</span>
            </p>
            <p className="flex items-center gap-2 min-w-0">
              <Building2 className="w-3.5 h-3.5 text-[#EF174F] shrink-0" />
              <span className="truncate">{t(pkg.accommodationHighlight)}</span>
            </p>
            {pkg.departureDates[0] && (
              <p className="flex items-center gap-2 min-w-0 text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-[#10283B] shrink-0" />
                <span className="truncate">
                  {lang === 'bn' ? 'পরবর্তী নমুনা তারিখ:' : 'Next Sample Date:'}{' '}
                  <strong className="font-mono tabular-nums text-[#10283B]">
                    {pkg.departureDates[0]}
                  </strong>
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Footer Price & Action */}
        <div className="pt-3.5 border-t border-slate-100 flex items-end justify-between gap-2 min-w-0">
          <div className="min-w-0">
            <span className="block text-[11px] text-slate-500 truncate">
              {lang === 'bn' ? 'জনপ্রতি নমুনা মূল্য' : 'Sample price / person'}
            </span>
            <span className="text-lg sm:text-xl font-extrabold text-[#10283B] tabular-nums">
              {formatBdt(pkg.pricePerPerson)}
            </span>
          </div>

          <Link
            href={`/packages/${pkg.slug}`}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-bold text-xs transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            <span>{lang === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
