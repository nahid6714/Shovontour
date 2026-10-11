'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, ArrowRight } from 'lucide-react';
import { useApp } from '@/lib/app-context';

export default function CustomerRegisterPage() {
  const router = useRouter();
  const { lang, loginDemoCustomer } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    loginDemoCustomer(name.trim(), phone.trim(), email.trim() || 'demo@example.com');
    router.push('/customer/dashboard');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#16A6A6]/15 text-[#16A6A6] flex items-center justify-center mx-auto">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#10283B]">
            {lang === 'bn' ? 'গ্রাহক ডেমো রেজিস্ট্রেশন' : 'Customer Demo Registration'}
          </h1>
          <p className="text-xs text-slate-500">
            {lang === 'bn'
              ? 'আপনার নাম ও মোবাইল নম্বর দিয়ে তাৎক্ষণিক ডেমো প্রোফাইল তৈরি করুন'
              : 'Create a temporary demo traveler profile in browser state'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#10283B]">
              {lang === 'bn' ? 'পূর্ণ নাম *' : 'Full Name *'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={lang === 'bn' ? 'আপনার নাম লিখুন' : 'Enter your name'}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="017XX-XXXXXX"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#10283B]">
              {lang === 'bn' ? 'ইমেইল (ঐচ্ছিক)' : 'Email (Optional)'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="traveler@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-5 rounded-xl bg-[#10283B] hover:bg-[#193b56] text-[#F9C91D] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <span>
              {lang === 'bn'
                ? 'ডেমো অ্যাকাউন্ট তৈরি করুন'
                : 'Create Demo Traveler Account'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-600">
          {lang === 'bn' ? 'ইতিমধ্যে ডেমো প্রোফাইল আছে?' : 'Already have a demo session?'}{' '}
          <Link href="/customer/login" className="font-bold text-[#16A6A6] hover:underline">
            {lang === 'bn' ? 'লগইন পেজে যান' : 'Go to Login'}
          </Link>
        </div>
      </div>
    </div>
  );
}
