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
} from 'lucide-react';
import { useApp } from '@/lib/app-context';
import PackageCard from '@/components/PackageCard';
import ResilientImage from '@/components/ResilientImage';
import { GALLERY_ITEMS } from '@/lib/mock-data';

export default function HomePage() {
  const { lang, t, formatBdt, packages, categories, reviews, settings } = useApp();

  const publishedPackages = packages.filter((p) => p.isPublished);

  const bangladeshPackages = publishedPackages
    .filter((p) => p.type === 'bangladesh')
    .slice(0, 4);

  const internationalPackages = publishedPackages
    .filter((p) => p.type === 'international')
    .slice(0, 4);

  const thursdayPackages = publishedPackages.filter((p) => p.isThursdayTour);

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-[#F4F8FB] space-y-10 sm:space-y-14 pb-14">
      {/* SECTION A: EXACT SPLIT HERO BANNER MATCHING UPLOADED REFERENCE SCREENSHOT */}
      <section className="relative w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          {/* LEFT PANEL — BANGLADESH TOURS */}
          <div className="relative min-h-[380px] sm:min-h-[450px] lg:min-h-[480px] flex flex-col justify-center px-5 sm:px-10 lg:px-14 py-10 overflow-hidden">
            {/* Background Scenic Bangladesh Image */}
            <div className="absolute inset-0">
              <ResilientImage
                src="/images/hero_bangladesh.jpg"
                alt="বাংলাদেশ ট্যুর প্যাকেজ"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#10283B]/90 via-[#10283B]/65 to-[#10283B]/35" />
            </div>

            {/* Colorful Curved Shapes Matching Reference Image */}
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#EF174F] opacity-90 pointer-events-none" />
            <div className="absolute -bottom-20 left-16 w-40 h-40 rounded-full bg-[#F9C91D] opacity-85 pointer-events-none" />
            <div className="absolute top-6 right-8 w-24 h-24 rounded-full bg-[#EF174F]/85 hidden sm:flex items-center justify-center pointer-events-none shadow-lg">
              <Plane className="w-10 h-10 text-white -rotate-12" />
            </div>

            <div className="relative z-10 space-y-3 sm:space-y-4 max-w-lg">
              {/* Top Tag with Bangladesh Green/Red Circle */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10283B]/85 border border-white/15 text-white text-xs font-bold">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-[#EF174F]" />
                </span>
                <span>
                  {lang === 'bn' ? 'দেশ দেখুন, দেশ ঘুরুন' : 'Explore Beautiful Bangladesh'}
                </span>
              </div>

              {/* Two-Tone Huge Heading: White “বাংলাদেশ” + Yellow “ট্যুর প্যাকেজ” */}
              <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
                <span className="block text-white">
                  {lang === 'bn' ? 'বাংলাদেশ' : 'Bangladesh'}
                </span>
                <span className="block text-[#F9C91D] mt-0.5">
                  {lang === 'bn' ? 'ট্যুর প্যাকেজ' : 'Tour Packages'}
                </span>
              </h1>

              <p className="text-xs sm:text-base text-white/95 font-medium leading-relaxed max-w-md">
                {lang === 'bn'
                  ? 'প্রকৃতি, পাহাড়, সমুদ্র, নদী, ঐতিহ্য এবং আমাদের অসাধারণ বাংলাদেশ'
                  : 'Nature, mountains, sea beaches, rivers, heritage and our extraordinary Bangladesh'}
              </p>

              {/* Yellow Pill Button with Dark Navy Text */}
              <div className="pt-2">
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
          <div className="relative min-h-[380px] sm:min-h-[450px] lg:min-h-[480px] flex flex-col justify-center px-5 sm:px-10 lg:px-14 py-10 overflow-hidden bg-gradient-to-br from-[#F4F8FB] via-white to-[#E2F1F8] border-t lg:border-t-0 lg:border-l border-slate-200">
            {/* Right Side Scenic International Backdrop Blend */}
            <div className="absolute inset-0 opacity-30 sm:opacity-45">
              <ResilientImage
                src="/images/hero_international.jpg"
                alt="আন্তর্জাতিক ট্যুর প্যাকেজ"
                className="w-full h-full object-cover object-right"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
            </div>

            {/* Colorful Curved Accents */}
            <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-[#F9C91D]/70 pointer-events-none hidden lg:block" />
            <div className="absolute -bottom-14 -left-10 w-36 h-36 rounded-full bg-[#16A6A6]/30 pointer-events-none" />
            <div className="absolute top-6 right-8 w-12 h-12 rounded-full bg-[#F9C91D]/30 flex items-center justify-center pointer-events-none">
              <Plane className="w-6 h-6 text-[#10283B]" />
            </div>

            <div className="relative z-10 space-y-3 sm:space-y-4 max-w-lg">
              {/* Dark Navy Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10283B] text-white text-xs font-bold shadow-xs">
                <span className="w-3.5 h-3.5 rounded-full bg-[#16A6A6] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F9C91D]" />
                </span>
                <span>
                  {lang === 'bn' ? 'বিশ্ব দেখুন, স্বপ্ন ছুঁয়ে দেখুন' : 'Explore the World'}
                </span>
              </div>

              {/* Two-Tone Huge Heading: Dark Navy “আন্তর্জাতিক” + Pink/Red “ট্যুর প্যাকেজ” */}
              <h2 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
                <span className="block text-[#10283B]">
                  {lang === 'bn' ? 'আন্তর্জাতিক' : 'International'}
                </span>
                <span className="block text-[#EF174F] mt-0.5">
                  {lang === 'bn' ? 'ট্যুর প্যাকেজ' : 'Tour Packages'}
                </span>
              </h2>

              <p className="text-xs sm:text-base text-[#10283B]/90 font-semibold leading-relaxed max-w-md">
                {lang === 'bn'
                  ? 'থাইল্যান্ড, মালয়েশিয়া, সিঙ্গাপুর, দুবাই, নেপাল, ভারত এবং আরও অনেক দেশ'
                  : 'Thailand, Malaysia, Singapore, Dubai, Nepal, India and many more destinations'}
              </p>

              {/* Pink/Red Pill Button with White Text */}
              <div className="pt-2">
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
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-md border border-slate-200/80 p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
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
                desc: { bn: 'আমাদের নিজস্ব ট্যুর প্ল্যান (নমুনা)', en: 'Handpicked sample tour plans' },
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
                title: { bn: 'বুকিং সহায়তা', en: 'Booking Assistance' },
                desc: { bn: 'ভ্রমণের আগে, পরে, সব সময়', en: 'Support before & during trips' },
              },
            ].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3.5 ${
                    idx > 0 ? 'pt-3 sm:pt-0 sm:pl-5' : ''
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${item.circleColor}`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-extrabold text-[#10283B] truncate">
                      {t(item.title)}
                    </h3>
                    <p className="text-xs text-slate-500 truncate">{t(item.desc)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION C & D: SIDE-BY-SIDE POPULAR BANGLADESH & INTERNATIONAL TOUR PACKAGES MATCHING SCREENSHOT */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          {/* LEFT BLOCK: জনপ্রিয় বাংলাদেশ ট্যুর প্যাকেজ */}
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-9 h-9 rounded-full bg-[#EF174F] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Award className="w-5 h-5" />
                </span>
                <h2 className="text-lg sm:text-2xl font-black text-[#10283B] truncate">
                  {lang === 'bn' ? (
                    <>
                      জনপ্রিয় <span className="text-[#EF174F]">বাংলাদেশ</span> ট্যুর প্যাকেজ
                    </>
                  ) : (
                    <>
                      Popular <span className="text-[#EF174F]">Bangladesh</span> Tours
                    </>
                  )}
                </h2>
              </div>

              <Link
                href="/tours/bangladesh"
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border border-[#16A6A6] text-[#10283B] hover:bg-[#16A6A6] hover:text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0"
              >
                <span>{lang === 'bn' ? 'সব দেখুন' : 'View All'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 gap-4">
              {bangladeshPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} compact />
              ))}
            </div>
          </div>

          {/* RIGHT BLOCK: জনপ্রিয় আন্তর্জাতিক ট্যুর প্যাকেজ */}
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-9 h-9 rounded-full bg-[#16A6A6]/15 text-[#16A6A6] flex items-center justify-center shrink-0">
                  <Plane className="w-5 h-5" />
                </span>
                <h2 className="text-lg sm:text-2xl font-black text-[#10283B] truncate">
                  {lang === 'bn' ? (
                    <>
                      জনপ্রিয় <span className="text-[#EF174F]">আন্তর্জাতিক</span> ট্যুর প্যাকেজ
                    </>
                  ) : (
                    <>
                      Popular <span className="text-[#EF174F]">International</span> Tours
                    </>
                  )}
                </h2>
              </div>

              <Link
                href="/tours/international"
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border border-[#16A6A6] text-[#10283B] hover:bg-[#16A6A6] hover:text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0"
              >
                <span>{lang === 'bn' ? 'সব দেখুন' : 'View All'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 gap-4">
              {internationalPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} compact />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: 8 TOUR CATEGORIES ROW MATCHING SCREENSHOT */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-full bg-[#16A6A6] text-white flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-[#10283B]">
                {lang === 'bn' ? 'ট্যুর ক্যাটাগরি' : 'Tour Categories'}
              </h2>
              <div className="w-16 h-1 rounded-full bg-[#F9C91D] mt-0.5" />
            </div>
          </div>

          <Link
            href="/tours/bangladesh"
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border border-[#16A6A6] text-[#10283B] hover:bg-[#16A6A6] hover:text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0"
          >
            <span>{lang === 'bn' ? 'সব ক্যাটাগরি' : 'All Categories'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { slug: 'sea', bn: 'সমুদ্র ভ্রমণ', en: 'Sea Tours', img: '/images/pkg_coxs_bazar.jpg' },
            { slug: 'mountain', bn: 'পাহাড় ভ্রমণ', en: 'Mountain Tours', img: '/images/pkg_sajek_valley.jpg' },
            { slug: 'river-haor', bn: 'নদী ও হাওর', en: 'River & Haor', img: '/images/pkg_sundarbans.jpg' },
            { slug: 'adventure', bn: 'অ্যাডভেঞ্চার', en: 'Adventure', img: '/images/pkg_sajek_valley.jpg' },
            { slug: 'family', bn: 'পারিবারিক ট্যুর', en: 'Family Tours', img: '/images/pkg_sylhet_tea.jpg' },
            { slug: 'couple', bn: 'কাপল ট্যুর', en: 'Couple Tours', img: '/images/pkg_coxs_bazar.jpg' },
            { slug: 'religious', bn: 'ধর্মীয় ভ্রমণ', en: 'Religious Tours', img: '/images/pkg_sylhet_tea.jpg' },
            { slug: 'international', bn: 'আন্তর্জাতিক ট্যুর', en: 'International', img: '/images/hero_international.jpg' },
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={
                cat.slug === 'international'
                  ? '/tours/international'
                  : `/tours/bangladesh?category=${cat.slug}`
              }
              className="group relative rounded-2xl overflow-hidden aspect-[4/4.2] flex flex-col justify-end border border-slate-200 shadow-xs hover:shadow-lg transition-all"
            >
              <div className="absolute inset-0">
                <ResilientImage
                  src={cat.img}
                  alt={lang === 'bn' ? cat.bn : cat.en}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10283B]/95 via-[#10283B]/30 to-transparent" />
              </div>

              <div className="relative z-10 p-2.5 text-center">
                <span className="block text-xs sm:text-sm font-extrabold text-white group-hover:text-[#F9C91D] transition-colors truncate">
                  {lang === 'bn' ? cat.bn : cat.en}
                </span>
              </div>
            </Link>
          ))}
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#10283B]/90 via-[#10283B]/65 to-[#10283B]/85" />
        </div>

        {/* Colorful Corner Swooshes Matching Reference Image */}
        <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-[#F9C91D] opacity-90 pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-[#EF174F] opacity-90 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Inspirational Quote */}
          <div className="space-y-3 text-center lg:text-left max-w-xl">
            <h2 className="text-2xl sm:text-4xl font-black leading-snug">
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
            <div className="w-24 h-1.5 rounded-full bg-[#F9C91D] mx-auto lg:mx-0" />
          </div>

          {/* Right Dark Navy CTA Box with Yellow Button */}
          <div className="bg-[#10283B]/95 border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center sm:text-left space-y-4 shadow-2xl">
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
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-md border border-slate-200/90 p-5 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {[
              {
                icon: Users,
                color: 'text-[#EF174F]',
                num: '৫,০০০+',
                label: { bn: 'সন্তুষ্ট ভ্রমণকারী (ডেমো)', en: 'Happy Travelers (Sample)' },
              },
              {
                icon: MapPin,
                color: 'text-[#16A6A6]',
                num: '৫০+',
                label: { bn: 'ট্যুর ডেস্টিনেশন (নমুনা)', en: 'Tour Destinations (Sample)' },
              },
              {
                icon: Plane,
                color: 'text-[#EF174F]',
                num: '১০+',
                label: { bn: 'দেশ ও আন্তর্জাতিক ট্যুর', en: 'International Routes' },
              },
              {
                icon: ShieldCheck,
                color: 'text-sky-600',
                num: '৯৮%',
                label: { bn: 'পজিটিভ রিভিউ (ডেমো)', en: 'Positive Feedback (Demo)' },
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
                    i > 0 ? 'pt-3 sm:pt-0 sm:pl-4' : ''
                  }`}
                >
                  <StatIcon className={`w-7 h-7 shrink-0 ${stat.color}`} />
                  <div className="min-w-0">
                    <p className="text-lg sm:text-xl font-black text-[#10283B] tabular-nums">
                      {stat.num}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">{t(stat.label)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION G: UPCOMING THURSDAY TOURS */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#EF174F]">
                <Calendar className="w-4 h-4" />
                <span>
                  {lang === 'bn'
                    ? 'সাপ্তাহিক উইকএন্ড ট্রিপ · ডেমো তারিখ (Sample Schedule)'
                    : 'WEEKEND GROUP TOURS · SAMPLE MOCK SCHEDULE'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#10283B]">
                {lang === 'bn'
                  ? 'আসন্ন বৃহস্পতিবারের বিশেষ ট্যুরসমূহ (ডেমো সূচি)'
                  : 'Upcoming Thursday Group Tours (Sample Dates)'}
              </h2>
            </div>

            <Link
              href="/tours/bangladesh"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A6A6] hover:underline whitespace-nowrap"
            >
              <span>{lang === 'bn' ? 'সব উইকএন্ড প্যাকেজ দেখুন' : 'See All Weekend Tours'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {thursdayPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#F4F8FB] border border-slate-200/70 hover:border-[#16A6A6] transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0 w-full sm:w-auto">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-slate-200">
                    <ResilientImage
                      src={pkg.image}
                      alt={t(pkg.title)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-[#10283B] truncate">
                      <Link href={`/packages/${pkg.slug}`} className="hover:text-[#16A6A6]">
                        {t(pkg.title)}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-600">
                      {t(pkg.durationText)} ·{' '}
                      {lang === 'bn' ? 'নমুনা আসন:' : 'Sample Seats:'}{' '}
                      <strong className="font-mono tabular-nums">{pkg.availableSeats}</strong>
                    </p>
                    <p className="text-xs text-[#16A6A6] font-medium truncate">
                      {lang === 'bn' ? 'ডেমো তারিখ:' : 'Sample Dates:'}{' '}
                      <span className="font-mono tabular-nums text-[#10283B]">
                        {pkg.departureDates.slice(0, 2).join(', ')}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 shrink-0">
                  <span className="text-base sm:text-lg font-extrabold text-[#10283B] tabular-nums">
                    {formatBdt(pkg.pricePerPerson)}
                  </span>
                  <Link
                    href={`/booking?package=${pkg.slug}`}
                    className="px-4 py-2 rounded-full bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-bold text-xs transition-colors whitespace-nowrap"
                  >
                    {lang === 'bn' ? 'ডেমো বুকিং' : 'Book Demo'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION H: VISA AND MEDICAL ASSISTANCE */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1.5">
          <p className="text-xs font-bold text-[#16A6A6] tracking-wide">
            {lang === 'bn'
              ? 'সহায়তা ও পরামর্শ সেবা · কোনো ভিসা বা অ্যাপয়েন্টমেন্ট গ্যারান্টি নয়'
              : 'DOCUMENTATION & INQUIRY ASSISTANCE ONLY'}
          </p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#10283B]">
            {lang === 'bn'
              ? 'ভারতীয় ভিসা ও মেডিকেল ট্রাভেল সহায়তা'
              : 'Indian Visa & Medical Travel Assistance'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              icon: FileText,
              title: { bn: 'ভারতীয় ট্যুরিস্ট ভিসা সহায়তা', en: 'Indian Tourist Visa Assistance' },
              desc: {
                bn: 'অনলাইন আবেদন ফরম পূরণ ও প্রয়োজনীয় কাগজপত্রের চেকলিস্ট প্রস্তুতকরণ।',
                en: 'Guidance on application form filling and required document checklists.',
              },
              href: '/services/indian-visa',
            },
            {
              icon: Stethoscope,
              title: { bn: 'ভারতীয় মেডিকেল ভিসা সহায়তা', en: 'Indian Medical Visa Assistance' },
              desc: {
                bn: 'রোগী ও অ্যাটেনডেন্টের মেডিকেল ভিসা ডকুমেন্টেশন ও লেটার যাচাই সহায়তা।',
                en: 'Documentation support for patients and medical attendants.',
              },
              href: '/services/indian-visa',
            },
            {
              icon: Calendar,
              title: { bn: 'ভিসা স্লট ও আবেদন অনুসন্ধান', en: 'Visa Slot & Status Inquiry' },
              desc: {
                bn: 'আবেদন জমা দেওয়ার প্রস্তুতি ও অ্যাপয়েন্টমেন্ট তথ্যের জন্য পরামর্শ।',
                en: 'Advisory support for visa submission readiness and scheduling.',
              },
              href: '/services/indian-visa',
            },
            {
              icon: Building2,
              title: { bn: 'হাসপাতাল অ্যাপয়েন্টমেন্ট সমন্বয়', en: 'Hospital Appointment Coordination' },
              desc: {
                bn: 'চেন্নাই, ভেলোর, ব্যাঙ্গালোর ও কলকাতার হাসপাতালে ডাক্তারের সিরিয়াল অনুসন্ধান।',
                en: 'Assistance with doctor appointment inquiries across major hospitals.',
              },
              href: '/services/medical-travel',
            },
            {
              icon: Sparkles,
              title: { bn: 'মেডিকেল ট্রাভেল প্ল্যানিং', en: 'Medical Travel Planning' },
              desc: {
                bn: 'রোগীর সুবিধা অনুযায়ী এয়ার/ট্রেন টিকিট ও হাসপাতাল সংলগ্ন হোটেল পরিকল্পনা।',
                en: 'Patient-friendly accommodation near hospitals and transfer planning.',
              },
              href: '/services/medical-travel',
            },
          ].map((srv, idx) => {
            const IconComp = srv.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between gap-4"
              >
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F4F8FB] text-[#16A6A6] flex items-center justify-center">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#10283B] leading-snug">
                    {t(srv.title)}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{t(srv.desc)}</p>
                </div>

                <Link
                  href={srv.href}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#EF174F] hover:underline pt-1"
                >
                  <span>{lang === 'bn' ? 'বিস্তারিত ও ফরম' : 'Inquiry & Details'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION I: CORPORATE AND GROUP TOURS */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-4">
            <p className="text-xs font-bold text-[#16A6A6] tracking-wide">
              {lang === 'bn' ? 'কর্পোরেট ও গ্রুপ কাস্টমাইজড ভ্রমণ' : 'CORPORATE & FAMILY GROUPS'}
            </p>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#10283B]">
              {lang === 'bn'
                ? 'কর্পোরেট রিট্রিট, অফিস ট্যুর ও পারিবারিক গ্রুপ প্যাকেজ'
                : 'Corporate Retreats, Team Trips & Custom Group Packages'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'আপনার প্রতিষ্ঠানের বার্ষিক আনন্দ ভ্রমণ, কনফারেন্স কিংবা বড় পরিবারের ভ্রমণের জন্য কাস্টমাইজড আইটিনারারি এবং কোটেশন রিকোয়েস্ট করুন।'
                : 'Request a tailored itinerary and budget quotation for company retreats, academic excursions, or family groups.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#10283B] font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A6A6] shrink-0" />
                <span>{lang === 'bn' ? 'রিজার্ভ এসি বাস ও ফ্লাইট সমন্বয়' : 'Reserved AC coach & flight coordination'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A6A6] shrink-0" />
                <span>{lang === 'bn' ? 'কনফারেন্স হল ও বারবিকিউ ডিনার' : 'Conference halls & BBQ Gala night'}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/corporate-tours"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-extrabold text-xs sm:text-sm transition-colors shadow-xs"
              >
                <span>
                  {lang === 'bn' ? 'কোটেশন রিকোয়েস্ট করুন (Request a Quote)' : 'Request a Quote'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[240px] bg-slate-100">
            <ResilientImage
              src="/images/pkg_sylhet_tea.jpg"
              alt="Corporate and Group Tour"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION J: REVIEWS (DEMO CONTENT) & TRAVEL GALLERY */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-xs font-bold text-[#EF174F]">
                {lang === 'bn' ? 'নমুনা টেস্টিমোনিয়াল (ডেমো কন্টেন্ট)' : 'SAMPLE DEMO TESTIMONIALS'}
              </p>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#10283B]">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between gap-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-0.5 text-[#F9C91D]">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span>{rev.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {t(rev.comment)}
                  </p>
                </div>
                <div className="pt-2.5 border-t border-slate-100">
                  <p className="text-xs sm:text-sm font-bold text-[#10283B]">
                    {rev.customerName}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {t(rev.roleOrCity)} · {t(rev.tourTitle)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Gallery Preview */}
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#10283B]">
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

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#10283B]/85 via-transparent to-transparent flex flex-col justify-end p-3.5">
                  <p className="text-xs font-bold text-white line-clamp-1">{t(item.title)}</p>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
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
