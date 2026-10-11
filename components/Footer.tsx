'use client';

import React from 'react';
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
} from 'lucide-react';
import { useApp } from '@/lib/app-context';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const pathname = usePathname();
  const { lang, t, settings } = useApp();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#10283B] text-slate-300 border-t border-white/10">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info & Owner */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo />

            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              {t(settings.tagline)}
            </p>

            <div className="pt-1 space-y-1.5 text-xs text-slate-300">
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

            {/* Social Links: Facebook Page, Group, and Owner Profile */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
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
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white tracking-wide">
              {lang === 'bn' ? 'ট্যুর প্যাকেজসমূহ' : 'Tour Packages'}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/tours/bangladesh" className="hover:text-[#F9C91D] transition-colors">
                  {lang === 'bn' ? 'বাংলাদেশ ট্যুর প্যাকেজ' : 'Bangladesh Tour Packages'}
                </Link>
              </li>
              <li>
                <Link href="/packages/coxs-bazar-relax-escape" className="hover:text-[#F9C91D] transition-colors">
                  {lang === 'bn' ? 'কক্সবাজার ও ইনানী ট্যুর' : "Cox's Bazar & Inani Tour"}
                </Link>
              </li>
              <li>
                <Link href="/packages/sajek-valley-cloud-expedition" className="hover:text-[#F9C91D] transition-colors">
                  {lang === 'bn' ? 'সাজেক ভ্যালি মেঘের রাজ্য' : 'Sajek Valley Cloud Tour'}
                </Link>
              </li>
              <li>
                <Link href="/packages/sundarbans-royal-safari-cruise" className="hover:text-[#F9C91D] transition-colors">
                  {lang === 'bn' ? 'সুন্দরবন রয়েল ক্রুজ' : 'Sundarbans Mangrove Cruise'}
                </Link>
              </li>
              <li>
                <Link href="/tours/international" className="hover:text-[#F9C91D] transition-colors">
                  {lang === 'bn' ? 'আন্তর্জাতিক ট্যুর প্যাকেজ' : 'International Tour Packages'}
                </Link>
              </li>
              <li>
                <Link href="/destinations/nepal" className="hover:text-[#F9C91D] transition-colors">
                  {lang === 'bn' ? 'নেপাল, থাইল্যান্ড ও কাশ্মীর' : 'Nepal, Thailand & Kashmir'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Customer Portal */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white tracking-wide">
              {lang === 'bn' ? 'সেবা ও গ্রাহক কর্নার' : 'Services & Customer'}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/indian-visa" className="hover:text-[#F9C91D] transition-colors">
                  {lang === 'bn' ? 'ভারতীয় ভিসা সহায়তা' : 'Indian Visa Assistance'}
                </Link>
              </li>
              <li>
                <Link href="/services/medical-travel" className="hover:text-[#F9C91D] transition-colors">
                  {lang === 'bn' ? 'মেডিকেল ট্রাভেল ও অ্যাপয়েন্টমেন্ট' : 'Medical Travel Assistance'}
                </Link>
              </li>
              <li>
                <Link href="/corporate-tours" className="hover:text-[#F9C91D] transition-colors">
                  {lang === 'bn' ? 'কর্পোরেট ও গ্রুপ ট্যুর' : 'Corporate & Group Tours'}
                </Link>
              </li>
              <li>
                <Link href="/booking/lookup" className="hover:text-[#F9C91D] transition-colors">
                  {lang === 'bn' ? 'বুকিং স্ট্যাটাস অনুসন্ধান' : 'Booking Status Lookup'}
                </Link>
              </li>
              <li>
                <Link href="/booking/payment-info" className="hover:text-[#F9C91D] transition-colors">
                  {lang === 'bn' ? 'ডেমো পেমেন্ট নির্দেশনা' : 'Demo Payment Instructions'}
                </Link>
              </li>
              <li>
                <Link href="/customer/login" className="hover:text-[#F9C91D] transition-colors">
                  {lang === 'bn' ? 'গ্রাহক লগইন / রেজিস্ট্রেশন' : 'Customer Login / Register'}
                </Link>
              </li>
              <li>
                <Link href="/customer/dashboard" className="hover:text-[#F9C91D] transition-colors">
                  {lang === 'bn' ? 'গ্রাহক ড্যাশবোর্ড (ডেমো)' : 'Customer Demo Dashboard'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Policies, Legal & Payment Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white tracking-wide">
              {lang === 'bn' ? 'নীতিমালা ও তথ্য' : 'Policies & Links'}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-[#F9C91D] transition-colors">
                  {lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#F9C91D] transition-colors">
                  {lang === 'bn' ? 'সাধারণ জিজ্ঞাসা (FAQ)' : 'Frequently Asked Questions'}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#F9C91D] transition-colors">
                  {lang === 'bn' ? 'গোপনীয়তা নীতি (Privacy Policy)' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#F9C91D] transition-colors">
                  {lang === 'bn' ? 'শর্তাবলী (Terms & Conditions)' : 'Terms & Conditions'}
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-[#F9C91D] transition-colors">
                  {lang === 'bn' ? 'বাতিল ও রিফান্ড নীতি' : 'Cancellation & Refund Policy'}
                </Link>
              </li>
            </ul>

            <div className="pt-2 p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {settings.brandName}.{' '}
            {lang === 'bn'
              ? 'সর্বস্বত্ব সংরক্ষিত · ফ্রন্টএন্ড প্রোটোটাইপ (নমুনা মূল্য ও ডেমো ডাটা)।'
              : 'All rights reserved · Frontend Prototype (Sample pricing & demo data).'}
          </p>

          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-white transition-colors">
              {lang === 'bn' ? 'সাপোর্ট ও যোগাযোগ' : 'Support & Contact'}
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/admin/demo-login"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-[#F9C91D] transition-colors font-medium"
            >
              <Lock className="w-3 h-3" />
              <span>{lang === 'bn' ? 'Admin Demo' : 'Admin Demo'}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
