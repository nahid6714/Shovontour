'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  MapPin,
  ChevronDown,
  X,
} from 'lucide-react';
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
  // Minimized by default as requested ("ফিল্টার সিস্টেম নরমালি মিনিমিজ করা থাকবে")
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const itemsPerPage = 8;

  // Count how many filters are actively modified from defaults
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (typeFilter !== initialType) count++;
    if (destinationFilter !== 'all') count++;
    if (categoryFilter !== 'all') count++;
    if (maxBudget < 100000) count++;
    if (durationFilter !== 'all') count++;
    if (departureMonth !== 'all') count++;
    if (searchQuery.trim() !== '') count++;
    return count;
  }, [
    typeFilter,
    initialType,
    destinationFilter,
    categoryFilter,
    maxBudget,
    durationFilter,
    departureMonth,
    searchQuery,
  ]);

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
      <div className="bg-[#1E3540] text-white py-8 sm:py-11 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-2">
          <p className="text-[11px] sm:text-xs font-bold text-[#FAD814] tracking-wider">
            {lang === 'bn'
              ? 'শোভন ট্যুর অ্যান্ড ট্রাভেল বিডি · প্যাকেজ ক্যাটালগ'
              : 'SHOVON TOUR & TRAVEL BD · PACKAGE CATALOG'}
          </p>
          <h1 className="text-2xl sm:text-4xl font-black">
            {lang === 'bn' ? pageTitleBn : pageTitleEn}
          </h1>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl">
            {lang === 'bn' ? subtitleBn : subtitleEn}
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-5 sm:pt-7 space-y-5">
        {/* Compact Minimized Filter & Sort Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-3 sm:p-4 flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
            {/* Left: Filter Toggle Button + Search Box */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-[240px]">
              <button
                type="button"
                onClick={() => setFilterOpen((prev) => !prev)}
                aria-expanded={filterOpen}
                className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-colors shrink-0 ${
                  filterOpen || activeFilterCount > 0
                    ? 'bg-[#1E3540] text-[#FAD814]'
                    : 'bg-[#F4F8FB] hover:bg-slate-200/70 text-[#10283B] border border-slate-200'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4 shrink-0" />
                <span>{lang === 'bn' ? 'ফিল্টার' : 'Filter'}</span>
                {activeFilterCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#EE2454] text-white text-[10px] font-mono leading-none">
                    {activeFilterCount}
                  </span>
                )}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    filterOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>

              {/* Quick Search Input */}
              <div className="relative flex-1 max-w-xs">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder={
                    lang === 'bn' ? 'প্যাকেজ বা গন্তব্য খুঁজুন...' : 'Search tour or destination...'
                  }
                  className="w-full pl-8 pr-7 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200 text-xs text-[#10283B] focus:outline-none focus:border-[#0F8E95]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right: Package Count & Sort Selector */}
            <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              <p className="text-[11px] sm:text-xs text-slate-500">
                {lang === 'bn' ? (
                  <>
                    মোট <strong className="text-[#10283B] font-mono">{filteredPackages.length}</strong>টি প্যাকেজ
                  </>
                ) : (
                  <>
                    <strong className="text-[#10283B] font-mono">{filteredPackages.length}</strong> packages
                  </>
                )}
              </p>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] sm:text-xs text-slate-500 whitespace-nowrap">
                  {lang === 'bn' ? 'সাজান:' : 'Sort:'}
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-2.5 py-1.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-xs font-bold text-[#10283B]"
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
          </div>

          {/* Smoothly Collapsible / Expandable Filter Drawer (Minimized by Default) */}
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              filterOpen
                ? 'grid-rows-[1fr] opacity-100 border-t border-slate-100'
                : 'grid-rows-[0fr] opacity-0 pointer-events-none border-t-0'
            }`}
          >
            <div className="overflow-hidden">
              <div className="p-4 sm:p-5 bg-[#F8FAFC] space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {/* Tour Type Filter */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-[#10283B]">
                      {lang === 'bn' ? 'ভ্রমণের অঞ্চল' : 'Tour Region'}
                    </label>
                    <select
                      value={typeFilter}
                      onChange={(e) => {
                        setTypeFilter(e.target.value as 'all' | TourType);
                        setCurrentPage(1);
                      }}
                      className="w-full px-2.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-[#10283B]"
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
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-[#10283B]">
                      {lang === 'bn' ? 'নির্দিষ্ট গন্তব্য' : 'Destination'}
                    </label>
                    <select
                      value={destinationFilter}
                      onChange={(e) => {
                        setDestinationFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-2.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-[#10283B]"
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
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-[#10283B]">
                      {lang === 'bn' ? 'ট্যুর ক্যাটাগরি' : 'Travel Category'}
                    </label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => {
                        setCategoryFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-2.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-[#10283B]"
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
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-[#10283B]">
                      {lang === 'bn' ? 'ভ্রমণের মেয়াদ' : 'Duration'}
                    </label>
                    <select
                      value={durationFilter}
                      onChange={(e) => {
                        setDurationFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-2.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-[#10283B]"
                    >
                      <option value="all">{lang === 'bn' ? 'যেকোনো মেয়াদ' : 'Any Duration'}</option>
                      <option value="short">{lang === 'bn' ? '২ – ৩ দিন' : '2 – 3 Days'}</option>
                      <option value="medium">{lang === 'bn' ? '৪ – ৫ দিন' : '4 – 5 Days'}</option>
                      <option value="long">{lang === 'bn' ? '৬+ দিন' : '6+ Days'}</option>
                    </select>
                  </div>

                  {/* Departure Month Filter */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-[#10283B]">
                      {lang === 'bn' ? 'যাত্রার মাস' : 'Departure Month'}
                    </label>
                    <select
                      value={departureMonth}
                      onChange={(e) => {
                        setDepartureMonth(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-2.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-[#10283B]"
                    >
                      <option value="all">{lang === 'bn' ? 'সকল মাস' : 'All Months'}</option>
                      <option value="2026-10">{lang === 'bn' ? 'অক্টোবর ২০২৬' : 'October 2026'}</option>
                      <option value="2026-11">{lang === 'bn' ? 'নভেম্বর ২০২৬' : 'November 2026'}</option>
                      <option value="2026-12">{lang === 'bn' ? 'ডিসেম্বর ২০২৬' : 'December 2026'}</option>
                    </select>
                  </div>

                  {/* Budget Slider */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-[#10283B]">
                        {lang === 'bn' ? 'সর্বোচ্চ বাজেট' : 'Max Budget'}
                      </span>
                      <span className="font-mono font-bold text-[#0F8E95] tabular-nums">
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
                      className="w-full accent-[#0F8E95] mt-1"
                    />
                  </div>
                </div>

                {/* Bottom Row inside Filter Drawer: Destination Quick Links + Reset & Minimize Buttons */}
                <div className="pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-bold text-[#10283B] inline-flex items-center gap-1 mr-1">
                      <MapPin className="w-3.5 h-3.5 text-[#EE2454]" />
                      <span>{lang === 'bn' ? 'গন্তব্য গাইড:' : 'Destinations:'}</span>
                    </span>
                    {destinations.map((dest) => (
                      <Link
                        key={dest.id}
                        href={`/destinations/${dest.slug}`}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-[#1E3540] hover:text-white text-[11px] font-semibold text-[#10283B] transition-colors"
                      >
                        {t(dest.name)}
                      </Link>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#EE2454] hover:bg-rose-50 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'রিসেট' : 'Reset'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterOpen(false)}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-[#1E3540] text-[#FAD814] text-xs font-extrabold"
                    >
                      <span>{lang === 'bn' ? 'মিনিমাইজ করুন' : 'Minimize'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Results Grid */}
        {paginatedPackages.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-4">
            <p className="text-sm sm:text-base font-bold text-[#10283B]">
              {lang === 'bn'
                ? 'আপনার নির্বাচিত ফিল্টারে কোনো প্যাকেজ পাওয়া যায়নি।'
                : 'No tour packages match your selected filters.'}
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAD814] text-[#10283B] font-extrabold text-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{lang === 'bn' ? 'সকল ফিল্টার রিসেট করুন' : 'Reset All Filters'}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {paginatedPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-3">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold font-mono transition-colors ${
                    currentPage === pageNum
                      ? 'bg-[#1E3540] text-[#FAD814]'
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
  );
}
