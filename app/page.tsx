'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  Users,
  Headphones,
  ArrowRight,
  Calendar,
  FileText,
  Stethoscope,
  Building2,
  Star,
  MapPin,
  Plane,
  Sparkles,
  CheckCircle2,
  Compass,
  Globe,
  Stamp,
  HeartPulse,
} from 'lucide-react';
import { useApp } from '@/lib/app-context';
import PackageCard from '@/components/PackageCard';
import ResilientImage from '@/components/ResilientImage';
import { GALLERY_ITEMS } from '@/lib/mock-data';

export default function HomePage() {
  const { lang, t, formatBdt, packages, reviews } = useApp();

  const publishedPackages = packages.filter((p) => p.isPublished);

  // Exact 4 Domestic Packages matching the screenshot (Cox's Bazar, Sajek, Sundarbans, Sylhet)
  const bangladeshPackages = publishedPackages
    .filter((p) => p.type === 'bangladesh')
    .slice(0, 4);

  // Exact 4 International Packages matching the screenshot (Thailand, Malaysia, Singapore, Dubai)
  const preferredIntlSlugs = [
    'thailand-bangkok-pattaya-holiday',
    'malaysia-singapore-combo-tour',
    'singapore-marina-sentosa-tour',
    'dubai-desert-safari-dhow-cruise',
  ];
  const internationalPackages = preferredIntlSlugs
    .map((slug) => publishedPackages.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const fallbackIntlPackages =
    internationalPackages.length >= 4
      ? internationalPackages
      : publishedPackages.filter((p) => p.type === 'international').slice(0, 4);

  const thursdayPackages = publishedPackages.filter((p) => p.isThursdayTour);

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-[#F4F8FB] space-y-8 sm:space-y-12 pb-14">
      {/* SECTION A: EXACT SPLIT HERO BANNER MATCHING UPLOADED DESKTOP REFERENCE IMAGE */}
      <section className="relative w-full overflow-hidden bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full relative">
          {/* LEFT PANEL — BANGLADESH TOURS */}
          <div className="relative min-h-[360px] sm:min-h-[430px] lg:min-h-[470px] flex flex-col justify-center px-5 sm:px-10 lg:px-12 xl:px-16 py-10 overflow-hidden">
            {/* Background Scenic Bangladesh Image */}
            <div className="absolute inset-0">
              <ResilientImage
                src="/images/hero_bangladesh.jpg"
                alt="বাংলাদেশ ট্যুর প্যাকেজ"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b2234]/90 via-[#0b2234]/65 to-transparent" />
            </div>

            {/* Red Rising Sun & White Airplane with Dashed Trail (Matching Screenshot Top-Right of Left Panel) */}
            <div className="absolute top-6 right-8 sm:right-14 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#EF174F] opacity-95 flex items-center justify-center pointer-events-none shadow-lg">
              <Plane className="w-8 h-8 sm:w-10 sm:h-10 text-white -rotate-12 translate-x-1 -translate-y-1" />
            </div>
            <div className="hidden sm:block absolute top-28 right-28 w-24 border-t-2 border-dashed border-white/80 -rotate-[28deg] pointer-events-none" />

            {/* Bottom-Left Colorful Curved Swooshes Matching Reference Image */}
            <div className="absolute -bottom-16 -left-12 w-52 h-44 rounded-[100%] bg-[#EF174F] rotate-12 pointer-events-none" />
            <div className="absolute -bottom-20 left-12 w-56 h-40 rounded-[100%] bg-[#F9C91D] -rotate-6 pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-40 h-32 rounded-[100%] bg-[#10283B] pointer-events-none" />

            {/* Center Diagonal S-Curve Ribbon Overlap on Desktop */}
            <div className="hidden lg:block absolute -top-10 -right-12 w-28 h-[130%] bg-[#F9C91D] rotate-[14deg] rounded-full opacity-95 pointer-events-none z-10" />
            <div className="hidden lg:block absolute -bottom-12 -right-10 w-24 h-[75%] bg-[#16A6A6] rotate-[16deg] rounded-full opacity-95 pointer-events-none z-10" />
            <div className="hidden lg:block absolute -top-10 -right-16 w-20 h-[130%] bg-white rotate-[14deg] rounded-full pointer-events-none z-10" />

            <div className="relative z-20 space-y-3 sm:space-y-4 max-w-md">
              {/* Top Tag with Bangladesh Green/Red Circle */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10283B]/90 border border-white/15 text-white text-xs font-bold shadow-sm">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#EF174F]" />
                </span>
                <span>
                  {lang === 'bn' ? 'দেশ দেখুন, দেশ ঘুরুন' : 'Explore Beautiful Bangladesh'}
                </span>
              </div>

              {/* Two-Tone Huge Heading: White “বাংলাদেশ” + Yellow “ট্যুর প্যাকেজ” */}
              <h1 className="text-3xl sm:text-5xl xl:text-[54px] font-black leading-[1.12] tracking-tight drop-shadow-sm">
                <span className="block text-white">
                  {lang === 'bn' ? 'বাংলাদেশ' : 'Bangladesh'}
                </span>
                <span className="block text-[#F9C91D] mt-0.5">
                  {lang === 'bn' ? 'ট্যুর প্যাকেজ' : 'Tour Packages'}
                </span>
              </h1>

              <p className="text-xs sm:text-base text-white/95 font-medium leading-relaxed max-w-sm">
                {lang === 'bn'
                  ? 'প্রকৃতি, পাহাড়, সমুদ্র, নদী, ঐতিহ্য এবং আমাদের অসাধারণ বাংলাদেশ'
                  : 'Nature, mountains, sea beaches, rivers, heritage and our extraordinary Bangladesh'}
              </p>

              {/* Yellow Pill Button with Dark Navy Text */}
              <div className="pt-1.5">
                <Link
                  href="/tours/bangladesh"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-extrabold text-xs sm:text-sm transition-transform hover:scale-[1.02] shadow-lg"
                >
                  <span>
                    {lang === 'bn'
                      ? 'বাংলাদেশ ট্যুর প্যাকেজ দেখুন'
                      : 'Explore Bangladesh Packages'}
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL — INTERNATIONAL TOURS */}
          <div className="relative min-h-[360px] sm:min-h-[430px] lg:min-h-[470px] flex flex-col justify-center px-5 sm:px-10 lg:px-14 xl:px-16 py-10 overflow-hidden bg-gradient-to-r from-white via-[#F4F8FB] to-[#DCEEF8] border-t lg:border-t-0 border-slate-200">
            {/* Right Half World Landmarks Collage Image */}
            <div className="absolute inset-y-0 right-0 w-full sm:w-[68%]">
              <ResilientImage
                src="/images/hero_international.jpg"
                alt="আন্তর্জাতিক ট্যুর প্যাকেজ"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 sm:via-white/75 to-transparent" />
            </div>

            {/* Decorative Hot Air Balloons & Flying Airplane Matching Screenshot */}
            <div className="hidden sm:flex absolute top-7 left-1/3 w-9 h-9 rounded-full bg-gradient-to-b from-[#EF174F] to-[#F9C91D] items-center justify-center shadow-md pointer-events-none">
              <span className="w-2 h-2 rounded-xs bg-[#10283B] translate-y-4" />
            </div>
            <div className="hidden sm:flex absolute top-16 left-[26%] w-5 h-5 rounded-full bg-gradient-to-b from-[#16A6A6] to-[#F9C91D] opacity-85 pointer-events-none" />
            <div className="hidden sm:flex absolute top-6 right-8 px-3 py-1.5 rounded-full bg-white/90 shadow-md items-center gap-1.5 pointer-events-none">
              <Plane className="w-5 h-5 text-[#10283B] -rotate-12" />
            </div>

            {/* Bottom-Left Teal & Yellow Curved Accents */}
            <div className="hidden lg:block absolute -bottom-12 -left-8 w-28 h-28 rounded-full bg-[#16A6A6]/90 pointer-events-none" />
            <div className="hidden lg:block absolute -bottom-14 left-10 w-20 h-20 rounded-full bg-[#F9C91D] pointer-events-none" />

            <div className="relative z-20 space-y-3 sm:space-y-4 max-w-md lg:pl-4">
              {/* Dark Navy Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10283B] text-white text-xs font-bold shadow-sm">
                <span className="w-3.5 h-3.5 rounded-full bg-[#16A6A6] flex items-center justify-center shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#EF174F]" />
                </span>
                <span>
                  {lang === 'bn' ? 'বিশ্ব দেখুন, স্বপ্ন ছুঁয়ে দেখুন' : 'Explore the World'}
                </span>
              </div>

              {/* Two-Tone Huge Heading: Dark Navy “আন্তর্জাতিক” + Pink/Red “ট্যুর প্যাকেজ” */}
              <h2 className="text-3xl sm:text-5xl xl:text-[54px] font-black leading-[1.12] tracking-tight">
                <span className="block text-[#10283B]">
                  {lang === 'bn' ? 'আন্তর্জাতিক' : 'International'}
                </span>
                <span className="block text-[#EF174F] mt-0.5">
                  {lang === 'bn' ? 'ট্যুর প্যাকেজ' : 'Tour Packages'}
                </span>
              </h2>

              <p className="text-xs sm:text-base text-[#10283B]/90 font-semibold leading-relaxed max-w-sm">
                {lang === 'bn'
                  ? 'থাইল্যান্ড, মালয়েশিয়া, সিঙ্গাপুর, দুবাই, ইউরোপ এবং আরও অনেক দেশ'
                  : 'Thailand, Malaysia, Singapore, Dubai, Europe and many more countries'}
              </p>

              {/* Pink/Red Pill Button with White Text */}
              <div className="pt-1.5">
                <Link
                  href="/tours/international"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#EF174F] hover:bg-[#d51144] text-white font-extrabold text-xs sm:text-sm transition-transform hover:scale-[1.02] shadow-lg"
                >
                  <span>
                    {lang === 'bn'
                      ? 'আন্তর্জাতিক ট্যুর প্যাকেজ দেখুন'
                      : 'Explore International Packages'}
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: 4 TRUST AND SERVICE HIGHLIGHTS STRIP MATCHING SCREENSHOT */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 -mt-5 relative z-30">
        <div className="bg-white rounded-2xl shadow-md border border-slate-200/80 p-3 sm:p-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:divide-x divide-slate-100">
            {[
              {
                icon: ShieldCheck,
                circleColor: 'bg-[#16A6A6]/15 text-[#16A6A6]',
                title: { bn: 'নির্ভরযোগ্য সেবা', en: 'Reliable Service' },
                desc: { bn: 'নিরাপদ ও নিশ্চিন্ত ভ্রমণ', en: 'Safe & worry-free travel' },
              },
              {
                icon: Award,
                circleColor: 'bg-[#EF174F] text-white',
                title: { bn: 'নির্বাচিত প্যাকেজ', en: 'Curated Packages' },
                desc: { bn: 'আমাদের নিজস্ব ট্যুর প্ল্যান', en: 'Our signature tour plans' },
              },
              {
                icon: Compass,
                circleColor: 'bg-[#F9C91D] text-[#10283B]',
                title: { bn: 'অভিজ্ঞ টিম', en: 'Experienced Team' },
                desc: { bn: 'ভ্রমণ পরিকল্পনায় সহযোগী', en: 'Dedicated trip coordinators' },
              },
              {
                icon: Headphones,
                circleColor: 'bg-sky-100 text-sky-600',
                title: { bn: '২৪/৭ সহায়তা', en: '24/7 Support' },
                desc: { bn: 'ভ্রমণের আগে, পরে, সব সময়', en: 'Before, during & after trips' },
              },
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 sm:gap-3.5 ${
                    idx > 0 ? 'lg:pl-5' : ''
                  }`}
                >
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 ${item.circleColor}`}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-extrabold text-[#10283B] truncate">
                      {t(item.title)}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 truncate">
                      {t(item.desc)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CORE 4 PILLARS HIGHLIGHT BAR: 1. INTERNATIONAL TOURS, 2. BANGLADESH TOURS, 3. INDIAN VISA PROCESSING, 4. MEDICAL TRAVEL */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {[
            {
              badge: { bn: '০১ · ফোকাস সেবা', en: '01 · CORE SERVICE' },
              title: { bn: 'আন্তর্জাতিক ট্যুর প্যাকেজ', en: 'International Tours' },
              subtitle: {
                bn: 'থাইল্যান্ড, মালয়েশিয়া, সিঙ্গাপুর, দুবাই, নেপাল ও কাশ্মীর',
                en: 'Thailand, Malaysia, Singapore, Dubai, Nepal & Kashmir',
              },
              cta: { bn: 'প্যাকেজ দেখুন', en: 'View Tours' },
              href: '/tours/international',
              icon: Globe,
              accentBg: 'bg-gradient-to-br from-[#EF174F] to-[#c81040] text-white',
              iconBg: 'bg-white/20 text-white',
              btnClass: 'bg-white text-[#EF174F] hover:bg-slate-100',
            },
            {
              badge: { bn: '০২ · ফোকাস সেবা', en: '02 · CORE SERVICE' },
              title: { bn: 'বাংলাদেশ ট্যুর প্যাকেজ', en: 'Domestic Tours (BD)' },
              subtitle: {
                bn: 'কক্সবাজার, সাজেক ভ্যালি, সুন্দরবন, সিলেট ও হাওর ভ্রমণ',
                en: "Cox's Bazar, Sajek Valley, Sundarbans & Sylhet",
              },
              cta: { bn: 'প্যাকেজ দেখুন', en: 'View Tours' },
              href: '/tours/bangladesh',
              icon: MapPin,
              accentBg: 'bg-gradient-to-br from-[#10283B] to-[#1a3c57] text-white',
              iconBg: 'bg-[#F9C91D] text-[#10283B]',
              btnClass: 'bg-[#F9C91D] text-[#10283B] hover:bg-[#eab80e]',
            },
            {
              badge: { bn: '০৩ · বিশেষ সহায়তা', en: '03 · VISA PROCESSING' },
              title: { bn: 'ইন্ডিয়ান ভিসা প্রসেসিং', en: 'Indian Visa Processing' },
              subtitle: {
                bn: 'ট্যুরিস্ট ও মেডিকেল ভিসা ফরম পূরণ, ডকুমেন্ট ও স্লট সহায়তা',
                en: 'Tourist & Medical visa form, checklist & slot guidance',
              },
              cta: { bn: 'ভিসা সহায়তা নিন', en: 'Apply / Inquire' },
              href: '/services/indian-visa',
              icon: Stamp,
              accentBg: 'bg-gradient-to-br from-[#16A6A6] to-[#0f8282] text-white',
              iconBg: 'bg-white/20 text-white',
              btnClass: 'bg-[#F9C91D] text-[#10283B] hover:bg-[#eab80e]',
            },
            {
              badge: { bn: '০৪ · হেলথকেয়ার ট্রাভেল', en: '04 · MEDICAL TRAVEL' },
              title: { bn: 'মেডিকেল ও ডক্টর অ্যাপয়েন্টমেন্ট', en: 'Medical Travel Service' },
              subtitle: {
                bn: 'চেন্নাই, ভেলোর (CMC), ব্যাঙ্গালোর ও কলকাতার হাসপাতাল সিরিয়াল',
                en: 'Chennai, Vellore (CMC), Bangalore & Kolkata hospital support',
              },
              cta: { bn: 'মেডিকেল সহায়তা', en: 'Book Consultation' },
              href: '/services/medical-travel',
              icon: HeartPulse,
              accentBg: 'bg-white border-2 border-[#EF174F]/80 text-[#10283B]',
              iconBg: 'bg-[#EF174F]/10 text-[#EF174F]',
              btnClass: 'bg-[#EF174F] text-white hover:bg-[#d51144]',
            },
          ].map((pillar, index) => {
            const PillarIcon = pillar.icon;
            const isLightCard = index === 3;
            return (
              <Link
                key={index}
                href={pillar.href}
                className={`group rounded-2xl p-3.5 sm:p-4 shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between gap-2.5 ${pillar.accentBg}`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full ${
                        isLightCard
                          ? 'bg-[#EF174F]/10 text-[#EF174F]'
                          : 'bg-black/20 text-white/95'
                      }`}
                    >
                      {t(pillar.badge)}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${pillar.iconBg}`}
                    >
                      <PillarIcon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xs sm:text-base font-black leading-snug">
                    {t(pillar.title)}
                  </h3>
                  <p
                    className={`text-[10px] sm:text-xs leading-snug line-clamp-2 ${
                      isLightCard ? 'text-slate-600' : 'text-white/85'
                    }`}
                  >
                    {t(pillar.subtitle)}
                  </p>
                </div>

                <div className="pt-1">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold transition-transform group-hover:translate-x-0.5 ${pillar.btnClass}`}
                  >
                    <span>{t(pillar.cta)}</span>
                    <ArrowRight className="w-3 h-3 shrink-0" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SECTION C & D: EXACT DESKTOP SIDE-BY-SIDE 4+4 POPULAR TOUR PACKAGES MATCHING SCREENSHOT */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-7 items-start">
          {/* LEFT BLOCK: জনপ্রিয় বাংলাদেশ ট্যুর প্যাকেজ (4 Cards in 1 Row on Desktop, 2x2 on Mobile) */}
          <div className="space-y-3.5 sm:space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EF174F] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Award className="w-4 h-4" />
                </span>
                <h2 className="text-base sm:text-xl font-black text-[#10283B] truncate">
                  {lang === 'bn' ? (
                    <>
                      জনপ্রিয় <span className="text-[#EF174F]">বাংলাদেশ</span> ট্যুর প্যাকেজ
                    </>
                  ) : (
                    <>
                      Popular <span className="text-[#EF174F]">Bangladesh</span> Tour Packages
                    </>
                  )}
                </h2>
              </div>

              <Link
                href="/tours/bangladesh"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-[#16A6A6] text-[#10283B] hover:bg-[#16A6A6] hover:text-white text-[11px] sm:text-xs font-bold transition-colors whitespace-nowrap shrink-0"
              >
                <span>{lang === 'bn' ? 'সব দেখুন' : 'View All'}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {bangladeshPackages.map((pkg, idx) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  compact
                  showPopularBadge={idx === 0}
                />
              ))}
            </div>
          </div>

          {/* RIGHT BLOCK: জনপ্রিয় আন্তর্জাতিক ট্যুর প্যাকেজ (4 Cards in 1 Row on Desktop, 2x2 on Mobile) */}
          <div className="space-y-3.5 sm:space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#16A6A6]/15 text-[#16A6A6] flex items-center justify-center shrink-0">
                  <Plane className="w-4 h-4" />
                </span>
                <h2 className="text-base sm:text-xl font-black text-[#10283B] truncate">
                  {lang === 'bn' ? (
                    <>
                      জনপ্রিয় <span className="text-[#EF174F]">আন্তর্জাতিক</span> ট্যুর প্যাকেজ
                    </>
                  ) : (
                    <>
                      Popular <span className="text-[#EF174F]">International</span> Tour Packages
                    </>
                  )}
                </h2>
              </div>

              <Link
                href="/tours/international"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-[#16A6A6] text-[#10283B] hover:bg-[#16A6A6] hover:text-white text-[11px] sm:text-xs font-bold transition-colors whitespace-nowrap shrink-0"
              >
                <span>{lang === 'bn' ? 'সব দেখুন' : 'View All'}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {fallbackIntlPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  compact
                  showPopularBadge={false}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: 8 TOUR CATEGORIES ROW MATCHING SCREENSHOT */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#16A6A6] text-white flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-base sm:text-xl font-black text-[#10283B]">
                {lang === 'bn' ? 'ট্যুর ক্যাটাগরি' : 'Tour Categories'}
              </h2>
              <div className="w-12 sm:w-14 h-1 rounded-full bg-[#F9C91D] mt-0.5" />
            </div>
          </div>

          <Link
            href="/tours/bangladesh"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-[#16A6A6] text-[#10283B] hover:bg-[#16A6A6] hover:text-white text-[11px] sm:text-xs font-bold transition-colors whitespace-nowrap shrink-0"
          >
            <span>{lang === 'bn' ? 'সব ক্যাটাগরি' : 'All Categories'}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
          {[
            { slug: 'sea', bn: 'সমুদ্র ভ্রমণ', en: 'Sea Tours', img: '/images/pkg_coxs_bazar.jpg' },
            { slug: 'mountain', bn: 'পাহাড় ভ্রমণ', en: 'Mountain', img: '/images/pkg_sajek_valley.jpg' },
            { slug: 'river-haor', bn: 'নদী ও হাওর', en: 'River & Haor', img: '/images/pkg_sundarbans.jpg' },
            { slug: 'adventure', bn: 'অ্যাডভেঞ্চার', en: 'Adventure', img: '/images/pkg_sajek_valley.jpg' },
            { slug: 'family', bn: 'পারিবারিক ট্যুর', en: 'Family Tours', img: '/images/pkg_sylhet_tea.jpg' },
            { slug: 'couple', bn: 'কাপল ট্যুর', en: 'Couple Tours', img: '/images/pkg_coxs_bazar.jpg' },
            { slug: 'religious', bn: 'ধর্মীয় ভ্রমণ', en: 'Religious', img: '/images/pkg_sylhet_tea.jpg' },
            { slug: 'international', bn: 'আন্তর্জাতিক ট্যুর', en: 'International', img: '/images/pkg_dubai.jpg' },
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={
                cat.slug === 'international'
                  ? '/tours/international'
                  : `/tours/bangladesh?category=${cat.slug}`
              }
              className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3.6] sm:aspect-[4/4.1] flex flex-col justify-end border border-slate-200 shadow-xs hover:shadow-md transition-all"
            >
              <div className="absolute inset-0">
                <ResilientImage
                  src={cat.img}
                  alt={lang === 'bn' ? cat.bn : cat.en}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10283B]/95 via-[#10283B]/25 to-transparent" />
              </div>

              <div className="relative z-10 p-1.5 sm:p-2.5 text-center">
                <span className="block text-[10px] sm:text-xs font-extrabold text-white group-hover:text-[#F9C91D] transition-colors truncate">
                  {lang === 'bn' ? cat.bn : cat.en}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* DEDICATED SIDE-BY-SIDE SPOTLIGHT: INDIAN VISA PROCESSING & MEDICAL TRAVEL ASSISTANCE */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {/* LEFT SPOTLIGHT CARD: INDIAN VISA PROCESSING */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#10283B] via-[#15344d] to-[#0d2130] text-white p-5 sm:p-7 border border-white/10 shadow-lg flex flex-col justify-between gap-5">
            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#F9C91D]/15 pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-[#16A6A6]/20 pointer-events-none" />

            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9C91D] text-[#10283B] text-[11px] font-extrabold">
                <Stamp className="w-3.5 h-3.5" />
                <span>
                  {lang === 'bn'
                    ? 'ইন্ডিয়ান ভিসা প্রসেসিং সহায়তা'
                    : 'INDIAN VISA PROCESSING SUPPORT'}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black leading-snug">
                {lang === 'bn' ? (
                  <>
                    ভারতীয় <span className="text-[#F9C91D]">ট্যুরিস্ট ও মেডিকেল ভিসা</span> প্রসেসিং ও ডকুমেন্টেশন
                  </>
                ) : (
                  <>
                    Indian <span className="text-[#F9C91D]">Tourist & Medical Visa</span> Processing Support
                  </>
                )}
              </h2>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {lang === 'bn'
                  ? 'নির্ভুলভাবে অনলাইন আবেদন ফরম পূরণ, মেডিকেল ইনভাইটেশন লেটার যাচাই, ডকুমেন্ট চেকলিস্ট ও অ্যাপয়েন্টমেন্ট স্লট অনুসন্ধানে অভিজ্ঞ সহায়তা।'
                  : 'Complete guidance for Indian Visa online application filling, document checklist verification, and appointment slot scheduling.'}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-semibold text-slate-100">
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#F9C91D] shrink-0" />
                  <span className="truncate">
                    {lang === 'bn' ? 'ট্যুরিস্ট ভিসা ফাইল প্রসেসিং' : 'Tourist Visa File Setup'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#F9C91D] shrink-0" />
                  <span className="truncate">
                    {lang === 'bn' ? 'মেডিকেল ও অ্যাটেনডেন্ট ভিসা' : 'Medical & Attendant Visa'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#F9C91D] shrink-0" />
                  <span className="truncate">
                    {lang === 'bn' ? 'নির্ভুল অনলাইন ফরম পূরণ' : 'Error-Free Form Filling'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#F9C91D] shrink-0" />
                  <span className="truncate">
                    {lang === 'bn' ? 'ডকুমেন্ট চেকলিস্ট যাচাই' : 'Document Checklist Audit'}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
              <span className="text-[11px] text-slate-300">
                {lang === 'bn'
                  ? '* ভিসা অনুমোদন হাই কমিশনের নিজস্ব এখতিয়ারভুক্ত'
                  : '* Visa approval is at the sole discretion of the Embassy'}
              </span>
              <Link
                href="/services/indian-visa"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-extrabold text-xs transition-transform hover:scale-[1.02] shadow-md"
              >
                <span>
                  {lang === 'bn' ? 'ভিসা প্রসেসিং ফরম পূরণ করুন' : 'Request Visa Assistance'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* RIGHT SPOTLIGHT CARD: MEDICAL TRAVEL & HOSPITAL APPOINTMENT */}
          <div className="relative rounded-3xl overflow-hidden bg-white text-[#10283B] p-5 sm:p-7 border-2 border-[#16A6A6]/30 shadow-lg flex flex-col justify-between gap-5">
            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#EF174F]/10 pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-[#16A6A6]/10 pointer-events-none" />

            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EF174F] text-white text-[11px] font-extrabold">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>
                  {lang === 'bn'
                    ? 'মেডিকেল ট্রাভেল ও হাসপাতাল অ্যাপয়েন্টমেন্ট'
                    : 'MEDICAL TRAVEL & DOCTOR APPOINTMENT'}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black leading-snug text-[#10283B]">
                {lang === 'bn' ? (
                  <>
                    ভারতের শীর্ষ হাসপাতালে <span className="text-[#EF174F]">ডাক্তারের সিরিয়াল ও মেডিকেল ট্রাভেল</span> সহায়তা
                  </>
                ) : (
                  <>
                    Hospital <span className="text-[#EF174F]">Doctor Appointments & Medical Travel</span> Desk
                  </>
                )}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? 'চেন্নাই (Apollo), ভেলোর (CMC), ব্যাঙ্গালোর (Narayana / Manipal), দিল্লি ও কলকাতার হাসপাতালে ডাক্তারের অ্যাপয়েন্টমেন্ট, এয়ার/ট্রেন টিকিট ও আবাসন সমন্বয়।'
                  : 'Coordination for doctor appointments at Apollo Chennai, CMC Vellore, Narayana Bangalore, and Kolkata hospitals with travel & stay planning.'}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-bold text-[#10283B]">
                <div className="flex items-center gap-1.5 bg-[#F4F8FB] px-3 py-2 rounded-xl border border-slate-200/80">
                  <Building2 className="w-4 h-4 text-[#16A6A6] shrink-0" />
                  <span className="truncate">
                    {lang === 'bn' ? 'CMC ভেলোর ও অ্যাপোলো চেন্নাই' : 'CMC Vellore & Apollo Chennai'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#F4F8FB] px-3 py-2 rounded-xl border border-slate-200/80">
                  <HeartPulse className="w-4 h-4 text-[#EF174F] shrink-0" />
                  <span className="truncate">
                    {lang === 'bn' ? 'ডাক্তারের অ্যাপয়েন্টমেন্ট লেটার' : 'Doctor Appointment Letter'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#F4F8FB] px-3 py-2 rounded-xl border border-slate-200/80">
                  <Plane className="w-4 h-4 text-[#16A6A6] shrink-0" />
                  <span className="truncate">
                    {lang === 'bn' ? 'এয়ার অ্যাম্বুলেন্স ও টিকিট পরামর্শ' : 'Flight & Train Ticket Guide'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#F4F8FB] px-3 py-2 rounded-xl border border-slate-200/80">
                  <Sparkles className="w-4 h-4 text-[#EF174F] shrink-0" />
                  <span className="truncate">
                    {lang === 'bn' ? 'হাসপাতাল সংলগ্ন হোটেল বুকিং' : 'Hospital-Adjacent Stays'}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-500">
                {lang === 'bn'
                  ? 'দ্রুত রেসপন্স ও ডেডিকেটেড মেডিকেল ডেস্ক'
                  : 'Dedicated Medical Travel Support Desk'}
              </span>
              <Link
                href="/services/medical-travel"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#EF174F] hover:bg-[#d51144] text-white font-extrabold text-xs transition-transform hover:scale-[1.02] shadow-md"
              >
                <span>
                  {lang === 'bn' ? 'মেডিকেল সহায়তা ফরম' : 'Book Medical Assistance'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F: FULL-WIDTH SCENIC PROMOTIONAL BANNER MATCHING SCREENSHOT */}
      <section className="relative w-full overflow-hidden bg-[#10283B] text-white py-12 sm:py-16">
        <div className="absolute inset-0">
          <ResilientImage
            src="/images/pkg_sajek_valley.jpg"
            alt="Promotional Travel Quote Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#10283B]/90 via-[#10283B]/55 to-[#10283B]/85" />
        </div>

        {/* Colorful Corner Swooshes Matching Reference Image */}
        <div className="absolute -top-12 -left-10 w-44 h-28 rounded-[100%] bg-[#EF174F] -rotate-12 pointer-events-none" />
        <div className="absolute -top-14 left-8 w-44 h-24 rounded-[100%] bg-[#F9C91D] -rotate-12 pointer-events-none" />
        <div className="absolute -bottom-12 -right-10 w-48 h-40 rounded-full bg-[#EF174F] pointer-events-none" />
        <div className="absolute -bottom-16 right-16 w-44 h-36 rounded-full bg-[#F9C91D] pointer-events-none" />

        {/* Airplane + Dashed Line on Right matching screenshot */}
        <div className="hidden lg:flex absolute top-8 right-10 items-center gap-2 pointer-events-none">
          <div className="w-24 border-t-2 border-dashed border-white/70 -rotate-12" />
          <Plane className="w-8 h-8 text-white -rotate-12" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Inspirational Quote */}
          <div className="space-y-3 text-center lg:text-left max-w-xl">
            <h2 className="text-2xl sm:text-4xl font-black leading-snug -rotate-1">
              {lang === 'bn' ? (
                <>
                  “ ভ্রমণ শুধু একটি গন্তব্য নয়,
                  <span className="block text-[#F9C91D] mt-1">
                    এটা নতুন অভিজ্ঞতার গল্প ”
                  </span>
                </>
              ) : (
                <>
                  “ Travel is not just a destination,
                  <span className="block text-[#F9C91D] mt-1">
                    it is a story of new experiences ”
                  </span>
                </>
              )}
            </h2>
            <div className="w-28 h-1.5 rounded-full bg-[#F9C91D] mx-auto lg:mx-0" />
          </div>

          {/* Right Dark Navy CTA Box with Yellow Button */}
          <div className="bg-[#10283B]/95 border border-white/15 rounded-3xl p-6 sm:p-7 max-w-sm w-full text-center sm:text-left space-y-4 shadow-2xl">
            <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
              {lang === 'bn'
                ? 'আপনার পরবর্তী ভ্রমণের জন্য প্রস্তুত তো?'
                : 'Ready for your next unforgettable journey?'}
            </h3>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-extrabold text-xs sm:text-sm transition-transform hover:scale-[1.02] shadow-md"
            >
              <span>{lang === 'bn' ? 'এখনই বুক করুন' : 'Book Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION K (TOP KPI STRIP): 5-ITEM STATISTICS BAR MATCHING BOTTOM OF REFERENCE SCREENSHOT */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-md border border-slate-200/90 p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 lg:divide-x divide-slate-100">
            {[
              {
                icon: Users,
                color: 'text-[#EF174F]',
                num: '৫,০০০+',
                label: { bn: 'সন্তুষ্ট ভ্রমণকারী', en: 'Happy Travelers (Demo)' },
              },
              {
                icon: MapPin,
                color: 'text-[#16A6A6]',
                num: '৫০+',
                label: { bn: 'ট্যুর ডেস্টিনেশন', en: 'Tour Destinations' },
              },
              {
                icon: Plane,
                color: 'text-[#EF174F]',
                num: '১০+',
                label: { bn: 'দেশ আন্তর্জাতিক ট্যুর', en: 'International Countries' },
              },
              {
                icon: ShieldCheck,
                color: 'text-sky-600',
                num: '৯৮%',
                label: { bn: 'পজিটিভ রিভিউ', en: 'Positive Reviews' },
              },
              {
                icon: Headphones,
                color: 'text-[#EF174F]',
                num: '২৪/৭',
                label: { bn: 'কাস্টমার সাপোর্ট', en: 'Customer Support' },
              },
            ].map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 ${
                    i > 0 ? 'lg:pl-5' : ''
                  }`}
                >
                  <StatIcon className={`w-6 h-6 sm:w-7 sm:h-7 shrink-0 ${stat.color}`} />
                  <div className="min-w-0">
                    <p className="text-base sm:text-xl font-black text-[#10283B] tabular-nums">
                      {stat.num}
                    </p>
                    <p className="text-[10px] sm:text-xs text-slate-500 truncate">
                      {t(stat.label)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION G: UPCOMING THURSDAY TOURS */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-5">
        <div className="bg-white rounded-3xl p-4 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-slate-100 pb-3.5">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#EF174F]">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {lang === 'bn'
                    ? 'সাপ্তাহিক উইকএন্ড ট্রিপ · ডেমো তারিখ (Sample Schedule)'
                    : 'WEEKEND GROUP TOURS · SAMPLE MOCK SCHEDULE'}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#10283B]">
                {lang === 'bn'
                  ? 'আসন্ন বৃহস্পতিবারের বিশেষ ট্যুরসমূহ (ডেমো সূচি)'
                  : 'Upcoming Thursday Group Tours (Sample Dates)'}
              </h2>
            </div>

            <Link
              href="/tours/bangladesh"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#16A6A6] hover:underline whitespace-nowrap"
            >
              <span>{lang === 'bn' ? 'সব উইকএন্ড প্যাকেজ দেখুন' : 'See All Weekend Tours'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {thursdayPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#F4F8FB] border border-slate-200/70 hover:border-[#16A6A6] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-slate-200">
                    <ResilientImage
                      src={pkg.image}
                      alt={t(pkg.title)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-[#10283B] truncate">
                      <Link href={`/packages/${pkg.slug}`} className="hover:text-[#16A6A6]">
                        {t(pkg.title)}
                      </Link>
                    </h3>
                    <p className="text-[11px] text-slate-600">
                      {t(pkg.durationText)} ·{' '}
                      {lang === 'bn' ? 'নমুনা আসন:' : 'Seats:'}{' '}
                      <strong className="font-mono tabular-nums">{pkg.availableSeats}</strong>
                    </p>
                    <p className="text-[10px] text-[#16A6A6] font-medium truncate">
                      {lang === 'bn' ? 'যাত্রা:' : 'Dates:'}{' '}
                      <span className="font-mono tabular-nums text-[#10283B]">
                        {pkg.departureDates.slice(0, 2).join(', ')}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-xs sm:text-sm font-extrabold text-[#10283B] tabular-nums">
                    {formatBdt(pkg.pricePerPerson)}
                  </span>
                  <Link
                    href={`/booking?package=${pkg.slug}`}
                    className="px-3 py-1.5 rounded-full bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-bold text-[10px] sm:text-xs transition-colors whitespace-nowrap"
                  >
                    {lang === 'bn' ? 'বুক করুন' : 'Book Now'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION I: CORPORATE AND GROUP TOURS */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-center space-y-3.5">
            <p className="text-xs font-bold text-[#16A6A6] tracking-wide">
              {lang === 'bn' ? 'কর্পোরেট ও গ্রুপ কাস্টমাইজড ভ্রমণ' : 'CORPORATE & FAMILY GROUPS'}
            </p>
            <h2 className="text-lg sm:text-2xl font-extrabold text-[#10283B]">
              {lang === 'bn'
                ? 'কর্পোরেট রিট্রিট, অফিস ট্যুর ও পারিবারিক গ্রুপ প্যাকেজ'
                : 'Corporate Retreats, Team Trips & Custom Group Packages'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'আপনার প্রতিষ্ঠানের বার্ষিক আনন্দ ভ্রমণ, কনফারেন্স কিংবা বড় পরিবারের ভ্রমণের জন্য কাস্টমাইজড আইটিনারারি এবং কোটেশন রিকোয়েস্ট করুন।'
                : 'Request a tailored itinerary and budget quotation for company retreats, academic excursions, or family groups.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#10283B] font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A6A6] shrink-0" />
                <span>{lang === 'bn' ? 'রিজার্ভ এসি বাস ও ফ্লাইট সমন্বয়' : 'Reserved AC coach & flight coordination'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A6A6] shrink-0" />
                <span>{lang === 'bn' ? 'কনফারেন্স হল ও বারবিকিউ ডিনার' : 'Conference halls & BBQ Gala night'}</span>
              </div>
            </div>

            <div className="pt-1">
              <Link
                href="/corporate-tours"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-extrabold text-xs transition-colors shadow-xs"
              >
                <span>
                  {lang === 'bn' ? 'কোটেশন রিকোয়েস্ট করুন (Request a Quote)' : 'Request a Quote'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[200px] bg-slate-100">
            <ResilientImage
              src="/images/pkg_sylhet_tea.jpg"
              alt="Corporate and Group Tour"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION J: REVIEWS (DEMO CONTENT) & TRAVEL GALLERY */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-bold text-[#EF174F]">
                {lang === 'bn' ? 'নমুনা টেস্টিমোনিয়াল (ডেমো কন্টেন্ট)' : 'SAMPLE DEMO TESTIMONIALS'}
              </p>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#10283B]">
                {lang === 'bn' ? 'ভ্রমণকারীদের অভিজ্ঞতা (ডেমো)' : 'Traveler Feedback (Demo)'}
              </h2>
            </div>
            <Link
              href="/reviews"
              className="text-xs font-bold text-[#16A6A6] hover:underline inline-flex items-center gap-1"
            >
              <span>{lang === 'bn' ? 'সব দেখুন' : 'View All'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col justify-between gap-2.5"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-0.5 text-[#F9C91D]">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px]">{rev.date}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed line-clamp-3">
                    {t(rev.comment)}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-xs font-bold text-[#10283B]">{rev.customerName}</p>
                  <p className="text-[10px] text-slate-500">
                    {t(rev.roleOrCity)} · {t(rev.tourTitle)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Gallery Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#10283B]">
              {lang === 'bn' ? 'ট্রাভেল ফটো গ্যালারি' : 'Travel Photo Gallery'}
            </h2>
            <Link
              href="/gallery"
              className="text-xs font-bold text-[#16A6A6] hover:underline inline-flex items-center gap-1"
            >
              <span>{lang === 'bn' ? 'সম্পূর্ণ গ্যালারি' : 'Full Gallery'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {GALLERY_ITEMS.slice(0, 4).map((item) => (
              <Link
                key={item.id}
                href="/gallery"
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 border border-slate-200"
              >
                <ResilientImage
                  src={item.image}
                  alt={t(item.title)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10283B]/85 via-transparent to-transparent flex flex-col justify-end p-3">
                  <p className="text-xs font-bold text-white line-clamp-1">{t(item.title)}</p>
                  <p className="text-[10px] text-slate-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#F9C91D]" />
                    <span className="truncate">{t(item.location)}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
