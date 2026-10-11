'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldAlert,
  CheckCircle2,
  CreditCard,
  Users,
  Calendar,
  ArrowRight,
  Lock,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '@/lib/app-context';

function BookingFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { lang, t, formatBdt, packages, createDemoBooking, settings } = useApp();

  const initialSlug = searchParams.get('package') || packages[0]?.slug || '';
  const initialPkg =
    packages.find((p) => p.slug === initialSlug) || packages[0];

  const [selectedPkgId, setSelectedPkgId] = useState<string>(initialPkg.id);
  const currentPkg =
    packages.find((p) => p.id === selectedPkgId) || packages[0];

  const [departureDate, setDepartureDate] = useState<string>(
    searchParams.get('date') || currentPkg.departureDates[0] || '2026-10-22'
  );
  const [travelerCount, setTravelerCount] = useState<number>(
    Number(searchParams.get('travelers')) || 2
  );
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [emergencyContact, setEmergencyContact] = useState<string>('');
  const [specialRequirements, setSpecialRequirements] = useState<string>('');
  const [agreedTerms, setAgreedTerms] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showBkashModal, setShowBkashModal] = useState<boolean>(false);
  const [demoSenderPhone, setDemoSenderPhone] = useState<string>('01700-123456');

  const totalPrice = currentPkg.pricePerPerson * travelerCount;
  const advanceAmount = currentPkg.advancePerPerson * travelerCount;
  const remainingBalance = totalPrice - advanceAmount;

  const validateBeforePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (customerName.trim().length < 2) {
      setErrorMessage(
        lang === 'bn'
          ? 'অনুগ্রহ করে যাত্রীর পূর্ণ নাম লিখুন।'
          : 'Please enter the customer full name.'
      );
      return;
    }
    const phoneClean = customerPhone.replace(/[^0-9]/g, '');
    if (phoneClean.length < 10) {
      setErrorMessage(
        lang === 'bn'
          ? 'অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন।'
          : 'Please enter a valid mobile phone number.'
      );
      return;
    }
    if (!agreedTerms) {
      setErrorMessage(
        lang === 'bn'
          ? 'বুকিং সম্পন্ন করতে ডেমো শর্তাবলীতে সম্মতি দিন।'
          : 'Please accept the demo booking terms to continue.'
      );
      return;
    }

    setDemoSenderPhone(customerPhone);
    setShowBkashModal(true);
  };

  const handleSimulatedPayment = (outcome: 'success' | 'failed') => {
    const record = createDemoBooking({
      packageId: currentPkg.id,
      departureDate,
      travelerCount,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim(),
      emergencyContact: emergencyContact.trim(),
      specialRequirements: specialRequirements.trim(),
      paymentSimulatedOutcome: outcome,
    });
    setShowBkashModal(false);
    router.push(`/booking/confirmation?ref=${encodeURIComponent(record.reference)}`);
  };

  return (
    <div className="pb-16">
      {/* Header Banner */}
      <div className="bg-[#10283B] text-white py-10 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <p className="text-xs font-bold text-[#F9C91D] tracking-wider">
            {lang === 'bn'
              ? 'ডেমো বুকিং ওয়ার্কফ্লো · কোনো প্রকৃত অর্থ লেনদেন হয় না'
              : 'DEMO BOOKING WORKFLOW · NO REAL FINANCIAL TRANSACTION'}
          </p>
          <h1 className="text-2xl sm:text-4xl font-extrabold">
            {lang === 'bn' ? 'ট্যুর প্যাকেজ বুকিং ফরম (ডেমো)' : 'Tour Package Demo Booking'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {lang === 'bn'
              ? 'এই ফরমটি পূরণ করে ডেমো বিকাশ পেমেন্ট সিমুলেশন টেস্ট করুন। নতুন বুকিং তাৎক্ষণিকভাবে অ্যাডমিন ড্যাশবোর্ডে যুক্ত হবে।'
              : 'Complete the form below and test the simulated bKash demo payment. Your booking will immediately appear in the Admin Demo Dashboard.'}
          </p>
        </div>
      </div>

      {/* Main Form Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <form
          onSubmit={validateBeforePayment}
          className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs"
        >
          {/* Step 1 & 2: Package, Departure Date & Travelers */}
          <div className="space-y-4">
            <h2 className="text-lg font-extrabold text-[#10283B] border-b border-slate-100 pb-2">
              {lang === 'bn'
                ? '১. প্যাকেজ ও যাত্রার তথ্য নির্বাচন'
                : '1. Select Package & Travel Details'}
            </h2>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#10283B]">
                {lang === 'bn' ? 'ট্যুর প্যাকেজ নির্বাচন করুন *' : 'Select Tour Package *'}
              </label>
              <select
                value={selectedPkgId}
                onChange={(e) => {
                  const newId = e.target.value;
                  setSelectedPkgId(newId);
                  const found = packages.find((p) => p.id === newId);
                  if (found && found.departureDates[0]) {
                    setDepartureDate(found.departureDates[0]);
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm font-semibold text-[#10283B]"
              >
                {packages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {t(p.title)} — {formatBdt(p.pricePerPerson)} / person
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#10283B]">
                  {lang === 'bn' ? 'যাত্রার তারিখ (নমুনা) *' : 'Sample Departure Date *'}
                </label>
                <select
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm font-mono font-semibold text-[#10283B]"
                >
                  {currentPkg.departureDates.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                  <option value="2026-12-15">2026-12-15 (Custom Sample)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#10283B]">
                  {lang === 'bn' ? 'যাত্রীর সংখ্যা *' : 'Number of Travelers *'}
                </label>
                <div className="flex items-center justify-between bg-[#F4F8FB] rounded-xl px-2 py-1 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setTravelerCount((c) => Math.max(1, c - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold text-[#10283B]"
                  >
                    −
                  </button>
                  <span className="font-mono font-extrabold text-sm text-[#10283B]">
                    {travelerCount} {lang === 'bn' ? 'জন' : 'Persons'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTravelerCount((c) => Math.min(30, c + 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold text-[#10283B]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Customer Information */}
          <div className="space-y-4 pt-2">
            <h2 className="text-lg font-extrabold text-[#10283B] border-b border-slate-100 pb-2">
              {lang === 'bn' ? '২. যাত্রীর যোগাযোগের তথ্য' : '2. Traveler Contact Details'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#10283B]">
                  {lang === 'bn' ? 'গ্রাহকের পূর্ণ নাম *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={lang === 'bn' ? 'যেমন: মো: রাকিব হাসান' : 'e.g. Md. Rakib Hasan'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm text-[#10283B]"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm font-mono text-[#10283B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#10283B]">
                  {lang === 'bn' ? 'ইমেইল (ঐচ্ছিক)' : 'Email Address (Optional)'}
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm text-[#10283B]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#10283B]">
                  {lang === 'bn'
                    ? 'জরুরি যোগাযোগের নম্বর (ঐচ্ছিক)'
                    : 'Emergency Contact (Optional)'}
                </label>
                <input
                  type="tel"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="018XX-XXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm font-mono text-[#10283B]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#10283B]">
                {lang === 'bn'
                  ? 'বিশেষ চাহিদা বা নোট (ঐচ্ছিক)'
                  : 'Special Requirements (Optional)'}
              </label>
              <textarea
                rows={2}
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                placeholder={
                  lang === 'bn'
                    ? 'যেমন: কাপল রুম, শিশু যাত্রী বা খাবারের বিশেষ নির্দেশনা...'
                    : 'e.g. Couple room preference, child seat, dietary notes...'
                }
                className="w-full px-3.5 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm text-[#10283B]"
              />
            </div>
          </div>

          {/* Terms Checkbox */}
          <label className="flex items-start gap-2.5 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="mt-1 w-4 h-4 accent-[#16A6A6]"
            />
            <span className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn' ? (
                <>
                  আমি বুঝতে পারছি যে এটি একটি <strong>ডেমো প্রোটোটাইপ বুকিং</strong> এবং এখানে কোনো প্রকৃত অর্থ আদান-প্রদান হচ্ছে না। আমি{' '}
                  <Link href="/terms" className="text-[#16A6A6] underline">
                    শর্তাবলী ও রিফান্ড নীতিমালা
                  </Link>{' '}
                  পড়েছি।
                </>
              ) : (
                <>
                  I understand this is a <strong>DEMO PROTOTYPE BOOKING</strong> with no real money transfer, and I agree to the sample{' '}
                  <Link href="/terms" className="text-[#16A6A6] underline">
                    Terms & Refund Policy
                  </Link>
                  .
                </>
              )}
            </span>
          </label>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-[#EF174F] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-extrabold text-sm flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <CreditCard className="w-4 h-4" />
            <span>
              {lang === 'bn'
                ? `ডেমো পেমেন্ট ধাপে যান (অগ্রিম ${formatBdt(advanceAmount)})`
                : `Proceed to DEMO PAYMENT (${formatBdt(advanceAmount)})`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Step 4: Summary Sidebar */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-xs">
            <h3 className="text-base font-extrabold text-[#10283B] border-b border-slate-100 pb-3">
              {lang === 'bn'
                ? 'বুকিং ও পেমেন্ট সারসংক্ষেপ (ডেমো)'
                : 'Demo Booking & Payment Summary'}
            </h3>

            <div className="space-y-2 text-xs">
              <p className="font-bold text-sm text-[#10283B]">{t(currentPkg.title)}</p>
              <p className="text-slate-500">
                {t(currentPkg.destinationName)} · {t(currentPkg.durationText)}
              </p>
              <p className="text-slate-600">
                {lang === 'bn' ? 'যাত্রার তারিখ:' : 'Departure Date:'}{' '}
                <strong className="font-mono text-[#10283B]">{departureDate}</strong>
              </p>
              <p className="text-slate-600">
                {lang === 'bn' ? 'মোট যাত্রী:' : 'Travelers:'}{' '}
                <strong className="font-mono text-[#10283B]">{travelerCount}</strong>
              </p>
            </div>

            <div className="bg-[#F4F8FB] rounded-2xl p-4 space-y-2.5 text-xs border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-600">
                  {lang === 'bn' ? 'জনপ্রতি প্যাকেজ মূল্য (নমুনা)' : 'Sample Price / Person'}
                </span>
                <span className="font-mono font-semibold text-[#10283B]">
                  {formatBdt(currentPkg.pricePerPerson)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">
                  {lang === 'bn' ? 'মোট প্যাকেজ মূল্য' : 'Package Total'}
                </span>
                <strong className="font-mono text-sm text-[#10283B]">
                  {formatBdt(totalPrice)}
                </strong>
              </div>
              <div className="flex justify-between text-[#16A6A6] font-bold pt-2 border-t border-slate-200">
                <span>
                  {lang === 'bn' ? 'ডেমো অগ্রিম পেমেন্ট (এখন)' : 'Demo Advance Amount'}
                </span>
                <strong className="font-mono text-sm">{formatBdt(advanceAmount)}</strong>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>
                  {lang === 'bn' ? 'অবশিষ্ট ব্যালেন্স (ভ্রমণের আগে)' : 'Remaining Balance'}
                </span>
                <span className="font-mono">{formatBdt(remainingBalance)}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1.5 text-xs text-amber-950">
              <p className="font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  {lang === 'bn'
                    ? 'নিরাপত্তা ও ডেমো পেমেন্ট বিজ্ঞপ্তি'
                    : 'DEMO PAYMENT NOTICE'}
                </span>
              </p>
              <p className="leading-relaxed text-[11px]">
                {lang === 'bn'
                  ? 'এই প্রোটোটাইপে কোনো আসল বিকাশ এপিআই সংযুক্ত নেই। কোনো অবস্থাতেই আপনার আসল বিকাশ পিন (PIN) বা ওটিপি (OTP) চাওয়া হবে না।'
                  : 'This prototype is NOT connected to a real bKash API. It never asks for real bKash PINs, OTPs, or passwords.'}
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* STEP 5: SIMULATED DEMO BKASH MODAL */}
      {showBkashModal && (
        <div className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Top Pink Header clearly marked DEMO PAYMENT */}
            <div className="bg-[#E2136E] text-white p-5 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="inline-block px-2 py-0.5 rounded bg-black/25 text-[10px] font-mono font-bold uppercase tracking-wider">
                  SIMULATED DEMO PAYMENT ONLY
                </span>
                <h3 className="text-lg font-extrabold">
                  bKash Checkout Simulation (DEMO)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowBkashModal(false)}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Merchant & Amount Box */}
              <div className="bg-[#F4F8FB] rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#10283B]">{settings.brandName}</p>
                  <p className="text-[11px] text-slate-500">
                    Merchant: {settings.bkashDemoMerchantNumber}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">DEMO AMOUNT</span>
                  <span className="text-xl font-extrabold font-mono text-[#E2136E]">
                    {formatBdt(advanceAmount)}
                  </span>
                </div>
              </div>

              {/* Demo Sender Number (No PIN or OTP collected!) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#10283B]">
                  {lang === 'bn'
                    ? 'ডেমো প্রেরকের মোবাইল নম্বর (শুধুমাত্র ভিজ্যুয়াল টেস্ট)'
                    : 'Simulated Payer Account Number (Demo Test Only)'}
                </label>
                <input
                  type="text"
                  value={demoSenderPhone}
                  onChange={(e) => setDemoSenderPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-mono text-[#10283B]"
                />
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-[#16A6A6]" />
                  <span>
                    {lang === 'bn'
                      ? 'নিরাপত্তার স্বার্থে কোনো পিন (PIN) বা ওটিপি (OTP) ইনপুট ফিল্ড রাখা হয়নি।'
                      : 'No PIN or OTP fields exist—this is a safe visual simulation.'}
                  </span>
                </p>
              </div>

              {/* Simulation Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => handleSimulatedPayment('success')}
                  className="w-full py-3 px-4 rounded-xl bg-[#E2136E] hover:bg-[#c40e5e] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {lang === 'bn'
                      ? 'DEMO PAYMENT: সফল পেমেন্ট সিমুলেট করুন'
                      : 'SIMULATE DEMO PAYMENT SUCCESS'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulatedPayment('failed')}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>
                    {lang === 'bn'
                      ? 'DEMO PAYMENT: ব্যর্থ পেমেন্ট সিমুলেট করুন'
                      : 'SIMULATE DEMO PAYMENT FAILURE'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading booking form...</div>}>
      <BookingFormContent />
    </Suspense>
  );
}
