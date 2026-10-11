'use client';

import React from 'react';
import { CalendarClock } from 'lucide-react';
import { useApp } from '@/lib/app-context';

export default function AdminDeparturesPage() {
  const { lang, t, packages, updatePackage } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#10283B]">
          {lang === 'bn'
            ? 'যাত্রার তারিখ ও ডেমো আসন সংখ্যা ম্যানেজমেন্ট'
            : 'Departure Dates & Sample Seat Availability'}
        </h1>
        <p className="text-xs text-slate-500">
          {lang === 'bn'
            ? 'প্রতিটি প্যাকেজের নমুনা আসন সংখ্যা ও বৃহস্পতিবারের স্পেশাল ট্যুর স্ট্যাটাস পরিবর্তন করুন।'
            : 'Adjust sample seat availability and Thursday tour scheduling in shared mock state.'}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F4F8FB] border-b border-slate-200 text-slate-600">
                <th className="py-3.5 px-4">Package</th>
                <th className="py-3.5 px-4">Sample Departure Dates</th>
                <th className="py-3.5 px-4">Thursday Tour</th>
                <th className="py-3.5 px-4">Sample Seats Available</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-[#10283B]">
                    {t(pkg.title)}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarClock className="w-3.5 h-3.5 text-[#16A6A6]" />
                      {pkg.departureDates.join(', ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <input
                      type="checkbox"
                      checked={pkg.isThursdayTour}
                      onChange={(e) =>
                        updatePackage({ ...pkg, isThursdayTour: e.target.checked })
                      }
                      className="w-4 h-4 accent-[#16A6A6]"
                    />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updatePackage({
                            ...pkg,
                            availableSeats: Math.max(0, pkg.availableSeats - 1),
                          })
                        }
                        className="w-7 h-7 rounded-lg bg-slate-100 font-bold"
                      >
                        −
                      </button>
                      <span className="font-mono font-bold w-8 text-center">
                        {pkg.availableSeats}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updatePackage({
                            ...pkg,
                            availableSeats: pkg.availableSeats + 1,
                          })
                        }
                        className="w-7 h-7 rounded-lg bg-slate-100 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
