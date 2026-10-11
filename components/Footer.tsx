'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Mail,
  Facebook,
  Users,
  User,
  CreditCard,
  Lock,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '@/lib/app-context';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const pathname = usePathname();
  const { lang, t, settings } = useApp();
  // Exclusive single-open dropdown state for mobile: opening a new one smoothly closes the previous one
  const [openSection, setOpenSection] = useState<string | null>(null);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const tourLinks = [
    {
      href: '/tours/bangladesh',
      label: { bn: 'বাংলাদেশ ট্যুর প্যাকেজ', en: 'Bangladesh Tour Packages' },
    },
    {
      href: '/packages/coxs-bazar-relax-escape',
      label: { bn: 'কক্সবাজার ও ইনানী ট্যুর', en: "Cox's Bazar & Inani Tour" },
    },
    {
      href: '/packages/sajek-valley-cloud-expedition',
      label: { bn: 'সাজেক ভ্যালি মেঘের রাজ্য', en: 'Sajek Valley Cloud Tour' },
    },
    {
      href: '/packages/sundarbans-royal-safari-cruise',
      label: { bn: 'সুন্দরবন রয়েল ক্রুজ', en: 'Sundarbans Mangrove Cruise' },
    },
    {
      href: '/tours/international',
      label: { bn: 'আন্তর্জাতিক ট্যুর প্যাকেজ', en: 'International Tour Packages' },
    },
    {
      href: '/destinations/nepal',
      label: { bn: 'নেপাল, থাইল্যান্ড ও কাশ্মীর', en: 'Nepal, Thailand & Kashmir' },
    },
  ];

  const serviceLinks = [
    {
      href: '/services/indian-visa',
      label: { bn: 'ভারতীয় ভিসা সহায়তা', en: 'Indian Visa Assistance' },
    },
    {
      href: '/services/medical-travel',
      label: { bn: 'মেডিকেল ট্রাভেল ও অ্যাপয়েন্টমেন্ট', en: 'Medical Travel Assistance' },
    },
    {
      href: '/corporate-tours',
      label: { bn: 'কর্পোরেট ও গ্রুপ ট্যুর', en: 'Corporate & Group Tours' },
    },
    {
      href: '/booking/lookup',
      label: { bn: 'বুকিং স্ট্যাটাস অনুসন্ধান', en: 'Booking Status Lookup' },
    },
    {
      href: '/booking/payment-info',
      label: { bn: 'ডেমো পেমেন্ট নির্দেশনা', en: 'Demo Payment Instructions' },
    },
    {
      href: '/customer/login',
      label: { bn: 'গ্রাহক লগইন / রেজিস্ট্রেশন', en: 'Customer Login / Register' },
    },
    {
      href: '/customer/dashboard',
      label: { bn: 'গ্রাহক ড্যাশবোর্ড (ডেমো)', en: 'Customer Demo Dashboard' },
    },
  ];

  const policyLinks = [
    {
      href: '/about',
      label: { bn: 'আমাদের সম্পর্কে', en: 'About Us' },
    },
    {
      href: '/faq',
      label: { bn: 'সাধারণ জিজ্ঞাসা (FAQ)', en: 'Frequently Asked Questions' },
    },
    {
      href: '/privacy-policy',
      label: { bn: 'গোপনীয়তা নীতি (Privacy Policy)', en: 'Privacy Policy' },
    },
    {
      href: '/terms',
      label: { bn: 'শর্তাবলী (Terms & Conditions)', en: 'Terms & Conditions' },
    },
    {
      href: '/refund-policy',
      label: { bn: 'বাতিল ও রিফান্ড নীতি', en: 'Cancellation & Refund Policy' },
    },
  ];

  const mobileSections = [
    {
      id: 'tours',
      title: { bn: 'ট্যুর প্যাকেজসমূহ', en: 'Tour Packages' },
      links: tourLinks,
    },
    {
      id: 'services',
      title: { bn: 'সেবা ও গ্রাহক কর্নার', en: 'Services & Customer' },
      links: serviceLinks,
    },
    {
      id: 'policies',
      title: { bn: 'নীতিমালা ও তথ্য', en: 'Policies & Links' },
      links: policyLinks,
    },
  ];

  return (
    <footer className="bg-[#10283B] text-slate-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        {/* MOBILE COMPACT FOOTER WITH SMOOTH EXCLUSIVE ACCORDION DROPDOWNS (< md) */}
        <div className="md:hidden space-y-4">
          {/* Compact Brand & Quick Contact Header */}
          <div className="space-y-2.5 pb-3 border-b border-white/10">
            <div className="flex items-center justify-between gap-2">
              <BrandLogo />
              <span className="text-[11px] text-slate-300 font-medium text-right">
                {lang === 'bn' ? 'সিইও:' : 'CEO:'}{' '}
                <strong className="text-white">{settings.ownerName}</strong>
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-snug line-clamp-2">
              {t(settings.tagline)}
            </p>

            {/* Compact Contact & Social Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <a
                href={`tel:${settings.primaryPhone}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 text-[11px] text-white font-mono"
              >
                <Phone className="w-3 h-3 text-[#F9C91D]" />
                <span>{settings.primaryPhone}</span>
              </a>
              <a
                href={settings.facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 hover:bg-[#16A6A6] text-[11px] text-white transition-colors"
              >
                <Facebook className="w-3 h-3 text-[#F9C91D]" />
                <span>{lang === 'bn' ? 'পেজ' : 'Page'}</span>
              </a>
              <a
                href={settings.facebookGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 hover:bg-[#16A6A6] text-[11px] text-white transition-colors"
              >
                <Users className="w-3 h-3 text-[#16A6A6]" />
                <span>{lang === 'bn' ? 'গ্রুপ' : 'Group'}</span>
              </a>
              <a
                href={settings.facebookProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 hover:bg-[#16A6A6] text-[11px] text-white transition-colors"
              >
                <User className="w-3 h-3 text-[#EF174F]" />
                <span>{lang === 'bn' ? 'সিইও' : 'CEO'}</span>
              </a>
            </div>
          </div>

          {/* Smooth Exclusive Accordion Dropdowns */}
          <div className="divide-y divide-white/10 border-b border-white/10">
            {mobileSections.map((section) => {
              const isOpen = openSection === section.id;
              return (
                <div key={section.id} className="py-1">
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between py-2.5 text-left text-xs font-extrabold text-white hover:text-[#F9C91D] transition-colors"
                  >
                    <span>{section.title[lang]}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#F9C91D] transition-transform duration-300 ease-in-out ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </button>

                  {/* Smooth CSS Grid 0fr -> 1fr height transition */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100 pb-2.5'
                        : 'grid-rows-[0fr] opacity-0 pb-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 pt-1 text-[11px] text-slate-300">
                        {section.links.map((item) => (
                          <li key={item.href} className="truncate">
                            <Link
                              href={item.href}
                              className="hover:text-[#F9C91D] transition-colors block truncate py-0.5"
                            >
                              • {item.label[lang]}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* 4th Accordion: Contact & Demo Payment Info */}
            <div className="py-1">
              <button
                type="button"
                onClick={() => toggleSection('payment')}
                aria-expanded={openSection === 'payment'}
                className="w-full flex items-center justify-between py-2.5 text-left text-xs font-extrabold text-white hover:text-[#F9C91D] transition-colors"
              >
                <span>
                  {lang === 'bn' ? 'যোগাযোগ ও পেমেন্ট তথ্য' : 'Contact & Payment Info'}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#F9C91D] transition-transform duration-300 ease-in-out ${
                    openSection === 'payment' ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openSection === 'payment'
                    ? 'grid-rows-[1fr] opacity-100 pb-2.5'
                    : 'grid-rows-[0fr] opacity-0 pb-0'
                }`}
              >
                <div className="overflow-hidden space-y-1.5 text-[11px] text-slate-300 pt-1">
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-[#F9C91D] shrink-0" />
                    <span className="font-mono text-white">
                      {settings.primaryPhone}, {settings.secondaryPhone}
                    </span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-[#16A6A6] shrink-0" />
                    <span className="font-mono">{settings.supportEmail}</span>
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {lang === 'bn'
                      ? 'বিকাশ ডেমো মার্চেন্ট ও ব্যাংক ট্রান্সফার সিমুলেশন শুধুমাত্র প্রোটোটাইপ রিভিউয়ের জন্য।'
                      : 'bKash demo merchant & bank transfer simulation for frontend review only.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP FULL GRID (md and up) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand Info & Owner */}
          <div className="lg:col-span-2 space-y-3.5">
            <BrandLogo />

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
              {t(settings.tagline)}
            </p>

            <div className="space-y-1 text-xs text-slate-300">
              <p>
                <span className="text-slate-400">
                  {lang === 'bn' ? 'প্রোপাইটর ও সিইও:' : 'Founder & CEO:'}
                </span>{' '}
                <strong className="text-white font-semibold">{settings.ownerName}</strong>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F9C91D] shrink-0" />
                <span>
                  {lang === 'bn' ? 'বুকিং হটলাইন:' : 'Booking Numbers:'}{' '}
                  <span className="font-mono text-white">{settings.primaryPhone}</span>,{' '}
                  <span className="font-mono text-white">{settings.secondaryPhone}</span>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#16A6A6] shrink-0" />
                <span className="font-mono">{settings.supportEmail}</span>
              </p>
            </div>

            <div className="pt-1 flex flex-wrap items-center gap-2">
              <a
                href={settings.facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#16A6A6] text-xs font-medium text-white transition-colors"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'ফেসবুক পেজ' : 'Facebook Page'}</span>
              </a>
              <a
                href={settings.facebookGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#16A6A6] text-xs font-medium text-white transition-colors"
              >
                <Users className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'ট্রাভেল গ্রুপ' : 'Facebook Group'}</span>
              </a>
              <a
                href={settings.facebookProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#16A6A6] text-xs font-medium text-white transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'সিইও প্রোফাইল' : 'CEO Profile'}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Domestic & International Tours */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-bold text-white tracking-wide">
              {lang === 'bn' ? 'ট্যুর প্যাকেজসমূহ' : 'Tour Packages'}
            </h3>
            <ul className="space-y-1.5 text-xs">
              {tourLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#F9C91D] transition-colors">
                    {item.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services & Customer Portal */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-bold text-white tracking-wide">
              {lang === 'bn' ? 'সেবা ও গ্রাহক কর্নার' : 'Services & Customer'}
            </h3>
            <ul className="space-y-1.5 text-xs">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#F9C91D] transition-colors">
                    {item.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Policies, Legal & Payment Info */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-bold text-white tracking-wide">
              {lang === 'bn' ? 'নীতিমালা ও তথ্য' : 'Policies & Links'}
            </h3>
            <ul className="space-y-1.5 text-xs">
              {policyLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#F9C91D] transition-colors">
                    {item.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-1.5 p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F9C91D]">
                <CreditCard className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'ডেমো পেমেন্ট তথ্য' : 'Demo Payment Info'}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-normal">
                {lang === 'bn'
                  ? 'বিকাশ ডেমো মার্চেন্ট ও ব্যাংক ট্রান্সফার সিমুলেশন শুধুমাত্র প্রোটোটাইপ রিভিউয়ের জন্য।'
                  : 'bKash demo merchant & bank transfer simulation for frontend review only.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Discreet Admin Demo Entry */}
      <div className="border-t border-white/10 bg-[#0b1d2b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} {settings.brandName}.{' '}
            {lang === 'bn'
              ? 'সর্বস্বত্ব সংরক্ষিত · ফ্রন্টএন্ড প্রোটোটাইপ।'
              : 'All rights reserved · Frontend Prototype.'}
          </p>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="hover:text-white transition-colors">
              {lang === 'bn' ? 'যোগাযোগ' : 'Contact'}
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/admin/demo-login"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-[#F9C91D] transition-colors font-medium"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Demo</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
