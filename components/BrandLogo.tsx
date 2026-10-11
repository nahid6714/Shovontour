'use client';

import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  href?: string;
  compact?: boolean;
}

export default function BrandLogo({ href = '/', compact = false }: BrandLogoProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2.5 sm:gap-3 shrink-0 select-none group"
    >
      {/* Exact Custom SVG Recreation of Uploaded SHOVON Tour & Travel BD Suitcase Logo */}
      <svg
        viewBox="0 0 100 115"
        className="w-10 h-11 sm:w-12 sm:h-13 shrink-0 drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top White Suitcase Handle (Left & Right Arms) */}
        <path
          d="M30 28V16C30 11.5 33.5 8 38 8H42"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M70 28V16C70 11.5 66.5 8 62 8H58"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Sky-Blue Airplane in the Center of Top Handle */}
        <path
          d="M39 7.5L44 10L49 3L52 3L50 10L57 10.5C59 10.7 60.5 11.5 60.5 12.5C60.5 13.5 59 14.3 57 14.5L50 15L52 22L49 22L44 15L39 17.5L37 17.5L39.5 12.5L37 7.5H39Z"
          fill="#179CE8"
        />

        {/* Suitcase Rounded Body Clip */}
        <defs>
          <clipPath id="suitcaseBodyClip">
            <rect x="14" y="25" width="72" height="72" rx="14" />
          </clipPath>
        </defs>

        <g clipPath="url(#suitcaseBodyClip)">
          {/* Base White Background */}
          <rect x="14" y="25" width="72" height="72" rx="14" fill="#FFFFFF" />

          {/* Top-Right Teal & Orange World Map Mosaic */}
          <path d="M46 25H86V70L55 62L46 25Z" fill="#0F8E95" />
          <path d="M48 34L62 30L68 44L54 50L48 34Z" fill="#F29120" />
          <path d="M38 42L52 38L56 52L42 54L38 42Z" fill="#FAD814" />
          <path d="M64 42L78 39L82 54L68 56L64 42Z" fill="#F4A868" />

          {/* Bottom-Right Red/Orange Patch & Yellow Corner */}
          <path d="M65 56H86V97H62L65 56Z" fill="#E33E2B" />
          <circle cx="72" cy="86" r="9" fill="#F9B814" />

          {/* Center Pink/Crimson Circle */}
          <circle cx="48" cy="74" r="16" fill="#EE2454" />

          {/* Left Dark Slate & Horizontal Stripes */}
          <path d="M14 45L36 56V97H14V45Z" fill="#223843" />
          <rect x="14" y="58" width="44" height="2.4" fill="#D5DFE3" />
          <rect x="14" y="64" width="48" height="2.4" fill="#D5DFE3" />
          <rect x="14" y="70" width="46" height="2.4" fill="#D5DFE3" />
          <rect x="14" y="76" width="40" height="2.4" fill="#D5DFE3" />
          <rect x="14" y="82" width="32" height="2.4" fill="#D5DFE3" />

          {/* Top-Left Green Foliage Accent */}
          <circle cx="24" cy="36" r="7" fill="#17A673" />

          {/* White Winding S-Curve Road */}
          <path
            d="M46 24C34 36 26 48 30 58C34 68 48 52 60 58C72 64 72 80 60 98"
            stroke="#FFFFFF"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Dashed Center Line Inside the S-Curve Road */}
          <path
            d="M46 24C34 36 26 48 30 58C34 68 48 52 60 58C72 64 72 80 60 98"
            stroke="#CBD5E1"
            strokeWidth="1.6"
            strokeDasharray="3 3"
            strokeLinecap="round"
          />

          {/* Tiny Dark Purple Plane at Bottom of Road */}
          <path
            d="M54 89L59 86L61 81L62.5 82L61 87L64 90L63 91.5L59.5 89.5L57 93L55.5 92L57.5 88.5L54 89Z"
            fill="#3B0A45"
          />
        </g>

        {/* Two White Wheels at the Bottom */}
        <path d="M29 97H36V102C36 104 34.4 105.5 32.5 105.5C30.6 105.5 29 104 29 102V97Z" fill="#FFFFFF" />
        <path d="M64 97H71V102C71 104 69.4 105.5 67.5 105.5C65.6 105.5 64 104 64 102V97Z" fill="#FFFFFF" />
      </svg>

      {/* Exact Typography Lockup Matching Uploaded Logo Image */}
      <div className="flex flex-col leading-none">
        {/* Top Line: SHOVON (White) + Tour (Orange #F29120) */}
        <div className="flex items-baseline gap-1">
          <span className="text-base sm:text-[21px] font-bold tracking-wide text-white uppercase">
            SHOVON
          </span>
          <span className="text-base sm:text-[21px] font-black text-[#F29120] tracking-tight">
            Tour
          </span>
        </div>

        {/* Bottom Line: & Travel (Bright Yellow #FAD814) + Vertical BD */}
        <div className="flex items-center gap-0.5 -mt-0.5">
          <span className="text-sm sm:text-[18px] font-black text-[#FAD814] tracking-tight">
            &amp;
          </span>
          <span className="text-base sm:text-[22px] font-black text-[#FAD814] tracking-tight">
            Travel
          </span>
          {!compact && (
            <span className="inline-flex flex-col -rotate-90 text-[9px] sm:text-[10px] font-black text-[#FAD814] leading-[0.85] tracking-tighter ml-0.5 select-none">
              <span>BD</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
