'use client';

import React from 'react';
import Link from 'next/link';
import {
  ClipboardList,
  CreditCard,
  Clock,
  Calendar,
  Plus,
  ArrowRight,
  Package,
  MessageSquare,
} from 'lucide-react';
import { useApp } from '@/lib/app-context';

export default function AdminDashboardOverviewPage() {
  const { lang, t, formatBdt, bookings, packages, inquiries, updateBookingStatus } = useApp();

  const totalBookings = bookings.length;
  const totalDemoAdvance = bookings
    .filter((b) => b.paymentStatus === 'demo_paid')
    .reduce((acc, b) => acc + b.advanceAmount, 0);
  const pendingBookings = bookings.filter((b) => b.bookingStatus === 'pending').length;
  const confirmedBookings = bookings.filter((b) => b.bookingStatus === 'confirmed').length;
  const cancelledBookings = bookings.filter((b) => b.bookingStatus === 'cancelled').length;

  const monthlyTrend = [
    { month: 'Jul', count: 14, height: '45%' },
    { month: 'Aug', count: 19, height: '60%' },
    { month: 'Sep', count: 24, height: '75%' },
    { month: 'Oct (Demo)', count: 28 + totalBookings, height: '95%' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Heading & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#16A6A6]">
            {lang === 'bn'
              ? 'শোভন ট্যুর অ্যান্ড ট্রাভেল বিডি · ডেমো পরিসংখ্যান'
              : 'SHOVON TOUR & TRAVEL BD · DEMO ANALYTICS'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#10283B]">
            {lang === 'bn' ? 'অ্যাডমিন ডেমো ড্যাশবোর্ড' : 'Admin Demo Dashboard'}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/packages"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F9C91D] text-[#10283B] font-extrabold text-xs shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'bn' ? 'প্যাকেজ যোগ/এডিট করুন' : 'Manage Packages'}</span>
          </Link>
          <Link
            href="/admin/bookings"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#10283B] text-white font-bold text-xs"
          >
            <ClipboardList className="w-4 h-4 text-[#F9C91D]" />
            <span>{lang === 'bn' ? 'সকল বুকিং দেখুন' : 'All Bookings'}</span>
          </Link>
        </div>
      </div>

      {/* 4 KPI Stat Cards (All clearly labeled Demo Data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{lang === 'bn' ? 'মোট ডেমো বুকিং' : 'Total Demo Bookings'}</span>
            <ClipboardList className="w-4 h-4 text-[#16A6A6]" />
          </div>
          <p className="text-2xl font-extrabold font-mono tabular-nums text-[#10283B]">
            {totalBookings}
          </p>
          <p className="text-[11px] text-slate-400">
            {lang === 'bn' ? 'নমুনা বুকিং রেকর্ড' : 'Sample booking records'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{lang === 'bn' ? 'ডেমো অগ্রিম পেমেন্ট' : 'Demo Advance Payments'}</span>
            <CreditCard className="w-4 h-4 text-[#EF174F]" />
          </div>
          <p className="text-2xl font-extrabold font-mono tabular-nums text-[#16A6A6]">
            {formatBdt(totalDemoAdvance)}
          </p>
          <p className="text-[11px] text-slate-400">
            {lang === 'bn' ? 'সিমুলেটেড বিকাশ ডেমো অ্যামাউন্ট' : 'Simulated bKash demo total'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{lang === 'bn' ? 'অপেক্ষমাণ বুকিং (Pending)' : 'Pending Bookings'}</span>
            <Clock className="w-4 h-4 text-[#F9C91D]" />
          </div>
          <p className="text-2xl font-extrabold font-mono tabular-nums text-[#10283B]">
            {pendingBookings}
          </p>
          <p className="text-[11px] text-slate-400">
            {lang === 'bn' ? 'ভিসা/মেডিকেল ও কর্পোরেট রিকোয়েস্ট:' : 'Service inquiries:'}{' '}
            {inquiries.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{lang === 'bn' ? 'আসন্ন ডেমো ট্রিপ ও প্যাকেজ' : 'Upcoming Demo Trips'}</span>
            <Calendar className="w-4 h-4 text-[#10283B]" />
          </div>
          <p className="text-2xl font-extrabold font-mono tabular-nums text-[#10283B]">
            {packages.filter((p) => p.isPublished).length}
          </p>
          <p className="text-[11px] text-slate-400">
            {lang === 'bn' ? 'প্রকাশিত ডেমো প্যাকেজ সংখ্যা' : 'Published sample packages'}
          </p>
        </div>
      </div>

      {/* Charts Row: Booking Status Breakdown & Monthly Trend (Sample Data) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Booking Status Chart */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-xs">
          <div>
            <h2 className="text-base font-extrabold text-[#10283B]">
              {lang === 'bn'
                ? 'বুকিং স্ট্যাটাস অনুপাত (ডেমো চার্ট)'
                : 'Booking Status Breakdown (Demo Data)'}
            </h2>
            <p className="text-xs text-slate-500">
              {lang === 'bn'
                ? 'নমুনা বুকিং স্ট্যাটাসের তাৎক্ষণিক চিত্র'
                : 'Live distribution from shared mock bookings'}
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                label: lang === 'bn' ? 'কনফার্মড (Confirmed)' : 'Confirmed',
                count: confirmedBookings,
                color: 'bg-[#16A6A6]',
              },
              {
                label: lang === 'bn' ? 'অপেক্ষমাণ (Pending)' : 'Pending',
                count: pendingBookings,
                color: 'bg-[#F9C91D]',
              },
              {
                label: lang === 'bn' ? 'বাতিল (Cancelled)' : 'Cancelled',
                count: cancelledBookings,
                color: 'bg-[#EF174F]',
              },
            ].map((bar, i) => {
              const pct =
                totalBookings > 0 ? Math.round((bar.count / totalBookings) * 100) : 0;
              return (
                <div key={i} className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-bold text-[#10283B]">
                    <span>{bar.label}</span>
                    <span className="font-mono tabular-nums">
                      {bar.count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${bar.color}`}
                      style={{ width: `${Math.max(8, pct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Trend Bar Visual */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-[#10283B]">
                {lang === 'bn'
                  ? 'মাসিক বুকিং ট্রেন্ড (নমুনা ডেমো চার্ট)'
                  : 'Monthly Booking Trend (Sample Demo Chart)'}
              </h2>
              <p className="text-xs text-slate-500">
                {lang === 'bn'
                  ? 'শুধুমাত্র ড্যাশবোর্ড ভিজ্যুয়াল রিভিউয়ের জন্য নমুনা গ্রাফ'
                  : 'Illustrative sample trend for dashboard UI evaluation'}
              </p>
            </div>
          </div>

          <div className="h-44 flex items-end justify-around gap-4 pt-6 px-4 border-b border-slate-100">
            {monthlyTrend.map((m, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-xs font-mono font-bold text-[#10283B]">
                  {m.count}
                </span>
                <div
                  className="w-full max-w-[56px] rounded-t-xl bg-gradient-to-t from-[#10283B] to-[#16A6A6]"
                  style={{ height: m.height }}
                />
                <span className="text-xs font-semibold text-slate-500 pb-2">
                  {m.month}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings & Popular Packages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Bookings Table */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-[#10283B]">
              {lang === 'bn' ? 'সাম্প্রতিক ডেমো বুকিংসমূহ' : 'Recent Demo Bookings'}
            </h2>
            <Link
              href="/admin/bookings"
              className="text-xs font-bold text-[#16A6A6] hover:underline inline-flex items-center gap-1"
            >
              <span>{lang === 'bn' ? 'সব দেখুন' : 'View All'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2.5 pr-3">Ref</th>
                  <th className="py-2.5 pr-3">Customer</th>
                  <th className="py-2.5 pr-3">Package</th>
                  <th className="py-2.5 pr-3">Advance</th>
                  <th className="py-2.5 pr-3">Status</th>
                  <th className="py-2.5 text-right">Quick Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.slice(0, 5).map((bk) => (
                  <tr key={bk.id} className="hover:bg-slate-50">
                    <td className="py-3 pr-3 font-mono font-bold text-[#10283B]">
                      {bk.reference}
                    </td>
                    <td className="py-3 pr-3">
                      <span className="font-bold block text-[#10283B]">{bk.customerName}</span>
                      <span className="font-mono text-slate-500">{bk.customerPhone}</span>
                    </td>
                    <td className="py-3 pr-3 max-w-[180px] truncate font-medium">
                      {t(bk.packageTitle)}
                    </td>
                    <td className="py-3 pr-3 font-mono font-bold text-[#16A6A6]">
                      {formatBdt(bk.advanceAmount)}
                    </td>
                    <td className="py-3 pr-3 uppercase font-bold text-[#10283B]">
                      {bk.bookingStatus}
                    </td>
                    <td className="py-3 text-right">
                      <select
                        value={bk.bookingStatus}
                        onChange={(e) =>
                          updateBookingStatus(bk.id, e.target.value as any)
                        }
                        className="px-2 py-1 rounded-lg bg-[#F4F8FB] border border-slate-200 text-xs font-semibold"
                      >
                        <option value="pending">pending</option>
                        <option value="confirmed">confirmed</option>
                        <option value="completed">completed</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Packages & Quick Links */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <h2 className="text-base font-extrabold text-[#10283B]">
            {lang === 'bn' ? 'জনপ্রিয় প্যাকেজ (নমুনা)' : 'Popular Sample Packages'}
          </h2>
          <div className="space-y-3">
            {packages.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-2xl bg-[#F4F8FB] flex items-center justify-between gap-2 text-xs"
              >
                <div className="min-w-0">
                  <p className="font-bold text-[#10283B] truncate">{t(p.title)}</p>
                  <p className="text-slate-500 font-mono">
                    {formatBdt(p.pricePerPerson)} · Seats: {p.availableSeats}
                  </p>
                </div>
                <Link
                  href="/admin/packages"
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-bold text-[#16A6A6] shrink-0"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
            <Link
              href="/admin/sms-settings"
              className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-[#10283B] flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-[#16A6A6]" />
              <span>SMS Demo</span>
            </Link>
            <Link
              href="/admin/settings"
              className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-[#10283B] flex items-center gap-1.5"
            >
              <Package className="w-4 h-4 text-[#EF174F]" />
              <span>Site Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
