'use client';

import React from 'react';
import { useApp } from '@/lib/app-context';

export default function TermsPage() {
  const { lang, settings } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <div className="bg-[#10283B] text-white rounded-3xl p-8 space-y-2">
        <p className="text-xs font-bold text-[#F9C91D]">{settings.brandName}</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold">
          {lang === 'bn' ? 'শর্তাবলী (Terms & Conditions)' : 'Terms and Conditions'}
        </h1>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-xs">
        <p>
          {lang === 'bn'
            ? '১. নমুনা মূল্য ও প্রাপ্যতা: এই প্রোটোটাইপ ওয়েবসাইটে প্রদর্শিত সকল ট্যুর প্যাকেজের মূল্য, আসন সংখ্যা এবং যাত্রার তারিখ নমুনা (Sample Data) হিসেবে প্রদর্শিত হচ্ছে।'
            : '1. Sample Pricing & Availability: All tour package prices, seat counts, and departure dates displayed in this prototype are sample figures and do not represent live commercial inventory.'}
        </p>
        <p>
          {lang === 'bn'
            ? '২. ভিসা ও মেডিকেল সেবা: ভারতীয় ভিসা ও হাসপাতাল অ্যাপয়েন্টমেন্ট সেবা শুধুমাত্র আবেদন প্রস্তুতকরণ ও অনুসন্ধান সহায়তা হিসেবে প্রদান করা হয়। ভিসা অনুমোদনের চূড়ান্ত সিদ্ধান্ত সংশ্লিষ্ট দূতাবাসের।'
            : '2. Visa & Medical Assistance: Visa and hospital services are strictly documentation and inquiry assistance. We do not guarantee visa issuance or hospital slot confirmation.'}
        </p>
        <p>
          {lang === 'bn'
            ? '৩. ভ্রমণ আচরণবিধি: গ্রুপ ট্যুরে অংশগ্রহণকারী সকল সম্মানিত যাত্রীকে নির্ধারিত সময়সূচী ও স্থানীয় আইন মেনে চলার অনুরোধ করা হয়।'
            : '3. Group Travel Conduct: Travelers participating in group tours are requested to follow the scheduled timings and local safety guidelines.'}
        </p>
      </div>
    </div>
  );
}
