'use client';

import React, { useState } from 'react';
import { Phone, Mail, Facebook, Users, User, Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/lib/app-context';

export default function ContactPage() {
  const { lang, settings, showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSent(true);
    setName('');
    setPhone('');
    setMessage('');
    showToast(
      lang === 'bn'
        ? 'আপনার বার্তা ডেমো ইনবক্সে সংরক্ষিত হয়েছে!'
        : 'Your message has been recorded in demo state!',
      'success'
    );
  };

  return (
    <div className="pb-16 space-y-12">
      <div className="bg-[#10283B] text-white py-14 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <p className="text-xs font-bold text-[#F9C91D] tracking-wider">
            {settings.brandName} · {settings.ownerName}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            {lang === 'bn' ? 'যোগাযোগ ও বুকিং সহায়তা' : 'Contact Us & Booking Support'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
            {lang === 'bn'
              ? 'ট্যুর প্যাকেজ বুকিং, ভিসা ডকুমেন্টেশন সহায়তা বা কর্পোরেট কোটেশনের জন্য আমাদের সাথে যোগাযোগ করুন।'
              : 'Get in touch with us for tour package inquiries, visa checklists, or custom group quotations.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Details */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
            <h2 className="text-xl font-extrabold text-[#10283B]">
              {lang === 'bn' ? 'সরাসরি যোগাযোগের মাধ্যম' : 'Direct Contact Channels'}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-[#F4F8FB] space-y-1">
                <span className="text-xs text-slate-500 block">
                  {lang === 'bn' ? 'প্রোপাইটর ও সিইও' : 'Founder & CEO'}
                </span>
                <strong className="text-base font-extrabold text-[#10283B]">
                  {settings.ownerName}
                </strong>
              </div>

              <div className="p-4 rounded-2xl bg-[#F4F8FB] flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#16A6A6] shrink-0" />
                <div>
                  <span className="text-xs text-slate-500 block">
                    {lang === 'bn' ? 'বুকিং ফোন নম্বর (নমুনা)' : 'Booking Hotlines (Sample)'}
                  </span>
                  <strong className="font-mono text-[#10283B]">
                    {settings.primaryPhone} / {settings.secondaryPhone}
                  </strong>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F4F8FB] flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#EF174F] shrink-0" />
                <div>
                  <span className="text-xs text-slate-500 block">
                    {lang === 'bn' ? 'ইমেইল সাপোর্ট' : 'Support Email'}
                  </span>
                  <strong className="font-mono text-[#10283B]">{settings.supportEmail}</strong>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <p className="text-xs font-bold text-[#10283B]">
                {lang === 'bn' ? 'অফিসিয়াল সোশ্যাল মিডিয়া লিংকসমূহ:' : 'Official Social Links:'}
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={settings.facebookPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#10283B] text-white text-xs font-semibold"
                >
                  <Facebook className="w-3.5 h-3.5 text-[#F9C91D]" />
                  <span>Facebook Page</span>
                </a>
                <a
                  href={settings.facebookGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#16A6A6] text-white text-xs font-semibold"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Facebook Group</span>
                </a>
                <a
                  href={settings.facebookProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 text-[#10283B] text-xs font-semibold"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>CEO Profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs"
          >
            <h2 className="text-xl font-extrabold text-[#10283B]">
              {lang === 'bn' ? 'আমাদের বার্তা পাঠান (ডেমো ফরম)' : 'Send Us a Message (Demo Form)'}
            </h2>

            {sent && (
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs font-bold text-teal-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A6A6]" />
                <span>
                  {lang === 'bn'
                    ? 'ধন্যবাদ! আপনার ডেমো বার্তা সফলভাবে গৃহীত হয়েছে।'
                    : 'Thank you! Your demo message has been received.'}
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#10283B]">
                  {lang === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
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
                  {lang === 'bn' ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#10283B]">
                {lang === 'bn' ? 'আপনার বার্তা বা প্রশ্ন *' : 'Your Message *'}
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-extrabold text-xs sm:text-sm transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>{lang === 'bn' ? 'বার্তা পাঠান' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
