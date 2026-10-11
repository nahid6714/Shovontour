'use client';

import React, { useState } from 'react';
import { Compass } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export default function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackLabel,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#10283B] via-[#153953] to-[#16A6A6] text-white p-4 text-center ${className}`}
      >
        <Compass className="w-8 h-8 text-[#F9C91D] mb-2 opacity-90" />
        <span className="text-xs font-medium tracking-wide line-clamp-2 opacity-90">
          {fallbackLabel || alt || 'Shovon Tour & Travel BD'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
