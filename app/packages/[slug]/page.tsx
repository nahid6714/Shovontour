'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Clock,
  MapPin,
  Bus,
  Building2,
  CheckCircle2,
  XCircle,
  Calendar,
  Users,
  Heart,
  ShieldAlert,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '@/lib/app-context';
import ResilientImage from '@/components/ResilientImage';
import PackageCard from '@/components/PackageCard';

export default function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const { lang, t, formatBdt, packages, favorites, toggleFavorite } = useApp();

  const pkg = packages.find((p) => p.slug === slug) || packages[0];
  const isFav = favorites.includes(pkg.id);

  const [activeImage, setActiveImage] = useState<string>(pkg.image);
  const [selectedDate, setSelectedDate] = useState<string>(
    pkg.departureDates[0] || '2026-10-22'
  );
  const [travelers, setTravelers] = useState<number>(2);

  const totalSamplePrice = pkg.pricePerPerson * travelers;
  const totalSampleAdvance = pkg.advancePerPerson * travelers;

  const relatedPackages = packages
    .filter((p) => p.id !== pkg.id && p.isPublished)
    .slice(0, 3);

  const handleProceedToBooking = () => {
    router.push(
      `/booking?package=${pkg.slug}&date=${encodeURIComponent(
        selectedDate
      )}&travelers=${travelers}`
    );
  };

  return (
    <div className="pb-16 space-y-12">
      {/* Breadcrumb & Header */}
      <div className="bg-[#10283B] text-white py-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <Link href="/" className="hover:text-[#F9C91D]">
              {lang === 'bn' ? 'হোম' : 'Home'}
            </Link>
            <span>/</span>
            <Link
              href={
                pkg.type === 'bangladesh' ? '/tours/bangladesh' : '/tours/international'
              }
              className="hover:text-[#F9C91D]"
            >
              {pkg.type === 'bangladesh'
                ? lang === 'bn'
                  ? 'বাংলাদেশ ট্যুর'
                  : 'Bangladesh Tours'
                : lang === 'bn'
                ? 'আন্তর্জাতিক ট্যুর'
                : 'International Tours'}
            </Link>
            <span>/</span>
            <span className="text-[#F9C91D] font-semibold">{t(pkg.destinationName)}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
                {t(pkg.title)}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#16A6A6]" />
                  {t(pkg.destinationName)}
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#F9C91D]" />
                  {t(pkg.durationText)}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-300 font-medium">
                  {lang === 'bn'
                    ? '* নমুনা মূল্য ও ডেমো সিট তথ্য (Sample Data)'
                    : '* Sample Prototype Pricing & Availability'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleFavorite(pkg.id)}
              className={`self-start lg:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                isFav
                  ? 'bg-[#EF174F] text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
              <span>
                {isFav
                  ? lang === 'bn'
                    ? 'পছন্দের তালিকায় আছে'
                    : 'Saved in Favorites'
                  : lang === 'bn'
                  ? 'পছন্দের তালিকায় রাখুন'
                  : 'Save to Favorites'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Package Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Gallery, Overview, Itinerary, Inclusions, FAQ, Policy */}
        <div className="lg:col-span-8 space-y-8">
          {/* Image Gallery */}
          <div className="bg-white rounded-3xl border border-slate-200 p-4 space-y-3 shadow-xs">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
              <ResilientImage
                src={activeImage || pkg.image}
                alt={t(pkg.title)}
                className="w-full h-full object-cover"
              />
            </div>
            {pkg.gallery && pkg.gallery.length > 1 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {pkg.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(imgUrl)}
                    className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === imgUrl
                        ? 'border-[#16A6A6] scale-[0.99]'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <ResilientImage
                      src={imgUrl}
                      alt={`${t(pkg.title)} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accommodation & Transport Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 flex items-start gap-3.5 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#16A6A6]/15 text-[#16A6A6] flex items-center justify-center shrink-0">
                <Bus className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500">
                  {lang === 'bn' ? 'পরিবহন ব্যবস্থা (নমুনা)' : 'Transportation Highlight'}
                </p>
                <p className="text-sm font-bold text-[#10283B]">{t(pkg.transportHighlight)}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 flex items-start gap-3.5 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#EF174F]/15 text-[#EF174F] flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500">
                  {lang === 'bn' ? 'হোটেল ও রিসোর্ট (নমুনা)' : 'Accommodation Highlight'}
                </p>
                <p className="text-sm font-bold text-[#10283B]">
                  {t(pkg.accommodationHighlight)}
                </p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-3 shadow-xs">
            <h2 className="text-xl font-extrabold text-[#10283B]">
              {lang === 'bn' ? 'প্যাকেজ সংক্ষিপ্ত বিবরণ' : 'Package Overview'}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {t(pkg.overview)}
            </p>
          </div>

          {/* Day-by-Day Itinerary */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6 shadow-xs">
            <h2 className="text-xl font-extrabold text-[#10283B]">
              {lang === 'bn'
                ? 'দিনভিত্তিক ভ্রমণ পরিকল্পনা (নমুনা আইটিনারারি)'
                : 'Day-by-Day Sample Itinerary'}
            </h2>

            <div className="space-y-4">
              {pkg.itinerary.map((dayItem) => (
                <div
                  key={dayItem.day}
                  className="p-5 rounded-2xl bg-[#F4F8FB] border border-slate-200/80 space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-extrabold text-[#10283B]">
                      {lang === 'bn' ? `দিন ০${dayItem.day}: ` : `Day 0${dayItem.day}: `}
                      {t(dayItem.title)}
                    </h3>
                    <span className="text-xs font-medium text-[#16A6A6]">
                      {lang === 'bn' ? 'খাবার:' : 'Meals:'} {dayItem.meals.join(' · ')}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t(dayItem.description)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Included & Excluded Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 shadow-xs">
              <h3 className="text-base font-extrabold text-[#10283B] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#16A6A6]" />
                <span>{lang === 'bn' ? 'প্যাকেজে যা অন্তর্ভুক্ত' : 'Included Services'}</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {pkg.included.map((inc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#16A6A6] font-bold">✓</span>
                    <span>{t(inc)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 shadow-xs">
              <h3 className="text-base font-extrabold text-[#10283B] flex items-center gap-2">
                <XCircle className="w-5 h-5 text-[#EF174F]" />
                <span>{lang === 'bn' ? 'প্যাকেজে যা অন্তর্ভুক্ত নয়' : 'Excluded Services'}</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {pkg.excluded.map((exc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#EF174F] font-bold">✕</span>
                    <span>{t(exc)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Package FAQ & Cancellation Policy */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-5 shadow-xs">
            <h3 className="text-lg font-extrabold text-[#10283B] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#16A6A6]" />
              <span>
                {lang === 'bn'
                  ? 'বুকিং ও বাতিলকরণ নীতিমালা (নমুনা)'
                  : 'Booking & Cancellation Terms (Sample)'}
              </span>
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                {lang === 'bn'
                  ? '১. এটি একটি ফ্রন্টএন্ড প্রোটোটাইপ। এখানে প্রদর্শিত অগ্রিম ও মোট মূল্য শুধুমাত্র ডেমো বুকিং ফ্লো পরীক্ষার জন্য।'
                  : '1. This is a frontend prototype. Displayed advance and total prices are sample figures for testing the booking flow.'}
              </p>
              <p>
                {lang === 'bn'
                  ? '২. যাত্রার ৭ দিন পূর্বে বুকিং পরিবর্তনের অনুরোধ করা যাবে (হোটেল ও পরিবহন নীতির ওপর ভিত্তি করে)। বিস্তারিত জানতে রিফান্ড নীতি পেজ দেখুন।'
                  : '2. Date modification or cancellation requests are subject to hotel and transport rules. See our Refund Policy page for details.'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Sticky Booking & Calculator Module */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-lg space-y-6">
            <div className="border-b border-slate-100 pb-4 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-500 block">
                  {lang === 'bn' ? 'জনপ্রতি নমুনা মূল্য' : 'Sample Price / Person'}
                </span>
                <span className="text-3xl font-extrabold text-[#10283B] font-mono tabular-nums">
                  {formatBdt(pkg.pricePerPerson)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-500 block">
                  {lang === 'bn' ? 'জনপ্রতি ডেমো অগ্রিম' : 'Sample Advance'}
                </span>
                <span className="text-sm font-bold text-[#16A6A6] font-mono tabular-nums">
                  {formatBdt(pkg.advancePerPerson)}
                </span>
              </div>
            </div>

            {/* Departure Date Picker */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#10283B] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#16A6A6]" />
                <span>
                  {lang === 'bn'
                    ? 'যাত্রার তারিখ নির্বাচন করুন (নমুনা)'
                    : 'Select Sample Departure Date'}
                </span>
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm font-mono font-semibold text-[#10283B]"
              >
                {pkg.departureDates.map((d) => (
                  <option key={d} value={d}>
                    {d} ({lang === 'bn' ? 'নমুনা তারিখ' : 'Sample Date'})
                  </option>
                ))}
              </select>
            </div>

            {/* Traveler Count Stepper */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#10283B] flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#EF174F]" />
                <span>{lang === 'bn' ? 'যাত্রীর সংখ্যা' : 'Number of Travelers'}</span>
              </label>
              <div className="flex items-center justify-between bg-[#F4F8FB] rounded-xl p-2 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setTravelers((prev) => Math.max(1, prev - 1))}
                  className="w-10 h-10 rounded-lg bg-white border border-slate-200 font-bold text-lg text-[#10283B] hover:bg-slate-100"
                >
                  −
                </button>
                <span className="text-base font-extrabold font-mono tabular-nums text-[#10283B]">
                  {travelers} {lang === 'bn' ? 'জন' : 'Persons'}
                </span>
                <button
                  type="button"
                  onClick={() => setTravelers((prev) => Math.min(30, prev + 1))}
                  className="w-10 h-10 rounded-lg bg-white border border-slate-200 font-bold text-lg text-[#10283B] hover:bg-slate-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Live Price Calculation Breakdown */}
            <div className="bg-[#F4F8FB] rounded-2xl p-4 space-y-2.5 text-xs border border-slate-200/80">
              <div className="flex justify-between text-slate-600">
                <span>
                  {lang === 'bn' ? 'মোট প্যাকেজ মূল্য' : 'Total Sample Price'} ({travelers} জন)
                </span>
                <strong className="font-mono tabular-nums text-[#10283B]">
                  {formatBdt(totalSamplePrice)}
                </strong>
              </div>
              <div className="flex justify-between text-[#16A6A6] font-bold">
                <span>
                  {lang === 'bn' ? 'ডেমো বুকিং অগ্রিম (এখন প্রদেয়)' : 'Sample Advance Required'}
                </span>
                <strong className="font-mono tabular-nums">
                  {formatBdt(totalSampleAdvance)}
                </strong>
              </div>
              <div className="flex justify-between text-slate-500 pt-2 border-t border-slate-200">
                <span>{lang === 'bn' ? 'অবশিষ্ট ব্যালেন্স' : 'Remaining Balance'}</span>
                <span className="font-mono tabular-nums">
                  {formatBdt(totalSamplePrice - totalSampleAdvance)}
                </span>
              </div>
            </div>

            {/* Primary Book CTA */}
            <button
              type="button"
              onClick={handleProceedToBooking}
              className="w-full py-3.5 px-5 rounded-xl bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-extrabold text-sm flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <span>
                {lang === 'bn'
                  ? 'এই প্যাকেজটি ডেমো বুক করুন'
                  : 'Proceed to Demo Booking'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-2 text-[11px] text-slate-500 leading-normal">
              <ShieldAlert className="w-4 h-4 text-[#16A6A6] shrink-0 mt-0.5" />
              <span>
                {lang === 'bn'
                  ? 'পরবর্তী ধাপে আপনি ডেমো বিকাশ ইন্টারফেসের মাধ্যমে কোনো প্রকৃত অর্থ লেনদেন ছাড়াই বুকিং পরীক্ষা করতে পারবেন।'
                  : 'In the next step, you can test the simulated bKash demo payment without any real money transfer.'}
              </span>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Packages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        <h2 className="text-2xl font-extrabold text-[#10283B]">
          {lang === 'bn' ? 'অন্যান্য সম্পর্কিত ট্যুর প্যাকেজ' : 'Related Sample Tour Packages'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPackages.map((rp) => (
            <PackageCard key={rp.id} pkg={rp} />
          ))}
        </div>
      </div>
    </div>
  );
}
