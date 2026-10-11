'use client';

import React from 'react';
import Link from 'next/link';
import {
  User,
  Heart,
  Calendar,
  LogOut,
  ArrowRight,
  PlusCircle,
} from 'lucide-react';
import { useApp } from '@/lib/app-context';
import PackageCard from '@/components/PackageCard';

export default function CustomerDashboardPage() {
  const {
    lang,
    t,
    formatBdt,
    bookings,
    packages,
    favorites,
    customerDemoUser,
    logoutDemoCustomer,
  } = useApp();

  const savedPackages = packages.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Customer Profile Card */}
      <div className="bg-[#10283B] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#F9C91D] text-[#10283B] flex items-center justify-center shrink-0">
            <User className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs text-[#F9C91D] font-bold">
              {lang === 'bn' ? 'গ্রাহক ডেমো ড্যাশবোর্ড' : 'CUSTOMER DEMO DASHBOARD'}
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold">
              {customerDemoUser?.name ||
                (lang === 'bn' ? 'সম্মানিত ডেমো গ্রাহক' : 'Demo Traveler')}
            </h1>
            <p className="text-xs text-slate-300 font-mono">
              {customerDemoUser?.phone || '01711-001122'} ·{' '}
              {customerDemoUser?.email || 'demo@example.com'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/booking"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F9C91D] text-[#10283B] font-extrabold text-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{lang === 'bn' ? 'নতুন ডেমো বুকিং' : 'New Demo Booking'}</span>
          </Link>
          {customerDemoUser && (
            <button
              type="button"
              onClick={logoutDemoCustomer}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs"
            >
              <LogOut className="w-4 h-4" />
              <span>{lang === 'bn' ? 'লগআউট' : 'Logout Demo'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[#10283B] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#16A6A6]" />
            <span>
              {lang === 'bn'
                ? 'সাম্প্রতিক ডেমো বুকিংসমূহ (Shared State)'
                : 'Recent Demo Bookings'}
            </span>
          </h2>
          <Link
            href="/booking/lookup"
            className="text-xs font-bold text-[#16A6A6] hover:underline"
          >
            {lang === 'bn' ? 'বুকিং খুঁজুন' : 'Lookup by Ref'}
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-3 pr-4">{lang === 'bn' ? 'রেফারেন্স' : 'Reference'}</th>
                <th className="py-3 pr-4">{lang === 'bn' ? 'প্যাকেজ' : 'Package'}</th>
                <th className="py-3 pr-4">{lang === 'bn' ? 'যাত্রার তারিখ' : 'Departure'}</th>
                <th className="py-3 pr-4">{lang === 'bn' ? 'যাত্রী' : 'Travelers'}</th>
                <th className="py-3 pr-4">{lang === 'bn' ? 'মোট ও অগ্রিম' : 'Total / Advance'}</th>
                <th className="py-3 pr-4">{lang === 'bn' ? 'স্ট্যাটাস' : 'Status'}</th>
                <th className="py-3 text-right">{lang === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((bk) => (
                <tr key={bk.id} className="hover:bg-slate-50/80">
                  <td className="py-3.5 pr-4 font-mono font-bold text-[#10283B]">
                    {bk.reference}
                  </td>
                  <td className="py-3.5 pr-4 font-semibold text-[#10283B]">
                    {t(bk.packageTitle)}
                  </td>
                  <td className="py-3.5 pr-4 font-mono">{bk.departureDate}</td>
                  <td className="py-3.5 pr-4 font-mono">{bk.travelerCount}</td>
                  <td className="py-3.5 pr-4 font-mono">
                    {formatBdt(bk.totalPrice)} /{' '}
                    <span className="text-[#16A6A6] font-bold">
                      {formatBdt(bk.advanceAmount)}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className="font-bold uppercase text-[#10283B]">
                      {bk.bookingStatus}
                    </span>{' '}
                    · <span className="text-slate-500">{bk.paymentStatus}</span>
                  </td>
                  <td className="py-3.5 text-right">
                    <Link
                      href={`/booking/confirmation?ref=${encodeURIComponent(bk.reference)}`}
                      className="inline-flex items-center gap-1 font-bold text-[#16A6A6] hover:underline"
                    >
                      <span>{lang === 'bn' ? 'রিসিট' : 'Receipt'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Saved Favorite Packages */}
      <div className="space-y-5">
        <h2 className="text-xl font-extrabold text-[#10283B] flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#EF174F]" />
          <span>
            {lang === 'bn'
              ? `আপনার পছন্দের ট্যুর প্যাকেজ (${savedPackages.length})`
              : `Your Saved Packages (${savedPackages.length})`}
          </span>
        </h2>

        {savedPackages.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
            {lang === 'bn'
              ? 'এখনো কোনো প্যাকেজ পছন্দের তালিকায় যুক্ত করা হয়নি।'
              : 'No saved packages yet. Click the heart icon on any tour card to save it here.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
