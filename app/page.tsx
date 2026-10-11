'use client';

import React, { useState } from 'react';
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
  Search,
  Sparkles,
  CheckCircle2,
  PhoneCall,
} from 'lucide-react';
import { useApp } from '@/lib/app-context';
import PackageCard from '@/components/PackageCard';
import ResilientImage from '@/components/ResilientImage';
import { GALLERY_ITEMS } from '@/lib/mock-data';

export default function HomePage() {
  const { lang, t, formatBdt, packages, categories, reviews, settings } = useApp();
  const [quickSearchQuery, setQuickSearchQuery] = useState('');
  const [quickTypeFilter, setQuickTypeFilter] = useState<'all' | 'bangladesh' | 'international'>('all');

  const publishedPackages = packages.filter((p) => p.isPublished);

  const bangladeshPackages = publishedPackages
    .filter((p) => p.type === 'bangladesh')
    .slice(0, 4);

  const internationalPackages = publishedPackages
    .filter((p) => p.type === 'international')
    .slice(0, 5);

  const thursdayPackages = publishedPackages.filter((p) => p.isThursdayTour);

  const filteredQuickResults = quickSearchQuery.trim()
    ? publishedPackages.filter((p) => {
        const matchesType = quickTypeFilter === 'all' || p.type === quickTypeFilter;
        const q = quickSearchQuery.toLowerCase();
        const matchesText =
          p.title.bn.toLowerCase().includes(q) ||
          p.title.en.toLowerCase().includes(q) ||
          p.destinationName.bn.toLowerCase().includes(q) ||
          p.destinationName.en.toLowerCase().includes(q);
        return matchesType && matchesText;
      })
    : [];

  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-12 sm:space-y-20 pb-16">
      {/* SECTION A: SPLIT HERO BANNER */}
      <section className="relative bg-[#10283B] overflow-hidden rounded-b-[2rem] sm:rounded-b-[3.5rem] shadow-xl">
        {/* Decorative subtle color accents */}
        <div className="absolute -top-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#16A6A6]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#EF174F]/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-5 pb-8 sm:py-12">
          {/* Split Panels Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 items-stretch">
            {/* LEFT PANEL — BANGLADESH TOURS */}
            <div className="relative group rounded-2xl sm:rounded-3xl overflow-hidden min-h-[340px] sm:min-h-[440px] flex flex-col justify-between p-5 sm:p-9 border border-white/15 shadow-lg">
              <div className="absolute inset-0">
                <ResilientImage
                  src="/images/hero_bangladesh.jpg"
                  alt={t(settings.heroBangladeshHeading)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Measured Scrim for guaranteed WCAG AA legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#10283B]/95 via-[#10283B]/65 to-[#10283B]/25" />
              </div>

              {/* Top Kicker */}
              <div className="relative z-10 text-[11px] sm:text-xs font-semibold text-[#F9C91D] tracking-wide">
                {lang === 'bn' ? 'দেশীয় ভ্রমণ · সবুজ প্রকৃতি ও সমুদ্র' : 'DOMESTIC TOURS · NATURE & HERITAGE'}
              </div>

              <div className="relative z-10 space-y-3 sm:space-y-4 max-w-xl pt-12">
                <h1
                  className="text-2xl sm:text-4xl lg:text-[2.5rem] font-extrabold text-white leading-tight"
                  style={{ textWrap: 'balance' }}
                >
                  {t(settings.heroBangladeshHeading)}
                </h1>
                <p className="text-xs sm:text-base text-slate-200 leading-relaxed">
                  {lang === 'bn'
                    ? 'কক্সবাজারের সমুদ্র সৈকত, সাজেক ভ্যালির মেঘের রাজ্য, সুন্দরবনের গহীন বন এবং সিলেটের চা বাগানে নিরাপদ ও আনন্দময় ভ্রমণের নির্বাচিত নমুনা প্যাকেজ।'
                    : "Explore scenic beaches in Cox's Bazar, cloud peaks in Sajek Valley, Sundarbans mangrove cruises, and lush tea estates in Sylhet."}
                </p>

                <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/tours/bangladesh"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-extrabold text-xs sm:text-sm transition-all shadow-md"
                  >
                    <span>
                      {lang === 'bn'
                        ? 'বাংলাদেশ ট্যুর প্যাকেজ দেখুন'
                        : 'Explore Bangladesh Tours'}
                    </span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL — INTERNATIONAL TOURS */}
            <div className="relative group rounded-2xl sm:rounded-3xl overflow-hidden min-h-[340px] sm:min-h-[440px] flex flex-col justify-between p-5 sm:p-9 border border-white/15 shadow-lg">
              <div className="absolute inset-0">
                <ResilientImage
                  src="/images/hero_international.jpg"
                  alt={t(settings.heroInternationalHeading)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10283B]/95 via-[#10283B]/65 to-[#10283B]/25" />
              </div>

              <div className="relative z-10 self-start text-[11px] sm:text-xs font-semibold text-[#16A6A6] bg-[#10283B]/85 px-2.5 py-1 rounded-md tracking-wide max-w-full">
                {lang === 'bn'
                  ? 'বিদেশ ভ্রমণ · থাইল্যান্ড · নেপাল · ভারত · মালয়েশিয়া · দুবাই'
                  : 'ABROAD · THAILAND · NEPAL · INDIA · MALAYSIA · DUBAI'}
              </div>

              <div className="relative z-10 space-y-3 sm:space-y-4 max-w-xl pt-12">
                <h2
                  className="text-2xl sm:text-4xl lg:text-[2.5rem] font-extrabold text-white leading-tight"
                  style={{ textWrap: 'balance' }}
                >
                  {t(settings.heroInternationalHeading)}
                </h2>
                <p className="text-xs sm:text-base text-slate-200 leading-relaxed">
                  {lang === 'bn'
                    ? 'নেপালের হিমালয়, ভারতের কাশ্মীর, থাইল্যান্ডের কোরাল আইল্যান্ড, মালয়েশিয়া, সিঙ্গাপুর এবং দুবাই ভ্রমণের কাস্টমাইজড আন্তর্জাতিক ডেমো প্যাকেজ।'
                    : 'Discover curated international sample packages across Nepal, Thailand, India, Malaysia, Singapore, and Dubai with hassle-free planning.'}
                </p>

                <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/tours/international"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#EF174F] hover:bg-[#d61144] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md"
                  >
                    <span>
                      {lang === 'bn'
                        ? 'আন্তর্জাতিক ট্যুর প্যাকেজ দেখুন'
                        : 'Explore International Tours'}
                    </span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width Quick Package Search Bar below Hero Split */}
          <div className="mt-8 bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-200/80">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-3 flex items-center gap-1 bg-[#F4F8FB] p-1 rounded-xl">
                {(['all', 'bangladesh', 'international'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setQuickTypeFilter(tab)}
                    className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                      quickTypeFilter === tab
                        ? 'bg-[#10283B] text-[#F9C91D] shadow-xs'
                        : 'text-slate-600 hover:text-[#10283B]'
                    }`}
                  >
                    {tab === 'all'
                      ? lang === 'bn'
                        ? 'সব ট্যুর'
                        : 'All'
                      : tab === 'bangladesh'
                      ? lang === 'bn'
                        ? 'বাংলাদেশ'
                        : 'Domestic'
                      : lang === 'bn'
                      ? 'আন্তর্জাতিক'
                      : 'Abroad'}
                  </button>
                ))}
              </div>

              <div className="md:col-span-6 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={quickSearchQuery}
                  onChange={(e) => setQuickSearchQuery(e.target.value)}
                  placeholder={
                    lang === 'bn'
                      ? 'গন্তব্য খুঁজুন (যেমন: কক্সবাজার, সাজেক, নেপাল, থাইল্যান্ড)...'
                      : "Search destination (e.g., Cox's Bazar, Sajek, Nepal, Thailand)..."
                  }
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm text-[#10283B] placeholder:text-slate-400 focus:outline-none focus:border-[#16A6A6]"
                />
              </div>

              <div className="md:col-span-3 flex items-center gap-2">
                <Link
                  href={
                    quickTypeFilter === 'international'
                      ? '/tours/international'
                      : '/tours/bangladesh'
                  }
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#16A6A6] hover:bg-[#128c8c] text-white font-bold text-xs sm:text-sm transition-colors whitespace-nowrap"
                >
                  <span>{lang === 'bn' ? 'প্যাকেজ ফিল্টার করুন' : 'Browse All Packages'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Instant Search Dropdown Results */}
            {quickSearchQuery.trim() !== '' && (
              <div className="mt-3 pt-3 border-t border-slate-100">
                {filteredQuickResults.length === 0 ? (
                  <p className="text-xs text-slate-500 py-2">
                    {lang === 'bn'
                      ? 'কোনো প্যাকেজ পাওয়া যায়নি। অন্য গন্তব্য লিখে চেষ্টা করুন।'
                      : 'No matching sample packages found.'}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredQuickResults.slice(0, 3).map((item) => (
                      <Link
                        key={item.id}
                        href={`/packages/${item.slug}`}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-[#F4F8FB] hover:bg-slate-100 transition-colors"
                      >
                        <div className="min-w-0 pr-2">
                          <p className="text-xs font-bold text-[#10283B] truncate">
                            {t(item.title)}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {t(item.durationText)} · {formatBdt(item.pricePerPerson)}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#16A6A6] shrink-0" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION B: TRUST AND SERVICE HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: ShieldCheck,
              color: 'bg-[#16A6A6] text-white',
              title: { bn: 'নিরাপদ বুকিং', en: 'Safe Booking Flow' },
              desc: {
                bn: 'স্বচ্ছ শর্তাবলী ও সহজ অগ্রিম বুকিং প্রক্রিয়া (ডেমো প্রোটোটাইপ)',
                en: 'Transparent booking steps and structured travel coordination',
              },
            },
            {
              icon: Award,
              color: 'bg-[#F9C91D] text-[#10283B]',
              title: { bn: 'নির্বাচিত ট্যুর প্যাকেজ', en: 'Curated Tour Packages' },
              desc: {
                bn: 'পরিবার, কাপল ও কর্পোরেট গ্রুপের জন্য মানসম্মত হোটেল ও পরিবহন',
                en: 'Handpicked itineraries for families, couples, and corporate groups',
              },
            },
            {
              icon: Users,
              color: 'bg-[#EF174F] text-white',
              title: { bn: 'অভিজ্ঞ টিম', en: 'Experienced Team' },
              desc: {
                bn: 'ভ্রমণের শুরু থেকে শেষ পর্যন্ত আন্তরিক গাইডলাইন ও তত্ত্বাবধান',
                en: 'Dedicated trip coordinators for domestic and international routes',
              },
            },
            {
              icon: Headphones,
              color: 'bg-[#10283B] text-[#F9C91D]',
              title: { bn: 'বুকিং সহায়তা', en: 'Booking Support' },
              desc: {
                bn: 'ট্যুর পরিকল্পনা, ভিসা ডকুমেন্টেশন ও মেডিকেল ট্রাভেল পরামর্শ',
                en: 'Responsive assistance for tour inquiries, visa checklists, and custom quotes',
              },
            },
          ].map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 flex items-start gap-4 shadow-xs hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${item.color}`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#10283B]">{t(item.title)}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{t(item.desc)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION C: POPULAR BANGLADESH TOUR PACKAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-bold text-[#16A6A6] tracking-wide">
              {lang === 'bn' ? 'জনপ্রিয় দেশীয় গন্তব্য · নমুনা প্যাকেজ' : 'DOMESTIC HIGHLIGHTS · SAMPLE PACKAGES'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10283B]">
              {lang === 'bn' ? 'জনপ্রিয় বাংলাদেশ ট্যুর প্যাকেজ' : 'Popular Bangladesh Tour Packages'}
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              {lang === 'bn'
                ? 'কক্সবাজার, সাজেক ভ্যালি, সুন্দরবন এবং সিলেটের মনোরম প্রকৃতিতে আমাদের সর্বাধিক পছন্দের নমুনা ট্যুর প্যাকেজসমূহ।'
                : "Discover sample packages across Cox's Bazar, Sajek Valley, Sundarbans, and Sylhet."}
            </p>
          </div>
          <Link
            href="/tours/bangladesh"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#10283B] hover:bg-[#183a54] text-white font-bold text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            <span>{lang === 'bn' ? 'সকল বাংলাদেশ প্যাকেজ' : 'View All Bangladesh Tours'}</span>
            <ArrowRight className="w-4 h-4 text-[#F9C91D]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bangladeshPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      {/* SECTION D: POPULAR INTERNATIONAL TOUR PACKAGES */}
      <section className="bg-white py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-bold text-[#EF174F] tracking-wide">
                {lang === 'bn'
                  ? 'বিদেশ ভ্রমণ · ভারত · নেপাল · থাইল্যান্ড · মালয়েশিয়া · সিঙ্গাপুর · দুবাই'
                  : 'INTERNATIONAL DESTINATIONS · SAMPLE PRICING'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10283B]">
                {lang === 'bn'
                  ? 'জনপ্রিয় আন্তর্জাতিক ট্যুর প্যাকেজ'
                  : 'Popular International Tour Packages'}
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl">
                {lang === 'bn'
                  ? 'এই প্রোটোটাইপে প্রদর্শিত সকল আন্তর্জাতিক প্যাকেজের মূল্য ও তারিখ নমুনা (Sample Data) হিসেবে যুক্ত করা হয়েছে।'
                  : 'All prices and departure dates shown below are sample prototype data for visual review.'}
              </p>
            </div>
            <Link
              href="/tours/international"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EF174F] hover:bg-[#d61144] text-white font-bold text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
            >
              <span>
                {lang === 'bn' ? 'সকল আন্তর্জাতিক প্যাকেজ' : 'View All International Tours'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internationalPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION E: TOUR CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs font-bold text-[#16A6A6] tracking-wide">
            {lang === 'bn' ? 'ভ্রমণের ধরন অনুযায়ী নির্বাচন করুন' : 'BROWSE BY TRAVEL STYLE'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10283B]">
            {lang === 'bn' ? 'ট্যুর ক্যাটাগরিসমূহ' : 'Explore Tour Categories'}
          </h2>
          <p className="text-sm text-slate-600">
            {lang === 'bn'
              ? 'সমুদ্র, পাহাড়, হাওর, ফ্যামিলি ট্যুর কিংবা আন্তর্জাতিক ভ্রমণ — আপনার পছন্দের ক্যাটাগরি বেছে নিন।'
              : 'From coastal beaches and misty hill tracks to family vacations and international holidays.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={
                cat.slug === 'international'
                  ? '/tours/international'
                  : `/tours/bangladesh?category=${cat.slug}`
              }
              className="group relative rounded-2xl overflow-hidden aspect-[16/10] flex flex-col justify-end p-5 border border-slate-200 shadow-xs hover:shadow-xl transition-all"
            >
              <div className="absolute inset-0">
                <ResilientImage
                  src={cat.image}
                  alt={t(cat.name)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10283B]/90 via-[#10283B]/45 to-transparent" />
              </div>

              <div className="relative z-10 space-y-1">
                <h3 className="text-base font-extrabold text-white group-hover:text-[#F9C91D] transition-colors">
                  {t(cat.name)}
                </h3>
                <p className="text-xs text-slate-200 line-clamp-1">{t(cat.subtitle)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION F: PROMOTIONAL TRAVEL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#10283B] text-white p-8 sm:p-12 lg:p-16 border border-white/10 shadow-xl">
          <div className="absolute inset-0 opacity-35">
            <ResilientImage
              src="/images/hero_bangladesh.jpg"
              alt="Scenic Promotional Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#10283B] via-[#10283B]/90 to-[#10283B]/50" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-5">
            <p className="text-xs font-bold text-[#F9C91D] tracking-wider">
              {settings.brandName} · {settings.ownerName}
            </p>
            <blockquote
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-snug text-white"
              style={{ textWrap: 'balance' }}
            >
              “{t(settings.promoQuote)}”
            </blockquote>
            <p className="text-sm text-slate-200 leading-relaxed">
              {lang === 'bn'
                ? 'পরিবার, বন্ধু কিংবা অফিসের সহকর্মীদের সাথে আপনার পরবর্তী ভ্রমণ পরিকল্পনা করতে আজই আমাদের ডেমো বুকিং সিস্টেম ঘুরে দেখুন।'
                : 'Plan your upcoming holiday with your family, friends, or colleagues using our interactive prototype booking flow.'}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-extrabold text-sm transition-colors shadow-md"
              >
                <span>{lang === 'bn' ? 'এখনই ডেমো বুকিং করুন' : 'Start Demo Booking'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#16A6A6]" />
                <span>{lang === 'bn' ? 'পরামর্শের জন্য যোগাযোগ' : 'Contact Our Team'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION G: UPCOMING THURSDAY TOURS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#EF174F]">
                <Calendar className="w-4 h-4" />
                <span>
                  {lang === 'bn'
                    ? 'সাপ্তাহিক উইকএন্ড ট্রিপ · শুধুমাত্র ডেমো তারিখ (Sample Schedule)'
                    : 'WEEKEND GROUP TOURS · SAMPLE MOCK SCHEDULE ONLY'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10283B]">
                {lang === 'bn'
                  ? 'আসন্ন বৃহস্পতিবারের বিশেষ ট্যুরসমূহ (ডেমো সূচি)'
                  : 'Upcoming Thursday Group Tours (Sample Dates)'}
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl">
                {lang === 'bn'
                  ? 'চাকরিজীবী, শিক্ষার্থী ও ছোট পরিবারের সুবিধার্থে বৃহস্পতিবার রাতে যাত্রা করে রবিবার সকালে ফেরার নমুনা ট্যুর তালিকা।'
                  : 'Sample weekend departures scheduled for Thursday nights—ideal for professionals, students, and small families.'}
              </p>
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
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-200">
                    <ResilientImage
                      src={pkg.image}
                      alt={t(pkg.title)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-base font-bold text-[#10283B] truncate">
                      <Link href={`/packages/${pkg.slug}`} className="hover:text-[#16A6A6]">
                        {t(pkg.title)}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-600">
                      {t(pkg.durationText)} ·{' '}
                      {lang === 'bn' ? 'নমুনা আসন:' : 'Sample Seats:'}{' '}
                      <strong className="font-mono tabular-nums">{pkg.availableSeats}</strong>
                    </p>
                    <p className="text-xs text-[#16A6A6] font-medium">
                      {lang === 'bn' ? 'ডেমো যাত্রার তারিখ:' : 'Sample Dates:'}{' '}
                      <span className="font-mono tabular-nums text-[#10283B]">
                        {pkg.departureDates.slice(0, 2).join(', ')}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 shrink-0">
                  <span className="text-lg font-extrabold text-[#10283B] tabular-nums">
                    {formatBdt(pkg.pricePerPerson)}
                  </span>
                  <Link
                    href={`/booking?package=${pkg.slug}`}
                    className="px-4 py-2 rounded-xl bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-bold text-xs transition-colors whitespace-nowrap"
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-bold text-[#16A6A6] tracking-wide">
              {lang === 'bn'
                ? 'সহায়তা ও পরামর্শ সেবা · কোনো ভিসা বা অ্যাপয়েন্টমেন্ট গ্যারান্টি নয়'
                : 'DOCUMENTATION & INQUIRY ASSISTANCE ONLY'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10283B]">
              {lang === 'bn'
                ? 'ভারতীয় ভিসা ও মেডিকেল ট্রাভেল সহায়তা'
                : 'Indian Visa & Medical Travel Assistance'}
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              {lang === 'bn'
                ? 'আমরা ভিসা ফরম পূরণ, ডকুমেন্ট চেকলিস্ট যাচাই এবং ভারতের হাসপাতালে ডাক্তারের অ্যাপয়েন্টমেন্ট অনুসন্ধানে সহায়তা করি। চূড়ান্ত ভিসা অনুমোদন সম্পূর্ণরূপে হাই কমিশনের এখতিয়ারভুক্ত।'
                : 'We assist with visa application forms, document preparation, and hospital appointment inquiries in India. We do not guarantee visa approval or confirmed hospital slots.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              icon: FileText,
              title: { bn: 'ভারতীয় ট্যুরিস্ট ভিসা সহায়তা', en: 'Indian Tourist Visa Assistance' },
              desc: {
                bn: 'সঠিক নিয়মে অনলাইন আবেদন ফরম পূরণ ও প্রয়োজনীয় কাগজপত্রের চেকলিস্ট প্রস্তুতকরণ।',
                en: 'Guidance on application form filling and required document checklists.',
              },
              href: '/services/indian-visa',
              accent: 'border-t-4 border-t-[#16A6A6]',
            },
            {
              icon: Stethoscope,
              title: { bn: 'ভারতীয় মেডিকেল ভিসা সহায়তা', en: 'Indian Medical Visa Assistance' },
              desc: {
                bn: 'রোগী ও অ্যাটেনডেন্টের মেডিকেল ভিসা ডকুমেন্টেশন ও ইনভাইটেশন লেটার যাচাই সহায়তা।',
                en: 'Documentation support for patients and medical attendants traveling to India.',
              },
              href: '/services/indian-visa',
              accent: 'border-t-4 border-t-[#EF174F]',
            },
            {
              icon: Calendar,
              title: { bn: 'ভিসা স্লট ও আবেদন অনুসন্ধান', en: 'Visa Slot & Status Inquiry' },
              desc: {
                bn: 'আবেদন জমা দেওয়ার প্রস্তুতি ও অ্যাপয়েন্টমেন্ট তারিখ সংক্রান্ত তথ্যের জন্য পরামর্শ।',
                en: 'Advisory support for visa submission readiness and appointment scheduling inquiries.',
              },
              href: '/services/indian-visa',
              accent: 'border-t-4 border-t-[#F9C91D]',
            },
            {
              icon: Building2,
              title: { bn: 'হাসপাতাল অ্যাপয়েন্টমেন্ট সমন্বয়', en: 'Hospital Appointment Coordination' },
              desc: {
                bn: 'চেন্নাই, ভেলোর, ব্যাঙ্গালোর ও কলকাতার হাসপাতালে ডাক্তারের সিরিয়াল অনুসন্ধানে সহায়তা।',
                en: 'Assistance with doctor appointment inquiries across major hospitals in India.',
              },
              href: '/services/medical-travel',
              accent: 'border-t-4 border-t-[#16A6A6]',
            },
            {
              icon: Sparkles,
              title: { bn: 'মেডিকেল ট্রাভেল প্ল্যানিং', en: 'Medical Travel Planning' },
              desc: {
                bn: 'রোগীর সুবিধা অনুযায়ী এয়ার/ট্রেন টিকিট, হাসপাতাল সংলগ্ন হোটেল ও পিকআপ পরিকল্পনা।',
                en: 'Patient-friendly accommodation near hospitals, flights, and airport transfer planning.',
              },
              href: '/services/medical-travel',
              accent: 'border-t-4 border-t-[#10283B]',
            },
          ].map((srv, idx) => {
            const IconComp = srv.icon;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between gap-4 ${srv.accent}`}
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F4F8FB] text-[#10283B] flex items-center justify-center">
                    <IconComp className="w-5 h-5 text-[#16A6A6]" />
                  </div>
                  <h3 className="text-base font-bold text-[#10283B] leading-snug">
                    {t(srv.title)}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{t(srv.desc)}</p>
                </div>

                <Link
                  href={srv.href}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#10283B] hover:text-[#EF174F] transition-colors pt-2"
                >
                  <span>{lang === 'bn' ? 'তথ্য ও অনুসন্ধান ফরম' : 'Inquiry & Details'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION I: CORPORATE AND GROUP TOURS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-5">
            <p className="text-xs font-bold text-[#16A6A6] tracking-wide">
              {lang === 'bn' ? 'কর্পোরেট ও গ্রুপ কাস্টমাইজড ভ্রমণ' : 'CORPORATE, ACADEMIC & FAMILY GROUPS'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10283B]">
              {lang === 'bn'
                ? 'কর্পোরেট রিট্রিট, অফিস ট্যুর ও পারিবারিক গ্রুপ প্যাকেজ'
                : 'Corporate Retreats, Team Trips & Custom Group Packages'}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'আপনার প্রতিষ্ঠানের বার্ষিক আনন্দ ভ্রমণ, কনফারেন্স, বিশ্ববিদ্যালয় স্টাডি ট্যুর কিংবা বড় পরিবারের ভ্রমণের জন্য আপনার বাজেট ও পছন্দ অনুযায়ী কাস্টমাইজড আইটিনারারি এবং কোটেশন তৈরি করে নিন।'
                : 'Planning an annual company retreat, team-building outing, university excursion, or large family reunion? Request a tailored itinerary and budget quotation.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs text-[#10283B] font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A6A6] shrink-0" />
                <span>
                  {lang === 'bn'
                    ? 'রিজার্ভ এসি বাস, মাইক্রোবাস ও ডমেস্টিক ফ্লাইট সমন্বয়'
                    : 'Reserved AC buses, coasters & domestic flight coordination'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A6A6] shrink-0" />
                <span>
                  {lang === 'bn'
                    ? 'কনফারেন্স হল, বারবিকিউ নাইট ও টিম বিল্ডিং ইভেন্ট'
                    : 'Conference venues, gala dinners & BBQ night setup'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A6A6] shrink-0" />
                <span>
                  {lang === 'bn'
                    ? 'পছন্দমতো মেনু ও প্রাইভেট রিসোর্ট বুকিং সুবিধা'
                    : 'Customized meal menus and dedicated tour manager'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A6A6] shrink-0" />
                <span>
                  {lang === 'bn'
                    ? 'এআই ট্রাভেল প্ল্যানার দিয়ে তাৎক্ষণিক খসড়া পরিকল্পনা'
                    : 'AI-assisted custom itinerary drafting available'}
                </span>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                href="/corporate-tours"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-extrabold text-sm transition-colors shadow-xs"
              >
                <span>
                  {lang === 'bn' ? 'কোটেশন রিকোয়েস্ট করুন (Request a Quote)' : 'Request a Quote'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[280px] bg-slate-100">
            <ResilientImage
              src="/images/pkg_sylhet_tea.jpg"
              alt="Corporate and Group Tour"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10283B]/70 via-transparent to-transparent flex items-end p-6">
              <p className="text-xs text-white font-medium">
                {lang === 'bn'
                  ? '১০ থেকে ১০০+ সদস্যের কর্পোরেট ও পারিবারিক গ্রুপের জন্য কাস্টম ট্যুর প্ল্যানিং।'
                  : 'Custom group arrangements for 10 to 100+ travelers across Bangladesh and abroad.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION J: REVIEWS (DEMO CONTENT) & TRAVEL GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Sample Testimonials */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-xs font-bold text-[#EF174F] tracking-wide">
                {lang === 'bn'
                  ? 'ডেমো রিভিউ প্রিভিউ · নমুনা কন্টেন্ট (Sample Testimonials)'
                  : 'DEMO TESTIMONIALS · SAMPLE CONTENT FOR UI REVIEW'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10283B]">
                {lang === 'bn'
                  ? 'ভ্রমণকারীদের অভিজ্ঞতা (ডেমো কন্টেন্ট)'
                  : 'Traveler Feedback (Sample Demo Content)'}
              </h2>
            </div>
            <Link
              href="/reviews"
              className="text-xs font-bold text-[#16A6A6] hover:underline inline-flex items-center gap-1"
            >
              <span>{lang === 'bn' ? 'সকল ডেমো রিভিউ দেখুন' : 'View All Sample Reviews'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1 text-[#F9C91D]">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span>{rev.date}</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{t(rev.comment)}</p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <p className="text-sm font-bold text-[#10283B]">{rev.customerName}</p>
                  <p className="text-xs text-slate-500">
                    {t(rev.roleOrCity)} · {t(rev.tourTitle)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Photo Gallery Grid */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <p className="text-xs font-bold text-[#16A6A6] tracking-wide">
                {lang === 'bn' ? 'ভ্রমণ গ্যালারি' : 'DESTINATION GALLERY'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10283B]">
                {lang === 'bn'
                  ? 'মনোরম ভ্রমণ গন্তব্যের মুহূর্তসমূহ'
                  : 'Scenic Moments Across Our Destinations'}
              </h2>
            </div>
            <Link
              href="/gallery"
              className="text-xs font-bold text-[#16A6A6] hover:underline inline-flex items-center gap-1"
            >
              <span>{lang === 'bn' ? 'সম্পূর্ণ গ্যালারি দেখুন' : 'Open Full Gallery'}</span>
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#10283B]/85 via-transparent to-transparent flex flex-col justify-end p-4">
                  <p className="text-xs font-bold text-white line-clamp-1">{t(item.title)}</p>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#F9C91D]" />
                    <span>{t(item.location)}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION K: STATISTICS (CLEARLY LABELED SAMPLE PROTOTYPE FIGURES) & FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-[#10283B] text-white rounded-3xl p-8 sm:p-10 border border-white/10 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 mb-6 border-b border-white/10">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              {lang === 'bn'
                ? 'প্রোটোটাইপ ওভারভিউ পরিসংখ্যান (ডেমো/নমুনা সংখ্যা)'
                : 'Prototype Overview Metrics (Sample Demo Figures Only)'}
            </h2>
            <span className="text-xs text-[#F9C91D] font-medium">
              {lang === 'bn'
                ? '* ভিজ্যুয়াল লেআউট পরীক্ষার জন্য নমুনা ডাটা'
                : '* Sample placeholders for UI layout review'}
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#F9C91D] font-mono tabular-nums">
                {publishedPackages.length}টি
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {lang === 'bn'
                  ? 'সক্রিয় ডেমো ট্যুর প্যাকেজ (নমুনা)'
                  : 'Active Sample Tour Packages'}
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#16A6A6] font-mono tabular-nums">
                ৮+ দেশ ও অঞ্চল
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {lang === 'bn'
                  ? 'দেশীয় ও আন্তর্জাতিক গন্তব্য ক্যাটালগ'
                  : 'Domestic & International Destinations'}
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                ১০০% ডেমো ফ্লো
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {lang === 'bn'
                  ? 'বিকাশ ডেমো পেমেন্ট ও এসএমএস প্রিভিউ'
                  : 'Simulated bKash & SMS Booking Flow'}
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#EF174F] font-mono tabular-nums">
                দ্বিভাষিক UI
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {lang === 'bn'
                  ? 'বাংলা ও ইংরেজি ভাষায় সম্পূর্ণ নেভিগেশন'
                  : 'Full Bengali & English Support'}
              </p>
            </div>
          </div>
        </div>

        {/* Final Prominent Booking CTA Banner */}
        <div className="bg-gradient-to-r from-[#16A6A6] to-[#10283B] rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              {lang === 'bn'
                ? 'আপনার পছন্দের ট্যুর প্যাকেজটি বুক করতে প্রস্তুত?'
                : 'Ready to Test the Tour Booking Experience?'}
            </h2>
            <p className="text-sm text-slate-100 leading-relaxed">
              {lang === 'bn'
                ? 'প্যাকেজ নির্বাচন করুন, যাত্রীর সংখ্যা দিন এবং ডেমো বিকাশ পেমেন্ট সিমুলেশনের মাধ্যমে বুকিং কনফার্মেশন ও অ্যাডমিন ড্যাশবোর্ড আপডেট দেখুন।'
                : 'Select a sample package, choose your traveler count, and run the simulated bKash checkout to see live updates in the Admin Demo Dashboard.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-extrabold text-sm transition-colors shadow-md"
            >
              <span>{lang === 'bn' ? 'এখনই বুক করুন' : 'Book a Tour Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm transition-colors"
            >
              <span>{lang === 'bn' ? 'অ্যাডমিন ডেমো দেখুন' : 'Open Admin Demo'}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
