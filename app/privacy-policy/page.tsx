'use client';

import React from 'react';
import { useApp } from '@/lib/app-context';

export default function PrivacyPolicyPage() {
  const { lang, settings } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div className="bg-[#10283B] text-white rounded-3xl p-8 space-y-2">
        <p className="text-xs font-bold text-[#F9C91D]">{settings.brandName}</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold">
          {lang === 'bn' ? 'গোপনীয়তা নীতি (Privacy Policy)' : 'Privacy Policy'}
        </h1>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-xs">
        <p>
          {lang === 'bn'
            ? '১. প্রোটোটাইপ ডাটা ব্যবহার: এই ওয়েবসাইটটি বর্তমানে একটি ফ্রন্টএন্ড প্রোটোটাইপ হিসেবে পরিচালিত হচ্ছে। আপনার প্রদানকৃত ডেমো বুকিং তথ্য শুধুমাত্র আপনার ব্রাউজারের লোকাল স্টোরেজে সাময়িকভাবে সংরক্ষিত থাকে।'
            : '1. Prototype Data Handling: This website is currently a frontend prototype. Demo booking and inquiry inputs are stored temporarily in your browser localStorage for interaction testing only.'}
        </p>
        <p>
          {lang === 'bn'
            ? '২. ব্যক্তিগত ও মেডিকেল তথ্যের সুরক্ষা: মেডিকেল ট্রাভেল অনুসন্ধান ফরমে কোনো গোপনীয় বা সংবেদনশীল স্বাস্থ্য রিপোর্ট জমা না দেওয়ার জন্য অনুরোধ করা হচ্ছে।'
            : '2. Medical & Personal Data: Users should not submit confidential medical records in the demo inquiry forms. Summary tables in the admin demo avoid exposing sensitive health data.'}
        </p>
        <p>
          {lang === 'bn'
            ? '৩. পেমেন্ট নিরাপত্তা: এই প্রোটোটাইপে কোনো আসল বিকাশ পিন (PIN), ওটিপি (OTP) বা ব্যাংক পাসওয়ার্ড সংগ্রহ করা হয় না।'
            : '3. Payment Safety: This prototype never collects real bKash PINs, OTPs, or financial passwords.'}
        </p>
      </div>
    </div>
  );
}
