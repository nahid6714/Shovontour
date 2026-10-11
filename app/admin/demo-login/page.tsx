'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowRight, ShieldAlert } from 'lucide-react';
import { useApp } from '@/lib/app-context';

export default function AdminDemoLoginPage() {
  const router = useRouter();
  const { lang, settings, showToast } = useApp();

  const handleDemoEnter = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      lang === 'bn'
        ? 'অ্যাডমিন ডেমো ড্যাশবোর্ডে প্রবেশ করা হয়েছে (প্রোটোটাইপ মোড)'
        : 'Entered Admin Demo Dashboard (Prototype Mode)',
      'info'
    );
    router.push('/admin');
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-[#10283B] text-[#F9C91D] flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <span className="text-[11px] font-mono font-bold text-[#EF174F] uppercase">
          DEMO PROTOTYPE ACCESS ONLY
        </span>
        <h1 className="text-2xl font-extrabold text-[#10283B]">
          {settings.brandName} — Admin Demo
        </h1>
        <p className="text-xs text-slate-500">
          {lang === 'bn'
            ? 'এই অ্যাডমিন প্যানেলটি শুধুমাত্র ভিজ্যুয়াল রিভিউ ও ইন্টারঅ্যাকশন পরীক্ষার জন্য তৈরি।'
            : 'This admin interface is strictly for visual review and prototype interaction testing.'}
        </p>
      </div>

      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <span>
          {lang === 'bn'
            ? 'এটি কোনো প্রোডাকশন অথেনটিকেশন সিস্টেম নয়। নিচে ক্লিক করে সরাসরি অ্যাডমিন ডেমো ড্যাশবোর্ড টেস্ট করুন।'
            : 'Not a production authentication system. Click below to open the interactive Admin Demo.'}
        </span>
      </div>

      <form onSubmit={handleDemoEnter} className="space-y-4">
        <div className="space-y-1">
          <label className="block text-xs font-bold text-[#10283B]">
            Demo Role / Administrator
          </label>
          <input
            type="text"
            readOnly
            value={`${settings.ownerName} (CEO / Admin Demo)`}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-[#10283B]"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-5 rounded-xl bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
        >
          <span>
            {lang === 'bn'
              ? 'অ্যাডমিন ডেমো ড্যাশবোর্ড ওপেন করুন'
              : 'Enter Admin Demo Dashboard'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="text-center pt-2">
        <Link href="/" className="text-xs font-bold text-[#16A6A6] hover:underline">
          {lang === 'bn' ? '← পাবলিক ওয়েবসাইটে ফিরে যান' : '← Back to Public Website'}
        </Link>
      </div>
    </div>
  );
}
