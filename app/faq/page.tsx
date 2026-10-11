'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useApp } from '@/lib/app-context';

const FAQ_DATA = [
  {
    q: {
      bn: '১. কীভাবে আমি একটি ট্যুর প্যাকেজ বুক করতে পারি?',
      en: '1. How can I book a tour package on this website?',
    },
    a: {
      bn: 'আপনার পছন্দের প্যাকেজটি নির্বাচন করে যাত্রার তারিখ ও যাত্রীর সংখ্যা দিন। এরপর বুকিং ফরমে নাম ও মোবাইল নম্বর পূরণ করে ডেমো পেমেন্ট সম্পন্ন করলেই বুকিং রেফারেন্স পেয়ে যাবেন।',
      en: 'Select your preferred package, choose a departure date and traveler count, fill in your contact details on the booking form, and complete the simulated demo checkout.',
    },
  },
  {
    q: {
      bn: '২. এই ওয়েবসাইটে কি আসল বিকাশ পেমেন্ট কাটা হয়?',
      en: '2. Does this prototype process real bKash payments?',
    },
    a: {
      bn: 'না। এটি একটি ফ্রন্টএন্ড প্রোটোটাইপ। এখানে প্রদর্শিত বিকাশ চেকআউটটি সম্পূর্ণরূপে ডেমো সিমুলেশন এবং কোনো পিন বা ওটিপি চাওয়া হয় না।',
      en: 'No. This is a frontend prototype. The bKash payment step is a visual simulation only and never collects real PINs, OTPs, or money.',
    },
  },
  {
    q: {
      bn: '৩. ভারতীয় ভিসা ও মেডিকেল ট্রাভেল সেবায় আপনারা কী ধরনের সহায়তা করেন?',
      en: '3. What does your Indian Visa and Medical Travel assistance cover?',
    },
    a: {
      bn: 'আমরা অনলাইন ভিসা আবেদন ফরম পূরণ, ডকুমেন্ট চেকলিস্ট যাচাই এবং ভারতের হাসপাতালে ডাক্তারের অ্যাপয়েন্টমেন্ট অনুসন্ধানে পরামর্শ ও সমন্বয় সহায়তা দিই। ভিসা অনুমোদন সম্পূর্ণরূপে হাই কমিশনের এখতিয়ারভুক্ত।',
      en: 'We assist with visa application forms, document preparation checklists, and hospital appointment inquiries. Visa approval is solely decided by the High Commission.',
    },
  },
  {
    q: {
      bn: '৪. পরিবার বা কর্পোরেট টিমের জন্য কাস্টমাইজড ট্যুর নেওয়ার সুযোগ আছে কি?',
      en: '4. Can we customize a tour itinerary for our family or corporate team?',
    },
    a: {
      bn: 'হ্যাঁ, আমাদের কর্পোরেট ও গ্রুপ ট্যুর পেজে গিয়ে আপনার সদস্য সংখ্যা, বাজেট ও পছন্দের গন্তব্য লিখে কোটেশন রিকোয়েস্ট পাঠাতে পারেন।',
      en: 'Yes! Visit our Corporate & Group Tours page to request a tailored quotation or generate a custom draft itinerary.',
    },
  },
];

export default function FaqPage() {
  const { lang, t } = useApp();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="pb-16 space-y-10">
      <div className="bg-[#10283B] text-white py-14 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <p className="text-xs font-bold text-[#F9C91D] tracking-wider">
            {lang === 'bn' ? 'সাধারণ জিজ্ঞাসা (FAQ)' : 'FREQUENTLY ASKED QUESTIONS'}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            {lang === 'bn'
              ? 'ভ্রমণ ও বুকিং সংক্রান্ত সচরাচর জিজ্ঞাসিত প্রশ্নোত্তর'
              : 'Frequently Asked Questions About Tours & Bookings'}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {FAQ_DATA.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-[#10283B] hover:bg-slate-50"
              >
                <span className="flex items-center gap-2.5">
                  <HelpCircle className="w-5 h-5 text-[#16A6A6] shrink-0" />
                  <span>{t(item.q)}</span>
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    isOpen ? 'rotate-180 text-[#EF174F]' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                  {t(item.a)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
