'use client';

import React from 'react';
import Link from 'next/link';
import { CreditCard, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '@/lib/app-context';

export default function PaymentInstructionsPage() {
  const { lang, settings } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="bg-[#10283B] text-white rounded-3xl p-8 space-y-3">
        <p className="text-xs font-bold text-[#F9C91D]">
          {lang === 'bn' ? 'ডেমো পেমেন্ট গাইডলাইন' : 'DEMO PAYMENT INSTRUCTIONS'}
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold">
          {lang === 'bn'
            ? 'পেমেন্ট নির্দেশনা ও ডেমো চেকআউট পদ্ধতি'
            : 'Payment Instructions & Demo Checkout Guide'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {lang === 'bn'
            ? 'এই প্রোটোটাইপ সংস্করণে শুধুমাত্র ডেমো পেমেন্ট সিমুলেশন চালু রয়েছে। ভবিষ্যতে প্রোডাকশন সংস্করণে অনুমোদিত মার্চেন্ট পেমেন্ট গেটওয়ে সংযুক্ত করা হবে।'
            : 'This prototype uses a simulated demo payment interface for visual testing. No real funds are collected.'}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-amber-950">
            <p className="font-bold">
              {lang === 'bn'
                ? 'গুরুত্বপূর্ণ: কোনো আসল টাকা পাঠাবেন না'
                : 'IMPORTANT: Do Not Send Real Money'}
            </p>
            <p>
              {lang === 'bn'
                ? 'নিচের নম্বর ও নির্দেশনা শুধুমাত্র UI/UX রিভিউয়ের জন্য প্রদর্শিত নমুনা তথ্য।'
                : 'All merchant numbers and bank accounts shown below are sample placeholders for UI review.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-[#F4F8FB] border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-sm font-extrabold text-[#E2136E]">
              <CreditCard className="w-5 h-5" />
              <span>
                {lang === 'bn'
                  ? 'বিকাশ ডেমো মার্চেন্ট সিমুলেশন'
                  : 'bKash Demo Merchant Simulation'}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? `নমুনা মার্চেন্ট নম্বর: ${settings.bkashDemoMerchantNumber}। বুকিং ফরম পূরণের পর স্বয়ংক্রিয়ভাবে ডেমো বিকাশ পপআপ ওপেন হবে যেখানে এক ক্লিকে সফল বা ব্যর্থ পেমেন্ট টেস্ট করা যাবে।`
                : `Sample Merchant Number: ${settings.bkashDemoMerchantNumber}. When submitting the booking form, a simulated modal allows one-click testing of payment states.`}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F4F8FB] border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-sm font-extrabold text-[#10283B]">
              <CheckCircle2 className="w-5 h-5 text-[#16A6A6]" />
              <span>
                {lang === 'bn'
                  ? 'প্রোডাকশন মাইগ্রেশন পরিকল্পনা'
                  : 'Future Production Architecture'}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'চূড়ান্ত সিপ্যানেল (cPanel) ও পিএইচপি/মাইএসকিউএল (PHP/MySQL) সংস্করণে সার্ভার-সাইড ভেরিফিকেশনের মাধ্যমে প্রকৃত পেমেন্ট যাচাই যুক্ত হবে।'
                : 'In the production PHP/MySQL release, real server-side payment verification and SMS gateway dispatch will replace this simulation.'}
            </p>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F9C91D] text-[#10283B] font-extrabold text-xs sm:text-sm"
          >
            <span>{lang === 'bn' ? 'ডেমো বুকিং পেজে যান' : 'Go to Demo Booking Form'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
