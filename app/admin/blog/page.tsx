'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { useApp } from '@/lib/app-context';

export default function AdminBlogPage() {
  const { lang, t, blogs } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#10283B]">
          {lang === 'bn' ? 'ট্রাভেল ব্লগ ও গাইড ম্যানেজমেন্ট' : 'Travel Blog & Guides (Demo)'}
        </h1>
        <p className="text-xs text-slate-500">
          {lang === 'bn'
            ? 'ভ্রমণ গাইড ও ভিসা চেকলিস্ট আর্টিকেল তালিকা।'
            : 'Manage sample travel guide articles.'}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F4F8FB] border-b border-slate-200 text-slate-600">
              <th className="py-3.5 px-4">Article Title</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Publish Date</th>
              <th className="py-3.5 px-4 text-right">Preview</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {blogs.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-bold text-[#10283B]">{t(b.title)}</td>
                <td className="py-3.5 px-4 text-[#16A6A6] font-semibold">
                  {t(b.category)}
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-500">{b.publishDate}</td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    href={`/blog/${b.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-[#10283B] hover:text-[#EF174F]"
                  >
                    <span>Read</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
