'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Plane,
  MapPin,
  Stamp,
  HeartPulse,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '@/lib/app-context';
import ResilientImage from './ResilientImage';

export default function HeroBannerSlider() {
  const { lang } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch & Mouse horizontal swipe state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const slides = [
    {
      id: 'bangladesh-tour',
      tabLabel: { bn: 'বাংলাদেশ ট্যুর', en: 'Bangladesh Tour' },
      badge: { bn: 'দেশ দেখুন, দেশ ঘুরুন', en: 'Explore Beautiful Bangladesh' },
      titleLine1: { bn: 'বাংলাদেশ', en: 'Bangladesh' },
      titleLine2: { bn: 'ট্যুর প্যাকেজ', en: 'Tour Packages' },
      titleLine2Color: 'text-[#FAD814]',
      subtitle: {
        bn: 'প্রকৃতি, পাহাড়, সমুদ্র, নদী, ঐতিহ্য এবং আমাদের অসাধারণ বাংলাদেশ — কক্সবাজার, সাজেক ভ্যালি, সুন্দরবন ও সিলেট ভ্রমণ',
        en: "Nature, mountains, sea beaches, rivers & heritage — Cox's Bazar, Sajek Valley, Sundarbans & Sylhet packages",
      },
      highlights: [
        { bn: 'কক্সবাজার ও সেন্টমার্টিন', en: "Cox's Bazar & Beach" },
        { bn: 'সাজেক ভ্যালি ও বান্দরবান', en: 'Sajek & Hill Tracts' },
        { bn: 'সুন্দরবন রয়েল ক্রুজ', en: 'Sundarbans Cruise' },
      ],
      ctaText: {
        bn: 'বাংলাদেশ ট্যুর প্যাকেজ দেখুন',
        en: 'Explore Bangladesh Tours',
      },
      ctaHref: '/tours/bangladesh',
      ctaStyle: 'bg-[#FAD814] hover:bg-[#e5c40e] text-[#10283B]',
      secondaryCtaText: { bn: 'এখনই বুক করুন', en: 'Book Now' },
      secondaryCtaHref: '/booking',
      image: '/images/hero_bangladesh.jpg',
      icon: MapPin,
      accentCircle: 'bg-[#EE2454]',
    },
    {
      id: 'international-tour',
      tabLabel: { bn: 'ইন্টারন্যাশনাল ট্যুর', en: 'International Tour' },
      badge: { bn: 'বিশ্ব দেখুন, স্বপ্ন ছুঁয়ে দেখুন', en: 'Explore the World' },
      titleLine1: { bn: 'ইন্টারন্যাশনাল', en: 'International' },
      titleLine2: { bn: 'ট্যুর প্যাকেজ', en: 'Tour Packages' },
      titleLine2Color: 'text-[#FAD814]',
      subtitle: {
        bn: 'থাইল্যান্ড, মালয়েশিয়া, সিঙ্গাপুর, দুবাই, নেপাল, কাশ্মীর এবং বিশ্বের জনপ্রিয় দেশসমূহে সাশ্রয়ী ভ্রমণ প্যাকেজ',
        en: 'Thailand, Malaysia, Singapore, Dubai, Nepal, Kashmir and many more global destinations',
      },
      highlights: [
        { bn: 'থাইল্যান্ড ও মালয়েশিয়া', en: 'Thailand & Malaysia' },
        { bn: 'সিঙ্গাপুর ও দুবাই', en: 'Singapore & Dubai' },
        { bn: 'নেপাল ও কাশ্মীর', en: 'Nepal & Kashmir' },
      ],
      ctaText: {
        bn: 'আন্তর্জাতিক ট্যুর প্যাকেজ দেখুন',
        en: 'Explore International Tours',
      },
      ctaHref: '/tours/international',
      ctaStyle: 'bg-[#EE2454] hover:bg-[#d51144] text-white',
      secondaryCtaText: { bn: 'কাস্টম ট্যুর প্ল্যান', en: 'Custom Tour Plan' },
      secondaryCtaHref: '/corporate-tours',
      image: '/images/hero_international.jpg',
      icon: Plane,
      accentCircle: 'bg-[#0F8E95]',
    },
    {
      id: 'indian-visa',
      tabLabel: { bn: 'ইন্ডিয়ান ভিসা', en: 'Indian Visa' },
      badge: { bn: 'ভারতীয় ভিসা প্রসেসিং সহায়তা', en: 'Indian Visa Assistance' },
      titleLine1: { bn: 'ইন্ডিয়ান ভিসা', en: 'Indian Visa' },
      titleLine2: { bn: 'প্রসেসিং সেবা', en: 'Processing Support' },
      titleLine2Color: 'text-[#FAD814]',
      subtitle: {
        bn: 'ট্যুরিস্ট ভিসা ও মেডিকেল ভিসার নির্ভুল অনলাইন আবেদন ফরম পূরণ, ডকুমেন্ট চেকলিস্ট যাচাই ও অ্যাপয়েন্টমেন্ট স্লট সহায়তা',
        en: 'Error-free online application form filling, document checklist verification & appointment slot guidance for India',
      },
      highlights: [
        { bn: 'ভারতীয় ট্যুরিস্ট ভিসা', en: 'Indian Tourist Visa' },
        { bn: 'মেডিকেল ও অ্যাটেনডেন্ট ভিসা', en: 'Medical & Attendant Visa' },
        { bn: 'নির্ভুল অনলাইন ফরম ও চেকলিস্ট', en: 'Application & Checklist' },
      ],
      ctaText: {
        bn: 'ইন্ডিয়ান ভিসা প্রসেসিং ফরম',
        en: 'Apply for Visa Assistance',
      },
      ctaHref: '/services/indian-visa',
      ctaStyle: 'bg-[#FAD814] hover:bg-[#e5c40e] text-[#10283B]',
      secondaryCtaText: { bn: 'সরাসরি কথা বলুন', en: 'Contact Desk' },
      secondaryCtaHref: '/contact',
      image: '/images/hero_indian_visa.jpg',
      icon: Stamp,
      accentCircle: 'bg-[#F29120]',
    },
    {
      id: 'medical-travel',
      tabLabel: { bn: 'মেডিকেল ট্রাভেল', en: 'Medical Travel' },
      badge: {
        bn: 'হেলথকেয়ার ও ডক্টর অ্যাপয়েন্টমেন্ট ডেস্ক',
        en: 'Healthcare & Doctor Appointment Desk',
      },
      titleLine1: { bn: 'মেডিকেল ট্রাভেল', en: 'Medical Travel' },
      titleLine2: { bn: 'ও ডক্টর সিরিয়াল', en: '& Hospital Support' },
      titleLine2Color: 'text-[#FAD814]',
      subtitle: {
        bn: 'ভারতের চেন্নাই (Apollo), ভেলোর (CMC), ব্যাঙ্গালোর ও কলকাতার শীর্ষ হাসপাতালে ডাক্তারের অ্যাপয়েন্টমেন্ট ও ট্রাভেল প্ল্যানিং',
        en: 'Doctor appointment coordination at CMC Vellore, Apollo Chennai, Narayana Bangalore & Kolkata hospitals',
      },
      highlights: [
        { bn: 'CMC ভেলোর ও অ্যাপোলো চেন্নাই', en: 'CMC Vellore & Apollo' },
        { bn: 'ডাক্তারের অ্যাপয়েন্টমেন্ট লেটার', en: 'Doctor Appointment Letter' },
        { bn: 'এয়ার/ট্রেন টিকিট ও আবাসন', en: 'Tickets & Hospital Stay' },
      ],
      ctaText: {
        bn: 'মেডিকেল অ্যাপয়েন্টমেন্ট নিন',
        en: 'Book Medical Support',
      },
      ctaHref: '/services/medical-travel',
      ctaStyle: 'bg-[#EE2454] hover:bg-[#d51144] text-white',
      secondaryCtaText: { bn: 'মেডিকেল ভিসা সহায়তা', en: 'Medical Visa Support' },
      secondaryCtaHref: '/services/indian-visa',
      image: '/images/hero_medical_travel.jpg',
      icon: HeartPulse,
      accentCircle: 'bg-[#EE2454]',
    },
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  // Touch swipe handlers so user can swipe left/right on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const deltaX = touchStartX.current - touchEndX.current;
    if (Math.abs(deltaX) > 45) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {/* PART 1: HORIZONTAL SLIDING HERO BANNER (SWIPEABLE LEFT & RIGHT) */}
      <section
        className="relative w-full overflow-hidden bg-[#1E3540] select-none touch-pan-y"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Horizontal Sliding Track (translateX left/right) */}
        <div
          className="flex w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide) => {
            const SlideIcon = slide.icon;
            return (
              <div
                key={slide.id}
                className="relative w-full shrink-0 min-h-[340px] sm:min-h-[420px] lg:min-h-[460px] flex items-center overflow-hidden"
              >
                {/* Full-Bleed Slide Background Image */}
                <div className="absolute inset-0">
                  <ResilientImage
                    src={slide.image}
                    alt={slide.tabLabel[lang]}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#132630]/95 via-[#1E3540]/80 to-[#1E3540]/30" />
                </div>

                {/* Logo-Themed Colorful Curved Accents */}
                <div className="absolute -bottom-20 -left-14 w-48 h-36 rounded-[100%] bg-[#EE2454] rotate-12 opacity-90 pointer-events-none" />
                <div className="absolute -bottom-24 left-12 w-52 h-32 rounded-[100%] bg-[#FAD814] -rotate-6 opacity-90 pointer-events-none" />
                <div className="hidden lg:block absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#F29120]/85 pointer-events-none" />
                <div className="hidden lg:block absolute -bottom-14 -right-10 w-48 h-40 rounded-full bg-[#0F8E95]/85 pointer-events-none" />

                {/* Decorative Circle & Plane Top Right */}
                <div
                  className={`hidden sm:flex absolute top-8 right-14 lg:right-24 w-20 h-20 sm:w-24 sm:h-24 rounded-full ${slide.accentCircle} opacity-90 items-center justify-center shadow-2xl pointer-events-none`}
                >
                  <SlideIcon className="w-9 h-9 sm:w-11 sm:h-11 text-white" />
                </div>
                <div className="hidden sm:block absolute top-24 right-36 w-24 border-t-2 border-dashed border-white/75 -rotate-[22deg] pointer-events-none" />

                {/* Banner Content (Only Banner Info & CTA Buttons inside the Banner!) */}
                <div className="relative z-20 max-w-7xl mx-auto w-full px-10 sm:px-14 lg:px-16 py-8 sm:py-12">
                  <div className="max-w-2xl space-y-3 sm:space-y-4">
                    {/* Top Pill Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#132630]/90 border border-white/20 text-white text-xs sm:text-sm font-bold shadow-md">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#17A673] flex items-center justify-center shrink-0">
                        <span className="w-2 h-2 rounded-full bg-[#EE2454]" />
                      </span>
                      <span>{slide.badge[lang]}</span>
                    </div>

                    {/* Large Bold Two-Tone Heading */}
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight drop-shadow-md">
                      <span className="block text-white">{slide.titleLine1[lang]}</span>
                      <span className={`block mt-1 ${slide.titleLine2Color}`}>
                        {slide.titleLine2[lang]}
                      </span>
                    </h1>

                    {/* Supporting Text */}
                    <p className="text-xs sm:text-base lg:text-lg text-white/95 font-semibold leading-relaxed max-w-xl drop-shadow-xs">
                      {slide.subtitle[lang]}
                    </p>

                    {/* Feature Check Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5">
                      {slide.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs border border-white/20 text-white text-[11px] sm:text-xs font-bold"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FAD814] shrink-0" />
                          <span>{h[lang]}</span>
                        </span>
                      ))}
                    </div>

                    {/* Primary & Secondary Action Buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3.5">
                      <Link
                        href={slide.ctaHref}
                        className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-black text-xs sm:text-sm transition-transform hover:scale-[1.02] shadow-xl ${slide.ctaStyle}`}
                      >
                        <span>{slide.ctaText[lang]}</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </Link>

                      <Link
                        href={slide.secondaryCtaHref}
                        className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/25 font-extrabold text-xs sm:text-sm transition-colors backdrop-blur-xs"
                      >
                        <span>{slide.secondaryCtaText[lang]}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Left & Right Slide Arrow Buttons (Available on BOTH Mobile & Desktop) */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Banner"
          className="absolute left-1.5 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#132630]/80 hover:bg-[#FAD814] text-white hover:text-[#10283B] border border-white/20 flex items-center justify-center transition-colors shadow-lg"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Banner"
          className="absolute right-1.5 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#132630]/80 hover:bg-[#FAD814] text-white hover:text-[#10283B] border border-white/20 flex items-center justify-center transition-colors shadow-lg"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Subtle Slide Dots at Bottom of Banner */}
        <div className="absolute bottom-2.5 inset-x-0 z-30 flex items-center justify-center gap-1.5">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIndex ? 'w-6 bg-[#FAD814]' : 'w-2 bg-white/45'
              }`}
            />
          ))}
        </div>
      </section>

      {/* PART 2: 4-PILLAR SWITCHER BAR BELOW THE BANNER (ব্যানার এর নিচে থাকবে মধ্যে না) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 bg-[#1E3540] p-2 sm:p-2.5 rounded-2xl border border-slate-200/20 shadow-md">
          {slides.map((s, idx) => {
            const TabIcon = s.icon;
            const isSelected = idx === activeIndex;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#FAD814] text-[#10283B] shadow-sm scale-[1.01]'
                    : 'bg-white/10 hover:bg-white/15 text-white'
                }`}
              >
                <span
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-[#1E3540] text-[#FAD814]'
                      : 'bg-white/10 text-[#FAD814]'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                </span>
                <span className="text-xs sm:text-sm font-black truncate">
                  {s.tabLabel[lang]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
