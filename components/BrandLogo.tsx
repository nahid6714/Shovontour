'use client';

import React from 'react';
import Link from 'next/link';
import { Plane } from 'lucide-react';

interface BrandLogoProps {
  href?: string;
  compact?: boolean;
}

export default function BrandLogo({ href = '/', compact = false }: BrandLogoProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2.5 shrink-0 select-none group"
    >
      {/* Travel Suitcase Icon Matching Uploaded Reference Logo */}
      <div className="relative w-9 h-11 sm:w-10 sm:h-12 flex flex-col items-center justify-end shrink-0">
        {/* Suitcase Top Telescopic Handle */}
        <div className="w-4 h-2 border-2 border-slate-300 rounded-t-md -mb-0.5" />
        {/* Suitcase Body with Colorful S-Curve Ribbon & Plane */}
        <div className="relative w-8 h-9 sm:w-9 sm:h-10 rounded-lg bg-white border-2 border-slate-200 shadow-md overflow-hidden flex items-center justify-center">
          {/* Colorful Travel Diagonal Swooshes */}
          <div className="absolute -left-2 -top-1 w-6 h-6 rounded-full bg-[#16A6A6]" />
          <div className="absolute -right-2 -top-1 w-6 h-6 rounded-full bg-[#F9C91D]" />
          <div className="absolute -left-1 -bottom-2 w-7 h-6 rounded-full bg-[#EF174F]" />
          <div className="absolute -right-1 -bottom-2 w-6 h-6 rounded-full bg-[#10283B]" />
          {/* Inner S-Path & White Airplane */}
          <div className="relative z-10 w-6 h-6 rounded-full bg-gradient-to-tr from-[#EF174F] via-[#F9C91D] to-[#16A6A6] flex items-center justify-center shadow-xs">
            <Plane className="w-3.5 h-3.5 text-white -rotate-45 drop-shadow-xs" />
          </div>
        </div>
        {/* Suitcase Wheels */}
        <div className="flex items-center justify-between w-6 px-0.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A6A6]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A6A6]" />
        </div>
      </div>

      {/* Stacked Typography Lockup: SHOVON Tour / & Travel + Vertical BD */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1">
          <span className="text-base sm:text-[21px] font-black tracking-tight text-white uppercase">
            SHOVON
          </span>
          <span className="text-sm sm:text-[18px] font-extrabold text-[#F9C91D]">
            Tour
          </span>
        </div>
        <div className="flex items-center gap-0.5 -mt-0.5">
          <span className="text-sm sm:text-[18px] font-black text-[#F9C91D] tracking-tight">
            &amp; Travel
          </span>
          {!compact && (
            <span className="inline-block -rotate-90 text-[9px] sm:text-[10px] font-black text-[#F9C91D] tracking-tighter leading-none px-0.5 border border-[#F9C91D]/60 rounded-[2px] ml-0.5">
              BD
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
