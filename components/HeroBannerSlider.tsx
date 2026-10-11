'use client';

import React, { useState, useEffect } from 'react';
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

  const slides = [
    {
      id: 'bangladesh-tour',
      tabLabel: { bn: 'বাংলাদেশ ট্যুর', en: 'Bangladesh Tour' },
      badge: { bn: 'দেশ দেখুন, দেশ ঘুরুন', en: 'Explore Beautiful Bangladesh' },
      titleLine1: { bn: 'বাংলাদেশ', en: 'Bangladesh' },
      titleLine2: { bn: 'ট্যুর প্যাকেজ', en: 'Tour Packages' },
      titleLine2Color: 'text-[#F9C91D]',
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
      ctaStyle: 'bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B]',
      secondaryCtaText: { bn: 'এখনই বুক করুন', en: 'Book Now' },
      secondaryCtaHref: '/booking',
      image: '/images/hero_bangladesh.jpg',
      icon: MapPin,
      accentCircle: 'bg-[#EF174F]',
    },
    {
      id: 'international-tour',
      tabLabel: { bn: 'ইন্টারন্যাশনাল ট্যুর', en: 'International Tour' },
      badge: { bn: 'বিশ্ব দেখুন, স্বপ্ন ছুঁয়ে দেখুন', en: 'Explore the World' },
      titleLine1: { bn: 'ইন্টারন্যাশনাল', en: 'International' },
      titleLine2: { bn: 'ট্যুর প্যাকেজ', en: 'Tour Packages' },
      titleLine2Color: 'text-[#F9C91D]',
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
      ctaStyle: 'bg-[#EF174F] hover:bg-[#d51144] text-white',
      secondaryCtaText: { bn: 'কাস্টম ট্যুর প্ল্যান', en: 'Custom Tour Plan' },
      secondaryCtaHref: '/corporate-tours',
      image: '/images/hero_international.jpg',
      icon: Plane,
      accentCircle: 'bg-[#16A6A6]',
    },
    {
      id: 'indian-visa',
      tabLabel: { bn: 'ইন্ডিয়ান ভিসা', en: 'Indian Visa' },
      badge: { bn: 'ভারতীয় ভিসা প্রসেসিং সহায়তা', en: 'Indian Visa Assistance' },
      titleLine1: { bn: 'ইন্ডিয়ান ভিসা', en: 'Indian Visa' },
      titleLine2: { bn: 'প্রসেসিং সেবা', en: 'Processing Support' },
      titleLine2Color: 'text-[#F9C91D]',
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
      ctaStyle: 'bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B]',
      secondaryCtaText: { bn: 'সরাসরি কথা বলুন', en: 'Contact Desk' },
      secondaryCtaHref: '/contact',
      image: '/images/hero_indian_visa.jpg',
      icon: Stamp,
      accentCircle: 'bg-[#16A6A6]',
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
      titleLine2Color: 'text-[#F9C91D]',
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
      ctaStyle: 'bg-[#EF174F] hover:bg-[#d51144] text-white',
      secondaryCtaText: { bn: 'মেডিকেল ভিসা সহায়তা', en: 'Medical Visa Support' },
      secondaryCtaHref: '/services/indian-visa',
      image: '/images/hero_medical_travel.jpg',
      icon: HeartPulse,
      accentCircle: 'bg-[#EF174F]',
    },
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[activeIndex];

  return (
    <section
      className="relative w-full overflow-hidden bg-[#10283B] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images with Smooth Crossfade */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === activeIndex ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none z-0'
          }`}
        >
          <ResilientImage
            src={slide.image}
            alt={slide.tabLabel[lang]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1d2c]/95 via-[#10283B]/80 to-[#10283B]/35" />
        </div>
      ))}

      {/* Signature Colorful Curved Shapes Matching Reference Theme */}
      <div className="absolute -bottom-20 -left-14 w-52 h-40 rounded-[100%] bg-[#EF174F] rotate-12 opacity-85 pointer-events-none z-10" />
      <div className="absolute -bottom-24 left-12 w-56 h-36 rounded-[100%] bg-[#F9C91D] -rotate-6 opacity-85 pointer-events-none z-10" />
      <div className="hidden lg:block absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#F9C91D]/85 pointer-events-none z-10" />
      <div className="hidden lg:block absolute -bottom-14 -right-10 w-52 h-44 rounded-full bg-[#16A6A6]/85 pointer-events-none z-10" />

      {/* Decorative Circle & Icon Top Right */}
      <div
        className={`hidden sm:flex absolute top-8 right-12 lg:right-24 w-24 h-24 sm:w-28 sm:h-28 rounded-full ${currentSlide.accentCircle} opacity-90 items-center justify-center shadow-2xl pointer-events-none z-10 transition-colors duration-500`}
      >
        <currentSlide.icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
      </div>
      <div className="hidden sm:block absolute top-28 right-36 w-28 border-t-2 border-dashed border-white/75 -rotate-[22deg] pointer-events-none z-10" />

      {/* Main Content + Bottom Switcher in Normal Flow (Zero Overlap Guaranteed) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-5 sm:pb-7 flex flex-col justify-between gap-6">
        {/* Active Slide Text & Action Buttons */}
        <div
          key={currentSlide.id}
          className="max-w-3xl space-y-3 sm:space-y-4 animate-in fade-in duration-500"
        >
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10283B]/90 border border-white/20 text-white text-xs sm:text-sm font-bold shadow-md">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#EF174F]" />
            </span>
            <span>{currentSlide.badge[lang]}</span>
          </div>

          {/* HUGE Bold Two-Tone Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight drop-shadow-md">
            <span className="block text-white">{currentSlide.titleLine1[lang]}</span>
            <span className={`block mt-1 ${currentSlide.titleLine2Color}`}>
              {currentSlide.titleLine2[lang]}
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-xs sm:text-lg lg:text-xl text-white/95 font-semibold leading-relaxed max-w-2xl drop-shadow-xs">
            {currentSlide.subtitle[lang]}
          </p>

          {/* Feature Check Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 pt-0.5">
            {currentSlide.highlights.map((h, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs border border-white/20 text-white text-[11px] sm:text-xs font-bold"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F9C91D] shrink-0" />
                <span>{h[lang]}</span>
              </span>
            ))}
          </div>

          {/* Primary & Secondary Action Buttons (Cleanly spaced above switcher bar) */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3.5">
            <Link
              href={currentSlide.ctaHref}
              className={`inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full font-black text-xs sm:text-base transition-transform hover:scale-[1.02] shadow-xl ${currentSlide.ctaStyle}`}
            >
              <span>{currentSlide.ctaText[lang]}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            </Link>

            <Link
              href={currentSlide.secondaryCtaHref}
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/25 font-extrabold text-xs sm:text-base transition-colors backdrop-blur-xs"
            >
              <span>{currentSlide.secondaryCtaText[lang]}</span>
            </Link>
          </div>
        </div>

        {/* Bottom Interactive 4-Pillar Slide Switcher Bar (In Normal Document Flow - Never Overlaps!) */}
        <div className="w-full pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 bg-[#0c1f2e]/90 backdrop-blur-md p-2 rounded-2xl border border-white/15 shadow-xl">
            {slides.map((s, idx) => {
              const TabIcon = s.icon;
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-xl text-left transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#F9C91D] text-[#10283B] shadow-md'
                      : 'bg-white/5 hover:bg-white/15 text-white'
                  }`}
                >
                  <span
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-[#10283B] text-[#F9C91D]'
                        : 'bg-white/10 text-[#F9C91D]'
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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

      {/* Left / Right Slide Controls on Desktop */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="hidden xl:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#10283B]/80 hover:bg-[#F9C91D] text-white hover:text-[#10283B] border border-white/20 items-center justify-center transition-colors shadow-lg"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={handleNext}
        aria-label="Next Slide"
        className="hidden xl:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-[#10283B]/80 hover:bg-[#F9C91D] text-white hover:text-[#10283B] border border-white/20 items-center justify-center transition-colors shadow-lg"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  );
}
