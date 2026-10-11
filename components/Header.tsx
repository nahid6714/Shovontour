'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Plane,
  Phone,
  Menu,
  X,
  Globe,
  UserCheck,
  Search,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '@/lib/app-context';

export default function Header() {
  const pathname = usePathname();
  const { lang, setLang, settings } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  // Hide public header inside /admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const primaryLinks = [
    { href: '/', label: { bn: 'হোম', en: 'Home' } },
    { href: '/tours/bangladesh', label: { bn: 'বাংলাদেশ ট্যুর', en: 'Bangladesh Tours' } },
    { href: '/tours/international', label: { bn: 'আন্তর্জাতিক ট্যুর', en: 'International Tours' } },
    { href: '/services/indian-visa', label: { bn: 'ভিসা সার্ভিস', en: 'Visa Services' } },
    { href: '/services/medical-travel', label: { bn: 'মেডিকেল ট্রাভেল', en: 'Medical Travel' } },
  ];

  const secondaryLinks = [
    { href: '/corporate-tours', label: { bn: 'কর্পোরেট ও গ্রুপ ট্যুর', en: 'Corporate Tours' } },
    { href: '/blog', label: { bn: 'ট্রাভেল গাইড ও ব্লগ', en: 'Travel Guide' } },
    { href: '/gallery', label: { bn: 'ফটো গ্যালারি', en: 'Gallery' } },
    { href: '/reviews', label: { bn: 'গ্রাহক রিভিউ (ডেমো)', en: 'Customer Reviews' } },
    { href: '/booking/lookup', label: { bn: 'বুকিং খুঁজুন', en: 'Booking Lookup' } },
    { href: '/about', label: { bn: 'আমাদের সম্পর্কে', en: 'About Us' } },
    { href: '/contact', label: { bn: 'যোগাযোগ', en: 'Contact' } },
    { href: '/faq', label: { bn: 'সাধারণ জিজ্ঞাসা (FAQ)', en: 'FAQ' } },
    { href: '/customer/dashboard', label: { bn: 'গ্রাহক ড্যাশবোর্ড (ডেমো)', en: 'Customer Dashboard' } },
    { href: '/admin/demo-login', label: { bn: 'অ্যাডমিন ডেমো প্যানেল', en: 'Admin Demo Panel' } },
  ];

  return (
    <header className="sticky top-0 z-40 w-full max-w-full bg-[#10283B] text-white border-b border-white/10 shadow-md">
      {/* Main Top Navigation Row following Clean 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
        {/* Zone 1: Brand Wordmark */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm sm:text-lg lg:text-xl font-extrabold tracking-tight text-white min-w-0 flex-1 lg:flex-initial"
        >
          <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F9C91D] text-[#10283B] flex items-center justify-center shadow-xs shrink-0">
            <Plane className="w-4 h-4 sm:w-5 sm:h-5" />
          </span>
          <span className="truncate">{settings.brandName}</span>
        </Link>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-slate-200">
          {primaryLinks.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  isActive
                    ? 'text-[#F9C91D] border-[#F9C91D] font-semibold'
                    : 'border-transparent hover:text-white hover:border-white/40'
                }`}
              >
                {item.label[lang]}
              </Link>
            );
          })}

          {/* Dropdown for additional required pages */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((prev) => !prev)}
              onBlur={() => setTimeout(() => setMoreOpen(false), 180)}
              className="inline-flex items-center gap-1 py-1 text-slate-200 hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <span>{lang === 'bn' ? 'আরও পেজ' : 'More'}</span>
              <ChevronDown className="w-4 h-4 text-[#F9C91D]" />
            </button>

            {moreOpen && (
              <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white text-[#10283B] shadow-xl border border-slate-200 py-2 z-50">
                {secondaryLinks.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setMoreOpen(false)}
                    className="block px-4 py-2 text-xs font-semibold hover:bg-[#F4F8FB] hover:text-[#16A6A6] transition-colors"
                  >
                    {sub.label[lang]}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: Language Switcher, Phone Shortcut & Primary Yellow CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Language Toggle */}
          <button
            type="button"
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            aria-label="Toggle Language"
            className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-[11px] sm:text-xs font-semibold text-white transition-colors whitespace-nowrap shrink-0"
          >
            <Globe className="w-3.5 h-3.5 text-[#F9C91D] shrink-0" />
            <span>{lang === 'bn' ? 'EN' : 'বাংলা'}</span>
          </button>

          {/* Phone Shortcut (Desktop) */}
          <a
            href={`tel:${settings.primaryPhone}`}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 whitespace-nowrap shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-[#16A6A6]" />
            <span className="font-mono tabular-nums">{settings.primaryPhone}</span>
          </a>

          {/* Primary Book Now Button */}
          <Link
            href="/booking"
            className="inline-flex items-center justify-center px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-extrabold text-[11px] sm:text-sm transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            {lang === 'bn' ? 'বুক করুন' : 'Book Now'}
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle Menu"
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white shrink-0"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0c1f2e] border-t border-white/10 px-4 pt-3 pb-6 space-y-4 max-h-[82vh] overflow-y-auto">
          <div className="grid grid-cols-1 gap-1">
            {[...primaryLinks, ...secondaryLinks].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-[#F9C91D] text-[#10283B] font-bold'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                {item.label[lang]}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <a
              href={`tel:${settings.primaryPhone}`}
              className="inline-flex items-center gap-2 text-xs text-slate-300"
            >
              <Phone className="w-4 h-4 text-[#F9C91D]" />
              <span>
                {lang === 'bn' ? 'হটলাইন (ডেমো):' : 'Hotline (Demo):'}{' '}
                <strong className="font-mono">{settings.primaryPhone}</strong>
              </span>
            </a>
            <div className="flex items-center gap-2">
              <Link
                href="/customer/login"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 text-xs font-semibold text-white"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#16A6A6]" />
                <span>{lang === 'bn' ? 'গ্রাহক লগইন' : 'Customer Login'}</span>
              </Link>
              <Link
                href="/booking/lookup"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#16A6A6] text-xs font-semibold text-white"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'বুকিং ট্র্যাক' : 'Track Booking'}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
