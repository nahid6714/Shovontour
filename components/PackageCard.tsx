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
  showPopularBadge?: boolean;
}

export default function PackageCard({
  pkg,
  compact = false,
  showPopularBadge,
}: PackageCardProps) {
  const { lang, t, formatBdt, favorites, toggleFavorite } = useApp();
  const isFav = favorites.includes(pkg.id);
  const displayBadge =
    showPopularBadge !== undefined ? showPopularBadge : pkg.id === 'pkg-1';

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col h-full w-full min-w-0 shadow-xs">
      {/* Top Image Container Matching Reference Screenshot */}
      <div
        className={`relative ${
          compact ? 'h-28 sm:h-32 xl:h-36' : 'h-32 sm:h-40'
        } w-full overflow-hidden bg-slate-100 shrink-0`}
      >
        <ResilientImage
          src={pkg.image}
          alt={t(pkg.title)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Popular Pill Badge on First Card matching screenshot */}
        {displayBadge && (
          <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#EF174F] text-white text-[10px] font-bold shadow-xs">
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
          className={`absolute top-2 right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-colors ${
            isFav
              ? 'bg-[#EF174F] text-white shadow-xs'
              : 'bg-black/25 hover:bg-black/45 text-white backdrop-blur-[2px]'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Body Matching Screenshot Hierarchy */}
      <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between gap-2 min-w-0">
        <div className="space-y-1 min-w-0">
          {/* Bold Package / Destination Title */}
          <h3 className="text-xs sm:text-[13px] font-extrabold text-[#10283B] leading-snug group-hover:text-[#EF174F] transition-colors truncate">
            <Link href={`/packages/${pkg.slug}`}>{t(pkg.title)}</Link>
          </h3>

          {/* Duration & Transport with Teal Icons */}
          <div className="space-y-0.5 text-[10px] sm:text-[11px] text-slate-600 min-w-0">
            <p className="flex items-center gap-1 min-w-0">
              <MapPin className="w-3 h-3 text-[#16A6A6] shrink-0" />
              <span className="truncate">{t(pkg.durationText)}</span>
            </p>
            <p className="flex items-center gap-1 min-w-0">
              {pkg.type === 'bangladesh' ? (
                <Bus className="w-3 h-3 text-[#16A6A6] shrink-0" />
              ) : (
                <Plane className="w-3 h-3 text-[#16A6A6] shrink-0" />
              )}
              <span className="truncate">
                {pkg.type === 'bangladesh'
                  ? lang === 'bn'
                    ? 'বাস + হোটেল'
                    : 'Bus + Hotel'
                  : lang === 'bn'
                  ? 'ফ্লাইট + হোটেল'
                  : 'Flight + Hotel'}
              </span>
            </p>
          </div>
        </div>

        {/* Price & Full-Width Pink Pill CTA Button Matching Reference Image */}
        <div className="pt-1.5 border-t border-slate-100 space-y-2 min-w-0">
          <div>
            <span className="block text-sm sm:text-[15px] font-black text-[#10283B] tabular-nums leading-tight">
              {formatBdt(pkg.pricePerPerson)}
            </span>
            <span className="block text-[9px] sm:text-[10px] text-slate-500 mt-0.5">
              {lang === 'bn' ? 'প্রতি ব্যক্তি থেকে' : 'per person'}
            </span>
          </div>

          <Link
            href={`/packages/${pkg.slug}`}
            className="w-full inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-full bg-[#EF174F] hover:bg-[#d51144] text-white font-bold text-[10px] sm:text-[11px] transition-colors whitespace-nowrap shadow-xs"
          >
            <span>{lang === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}</span>
            <ArrowRight className="w-3 h-3 shrink-0" />
          </Link>
        </div>
      </div>
    </article>
  );
}
