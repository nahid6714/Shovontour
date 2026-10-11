'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserCheck, ArrowRight, ShieldAlert } from 'lucide-react';
import { useApp } from '@/lib/app-context';

export default function CustomerLoginPage() {
  const router = useRouter();
  const { lang, loginDemoCustomer } = useApp();
  const [phone, setPhone] = useState('01711-001122');
  const [name, setName] = useState('তানভীর আহমেদ (ডেমো গ্রাহক)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginDemoCustomer(name || 'Demo Traveler', phone || '01711-001122');
    router.push('/customer/dashboard');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#F9C91D]/25 text-[#10283B] flex items-center justify-center mx-auto">
            <UserCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#10283B]">
            {lang === 'bn' ? 'গ্রাহক ডেমো লগইন' : 'Customer Demo Login'}
          </h1>
          <p className="text-xs text-slate-500">
            {lang === 'bn'
              ? 'ফ্রন্টএন্ড প্রোটোটাইপ গ্রাহক পোর্টাল পরীক্ষার জন্য ডেমো লগইন'
              : 'Frontend prototype customer portal simulation'}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-950 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            {lang === 'bn'
              ? 'এটি একটি ডেমো সেশন। কোনো পাসওয়ার্ড বা ওটিপি যাচাই ছাড়াই গ্রাহক ড্যাশবোর্ড প্রিভিউ করা যাবে।'
              : 'Demo preview session only—click login below to inspect the customer dashboard.'}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#10283B]">
              {lang === 'bn' ? 'গ্রাহকের নাম (ডেমো)' : 'Customer Name (Demo)'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#10283B]">
              {lang === 'bn' ? 'মোবাইল নম্বর' : 'Mobile Number'}
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-5 rounded-xl bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <span>
              {lang === 'bn'
                ? 'ডেমো গ্রাহক ড্যাশবোর্ডে প্রবেশ করুন'
                : 'Enter Customer Demo Dashboard'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-600">
          {lang === 'bn' ? 'নতুন অ্যাকাউন্ট তৈরি করতে চান?' : 'Need a new demo profile?'}{' '}
          <Link href="/customer/register" className="font-bold text-[#16A6A6] hover:underline">
            {lang === 'bn' ? 'ডেমো রেজিস্ট্রেশন করুন' : 'Register Demo Account'}
          </Link>
        </div>
      </div>
    </div>
  );
}
