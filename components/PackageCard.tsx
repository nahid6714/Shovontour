'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, MapPin, Bus, Plane, ArrowRight } from 'lucide-react';
import { TourPackage } from '@/lib/types';
import { useApp } from '@/lib/app-context';
import ResilientImage from './ResilientImage';

interface PackageCardProps {
  pkg: TourPackage;
  compact?: boolean;
}

export default function PackageCard({ pkg, compact = false }: PackageCardProps) {
  const { lang, t, formatBdt, favorites, toggleFavorite } = useApp();
  const isFav = favorites.includes(pkg.id);

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full w-full min-w-0 shadow-xs">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <ResilientImage
          src={pkg.image}
          alt={t(pkg.title)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        {/* Optional Featured / Popular Tag on Domestic Cards matching screenshot */}
        {pkg.popularityScore >= 97 && (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#EF174F] text-white text-[11px] font-bold shadow-xs">
            {lang === 'bn' ? 'জনপ্রিয়' : 'Popular'}
          </span>
        )}

        {/* Heart Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(pkg.id);
          }}
          aria-label={lang === 'bn' ? 'পছন্দের তালিকায় রাখুন' : 'Save package'}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs ${
            isFav
              ? 'bg-[#EF174F] text-white'
              : 'bg-black/30 hover:bg-black/50 text-white backdrop-blur-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Body Matching Screenshot Hierarchy */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between gap-3 min-w-0">
        <div className="space-y-1.5 min-w-0">
          {/* Bold Package / Destination Title */}
          <h3
            className={`${
              compact ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
            } font-extrabold text-[#10283B] leading-snug group-hover:text-[#EF174F] transition-colors line-clamp-1`}
          >
            <Link href={`/packages/${pkg.slug}`}>{t(pkg.title)}</Link>
          </h3>

          {/* Duration & Transport with Teal Icons */}
          <div className="space-y-1 text-xs text-slate-600 min-w-0">
            <p className="flex items-center gap-1.5 min-w-0">
              <MapPin className="w-3.5 h-3.5 text-[#16A6A6] shrink-0" />
              <span className="truncate">{t(pkg.durationText)}</span>
            </p>
            <p className="flex items-center gap-1.5 min-w-0">
              {pkg.type === 'bangladesh' ? (
                <Bus className="w-3.5 h-3.5 text-[#16A6A6] shrink-0" />
              ) : (
                <Plane className="w-3.5 h-3.5 text-[#16A6A6] shrink-0" />
              )}
              <span className="truncate">
                {pkg.type === 'bangladesh'
                  ? lang === 'bn'
                    ? 'বাস + হোটেল'
                    : 'Bus + Hotel'
                  : lang === 'bn'
                  ? 'ফ্লাইট + হোটেল (নমুনা)'
                  : 'Flight + Hotel (Sample)'}
              </span>
            </p>
          </div>
        </div>

        {/* Price & Full-Width Pink Pill CTA Button Matching Reference Image */}
        <div className="pt-2 border-t border-slate-100 space-y-2.5 min-w-0">
          <div>
            <span className="block text-base sm:text-lg font-black text-[#10283B] tabular-nums leading-tight">
              {formatBdt(pkg.pricePerPerson)}
            </span>
            <span className="block text-[11px] text-slate-500">
              {lang === 'bn' ? 'প্রতি ব্যক্তি থেকে (নমুনা)' : 'per person (sample)'}
            </span>
          </div>

          <Link
            href={`/packages/${pkg.slug}`}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-[#EF174F] hover:bg-[#d51144] text-white font-bold text-xs transition-colors whitespace-nowrap shadow-xs"
          >
            <span>{lang === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </div>
      </div>
    </article>
  );
}
