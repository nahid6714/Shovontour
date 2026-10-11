'use client';

import React, { useState } from 'react';
import { ShieldAlert, CreditCard } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { PaymentVerificationStatus } from '@/lib/types';

export default function AdminPaymentsPage() {
  const { lang, formatBdt, payments, updatePaymentVerification } = useApp();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = payments.filter(
    (p) => statusFilter === 'all' || p.paymentStatus === statusFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#10283B]">
            {lang === 'bn'
              ? 'পেমেন্ট ম্যানেজমেন্ট (ডেমো লেনদেন)'
              : 'Payment Management (Simulated Demo Records)'}
          </h1>
          <p className="text-xs text-slate-500">
            {lang === 'bn'
              ? 'প্রকৃত পেমেন্ট যাচাই (Real Payment Verification) এই প্রোটোটাইপে সংযুক্ত নয়।'
              : 'Real payment verification is not implemented in this frontend prototype.'}
          </p>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold"
        >
          <option value="all">All Demo Payment Statuses</option>
          <option value="demo_paid">demo_paid</option>
          <option value="demo_pending">demo_pending</option>
          <option value="demo_failed">demo_failed</option>
        </select>
      </div>

      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-2.5 text-xs text-amber-950">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
        <span>
          {lang === 'bn'
            ? 'বিজ্ঞপ্তি: নিচের সকল ট্রানজেকশন রেফারেন্স ও অ্যামাউন্ট ডেমো সিমুলেশন থেকে তৈরি। কোনো বাস্তবিক অর্থ লেনদেন হয়নি।'
            : 'Disclaimer: All transaction references and amounts below are mock records. Real bKash merchant API verification will be implemented in the future PHP backend.'}
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F4F8FB] border-b border-slate-200 text-slate-600">
                <th className="py-3.5 px-4">Mock Transaction Ref</th>
                <th className="py-3.5 px-4">Booking Ref</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Demo Amount</th>
                <th className="py-3.5 px-4">Method</th>
                <th className="py-3.5 px-4">Demo Payment Status</th>
                <th className="py-3.5 px-4">Demo Verification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((pay) => (
                <tr key={pay.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#E2136E]">
                    {pay.transactionRef}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#10283B]">
                    {pay.bookingReference}
                  </td>
                  <td className="py-3.5 px-4">
                    <strong className="block text-[#10283B]">{pay.customerName}</strong>
                    <span className="font-mono text-slate-500">{pay.customerPhone}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#10283B]">
                    {formatBdt(pay.amount)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 font-semibold">
                      <CreditCard className="w-3.5 h-3.5 text-[#E2136E]" />
                      {pay.method}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono uppercase font-bold text-[#16A6A6]">
                    {pay.paymentStatus}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={pay.verificationStatus}
                      onChange={(e) =>
                        updatePaymentVerification(
                          pay.id,
                          e.target.value as PaymentVerificationStatus
                        )
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-[#F4F8FB] border border-slate-200 font-bold text-xs"
                    >
                      <option value="unverified_demo">unverified_demo</option>
                      <option value="reviewed_demo">reviewed_demo</option>
                      <option value="rejected_demo">rejected_demo</option>
                    </select>
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
