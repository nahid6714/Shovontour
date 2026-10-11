'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Settings } from 'lucide-react';
import { useApp } from '@/lib/app-context';

export default function AdminSmsLogsPage() {
  const { lang, smsLogs } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#10283B]">
            {lang === 'bn' ? 'সিমুলেটেড এসএমএস লগ (ডেমো)' : 'Simulated SMS Logs (Demo Only)'}
          </h1>
          <p className="text-xs text-slate-500">
            {lang === 'bn'
              ? 'ডেমো বুকিং থেকে তৈরি হওয়া সিমুলেটেড এসএমএস লগ তালিকা।'
              : 'Log of simulated SMS notifications generated during demo bookings.'}
          </p>
        </div>

        <Link
          href="/admin/sms-settings"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#10283B]"
        >
          <Settings className="w-4 h-4 text-[#16A6A6]" />
          <span>Edit Templates</span>
        </Link>
      </div>

      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-2 text-xs text-amber-950">
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
        <span>
          {lang === 'bn'
            ? 'এখানে প্রদর্শিত স্ট্যাটাস সম্পূর্ণ সিমুলেটেড। কোনো মোবাইল অপারেটরে প্রকৃত এসএমএস পাঠানো হয়নি।'
            : 'All delivery statuses below are simulated for UI testing. No real SMS messages were sent.'}
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F4F8FB] border-b border-slate-200 text-slate-600">
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Recipient Role</th>
                <th className="py-3.5 px-4">Phone Number</th>
                <th className="py-3.5 px-4">Booking Ref</th>
                <th className="py-3.5 px-4">Simulated Message Content</th>
                <th className="py-3.5 px-4">Simulated Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {smsLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-mono text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3.5 px-4 uppercase font-bold text-[#10283B]">
                    {log.recipientRole}
                  </td>
                  <td className="py-3.5 px-4 font-mono">{log.phone}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#16A6A6]">
                    {log.bookingReference}
                  </td>
                  <td className="py-3.5 px-4 font-mono max-w-md">{log.message}</td>
                  <td className="py-3.5 px-4 font-mono uppercase font-bold text-[#16A6A6]">
                    {log.status}
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
