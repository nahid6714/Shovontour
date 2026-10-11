'use client';

import React, { useState } from 'react';
import { Stethoscope, ShieldAlert, CheckCircle2, Send, Building2 } from 'lucide-react';
import { useApp } from '@/lib/app-context';

export default function MedicalTravelPage() {
  const { lang, createServiceInquiry } = useApp();
  const [serviceType, setServiceType] = useState(
    'Hospital Appointment Coordination Inquiry (India / Thailand)'
  );
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [travelDate, setTravelDate] = useState('2026-11-20');
  const [travelersOrGroupSize, setTravelersOrGroupSize] = useState(2);
  const [details, setDetails] = useState('');
  const [submittedRef, setSubmittedRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;
    const inq = createServiceInquiry({
      category: 'medical',
      serviceType,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim(),
      travelDate,
      travelersOrGroupSize,
      details: details.trim(),
    });
    setSubmittedRef(inq.reference);
    setCustomerName('');
    setCustomerPhone('');
    setDetails('');
  };

  return (
    <div className="pb-16 space-y-12">
      <div className="bg-[#10283B] text-white py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <p className="text-xs font-bold text-[#F9C91D] tracking-wider">
            {lang === 'bn'
              ? 'মেডিকেল ট্রাভেল ও অ্যাপয়েন্টমেন্ট অনুসন্ধান সহায়তা'
              : 'MEDICAL TRAVEL PLANNING & APPOINTMENT COORDINATION'}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            {lang === 'bn'
              ? 'ভারত ও থাইল্যান্ডে মেডিকেল ট্রাভেল ও হাসপাতাল সমন্বয় সহায়তা'
              : 'Medical Travel Planning & Hospital Inquiry Coordination'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {lang === 'bn'
              ? 'চেন্নাই, ভেলোর, ব্যাঙ্গালোর, দিল্লি, কলকাতা এবং ব্যাংককের হাসপাতালে ডাক্তারের অ্যাপয়েন্টমেন্ট অনুসন্ধান, মেডিকেল ভিসা ইনভাইটেশন লেটার প্রসেসিং এবং হাসপাতাল সংলগ্ন আবাসন পরিকল্পনায় সহায়তা।'
              : 'We assist patients and attendants with hospital appointment inquiries, visa invitation letter coordination, flights, and hospital-adjacent guest houses.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-950 leading-relaxed">
              {lang === 'bn'
                ? 'সতর্কীকরণ: আমরা কোনো চিকিৎসা পরামর্শ প্রদান করি না এবং নির্দিষ্ট কোনো ডাক্তারের তাৎক্ষণিক সিরিয়াল গ্যারান্টি দিই না। সকল অ্যাপয়েন্টমেন্ট সংশ্লিষ্ট হাসপাতালের সময়সূচীর ওপর নির্ভরশীল। ফরমে সংবেদনশীল মেডিকেল রিপোর্ট আপলোড করবেন না।'
                : 'Notice: We provide travel and appointment inquiry coordination only—not medical advice or guaranteed doctor slots. Do not submit confidential medical records in this demo form.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
            <h2 className="text-xl font-extrabold text-[#10283B] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#EF174F]" />
              <span>
                {lang === 'bn'
                  ? 'আমাদের মেডিকেল ট্রাভেল সহায়তা সেবাসমূহ'
                  : 'How We Assist Medical Travelers'}
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: { bn: 'ডাক্তারের অ্যাপয়েন্টমেন্ট অনুসন্ধান', en: 'Doctor Appointment Inquiry' },
                  desc: {
                    bn: 'রোগীর চাহিদা অনুযায়ী সংশ্লিষ্ট ডিপার্টমেন্টে অ্যাপয়েন্টমেন্ট স্লট অনুসন্ধানে সহায়তা।',
                    en: 'Coordinating appointment schedule requests with hospital international desks.',
                  },
                },
                {
                  title: { bn: 'ভিসা ইনভাইটেশন লেটার সমন্বয়', en: 'Visa Invitation Letter Coordination' },
                  desc: {
                    bn: 'মেডিকেল ভিসা আবেদনের জন্য হাসপাতালের অফিসিয়াল এপয়েন্টমেন্ট লেটার সংগ্রহ সহায়তা।',
                    en: 'Assisting with hospital invitation letters required for medical visa applications.',
                  },
                },
                {
                  title: { bn: 'এয়ার অ্যাম্বুলেন্স ও হুইলচেয়ার রিকোয়েস্ট', en: 'Flight & Wheelchair Assistance' },
                  desc: {
                    bn: 'বিমানের টিকিট বুকিংয়ের সময় এয়ারপোর্টে হুইলচেয়ার সহায়তা সংযোজন।',
                    en: 'Arranging airline wheelchair support and convenient transit connections.',
                  },
                },
                {
                  title: { bn: 'হাসপাতাল সংলগ্ন হোটেল ও পিকআপ', en: 'Nearby Stay & Airport Pickup' },
                  desc: {
                    bn: 'হাসপাতালের হাঁটা দূরত্বে রান্নার সুবিধাসহ গেস্টহাউজ ও এয়ারপোর্ট ট্রান্সফার পরিকল্পনা।',
                    en: 'Planning patient-friendly guest houses near hospitals and airport pickups.',
                  },
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-[#F4F8FB] border border-slate-200/80 space-y-1.5"
                >
                  <h3 className="text-sm font-bold text-[#10283B] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#16A6A6]" />
                    <span>{card.title[lang]}</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.desc[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-5">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm"
          >
            <h3 className="text-lg font-extrabold text-[#10283B] flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-[#EF174F]" />
              <span>
                {lang === 'bn'
                  ? 'মেডিকেল ট্রাভেল অনুসন্ধান ফরম (ডেমো)'
                  : 'Medical Travel Inquiry Form (Demo)'}
              </span>
            </h3>

            {submittedRef && (
              <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 font-bold">
                {lang === 'bn'
                  ? `ডেমো মেডিকেল অনুসন্ধান (${submittedRef}) সংরক্ষিত হয়েছে!`
                  : `Demo medical travel inquiry (${submittedRef}) recorded!`}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#10283B]">
                {lang === 'bn' ? 'প্রয়োজনীয় সেবা' : 'Required Assistance'}
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-xs font-semibold text-[#10283B]"
              >
                <option value="Hospital Appointment Coordination (India)">
                  {lang === 'bn'
                    ? 'ভারতের হাসপাতালে অ্যাপয়েন্টমেন্ট অনুসন্ধান'
                    : 'Hospital Appointment Inquiry (India)'}
                </option>
                <option value="Medical Visa Invitation Letter & Travel Plan">
                  {lang === 'bn'
                    ? 'মেডিকেল ভিসা লেটার ও ভ্রমণ পরিকল্পনা'
                    : 'Medical Visa Letter & Travel Planning'}
                </option>
                <option value="Thailand Hospital Coordination">
                  {lang === 'bn'
                    ? 'থাইল্যান্ড (ব্যাংকক) হাসপাতাল অ্যাপয়েন্টমেন্ট সমন্বয়'
                    : 'Bangkok Hospital Appointment Inquiry'}
                </option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#10283B]">
                {lang === 'bn' ? 'যোগাযোগকারীর নাম *' : 'Contact Person Name *'}
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#10283B]">
                  {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#10283B]">
                  {lang === 'bn' ? 'সম্ভাব্য যাত্রার তারিখ' : 'Preferred Travel Date'}
                </label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-xs font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#10283B]">
                {lang === 'bn'
                  ? 'পছন্দের শহর/হাসপাতাল ও ভ্রমণ নোট (গোপনীয় স্বাস্থ্য তথ্য লিখবেন না)'
                  : 'Preferred City/Hospital & Travel Notes (No confidential medical data)'}
              </label>
              <textarea
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={
                  lang === 'bn'
                    ? 'যেমন: চেন্নাই / ভেলোর / কলকাতা, ১ জন রোগী ও ২ জন অ্যাটেনডেন্ট...'
                    : 'e.g., Chennai / Vellore / Kolkata, 1 patient and 2 attendants...'
                }
                className="w-full px-3.5 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-5 rounded-xl bg-[#EF174F] hover:bg-[#d41143] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>
                {lang === 'bn'
                  ? 'ডেমো মেডিকেল অনুসন্ধান পাঠান'
                  : 'Submit Demo Medical Inquiry'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
