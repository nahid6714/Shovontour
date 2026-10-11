'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  XCircle,
  MessageSquare,
  ArrowRight,
  Search,
  LayoutDashboard,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '@/lib/app-context';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const { lang, t, formatBdt, bookings } = useApp();

  const refParam = searchParams.get('ref');
  const booking =
    bookings.find((b) => b.reference === refParam) || bookings[0];

  const isSuccess = booking.paymentStatus === 'demo_paid';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Status Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border shadow-sm space-y-4 ${
          isSuccess
            ? 'bg-white border-teal-200'
            : 'bg-white border-red-200'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            {isSuccess ? (
              <div className="w-12 h-12 rounded-2xl bg-[#16A6A6]/15 text-[#16A6A6] flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-[#EF174F]/15 text-[#EF174F] flex items-center justify-center">
                <XCircle className="w-7 h-7" />
              </div>
            )}
            <div>
              <span className="text-xs font-mono font-bold text-[#EF174F] uppercase">
                SIMULATED DEMO BOOKING STATUS
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#10283B]">
                {isSuccess
                  ? lang === 'bn'
                    ? 'ডেমো বুকিং সফলভাবে রেকর্ড করা হয়েছে!'
                    : 'Demo Booking Recorded!'
                  : lang === 'bn'
                  ? 'ডেমো পেমেন্ট ব্যর্থ সিমুলেশন'
                  : 'Simulated Demo Payment Failed'}
              </h1>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-500 block">
              {lang === 'bn' ? 'বুকিং রেফারেন্স' : 'Booking Reference'}
            </span>
            <span className="text-lg font-mono font-extrabold text-[#10283B]">
              {booking.reference}
            </span>
          </div>
        </div>

        {/* Notice */}
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            {lang === 'bn'
              ? 'বিজ্ঞপ্তি: এটি একটি ফ্রন্টএন্ড প্রোটোটাইপ সিমুলেশন। কোনো প্রকৃত অর্থ স্থানান্তরিত হয়নি এবং কোনো আসল এসএমএস পাঠানো হয়নি।'
              : 'Disclaimer: This is a frontend prototype simulation. No real money was transferred and no real SMS was dispatched.'}
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-3.5 rounded-xl bg-[#F4F8FB]">
            <span className="text-slate-500 block">
              {lang === 'bn' ? 'গ্রাহকের নাম ও ফোন' : 'Customer & Phone'}
            </span>
            <strong className="text-sm text-[#10283B] block mt-0.5">
              {booking.customerName}
            </strong>
            <span className="font-mono text-slate-600">{booking.customerPhone}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F4F8FB]">
            <span className="text-slate-500 block">
              {lang === 'bn' ? 'ট্যুর প্যাকেজ ও তারিখ' : 'Package & Departure'}
            </span>
            <strong className="text-sm text-[#10283B] block mt-0.5 truncate">
              {t(booking.packageTitle)}
            </strong>
            <span className="font-mono text-slate-600">
              {booking.departureDate} · {booking.travelerCount}{' '}
              {lang === 'bn' ? 'জন' : 'Persons'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F4F8FB]">
            <span className="text-slate-500 block">
              {lang === 'bn' ? 'ডেমো পেমেন্ট হিসাব' : 'Demo Payment Summary'}
            </span>
            <strong className="text-sm font-mono text-[#16A6A6] block mt-0.5">
              {lang === 'bn' ? 'ডেমো অগ্রিম:' : 'Demo Advance:'}{' '}
              {formatBdt(booking.advanceAmount)}
            </strong>
            <span className="font-mono text-slate-600">
              {lang === 'bn' ? 'মোট:' : 'Total:'} {formatBdt(booking.totalPrice)} (Trx:{' '}
              {booking.transactionRef})
            </span>
          </div>
        </div>
      </div>

      {/* Simulated SMS Notification Previews */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-base font-extrabold text-[#10283B]">
          <MessageSquare className="w-5 h-5 text-[#16A6A6]" />
          <h2>
            {lang === 'bn'
              ? 'সিমুলেটেড এসএমএস প্রিভিউ (Simulated SMS Previews)'
              : 'Simulated SMS Notification Previews (Demo Only)'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#F4F8FB] border border-slate-200 space-y-1.5">
            <span className="text-[11px] font-bold text-[#16A6A6] uppercase">
              {lang === 'bn'
                ? 'গ্রাহকের মোবাইলে ডেমো এসএমএস প্রিভিউ'
                : 'Customer SMS Preview (Simulated)'}
            </span>
            <p className="text-xs font-mono text-[#10283B] leading-relaxed">
              {booking.customerSmsPreview}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F4F8FB] border border-slate-200 space-y-1.5">
            <span className="text-[11px] font-bold text-[#EF174F] uppercase">
              {lang === 'bn'
                ? 'অ্যাডমিন মোবাইলে ডেমো অ্যালার্ট প্রিভিউ'
                : 'Admin Alert SMS Preview (Simulated)'}
            </span>
            <p className="text-xs font-mono text-[#10283B] leading-relaxed">
              {booking.adminSmsPreview}
            </p>
          </div>
        </div>
      </div>

      {/* Next Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/bookings"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#10283B] hover:bg-[#173752] text-[#F9C91D] font-bold text-xs sm:text-sm transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>
              {lang === 'bn'
                ? 'অ্যাডমিন ড্যাশবোর্ডে এই বুকিংটি দেখুন'
                : 'View This Booking in Admin Demo'}
            </span>
          </Link>

          <Link
            href={`/booking/lookup?ref=${encodeURIComponent(booking.reference)}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-[#10283B] font-bold text-xs sm:text-sm transition-colors"
          >
            <Search className="w-4 h-4 text-[#16A6A6]" />
            <span>{lang === 'bn' ? 'বুকিং ট্র্যাকিং পেজ' : 'Booking Lookup Page'}</span>
          </Link>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10283B] hover:text-[#16A6A6]"
        >
          <span>{lang === 'bn' ? 'হোমপেজে ফিরে যান' : 'Return to Homepage'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading confirmation...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
