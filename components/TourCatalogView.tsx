'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, RotateCcw, MapPin, Calendar } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { TourCategorySlug, TourType } from '@/lib/types';
import PackageCard from './PackageCard';

interface TourCatalogViewProps {
  initialType?: 'all' | TourType;
  pageTitleBn: string;
  pageTitleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  initialCategory?: string;
}

export default function TourCatalogView({
  initialType = 'all',
  pageTitleBn,
  pageTitleEn,
  subtitleBn,
  subtitleEn,
  initialCategory = 'all',
}: TourCatalogViewProps) {
  const { lang, t, formatBdt, packages, destinations, categories } = useApp();

  const [typeFilter, setTypeFilter] = useState<'all' | TourType>(initialType);
  const [destinationFilter, setDestinationFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>(initialCategory);
  const [maxBudget, setMaxBudget] = useState<number>(100000);
  const [durationFilter, setDurationFilter] = useState<string>('all');
  const [departureMonth, setDepartureMonth] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const itemsPerPage = 6;

  const filteredPackages = useMemo(() => {
    return packages
      .filter((p) => p.isPublished)
      .filter((p) => {
        if (typeFilter !== 'all' && p.type !== typeFilter) return false;
        if (destinationFilter !== 'all' && p.destinationSlug !== destinationFilter) return false;
        if (categoryFilter !== 'all' && p.category !== (categoryFilter as TourCategorySlug))
          return false;
        if (p.pricePerPerson > maxBudget) return false;
        if (durationFilter === 'short' && p.durationDays > 3) return false;
        if (durationFilter === 'medium' && (p.durationDays < 4 || p.durationDays > 5))
          return false;
        if (durationFilter === 'long' && p.durationDays < 6) return false;
        if (
          departureMonth !== 'all' &&
          !p.departureDates.some((d) => d.startsWith(departureMonth))
        )
          return false;

        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const inTitle =
            p.title.bn.toLowerCase().includes(q) || p.title.en.toLowerCase().includes(q);
          const inDest =
            p.destinationName.bn.toLowerCase().includes(q) ||
            p.destinationName.en.toLowerCase().includes(q);
          if (!inTitle && !inDest) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.pricePerPerson - b.pricePerPerson;
        if (sortBy === 'price-desc') return b.pricePerPerson - a.pricePerPerson;
        return b.popularityScore - a.popularityScore;
      });
  }, [
    packages,
    typeFilter,
    destinationFilter,
    categoryFilter,
    maxBudget,
    durationFilter,
    departureMonth,
    searchQuery,
    sortBy,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredPackages.length / itemsPerPage));
  const paginatedPackages = filteredPackages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleReset = () => {
    setTypeFilter(initialType);
    setDestinationFilter('all');
    setCategoryFilter('all');
    setMaxBudget(100000);
    setDurationFilter('all');
    setDepartureMonth('all');
    setSearchQuery('');
    setSortBy('popular');
    setCurrentPage(1);
  };

  return (
    <div className="pb-16">
      {/* Page Header Banner */}
      <div className="bg-[#10283B] text-white py-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <p className="text-xs font-bold text-[#F9C91D] tracking-wider">
            {lang === 'bn'
              ? 'শোভন ট্যুর অ্যান্ড ট্রাভেল বিডি · নমুনা প্যাকেজ ক্যাটালগ'
              : 'SHOVON TOUR & TRAVEL BD · SAMPLE PACKAGE CATALOG'}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            {lang === 'bn' ? pageTitleBn : pageTitleEn}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
            {lang === 'bn' ? subtitleBn : subtitleEn}
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#10283B]">
                <SlidersHorizontal className="w-4 h-4 text-[#16A6A6]" />
                <span>{lang === 'bn' ? 'ফিল্টার ও অনুসন্ধান' : 'Filter Packages'}</span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#EF174F] hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{lang === 'bn' ? 'রিসেট' : 'Reset'}</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#10283B]">
                {lang === 'bn' ? 'প্যাকেজ বা গন্তব্যের নাম' : 'Search Keyword'}
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder={lang === 'bn' ? 'যেমন: সাজেক, নেপাল...' : 'e.g. Sajek, Nepal...'}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200 text-xs text-[#10283B] focus:outline-none focus:border-[#16A6A6]"
                />
              </div>
            </div>

            {/* Tour Type Filter */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#10283B]">
                {lang === 'bn' ? 'ভ্রমণের অঞ্চল' : 'Tour Region'}
              </label>
              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value as 'all' | TourType);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200 text-xs font-medium text-[#10283B]"
              >
                <option value="all">
                  {lang === 'bn' ? 'সকল ট্যুর (দেশ ও বিদেশ)' : 'All Regions'}
                </option>
                <option value="bangladesh">
                  {lang === 'bn' ? 'বাংলাদেশ ট্যুর' : 'Bangladesh Domestic'}
                </option>
                <option value="international">
                  {lang === 'bn' ? 'আন্তর্জাতিক ট্যুর' : 'International'}
                </option>
              </select>
            </div>

            {/* Destination Filter */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#10283B]">
                {lang === 'bn' ? 'নির্দিষ্ট গন্তব্য' : 'Destination'}
              </label>
              <select
                value={destinationFilter}
                onChange={(e) => {
                  setDestinationFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200 text-xs font-medium text-[#10283B]"
              >
                <option value="all">{lang === 'bn' ? 'সকল গন্তব্য' : 'All Destinations'}</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.slug}>
                    {t(d.name)}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#10283B]">
                {lang === 'bn' ? 'ট্যুর ক্যাটাগরি' : 'Travel Category'}
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200 text-xs font-medium text-[#10283B]"
              >
                <option value="all">{lang === 'bn' ? 'সকল ক্যাটাগরি' : 'All Categories'}</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {t(c.name)}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration Filter */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#10283B]">
                {lang === 'bn' ? 'ভ্রমণের মেয়াদ' : 'Duration'}
              </label>
              <select
                value={durationFilter}
                onChange={(e) => {
                  setDurationFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200 text-xs font-medium text-[#10283B]"
              >
                <option value="all">{lang === 'bn' ? 'যেকোনো মেয়াদ' : 'Any Duration'}</option>
                <option value="short">{lang === 'bn' ? '২ – ৩ দিন' : '2 – 3 Days'}</option>
                <option value="medium">{lang === 'bn' ? '৪ – ৫ দিন' : '4 – 5 Days'}</option>
                <option value="long">{lang === 'bn' ? '৬+ দিন' : '6+ Days'}</option>
              </select>
            </div>

            {/* Departure Month Filter */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#10283B]">
                {lang === 'bn' ? 'যাত্রার মাস (নমুনা তারিখ)' : 'Departure Month (Sample)'}
              </label>
              <select
                value={departureMonth}
                onChange={(e) => {
                  setDepartureMonth(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200 text-xs font-medium text-[#10283B]"
              >
                <option value="all">{lang === 'bn' ? 'সকল মাস' : 'All Months'}</option>
                <option value="2026-10">{lang === 'bn' ? 'অক্টোবর ২০২৬' : 'October 2026'}</option>
                <option value="2026-11">{lang === 'bn' ? 'নভেম্বর ২০২৬' : 'November 2026'}</option>
                <option value="2026-12">{lang === 'bn' ? 'ডিসেম্বর ২০২৬' : 'December 2026'}</option>
              </select>
            </div>

            {/* Budget Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#10283B]">
                  {lang === 'bn' ? 'সর্বোচ্চ বাজেট (জনপ্রতি)' : 'Max Budget / Person'}
                </span>
                <span className="font-mono font-bold text-[#16A6A6] tabular-nums">
                  {formatBdt(maxBudget)}
                </span>
              </div>
              <input
                type="range"
                min={4000}
                max={100000}
                step={2000}
                value={maxBudget}
                onChange={(e) => {
                  setMaxBudget(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-[#16A6A6]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>৳4,000</span>
                <span>৳100,000</span>
              </div>
            </div>
          </div>

          {/* Destinations Directory Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold text-[#10283B] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#EF174F]" />
              <span>{lang === 'bn' ? 'গন্তব্য গাইড পেজসমূহ' : 'Destination Guides'}</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {destinations.map((dest) => (
                <Link
                  key={dest.id}
                  href={`/destinations/${dest.slug}`}
                  className="px-2.5 py-1.5 rounded-lg bg-[#F4F8FB] hover:bg-[#10283B] hover:text-white text-xs font-medium text-[#10283B] transition-colors"
                >
                  {t(dest.name)}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <div className="lg:col-span-9 space-y-6">
          {/* Top Sort & Count Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <p className="text-xs sm:text-sm text-slate-600">
              {lang === 'bn' ? (
                <>
                  মোট <strong className="text-[#10283B] font-mono">{filteredPackages.length}</strong>টি নমুনা ট্যুর প্যাকেজ পাওয়া গেছে
                </>
              ) : (
                <>
                  Showing <strong className="text-[#10283B] font-mono">{filteredPackages.length}</strong> sample tour packages
                </>
              )}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 whitespace-nowrap">
                {lang === 'bn' ? 'সাজান:' : 'Sort by:'}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-xs font-semibold text-[#10283B]"
              >
                <option value="popular">
                  {lang === 'bn' ? 'জনপ্রিয়তা অনুযায়ী' : 'Most Popular'}
                </option>
                <option value="price-asc">
                  {lang === 'bn' ? 'মূল্য: কম থেকে বেশি' : 'Price: Low to High'}
                </option>
                <option value="price-desc">
                  {lang === 'bn' ? 'মূল্য: বেশি থেকে কম' : 'Price: High to Low'}
                </option>
              </select>
            </div>
          </div>

          {/* Cards or Empty State */}
          {paginatedPackages.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <p className="text-base font-bold text-[#10283B]">
                {lang === 'bn'
                  ? 'আপনার নির্বাচিত ফিল্টারে কোনো ডেমো প্যাকেজ পাওয়া যায়নি।'
                  : 'No sample tour packages match your selected filters.'}
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F9C91D] text-[#10283B] font-bold text-xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{lang === 'bn' ? 'সকল ফিল্টার রিসেট করুন' : 'Reset All Filters'}</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-4">
              {paginatedPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold font-mono transition-colors ${
                      currentPage === pageNum
                        ? 'bg-[#10283B] text-[#F9C91D]'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
