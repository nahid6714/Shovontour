'use client';

import React, { useState } from 'react';
import {
  Users,
  Sparkles,
  Send,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { useApp } from '@/lib/app-context';

export default function CorporateToursPage() {
  const { lang, createServiceInquiry } = useApp();

  // Standard Corporate Quote Inquiry Form
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [destination, setDestination] = useState("Cox's Bazar / Sajek Valley");
  const [groupSize, setGroupSize] = useState(25);
  const [travelDate, setTravelDate] = useState('2026-12-10');
  const [details, setDetails] = useState('');
  const [submittedRef, setSubmittedRef] = useState('');

  // High-Thinking Gemini AI Custom Itinerary Planner State
  const [aiDest, setAiDest] = useState('Cox’s Bazar & Inani');
  const [aiDays, setAiDays] = useState(3);
  const [aiTravelers, setAiTravelers] = useState(20);
  const [aiBudget, setAiBudget] = useState('Standard Corporate Comfort');
  const [aiPrefs, setAiPrefs] = useState('Sea view resort, conference session, and BBQ dinner');
  const [aiPlanOutput, setAiPlanOutput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;
    const inq = createServiceInquiry({
      category: 'corporate',
      serviceType: `Corporate/Group Tour: ${destination} (${groupSize} Persons)`,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim(),
      travelDate,
      travelersOrGroupSize: groupSize,
      details: details.trim(),
    });
    setSubmittedRef(inq.reference);
    setCustomerName('');
    setCustomerPhone('');
    setDetails('');
  };

  const handleGenerateAiItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setAiLoading(true);
    setAiPlanOutput('');
    try {
      const res = await fetch('/api/travel-planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: aiDest,
          days: aiDays,
          travelers: aiTravelers,
          budget: aiBudget,
          preferences: aiPrefs,
          lang,
        }),
      });
      const data = await res.json();
      if (data.plan) {
        setAiPlanOutput(data.plan);
      } else {
        setAiPlanOutput(
          lang === 'bn'
            ? 'নমুনা খসড়া পরিকল্পনা: দিন ১ - গন্তব্যে আগমন ও রিসোর্ট চেক-ইন। দিন ২ - সাইটসিয়িং, টিম বিল্ডিং ও গালা ডিনার। দিন ৩ - কেনাকাটা ও প্রত্যাবর্তন।'
            : 'Sample Draft Plan: Day 1 - Arrival & Resort Check-in. Day 2 - Guided Sightseeing, Team Outing & BBQ Gala Night. Day 3 - Leisure & Return.'
        );
      }
    } catch {
      setAiPlanOutput(
        lang === 'bn'
          ? 'নমুনা খসড়া পরিকল্পনা প্রস্তুত হয়েছে: দিন ১ - রিসোর্টে চেক-ইন ও স্বাগত সেশন। দিন ২ - মূল দর্শনীয় স্থান ভ্রমণ ও বারবিকিউ ডিনার। দিন ৩ - সমাপনী ও প্রত্যাবর্তন।'
          : 'Sample Draft Plan: Day 1 - Arrival & Check-in. Day 2 - Full-day sightseeing & BBQ night. Day 3 - Departure.'
      );
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="pb-16 space-y-12">
      {/* Header */}
      <div className="bg-[#10283B] text-white py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <p className="text-xs font-bold text-[#F9C91D] tracking-wider">
            {lang === 'bn'
              ? 'কর্পোরেট, শিক্ষা প্রতিষ্ঠান ও পারিবারিক গ্রুপ ট্যুর'
              : 'CORPORATE RETREATS, TEAM OUTINGS & GROUP TOURS'}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            {lang === 'bn'
              ? 'কর্পোরেট ও গ্রুপ ট্যুর কাস্টম কোটেশন'
              : 'Corporate & Group Tours — Request a Custom Quote'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {lang === 'bn'
              ? 'অফিস রিট্রিট, বার্ষিক পিকনিক, ডিলার কনফারেন্স কিংবা পারিবারিক পুনর্মিলনীর জন্য আপনার বাজেট ও পছন্দ অনুযায়ী কাস্টমাইজড ট্যুর প্ল্যান।'
              : 'Tailored itineraries, reserved transport, conference halls, and gala dinners for teams and large family groups.'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Request a Quote Form */}
        <div className="lg:col-span-6">
          <form
            onSubmit={handleQuoteSubmit}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs"
          >
            <h2 className="text-xl font-extrabold text-[#10283B] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#16A6A6]" />
              <span>
                {lang === 'bn'
                  ? 'কর্পোরেট কোটেশন রিকোয়েস্ট ফরম (Request a Quote)'
                  : 'Request a Custom Group Quotation (Demo)'}
              </span>
            </h2>

            {submittedRef && (
              <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 font-bold">
                {lang === 'bn'
                  ? `কর্পোরেট কোটেশন রিকোয়েস্ট (${submittedRef}) সফলভাবে জমা হয়েছে!`
                  : `Corporate quote request (${submittedRef}) recorded in Admin Demo!`}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#10283B]">
                  {lang === 'bn' ? 'নাম ও পদবি / প্রতিষ্ঠান *' : 'Name & Organization *'}
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={lang === 'bn' ? 'যেমন: তানভীর হাসান (HR)' : 'e.g. Tanvir Hasan (HR)'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#10283B]">
                  {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="017XX-XXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#10283B]">
                  {lang === 'bn' ? 'পছন্দের গন্তব্য' : 'Destination'}
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-xs font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#10283B]">
                  {lang === 'bn' ? 'সদস্য সংখ্যা' : 'Group Size'}
                </label>
                <input
                  type="number"
                  min={5}
                  max={500}
                  value={groupSize}
                  onChange={(e) => setGroupSize(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-xs font-mono font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#10283B]">
                  {lang === 'bn' ? 'সম্ভাব্য তারিখ' : 'Target Date'}
                </label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-xs font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#10283B]">
                {lang === 'bn'
                  ? 'কাস্টম রিকোয়ারমেন্ট (হোটেল মান, কনফারেন্স হল, খাবার মেনু ইত্যাদি)'
                  : 'Custom Requirements (Hotel tier, conference hall, transport, meals)'}
              </label>
              <textarea
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-5 rounded-xl bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>
                {lang === 'bn' ? 'কোটেশন রিকোয়েস্ট পাঠান (ডেমো)' : 'Submit Quote Request (Demo)'}
              </span>
            </button>
          </form>
        </div>

        {/* Right: Smart Custom Itinerary Planner powered by Gemini 3.1 Pro High Thinking */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-[#10283B] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#EF174F]" />
                <span>
                  {lang === 'bn'
                    ? 'কাস্টম ট্যুর প্ল্যানার (AI Deep Itinerary Generator)'
                    : 'Custom Group Itinerary Generator'}
                </span>
              </h2>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'আপনার গ্রুপের গন্তব্য, দিন সংখ্যা ও পছন্দ লিখে তাৎক্ষণিক একটি কাস্টমাইজড ভ্রমণ সূচি ও আনুমানিক বাজেট টিপস তৈরি করে দেখুন।'
                : 'Generate a tailored day-by-day draft itinerary and sample budget checklist for your group trip.'}
            </p>

            <form onSubmit={handleGenerateAiItinerary} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    {lang === 'bn' ? 'গন্তব্য' : 'Destination'}
                  </label>
                  <input
                    type="text"
                    value={aiDest}
                    onChange={(e) => setAiDest(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    {lang === 'bn' ? 'মোট দিন' : 'Days'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={14}
                    value={aiDays}
                    onChange={(e) => setAiDays(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    {lang === 'bn' ? 'যাত্রী সংখ্যা' : 'Travelers'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={200}
                    value={aiTravelers}
                    onChange={(e) => setAiTravelers(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  {lang === 'bn' ? 'বিশেষ পছন্দ বা ইভেন্ট' : 'Preferences'}
                </label>
                <input
                  type="text"
                  value={aiPrefs}
                  onChange={(e) => setAiPrefs(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200 text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={aiLoading}
                className="w-full py-3 px-4 rounded-xl bg-[#10283B] hover:bg-[#193b56] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
              >
                {aiLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#F9C91D]" />
                    <span>
                      {lang === 'bn'
                        ? 'কাস্টম আইটিনারারি প্রস্তুত করা হচ্ছে...'
                        : 'Thinking & drafting custom itinerary...'}
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#F9C91D]" />
                    <span>
                      {lang === 'bn'
                        ? 'খসড়া ট্যুর প্ল্যান তৈরি করুন'
                        : 'Generate Custom Draft Itinerary'}
                    </span>
                  </>
                )}
              </button>
            </form>

            {aiPlanOutput && (
              <div className="mt-4 p-4 rounded-2xl bg-[#F4F8FB] border border-slate-200 max-h-80 overflow-y-auto text-xs text-[#10283B] whitespace-pre-wrap leading-relaxed">
                {aiPlanOutput}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
