'use client';

import React, { useState } from 'react';
import { ShieldAlert, Edit3, X } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { ServiceInquiry } from '@/lib/types';

interface AdminInquiryTableProps {
  category: 'visa' | 'medical' | 'corporate';
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
}

export default function AdminInquiryTable({
  category,
  titleBn,
  titleEn,
  subtitleBn,
  subtitleEn,
}: AdminInquiryTableProps) {
  const { lang, inquiries, updateInquiryStatus } = useApp();
  const [selectedInq, setSelectedInq] = useState<ServiceInquiry | null>(null);
  const [notesInput, setNotesInput] = useState('');

  const items = inquiries.filter((i) => i.category === category);

  const openNotesModal = (inq: ServiceInquiry) => {
    setSelectedInq(inq);
    setNotesInput(inq.internalNotes);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#10283B]">
          {lang === 'bn' ? titleBn : titleEn}
        </h1>
        <p className="text-xs text-slate-500">
          {lang === 'bn' ? subtitleBn : subtitleEn}
        </p>
      </div>

      {category === 'medical' && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-2.5 text-xs text-amber-950">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
          <span>
            {lang === 'bn'
              ? 'গোপনীয়তা সুরক্ষা: এই সামারি টেবিলে কোনো সংবেদনশীল মেডিকেল ডায়াগনসিস প্রদর্শন করা হয় না। শুধুমাত্র ট্রাভেল ও অ্যাপয়েন্টমেন্ট কো-অর্ডিনেশন রেফারেন্স রাখা হয়েছে।'
              : 'Privacy Notice: No confidential medical diagnosis data is exposed in summary tables. Fictional demo records only.'}
          </span>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F4F8FB] border-b border-slate-200 text-slate-600">
                <th className="py-3.5 px-4">Request Ref</th>
                <th className="py-3.5 px-4">Service Type</th>
                <th className="py-3.5 px-4">Customer Contact</th>
                <th className="py-3.5 px-4">Submission / Travel Date</th>
                <th className="py-3.5 px-4">Internal Notes</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((inq) => (
                <tr key={inq.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#10283B]">
                    {inq.reference}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#10283B] max-w-xs">
                    {inq.serviceType}
                  </td>
                  <td className="py-3.5 px-4">
                    <strong className="block text-[#10283B]">{inq.customerName}</strong>
                    <span className="font-mono text-slate-500">{inq.customerPhone}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    <div>Sub: {inq.createdAt}</div>
                    <div className="text-slate-400">
                      Travel: {inq.travelDate} ({inq.travelersOrGroupSize}P)
                    </div>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs text-slate-600 truncate">
                    {inq.internalNotes}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={inq.status}
                      onChange={(e) =>
                        updateInquiryStatus(inq.id, e.target.value as any)
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-[#F4F8FB] border border-slate-200 font-bold text-xs"
                    >
                      <option value="new">new</option>
                      <option value="in_review">in_review</option>
                      <option value="contacted">contacted</option>
                      <option value="closed">closed</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => openNotesModal(inq)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-[#10283B]"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Notes</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Internal Notes Modal */}
      {selectedInq && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-[#10283B] font-mono">
                {selectedInq.reference} — Internal Notes
              </h3>
              <button
                type="button"
                onClick={() => setSelectedInq(null)}
                className="p-1 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <p className="font-bold text-[#10283B]">{selectedInq.customerName}</p>
              <p className="text-slate-600">{selectedInq.details}</p>
              <label className="block font-bold pt-2">Admin Internal Note (Demo):</label>
              <textarea
                rows={3}
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200 text-xs"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedInq(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateInquiryStatus(selectedInq.id, selectedInq.status, notesInput);
                  setSelectedInq(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#F9C91D] text-[#10283B] text-xs font-extrabold"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
