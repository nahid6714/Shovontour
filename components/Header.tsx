'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Menu,
  X,
  Globe,
  UserCheck,
  Search,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '@/lib/app-context';
import BrandLogo from './BrandLogo';

export default function Header() {
  const pathname = usePathname();
  const { lang, setLang, settings } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  // Hide public header inside /admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const primaryLinks = [
    { href: '/', label: { bn: 'হোম', en: 'Home' } },
    { href: '/tours/bangladesh', label: { bn: 'বাংলাদেশ ট্যুর', en: 'Bangladesh Tours' } },
    { href: '/tours/international', label: { bn: 'আন্তর্জাতিক ট্যুর', en: 'International Tours' } },
    { href: '/services/indian-visa', label: { bn: 'ইন্ডিয়ান ভিসা', en: 'Indian Visa' }, highlight: true },
    { href: '/services/medical-travel', label: { bn: 'মেডিকেল', en: 'Medical' }, highlight: true },
    { href: '/blog', label: { bn: 'ভ্রমণ গাইড', en: 'Travel Guide' } },
    { href: '/about', label: { bn: 'আমাদের সম্পর্কে', en: 'About Us' } },
    { href: '/contact', label: { bn: 'যোগাযোগ', en: 'Contact' } },
  ];

  const secondaryLinks = [
    { href: '/corporate-tours', label: { bn: 'কর্পোরেট ও গ্রুপ ট্যুর', en: 'Corporate Tours' } },
    { href: '/gallery', label: { bn: 'ফটো গ্যালারি', en: 'Gallery' } },
    { href: '/reviews', label: { bn: 'গ্রাহক রিভিউ (ডেমো)', en: 'Customer Reviews' } },
    { href: '/booking/lookup', label: { bn: 'বুকিং খুঁজুন', en: 'Booking Lookup' } },
    { href: '/faq', label: { bn: 'সাধারণ জিজ্ঞাসা (FAQ)', en: 'FAQ' } },
    { href: '/customer/dashboard', label: { bn: 'গ্রাহক ড্যাশবোর্ড (ডেমো)', en: 'Customer Dashboard' } },
    { href: '/admin/demo-login', label: { bn: 'অ্যাডমিন ডেমো প্যানেল', en: 'Admin Demo Panel' } },
  ];

  return (
    <header className="sticky top-0 z-40 w-full max-w-full bg-[#1E3540] text-white border-b border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-[74px] flex items-center justify-between gap-2 sm:gap-3">
        {/* Zone 1: Exact Suitcase + SHOVON Tour & Travel BD Logo */}
        <BrandLogo />

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 text-sm xl:text-[15px] font-bold text-slate-100">
          {primaryLinks.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-1.5 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  isActive
                    ? 'text-[#16A6A6] border-[#F9C91D] font-extrabold'
                    : item.highlight
                    ? 'border-transparent text-[#F9C91D] hover:text-white font-extrabold'
                    : 'border-transparent hover:text-[#F9C91D]'
                }`}
              >
                {item.label[lang]}
              </Link>
            );
          })}

          {/* Smooth Dropdown for additional pages on Desktop */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((prev) => !prev)}
              onBlur={() => setTimeout(() => setMoreOpen(false), 200)}
              className="inline-flex items-center gap-0.5 py-1.5 text-slate-200 hover:text-[#F9C91D] transition-colors whitespace-nowrap shrink-0"
            >
              <span>{lang === 'bn' ? 'আরও' : 'More'}</span>
              <ChevronDown
                className={`w-4 h-4 text-[#F9C91D] transition-transform duration-300 ${
                  moreOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>

            <div
              className={`absolute right-0 mt-2 w-56 rounded-2xl bg-white text-[#10283B] shadow-xl border border-slate-200 py-2 z-50 transition-all duration-200 origin-top-right ${
                moreOpen
                  ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}
            >
              {secondaryLinks.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={() => setMoreOpen(false)}
                  className="block px-4 py-2 text-xs font-bold hover:bg-[#F4F8FB] hover:text-[#EF174F] transition-colors"
                >
                  {sub.label[lang]}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Zone 3: Phone Call Info, Language Switcher & Yellow CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Desktop Two-Line Phone Block matching Reference Image */}
          <a
            href={`tel:${settings.primaryPhone}`}
            className="hidden xl:flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-white/5 transition-colors whitespace-nowrap shrink-0"
          >
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
              <Phone className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-bold font-mono text-white tabular-nums">
                {settings.primaryPhone}
              </span>
              <span className="text-[10px] text-slate-300">
                {lang === 'bn' ? 'সকাল ৯টা - রাত ১০টা' : '9:00 AM - 10:00 PM'}
              </span>
            </div>
          </a>

          {/* Language Toggle */}
          <button
            type="button"
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            aria-label="Toggle Language"
            className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-[11px] font-bold text-white transition-colors whitespace-nowrap shrink-0"
          >
            <Globe className="w-3 h-3 text-[#F9C91D] shrink-0" />
            <span>{lang === 'bn' ? 'EN' : 'বাংলা'}</span>
          </button>

          {/* Primary Yellow CTA matching Reference Image (“এখনই বুক করুন”) */}
          <Link
            href="/booking"
            className="inline-flex items-center justify-center px-3.5 sm:px-5 py-2 rounded-lg bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-extrabold text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            {lang === 'bn' ? 'এখনই বুক করুন' : 'Book Now'}
          </Link>

          {/* Mobile Hamburger Button with Smooth Icon Rotation */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label="Toggle Menu"
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white shrink-0 transition-transform duration-300"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-[#F9C91D] transition-transform duration-300 rotate-90" />
            ) : (
              <Menu className="w-5 h-5 transition-transform duration-300 rotate-0" />
            )}
          </button>
        </div>
      </div>

      {/* Smoothly Expanding & Collapsing Mobile Navigation Drawer */}
      <div
        className={`lg:hidden grid transition-all duration-300 ease-in-out bg-[#0c1f2e] ${
          mobileOpen
            ? 'grid-rows-[1fr] opacity-100 border-t border-white/10'
            : 'grid-rows-[0fr] opacity-0 pointer-events-none border-t-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pt-3 pb-5 space-y-3 max-h-[80vh] overflow-y-auto">
            {/* Primary Mobile Links in a Neat 2-Column Grid */}
            <div className="grid grid-cols-2 gap-1.5">
              {primaryLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors truncate ${
                    pathname === item.href
                      ? 'bg-[#F9C91D] text-[#10283B] font-extrabold shadow-xs'
                      : item.highlight
                      ? 'bg-white/10 text-[#F9C91D] hover:bg-white/15'
                      : 'bg-white/5 text-slate-200 hover:bg-white/10'
                  }`}
                >
                  {item.label[lang]}
                </Link>
              ))}
            </div>

            {/* Smooth Collapsible Sub-Accordion for More Services inside Mobile Drawer */}
            <div className="border-t border-white/10 pt-2">
              <button
                type="button"
                onClick={() => setMobileMoreOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 text-xs font-extrabold text-[#F9C91D]"
              >
                <span>{lang === 'bn' ? 'আরও সেবা ও পোর্টাল লিংক' : 'More Services & Portal'}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
                    mobileMoreOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  mobileMoreOpen
                    ? 'grid-rows-[1fr] opacity-100 pt-2'
                    : 'grid-rows-[0fr] opacity-0 pt-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="grid grid-cols-2 gap-1.5">
                    {secondaryLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors truncate ${
                          pathname === item.href
                            ? 'bg-[#F9C91D] text-[#10283B] font-extrabold'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {item.label[lang]}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact & Action Bar */}
            <div className="pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
              <a
                href={`tel:${settings.primaryPhone}`}
                className="inline-flex items-center gap-1.5 text-xs text-slate-300"
              >
                <Phone className="w-3.5 h-3.5 text-[#F9C91D]" />
                <strong className="font-mono text-white">{settings.primaryPhone}</strong>
              </a>
              <div className="flex items-center gap-2">
                <Link
                  href="/customer/login"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 text-[11px] font-semibold text-white"
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#16A6A6]" />
                  <span>{lang === 'bn' ? 'লগইন' : 'Login'}</span>
                </Link>
                <Link
                  href="/booking/lookup"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#16A6A6] text-[11px] font-semibold text-white"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'বুকিং খুঁজুন' : 'Track Booking'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
