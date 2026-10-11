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
      <div className="relative w-10 h-11 sm:w-11 sm:h-12 flex flex-col items-center justify-end shrink-0">
        {/* Suitcase Top Handle */}
        <div className="w-4 h-2 border-2 border-slate-300 rounded-t-md -mb-0.5" />
        {/* Suitcase Body */}
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border-2 border-[#16A6A6] shadow-md overflow-hidden flex items-center justify-center">
          {/* Colorful Travel Diagonal Ribbon */}
          <div className="absolute -left-2 -bottom-2 w-8 h-8 rounded-full bg-[#EF174F]/90" />
          <div className="absolute -right-2 -top-2 w-7 h-7 rounded-full bg-[#F9C91D]" />
          <div className="relative z-10 w-6 h-6 rounded-full bg-[#10283B] text-white flex items-center justify-center shadow-xs">
            <Plane className="w-3.5 h-3.5 text-[#F9C91D] -rotate-12" />
          </div>
        </div>
        {/* Tiny Suitcase Wheels */}
        <div className="flex items-center justify-between w-6 px-0.5 mt-0.5">
          <span className="w-1.5 h-1 rounded-full bg-slate-400" />
          <span className="w-1.5 h-1 rounded-full bg-slate-400" />
        </div>
      </div>

      {/* Stacked Typography Lockup: SHOVON Tour / & Travel BD */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1">
          <span className="text-base sm:text-xl font-black tracking-tight text-white uppercase">
            SHOVON
          </span>
          <span className="text-sm sm:text-lg font-extrabold text-[#F9C91D]">
            Tour
          </span>
        </div>
        <div className="flex items-center gap-1 -mt-0.5">
          <span className="text-sm sm:text-lg font-black text-[#F9C91D]">
            &amp; Travel
          </span>
          {!compact && (
            <span className="px-1 py-0.5 rounded bg-[#F9C91D] text-[#10283B] text-[9px] sm:text-[10px] font-black leading-none tracking-tighter">
              BD
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
