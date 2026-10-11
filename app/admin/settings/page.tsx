'use client';

import React, { useState } from 'react';
import { Save, Plane } from 'lucide-react';
import { useApp } from '@/lib/app-context';

export default function AdminWebsiteSettingsPage() {
  const { lang, settings, updateSettings } = useApp();

  const [brandName, setBrandName] = useState(settings.brandName);
  const [ownerName, setOwnerName] = useState(settings.ownerName);
  const [primaryPhone, setPrimaryPhone] = useState(settings.primaryPhone);
  const [secondaryPhone, setSecondaryPhone] = useState(settings.secondaryPhone);
  const [supportEmail, setSupportEmail] = useState(settings.supportEmail);
  const [facebookPageUrl, setFacebookPageUrl] = useState(settings.facebookPageUrl);
  const [facebookGroupUrl, setFacebookGroupUrl] = useState(settings.facebookGroupUrl);
  const [facebookProfileUrl, setFacebookProfileUrl] = useState(settings.facebookProfileUrl);
  const [heroBdBn, setHeroBdBn] = useState(settings.heroBangladeshHeading.bn);
  const [heroIntlBn, setHeroIntlBn] = useState(settings.heroInternationalHeading.bn);
  const [promoBn, setPromoBn] = useState(settings.promoQuote.bn);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ...settings,
      brandName,
      ownerName,
      primaryPhone,
      secondaryPhone,
      supportEmail,
      facebookPageUrl,
      facebookGroupUrl,
      facebookProfileUrl,
      heroBangladeshHeading: {
        ...settings.heroBangladeshHeading,
        bn: heroBdBn,
      },
      heroInternationalHeading: {
        ...settings.heroInternationalHeading,
        bn: heroIntlBn,
      },
      promoQuote: {
        ...settings.promoQuote,
        bn: promoBn,
      },
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-[#10283B]">
          {lang === 'bn'
            ? 'ওয়েবসাইট ও ব্র্যান্ড সেটিংস (ডেমো এডিটর)'
            : 'Website & Brand Settings (Live Demo Editor)'}
        </h1>
        <p className="text-xs text-slate-500">
          {lang === 'bn'
            ? 'এখানে ব্র্যান্ডের নাম, ফোন নম্বর, ফেসবুক লিংক ও হোমপেজ ব্যানার টেক্সট পরিবর্তন করলে তাৎক্ষণিকভাবে সাইটে আপডেট হবে।'
            : 'Update brand details, contact phone numbers, Facebook links, and homepage banner headings in live shared state.'}
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs text-xs"
      >
        {/* Logo & Brand Preview */}
        <div className="p-4 rounded-2xl bg-[#10283B] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-[#F9C91D] text-[#10283B] flex items-center justify-center">
              <Plane className="w-5 h-5" />
            </span>
            <div>
              <p className="text-base font-extrabold">{brandName}</p>
              <p className="text-[11px] text-slate-300">CEO: {ownerName}</p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-[#F9C91D]">LIVE LOGO PREVIEW</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-1">Brand Name</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 font-bold"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Business Owner / CEO</label>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold mb-1">Primary Booking Phone</label>
            <input
              type="text"
              value={primaryPhone}
              onChange={(e) => setPrimaryPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 font-mono"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Secondary Phone</label>
            <input
              type="text"
              value={secondaryPhone}
              onChange={(e) => setSecondaryPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 font-mono"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Support Email</label>
            <input
              type="text"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold mb-1">Facebook Page URL</label>
            <input
              type="text"
              value={facebookPageUrl}
              onChange={(e) => setFacebookPageUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 font-mono"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">Facebook Group URL</label>
            <input
              type="text"
              value={facebookGroupUrl}
              onChange={(e) => setFacebookGroupUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 font-mono"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">CEO Facebook Profile URL</label>
            <input
              type="text"
              value={facebookProfileUrl}
              onChange={(e) => setFacebookProfileUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block font-bold mb-1">
              Homepage Left Hero Heading (Bengali)
            </label>
            <input
              type="text"
              value={heroBdBn}
              onChange={(e) => setHeroBdBn(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">
              Homepage Right Hero Heading (Bengali)
            </label>
            <input
              type="text"
              value={heroIntlBn}
              onChange={(e) => setHeroIntlBn(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold mb-1">Promotional Travel Quote (Bengali)</label>
          <textarea
            rows={2}
            value={promoBn}
            onChange={(e) => setPromoBn(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-extrabold text-xs shadow-sm"
        >
          <Save className="w-4 h-4" />
          <span>Save Website Settings (Updates Live Preview)</span>
        </button>
      </form>
    </div>
  );
}
