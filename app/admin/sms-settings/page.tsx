'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, ShieldAlert, Save, Send } from 'lucide-react';
import { useApp } from '@/lib/app-context';

export default function AdminSmsSettingsPage() {
  const { lang, settings, updateSettings, showToast } = useApp();
  const [customerTpl, setCustomerTpl] = useState(settings.customerSmsTemplate);
  const [adminTpl, setAdminTpl] = useState(settings.adminSmsTemplate);
  const [adminPhone, setAdminPhone] = useState(settings.adminNotificationPhone);

  const previewCustomerMsg = customerTpl
    .replace('{name}', 'তানভীর আহমেদ')
    .replace('{ref}', 'STT-DEMO-8421')
    .replace('{package}', 'কক্সবাজার লাক্সারি বিচ ট্যুর')
    .replace('{advance}', '8000');

  const previewAdminMsg = adminTpl
    .replace('{ref}', 'STT-DEMO-8421')
    .replace('{name}', 'তানভীর আহমেদ')
    .replace('{phone}', '01711-001122')
    .replace('{package}', 'কক্সবাজার লাক্সারি বিচ ট্যুর')
    .replace('{travelers}', '4')
    .replace('{advance}', '8000');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ...settings,
      customerSmsTemplate: customerTpl,
      adminSmsTemplate: adminTpl,
      adminNotificationPhone: adminPhone,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#10283B]">
            {lang === 'bn'
              ? 'এসএমএস গেটওয়ে ও টেমপ্লেট সেটিংস (ডেমো)'
              : 'SMS Templates & Notification Settings (Demo)'}
          </h1>
          <p className="text-xs text-slate-500">
            {lang === 'bn'
              ? 'কোনো প্রকৃত এসএমএস পাঠানো হয় না। এটি শুধুমাত্র মেসেজ প্রিভিউ এবং টেমপ্লেট সিমুলেশন।'
              : 'No real SMS is dispatched. Configure demo SMS templates and preview messages.'}
          </p>
        </div>

        <Link
          href="/admin/sms-logs"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#10283B] text-[#F9C91D] font-bold text-xs"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{lang === 'bn' ? 'ডেমো এসএমএস লগ দেখুন' : 'View Demo SMS Logs'}</span>
        </Link>
      </div>

      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-2.5 text-xs text-amber-950">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
        <span>
          {lang === 'bn'
            ? 'বিজ্ঞপ্তি: বাংলাদেশ এসএমএস গেটওয়ে এপিআই পরবর্তীতে প্রোডাকশন PHP ব্যাকএন্ডে যুক্ত করা হবে। এখানে কোনো আসল এসএমএস সেন্ড হয় না।'
            : 'Notice: No real SMS is sent in this frontend prototype. Future PHP backend will integrate the live Bangladesh SMS gateway.'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <form
          onSubmit={handleSave}
          className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs text-xs"
        >
          <div>
            <label className="block font-bold text-[#10283B] mb-1">
              Admin Alert Notification Number (Demo)
            </label>
            <input
              type="text"
              value={adminPhone}
              onChange={(e) => setAdminPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-[#10283B] mb-1">
              Customer Booking SMS Template (Variables: {'{name}'}, {'{ref}'}, {'{package}'},{' '}
              {'{advance}'})
            </label>
            <textarea
              rows={3}
              value={customerTpl}
              onChange={(e) => setCustomerTpl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-[#10283B] mb-1">
              Admin Alert SMS Template (Variables: {'{ref}'}, {'{name}'}, {'{phone}'},{' '}
              {'{package}'}, {'{travelers}'}, {'{advance}'})
            </label>
            <textarea
              rows={3}
              value={adminTpl}
              onChange={(e) => setAdminTpl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 font-mono"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F9C91D] text-[#10283B] font-extrabold"
            >
              <Save className="w-4 h-4" />
              <span>Save Demo Templates</span>
            </button>

            <button
              type="button"
              onClick={() =>
                showToast(
                  lang === 'bn'
                    ? 'সিমুলেটেড টেস্ট এসএমএস প্রিভিউ ট্রিগার করা হয়েছে (কোনো আসল এসএমএস পাঠানো হয়নি)'
                    : 'Simulated SMS delivery test triggered (No real SMS sent)',
                  'info'
                )
              }
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#16A6A6] text-white font-bold"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Simulate Test Dispatch</span>
            </button>
          </div>
        </form>

        {/* Live Message Previews */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs text-xs">
          <h2 className="text-base font-extrabold text-[#10283B]">
            Live Simulated SMS Previews
          </h2>
          <div className="p-4 rounded-2xl bg-[#F4F8FB] border border-slate-200 space-y-1.5">
            <span className="font-bold text-[#16A6A6] uppercase block">
              Customer Handset Preview
            </span>
            <p className="font-mono text-[#10283B] leading-relaxed">
              {previewCustomerMsg}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#F4F8FB] border border-slate-200 space-y-1.5">
            <span className="font-bold text-[#EF174F] uppercase block">
              Admin Handset Preview ({adminPhone})
            </span>
            <p className="font-mono text-[#10283B] leading-relaxed">{previewAdminMsg}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
