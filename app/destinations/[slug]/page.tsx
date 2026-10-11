'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import PackageCard from '@/components/PackageCard';
import ResilientImage from '@/components/ResilientImage';

export default function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { lang, t, destinations, packages } = useApp();

  const destination =
    destinations.find((d) => d.slug === slug) || destinations[0];

  const relatedPackages = packages.filter(
    (p) => p.isPublished && (p.destinationSlug === destination.slug || p.type === destination.type)
  );

  return (
    <div className="pb-16 space-y-12">
      {/* Destination Hero */}
      <div className="relative bg-[#10283B] text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-35">
          <ResilientImage
            src={destination.image}
            alt={t(destination.name)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10283B] via-[#10283B]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            href={
              destination.type === 'bangladesh'
                ? '/tours/bangladesh'
                : '/tours/international'
            }
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F9C91D] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>
              {lang === 'bn' ? 'সকল প্যাকেজ তালিকায় ফিরে যান' : 'Back to Tour Packages'}
            </span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-[#16A6A6] font-bold">
            <MapPin className="w-4 h-4" />
            <span>{t(destination.country)}</span>
            <span aria-hidden="true">·</span>
            <Calendar className="w-4 h-4 text-[#F9C91D]" />
            <span className="text-slate-200">
              {lang === 'bn' ? 'সেরা সময়:' : 'Best Season:'}{' '}
              {t(destination.bestTimeToVisit)}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold">{t(destination.name)}</h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
            {t(destination.shortDescription)}
          </p>
        </div>
      </div>

      {/* Highlights & Destination Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xs">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#10283B]">
              {lang === 'bn'
                ? `${t(destination.name)} ভ্রমণের প্রধান আকর্ষণসমূহ`
                : `Top Attractions in ${t(destination.name)}`}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'এই গন্তব্যের জন্য আমাদের নির্বাচিত ডেমো ট্যুর প্যাকেজগুলোতে নিচের প্রধান দর্শনীয় স্থানসমূহ এবং আরামদায়ক আবাসন অন্তর্ভুক্ত থাকে:'
                : 'Our sample tour packages for this destination include guided visits to these major highlights:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {destination.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F4F8FB] text-xs font-bold text-[#10283B]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#16A6A6] shrink-0" />
                  <span>{t(h)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
            <ResilientImage
              src={destination.image}
              alt={t(destination.name)}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Packages in this destination */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-[#10283B]">
              {lang === 'bn'
                ? `${t(destination.name)} ও সংশ্লিষ্ট ট্যুর প্যাকেজ`
                : `Available Sample Packages for ${t(destination.name)}`}
            </h2>
            <Link
              href="/booking"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EF174F] hover:underline"
            >
              <span>{lang === 'bn' ? 'কাস্টম বুকিং ফরম' : 'Custom Booking Form'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
            {relatedPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
