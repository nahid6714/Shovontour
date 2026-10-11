'use client';

import React, { useState } from 'react';
import { FileText, ShieldAlert, CheckCircle2, Send } from 'lucide-react';
import { useApp } from '@/lib/app-context';

export default function IndianVisaServicePage() {
  const { lang, createServiceInquiry } = useApp();
  const [serviceType, setServiceType] = useState(
    'Indian Tourist Visa Application & Document Assistance'
  );
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [travelDate, setTravelDate] = useState('2026-11-15');
  const [travelersOrGroupSize, setTravelersOrGroupSize] = useState(1);
  const [details, setDetails] = useState('');
  const [submittedRef, setSubmittedRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;
    const inq = createServiceInquiry({
      category: 'visa',
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
      {/* Hero */}
      <div className="bg-[#10283B] text-white py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <p className="text-xs font-bold text-[#F9C91D] tracking-wider">
            {lang === 'bn'
              ? 'সহায়তা ও পরামর্শ সেবা · ভিসা অনুমোদনের গ্যারান্টি নয়'
              : 'ASSISTANCE & CONSULTATION SERVICE · NO VISA GUARANTEE'}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            {lang === 'bn'
              ? 'ভারতীয় ভিসা আবেদন ও ডকুমেন্টেশন সহায়তা'
              : 'Indian Visa Application & Documentation Assistance'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {lang === 'bn'
              ? 'ট্যুরিস্ট ভিসা, মেডিকেল ভিসা, বিজনেস ভিসা এবং এন্ট্রি ভিসার অনলাইন ফরম পূরণ, কাগজপত্র যাচাই এবং স্লট অনুসন্ধানে আমরা পরামর্শ ও কারিগরি সহায়তা প্রদান করি।'
              : 'We provide structured guidance for Indian Tourist, Medical, and Entry visa application forms, document checklists, and slot readiness.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Checklist & Info */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-950 leading-relaxed">
              {lang === 'bn'
                ? 'বিশেষ দ্রষ্টব্য: শোভন ট্যুর অ্যান্ড ট্রাভেল বিডি কোনো সরকারি ভিসা ইস্যুকারী সংস্থা নয়। আমরা শুধুমাত্র আবেদন প্রক্রিয়ায় সহায়তা করি। ভিসা প্রদান বা প্রত্যাখ্যানের পূর্ণ এখতিয়ার ভারতীয় হাই কমিশনের।'
                : 'Important Disclaimer: Shovon Tour & Travel BD is an independent travel assistance agency. We do not guarantee visa approval or confirmed appointment slots.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
            <h2 className="text-xl font-extrabold text-[#10283B] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#16A6A6]" />
              <span>
                {lang === 'bn'
                  ? 'ভারতীয় ভিসা আবেদনের প্রয়োজনীয় কাগজপত্রের তালিকা'
                  : 'Standard Document Checklist for Indian Visa'}
              </span>
            </h2>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              {[
                {
                  bn: 'ন্যূনতম ৬ মাস মেয়াদসহ আসল পাসপোর্ট এবং পুরাতন পাসপোর্ট (যদি থাকে)',
                  en: 'Original Passport with at least 6 months validity + old passports (if any)',
                },
                {
                  bn: 'সদ্য তোলা ২x২ ইঞ্চি সাদা ব্যাকগ্রাউন্ড ল্যাব প্রিন্ট ছবি',
                  en: 'Recent 2x2 inch white-background photograph',
                },
                {
                  bn: 'জাতীয় পরিচয়পত্র (NID) বা জন্ম নিবন্ধন সনদের কপি',
                  en: 'National ID Card (NID) or Birth Certificate copy',
                },
                {
                  bn: 'সর্বশেষ মাসের বিদ্যুৎ, গ্যাস বা পানির বিলের কপি (ঠিকানা যাচাইয়ের জন্য)',
                  en: 'Recent Utility Bill copy (Electricity, Gas, or Water)',
                },
                {
                  bn: 'বিগত ৬ মাসের ব্যাংক স্টেটমেন্ট অথবা পাসপোর্টে ডলার এন্ডোর্সমেন্ট',
                  en: 'Last 6 months Bank Statement or valid Dollar Endorsement',
                },
                {
                  bn: 'পেশার প্রমাণপত্র: চাকরিজীবীদের NOC, ব্যবসায়ীদের ট্রেড লাইসেন্স, শিক্ষার্থীদের আইডি কার্ড',
                  en: 'Proof of Profession: Employee NOC, Trade License, or Student ID',
                },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16A6A6] shrink-0 mt-0.5" />
                  <span>{item[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Inquiry Form */}
        <div className="lg:col-span-5">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm"
          >
            <h3 className="text-lg font-extrabold text-[#10283B]">
              {lang === 'bn'
                ? 'ভিসা সহায়তা অনুসন্ধান ফরম (ডেমো)'
                : 'Visa Assistance Inquiry Form (Demo)'}
            </h3>

            {submittedRef && (
              <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-900 font-bold">
                {lang === 'bn'
                  ? `আপনার ডেমো অনুসন্ধান (${submittedRef}) জমা হয়েছে! অ্যাডমিন প্যানেলে এটি দেখতে পাবেন।`
                  : `Your demo inquiry (${submittedRef}) has been recorded! View it in Admin Demo.`}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#10283B]">
                {lang === 'bn' ? 'সেবার ধরন নির্বাচন করুন' : 'Select Service Type'}
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-xs font-semibold text-[#10283B]"
              >
                <option value="Indian Tourist Visa Assistance">
                  {lang === 'bn'
                    ? 'ভারতীয় ট্যুরিস্ট ভিসা ফরম ও ডকুমেন্ট সহায়তা'
                    : 'Indian Tourist Visa Form & Document Assistance'}
                </option>
                <option value="Indian Medical Visa Assistance">
                  {lang === 'bn'
                    ? 'ভারতীয় মেডিকেল ভিসা ও অ্যাটেনডেন্ট ডকুমেন্ট সহায়তা'
                    : 'Indian Medical Visa & Attendant Support'}
                </option>
                <option value="Visa Slot & Checklist Inquiry">
                  {lang === 'bn'
                    ? 'ভিসা স্লট ও ডকুমেন্ট চেকলিস্ট পরামর্শ'
                    : 'Visa Slot & Checklist Consultation'}
                </option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#10283B]">
                {lang === 'bn' ? 'আপনার নাম *' : 'Your Full Name *'}
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
                  {lang === 'bn' ? 'আবেদনকারীর সংখ্যা' : 'Applicants'}
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={travelersOrGroupSize}
                  onChange={(e) => setTravelersOrGroupSize(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#10283B]">
                {lang === 'bn' ? 'আপনার প্রশ্ন বা বিবরণ' : 'Additional Details'}
              </label>
              <textarea
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={
                  lang === 'bn'
                    ? 'কোন IVAC সেন্টারে আবেদন করতে চান বা কী ধরনের সহায়তা প্রয়োজন তা লিখুন...'
                    : 'Mention preferred IVAC center or document questions...'
                }
                className="w-full px-3.5 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-5 rounded-xl bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>
                {lang === 'bn' ? 'ডেমো অনুসন্ধান জমা দিন' : 'Submit Demo Visa Inquiry'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
