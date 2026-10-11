'use client';

import React, { useState } from 'react';
import { Search, Eye, X, MessageSquare } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { BookingRecord, BookingStatus } from '@/lib/types';

export default function AdminBookingsPage() {
  const { lang, t, formatBdt, bookings, updateBookingStatus } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);

  const filtered = bookings.filter((b) => {
    if (statusFilter !== 'all' && b.bookingStatus !== statusFilter) return false;
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      return (
        b.reference.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.customerPhone.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#10283B]">
            {lang === 'bn'
              ? 'বুকিং ম্যানেজমেন্ট (ডেমো রেকর্ড)'
              : 'Booking Management (Demo Records)'}
          </h1>
          <p className="text-xs text-slate-500">
            {lang === 'bn'
              ? 'গ্রাহকের ডেমো বুকিং খুঁজুন, বিস্তারিত ড্রয়ার ওপেন করুন এবং ডেমো স্ট্যাটাস পরিবর্তন করুন।'
              : 'Search demo bookings, inspect full details, and update sample booking statuses.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ref, name, phone..."
              className="pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F4F8FB] border-b border-slate-200 text-slate-600">
                <th className="py-3.5 px-4">Booking Ref</th>
                <th className="py-3.5 px-4">Customer & Phone</th>
                <th className="py-3.5 px-4">Package</th>
                <th className="py-3.5 px-4">Departure & Travelers</th>
                <th className="py-3.5 px-4">Total / Advance / Due</th>
                <th className="py-3.5 px-4">Payment Status</th>
                <th className="py-3.5 px-4">Booking Status</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((bk) => (
                <tr key={bk.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#10283B]">
                    {bk.reference}
                  </td>
                  <td className="py-3.5 px-4">
                    <strong className="block text-[#10283B]">{bk.customerName}</strong>
                    <span className="font-mono text-slate-500">{bk.customerPhone}</span>
                  </td>
                  <td className="py-3.5 px-4 max-w-[190px] truncate font-medium">
                    {t(bk.packageTitle)}
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {bk.departureDate} ({bk.travelerCount}P)
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    <div>Total: {formatBdt(bk.totalPrice)}</div>
                    <div className="text-[#16A6A6] font-bold">
                      Adv: {formatBdt(bk.advanceAmount)}
                    </div>
                    <div className="text-slate-400">
                      Due: {formatBdt(bk.remainingBalance)}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono uppercase font-semibold text-slate-700">
                    {bk.paymentStatus}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={bk.bookingStatus}
                      onChange={(e) =>
                        updateBookingStatus(bk.id, e.target.value as BookingStatus)
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-[#F4F8FB] border border-slate-200 font-bold text-xs"
                    >
                      <option value="pending">pending</option>
                      <option value="confirmed">confirmed</option>
                      <option value="completed">completed</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedBooking(bk)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#10283B] text-[#F9C91D] font-bold"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Drawer / Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end">
          <div className="bg-white w-full max-w-lg h-full p-6 sm:p-8 overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#16A6A6]">
                  DEMO BOOKING RECORD
                </span>
                <h2 className="text-xl font-extrabold text-[#10283B] font-mono">
                  {selectedBooking.reference}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-[#F4F8FB] space-y-1.5">
                <p className="text-slate-500">Customer Details</p>
                <p className="text-sm font-bold text-[#10283B]">
                  {selectedBooking.customerName}
                </p>
                <p className="font-mono">Phone: {selectedBooking.customerPhone}</p>
                <p className="font-mono">Email: {selectedBooking.customerEmail}</p>
                {selectedBooking.emergencyContact && (
                  <p className="font-mono">
                    Emergency Contact: {selectedBooking.emergencyContact}
                  </p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-[#F4F8FB] space-y-1.5">
                <p className="text-slate-500">Tour & Financial Summary (Sample)</p>
                <p className="text-sm font-bold text-[#10283B]">
                  {t(selectedBooking.packageTitle)}
                </p>
                <p className="font-mono">
                  Departure: {selectedBooking.departureDate} · Travelers:{' '}
                  {selectedBooking.travelerCount}
                </p>
                <p className="font-mono">
                  Total: {formatBdt(selectedBooking.totalPrice)} | Advance:{' '}
                  {formatBdt(selectedBooking.advanceAmount)} | Balance:{' '}
                  {formatBdt(selectedBooking.remainingBalance)}
                </p>
                <p className="font-mono text-[#16A6A6]">
                  Demo Transaction ID: {selectedBooking.transactionRef}
                </p>
              </div>

              {selectedBooking.specialRequirements && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                  <p className="font-bold text-amber-900">Special Requirements Note:</p>
                  <p className="text-amber-950">{selectedBooking.specialRequirements}</p>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <p className="font-bold text-[#10283B] flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-[#16A6A6]" />
                  <span>Simulated SMS Previews</span>
                </p>
                <p className="font-mono text-[11px] bg-white p-2.5 rounded-xl border border-slate-200">
                  {selectedBooking.customerSmsPreview}
                </p>
                <p className="font-mono text-[11px] bg-white p-2.5 rounded-xl border border-slate-200">
                  {selectedBooking.adminSmsPreview}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
