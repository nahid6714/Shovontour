'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, FileCheck2, ArrowRight } from 'lucide-react';
import { useApp } from '@/lib/app-context';

function LookupContent() {
  const searchParams = useSearchParams();
  const { lang, t, formatBdt, bookings } = useApp();
  const [query, setQuery] = useState(searchParams.get('ref') || 'STT-DEMO-8421');

  const results = bookings.filter(
    (b) =>
      b.reference.toLowerCase().includes(query.trim().toLowerCase()) ||
      b.customerPhone.includes(query.trim())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="bg-[#10283B] text-white rounded-3xl p-6 sm:p-10 space-y-4">
        <p className="text-xs font-bold text-[#F9C91D]">
          {lang === 'bn' ? 'ডেমো বুকিং অনুসন্ধান' : 'DEMO BOOKING LOOKUP'}
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold">
          {lang === 'bn'
            ? 'আপনার বুকিং রেফারেন্স বা মোবাইল নম্বর দিয়ে খুঁজুন'
            : 'Check Your Sample Booking Status'}
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. STT-DEMO-8421 or 01711-001122"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-[#10283B] text-sm font-mono focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={() => setQuery('STT-DEMO-8421')}
            className="px-4 py-3 rounded-xl bg-[#F9C91D] text-[#10283B] font-bold text-xs whitespace-nowrap"
          >
            {lang === 'bn' ? 'নমুনা রেফারেন্স বসান' : 'Load Sample Ref'}
          </button>
        </div>
      </div>

      {/* Matching Bookings */}
      <div className="space-y-4">
        {results.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-600">
            {lang === 'bn'
              ? 'কোনো ডেমো বুকিং খুঁজে পাওয়া যায়নি। নমুনা রেফারেন্স STT-DEMO-8421 দিয়ে চেষ্টা করুন।'
              : 'No matching demo booking found. Try sample reference STT-DEMO-8421.'}
          </div>
        ) : (
          results.map((bk) => (
            <div
              key={bk.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-[#16A6A6]" />
                  <span className="font-mono font-extrabold text-base text-[#10283B]">
                    {bk.reference}
                  </span>
                </div>
                <span className="text-xs font-bold text-[#16A6A6]">
                  {lang === 'bn' ? 'বুকিং স্ট্যাটাস (ডেমো):' : 'Booking Status (Demo):'}{' '}
                  <strong className="uppercase">{bk.bookingStatus}</strong> ·{' '}
                  <strong className="uppercase">{bk.paymentStatus}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block">
                    {lang === 'bn' ? 'প্যাকেজ' : 'Package'}
                  </span>
                  <strong className="text-[#10283B]">{t(bk.packageTitle)}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">
                    {lang === 'bn' ? 'যাত্রী ও তারিখ' : 'Travelers & Date'}
                  </span>
                  <strong className="font-mono text-[#10283B]">
                    {bk.travelerCount} জন · {bk.departureDate}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 block">
                    {lang === 'bn' ? 'মোট ও ডেমো অগ্রিম' : 'Total & Demo Advance'}
                  </span>
                  <strong className="font-mono text-[#10283B]">
                    {formatBdt(bk.totalPrice)} ({lang === 'bn' ? 'অগ্রিম' : 'Adv'}:{' '}
                    {formatBdt(bk.advanceAmount)})
                  </strong>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Link
                  href={`/booking/confirmation?ref=${encodeURIComponent(bk.reference)}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#16A6A6] hover:underline"
                >
                  <span>
                    {lang === 'bn' ? 'সম্পূর্ণ রিসিট ও এসএমএস প্রিভিউ' : 'View Full Receipt & SMS'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function BookingLookupPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading lookup...</div>}>
      <LookupContent />
    </Suspense>
  );
}
