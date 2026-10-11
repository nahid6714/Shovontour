'use client';

import React from 'react';
import { Users } from 'lucide-react';
import { useApp } from '@/lib/app-context';

export default function AdminCustomersPage() {
  const { lang, bookings, formatBdt } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#10283B]">
          {lang === 'bn' ? 'গ্রাহক তালিকা (ডেমো বুকিং থেকে)' : 'Demo Customers Directory'}
        </h1>
        <p className="text-xs text-slate-500">
          {lang === 'bn'
            ? 'ডেমো বুকিং থেকে সংগৃহীত কাল্পনিক গ্রাহকদের তালিকা।'
            : 'Fictional customer records derived from demo bookings.'}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F4F8FB] border-b border-slate-200 text-slate-600">
                <th className="py-3.5 px-4">Customer Name</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Latest Booking Ref</th>
                <th className="py-3.5 px-4">Total Demo Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((bk) => (
                <tr key={bk.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-[#10283B] flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#16A6A6]" />
                    <span>{bk.customerName}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono">{bk.customerPhone}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">
                    {bk.customerEmail}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#10283B]">
                    {bk.reference}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#16A6A6]">
                    {formatBdt(bk.totalPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
