'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '@/lib/app-context';

export default function AboutPage() {
  const { lang, settings, t } = useApp();

  return (
    <div className="pb-16 space-y-12">
      <div className="bg-[#10283B] text-white py-14 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <p className="text-xs font-bold text-[#F9C91D] tracking-wider">
            {settings.brandName}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            {lang === 'bn' ? 'আমাদের সম্পর্কে (About Us)' : 'About Shovon Tour & Travel BD'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {t(settings.tagline)}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-5 shadow-xs">
          <h2 className="text-2xl font-extrabold text-[#10283B]">
            {lang === 'bn'
              ? 'আমাদের লক্ষ্য ও সেবার পরিধি'
              : 'Our Vision & Travel Services'}
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {lang === 'bn'
              ? `${settings.brandName} বাংলাদেশের ভ্রমণপিপাসু মানুষদের জন্য দেশীয় ও আন্তর্জাতিক ট্যুর প্যাকেজ, ভারতীয় ভিসা ডকুমেন্টেশন সহায়তা, মেডিকেল ট্রাভেল কো-অর্ডিনেশন এবং কর্পোরেট গ্রুপ ট্যুর প্ল্যানিং সেবা প্রদান করে। আমাদের প্রতিষ্ঠাতা ও সিইও ${settings.ownerName}-এর তত্ত্বাবধানে প্রতিটি ভ্রমণকে নিরাপদ, স্বচ্ছ ও আনন্দময় করার লক্ষ্যে কাজ করা হয়।`
              : `${settings.brandName}, led by Founder & CEO ${settings.ownerName}, focuses on delivering well-planned domestic and international tour packages, visa application assistance, medical travel coordination, and custom corporate trips.`}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
            <div className="p-5 rounded-2xl bg-[#F4F8FB] space-y-2">
              <Compass className="w-6 h-6 text-[#16A6A6]" />
              <h3 className="text-base font-bold text-[#10283B]">
                {lang === 'bn' ? 'দেশ ও বিদেশের ট্যুর' : 'Domestic & International Tours'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? 'কক্সবাজার, সাজেক, সুন্দরবন ও সিলেট থেকে শুরু করে নেপাল, ভারত, থাইল্যান্ড, মালয়েশিয়া ও দুবাই ভ্রমণ।'
                  : "Curated packages for Bangladesh destinations as well as Nepal, India, Thailand, Malaysia, and Dubai."}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F4F8FB] space-y-2">
              <UserCheck className="w-6 h-6 text-[#EF174F]" />
              <h3 className="text-base font-bold text-[#10283B]">
                {lang === 'bn' ? 'নেতৃত্ব ও ব্যবস্থাপনা' : 'Leadership'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? `সিইও ও প্রোপাইটর: ${settings.ownerName}। সরাসরি গ্রাহক সেবা ও স্বচ্ছ ট্যুর সমন্বয়।`
                  : `Founder & CEO: ${settings.ownerName}. Dedicated to transparent customer service and reliable trip management.`}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F4F8FB] space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#10283B]" />
              <h3 className="text-base font-bold text-[#10283B]">
                {lang === 'bn' ? 'ভিসা ও মেডিকেল সহায়তা' : 'Visa & Medical Support'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'bn'
                  ? 'ভারতীয় ট্যুরিস্ট ও মেডিকেল ভিসা ফরম প্রস্তুতকরণ এবং হাসপাতাল অ্যাপয়েন্টমেন্ট অনুসন্ধানে আন্তরিক সহায়তা।'
                  : 'Helpful guidance on visa documentation and hospital appointment inquiries.'}
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F9C91D] text-[#10283B] font-extrabold text-xs sm:text-sm"
            >
              <span>{lang === 'bn' ? 'আমাদের সাথে যোগাযোগ করুন' : 'Contact Us'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
