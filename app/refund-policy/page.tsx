'use client';

import React from 'react';
import { useApp } from '@/lib/app-context';

export default function RefundPolicyPage() {
  const { lang, settings } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div className="bg-[#10283B] text-white rounded-3xl p-8 space-y-2">
        <p className="text-xs font-bold text-[#F9C91D]">{settings.brandName}</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold">
          {lang === 'bn'
            ? 'বাতিলকরণ ও রিফান্ড নীতিমালা (Cancellation & Refund Policy)'
            : 'Cancellation and Refund Policy'}
        </h1>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-xs">
        <p>
          {lang === 'bn'
            ? '১. ডেমো পেমেন্ট বিজ্ঞপ্তি: এই প্রোটোটাইপে কোনো প্রকৃত অর্থ গ্রহণ করা হয় না, তাই এখানে বাস্তবিক আর্থিক রিফান্ড প্রযোজ্য নয়।'
            : '1. Demo Payment Notice: Because this prototype only simulates payments for UI review, no actual financial transactions or refunds occur here.'}
        </p>
        <p>
          {lang === 'bn'
            ? '২. স্ট্যান্ডার্ড বুকিং বাতিল নীতিমালা (নমুনা): ভ্রমণের ৭ দিন পূর্বে বুকিং বাতিল করলে হোটেল ও পরিবহন চার্জ কর্তন সাপেক্ষে আংশিক রিফান্ড বা পরবর্তী ট্যুরে সমন্বয়ের সুযোগ থাকে।'
            : '2. Sample Production Cancellation Policy: Requests made 7+ days before departure may be eligible for partial refund or date rescheduling subject to hotel and transport cancellation rules.'}
        </p>
        <p>
          {lang === 'bn'
            ? '৩. প্রাকৃতিক দুর্যোগ বা অনিবার্য কারণ: আবহাওয়া বা সরকারি নির্দেশনার কারণে ট্যুর স্থগিত হলে গ্রাহকের সাথে আলোচনা সাপেক্ষে নতুন তারিখ নির্ধারণ করা হয়।'
            : '3. Force Majeure: If a trip is postponed due to severe weather or official advisories, bookings can be rescheduled to an alternative departure date.'}
        </p>
      </div>
    </div>
  );
}
