'use client';

import React, { useState } from 'react';
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  X,
} from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { TourPackage, TourType, TourCategorySlug } from '@/lib/types';

const PRESET_IMAGES = [
  { label: "Cox's Bazar Beach", url: '/images/pkg_coxs_bazar.jpg' },
  { label: 'Sajek Valley Clouds', url: '/images/pkg_sajek_valley.jpg' },
  { label: 'Sundarbans River', url: '/images/pkg_sundarbans.jpg' },
  { label: 'Sylhet Tea Garden', url: '/images/pkg_sylhet_tea.jpg' },
  { label: 'Nepal Himalaya', url: '/images/pkg_nepal_himalaya.jpg' },
  { label: 'Thailand & Dubai', url: '/images/pkg_thailand_dubai.jpg' },
];

export default function AdminPackagesPage() {
  const { lang, t, formatBdt, packages, addPackage, updatePackage, deletePackage } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<TourPackage | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Form states
  const [titleBn, setTitleBn] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [destBn, setDestBn] = useState('কক্সবাজার');
  const [destEn, setDestEn] = useState("Cox's Bazar");
  const [type, setType] = useState<TourType>('bangladesh');
  const [category, setCategory] = useState<TourCategorySlug>('sea');
  const [durationDays, setDurationDays] = useState(3);
  const [pricePerPerson, setPricePerPerson] = useState(6500);
  const [advancePerPerson, setAdvancePerPerson] = useState(2000);
  const [availableSeats, setAvailableSeats] = useState(16);
  const [datesCsv, setDatesCsv] = useState('2026-10-22, 2026-10-29');
  const [image, setImage] = useState('/images/pkg_coxs_bazar.jpg');
  const [isThursdayTour, setIsThursdayTour] = useState(true);

  const openAddModal = () => {
    setEditingPkg(null);
    setTitleBn('');
    setTitleEn('');
    setDestBn('কক্সবাজার');
    setDestEn("Cox's Bazar");
    setType('bangladesh');
    setCategory('sea');
    setDurationDays(3);
    setPricePerPerson(6500);
    setAdvancePerPerson(2000);
    setAvailableSeats(16);
    setDatesCsv('2026-10-22, 2026-10-29');
    setImage('/images/pkg_coxs_bazar.jpg');
    setIsThursdayTour(true);
    setModalOpen(true);
  };

  const openEditModal = (pkg: TourPackage) => {
    setEditingPkg(pkg);
    setTitleBn(pkg.title.bn);
    setTitleEn(pkg.title.en);
    setDestBn(pkg.destinationName.bn);
    setDestEn(pkg.destinationName.en);
    setType(pkg.type);
    setCategory(pkg.category);
    setDurationDays(pkg.durationDays);
    setPricePerPerson(pkg.pricePerPerson);
    setAdvancePerPerson(pkg.advancePerPerson);
    setAvailableSeats(pkg.availableSeats);
    setDatesCsv(pkg.departureDates.join(', '));
    setImage(pkg.image);
    setIsThursdayTour(pkg.isThursdayTour);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedDates = datesCsv
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingPkg) {
      updatePackage({
        ...editingPkg,
        title: { bn: titleBn, en: titleEn || titleBn },
        destinationName: { bn: destBn, en: destEn || destBn },
        type,
        category,
        durationDays,
        durationNights: Math.max(1, durationDays - 1),
        durationText: {
          bn: `${durationDays} দিন ${Math.max(1, durationDays - 1)} রাত`,
          en: `${durationDays} Days ${Math.max(1, durationDays - 1)} Nights`,
        },
        pricePerPerson,
        advancePerPerson,
        availableSeats,
        departureDates: parsedDates.length ? parsedDates : ['2026-10-22'],
        image,
        isThursdayTour,
      });
    } else {
      const slug =
        (titleEn || titleBn)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '') || `demo-pkg-${Date.now()}`;

      addPackage({
        slug: `${slug}-${Math.floor(100 + Math.random() * 900)}`,
        title: { bn: titleBn, en: titleEn || titleBn },
        destinationSlug: type === 'bangladesh' ? 'coxs-bazar' : 'nepal',
        destinationName: { bn: destBn, en: destEn || destBn },
        type,
        category,
        durationDays,
        durationNights: Math.max(1, durationDays - 1),
        durationText: {
          bn: `${durationDays} দিন ${Math.max(1, durationDays - 1)} রাত`,
          en: `${durationDays} Days ${Math.max(1, durationDays - 1)} Nights`,
        },
        pricePerPerson,
        advancePerPerson,
        image,
        gallery: [image],
        transportHighlight: {
          bn: 'এসি বাস / প্রাইভেট ট্রান্সপোর্ট (ডেমো)',
          en: 'AC Coach / Private Transfer (Demo)',
        },
        accommodationHighlight: {
          bn: '৩ স্টার মানের হোটেল/রিসোর্ট (ডেমো)',
          en: '3-Star Hotel/Resort (Demo)',
        },
        overview: {
          bn: 'অ্যাডমিন প্যানেল থেকে যুক্ত করা নতুন নমুনা ট্যুর প্যাকেজ।',
          en: 'New sample tour package created from the Admin Demo Panel.',
        },
        itinerary: [
          {
            day: 1,
            title: { bn: 'গন্তব্যে আগমন ও সাইটসিয়িং', en: 'Arrival & Sightseeing' },
            description: {
              bn: 'হোটেলে চেক-ইন এবং স্থানীয় দর্শনীয় স্থান ভ্রমণ।',
              en: 'Hotel check-in and guided local excursion.',
            },
            meals: ['Breakfast', 'Lunch', 'Dinner'],
          },
        ],
        included: [{ bn: 'হোটেল, পরিবহন ও গাইড (নমুনা)', en: 'Hotel, Transport & Guide (Sample)' }],
        excluded: [{ bn: 'ব্যক্তিগত খরচ', en: 'Personal expenses' }],
        departureDates: parsedDates.length ? parsedDates : ['2026-10-22'],
        availableSeats,
        isThursdayTour,
        isFeatured: true,
        isPublished: true,
        popularityScore: 88,
      });
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#10283B]">
            {lang === 'bn'
              ? 'প্যাকেজ ম্যানেজমেন্ট (ডেমো কন্ট্রোল)'
              : 'Package Management (Demo Controls)'}
          </h1>
          <p className="text-xs text-slate-500">
            {lang === 'bn'
              ? 'এখানে কোনো প্যাকেজ যোগ বা পরিবর্তন করলে তাৎক্ষণিকভাবে পাবলিক ওয়েবসাইটে আপডেট হবে।'
              : 'Add, edit, publish/unpublish, or delete sample packages. Changes immediately update the website.'}
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F9C91D] hover:bg-[#eab80e] text-[#10283B] font-extrabold text-xs shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === 'bn' ? 'নতুন ডেমো প্যাকেজ যোগ করুন' : 'Add Demo Package'}</span>
        </button>
      </div>

      {/* Packages Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F4F8FB] border-b border-slate-200 text-slate-600">
                <th className="py-3.5 px-4">Package Title</th>
                <th className="py-3.5 px-4">Region / Type</th>
                <th className="py-3.5 px-4">Sample Price</th>
                <th className="py-3.5 px-4">Sample Advance</th>
                <th className="py-3.5 px-4">Seats & Dates</th>
                <th className="py-3.5 px-4">Published</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-slate-50/80">
                  <td className="py-3.5 px-4 font-bold text-[#10283B] max-w-xs">
                    <span className="block truncate">{t(pkg.title)}</span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      {t(pkg.destinationName)} · {t(pkg.durationText)}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 uppercase font-semibold text-[#16A6A6]">
                    {pkg.type}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#10283B]">
                    {formatBdt(pkg.pricePerPerson)}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {formatBdt(pkg.advancePerPerson)}
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {pkg.availableSeats} seats · {pkg.departureDates[0]}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      type="button"
                      onClick={() =>
                        updatePackage({ ...pkg, isPublished: !pkg.isPublished })
                      }
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold ${
                        pkg.isPublished
                          ? 'bg-teal-50 text-[#16A6A6]'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {pkg.isPublished ? (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Hidden</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => openEditModal(pkg)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F4F8FB] hover:bg-slate-200 text-[#10283B] font-bold"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(pkg.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-[#EF174F] font-bold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-extrabold text-[#10283B]">
              {lang === 'bn'
                ? 'আপনি কি এই ডেমো প্যাকেজটি মুছে ফেলতে চান?'
                : 'Delete This Demo Package?'}
            </h3>
            <p className="text-xs text-slate-600">
              {lang === 'bn'
                ? 'চিন্তার কিছু নেই, আপনি যেকোনো সময় উপরে "ডেমো ডাটা রিসেট" বাটনে ক্লিক করে সব প্যাকেজ ফিরিয়ে আনতে পারবেন।'
                : 'You can restore all default packages anytime using the Reset Demo Data button.'}
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deletePackage(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#EF174F] text-white text-xs font-bold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Package Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-extrabold text-[#10283B]">
                {editingPkg
                  ? lang === 'bn'
                    ? 'ডেমো প্যাকেজ সম্পাদনা করুন'
                    : 'Edit Demo Package'
                  : lang === 'bn'
                  ? 'নতুন ডেমো প্যাকেজ তৈরি করুন'
                  : 'Create New Demo Package'}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Title (Bengali) *</label>
                  <input
                    type="text"
                    required
                    value={titleBn}
                    onChange={(e) => setTitleBn(e.target.value)}
                    placeholder="যেমন: বান্দরবান ও নীলগিরি ভ্রমণ"
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="e.g. Bandarban & Nilgiri Tour"
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold mb-1">Region Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as TourType)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200"
                  >
                    <option value="bangladesh">Bangladesh</option>
                    <option value="international">International</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Destination (BN)</label>
                  <input
                    type="text"
                    value={destBn}
                    onChange={(e) => setDestBn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Destination (EN)</label>
                  <input
                    type="text"
                    value={destEn}
                    onChange={(e) => setDestEn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-bold mb-1">Sample Price (BDT)</label>
                  <input
                    type="number"
                    value={pricePerPerson}
                    onChange={(e) => setPricePerPerson(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Advance (BDT)</label>
                  <input
                    type="number"
                    value={advancePerPerson}
                    onChange={(e) => setAdvancePerPerson(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Days</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Sample Seats</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={availableSeats}
                    onChange={(e) => setAvailableSeats(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">
                    Sample Departure Dates (comma separated)
                  </label>
                  <input
                    type="text"
                    value={datesCsv}
                    onChange={(e) => setDatesCsv(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Select Preview Image</label>
                  <select
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4F8FB] border border-slate-200"
                  >
                    {PRESET_IMAGES.map((img) => (
                      <option key={img.url} value={img.url}>
                        {img.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isThursdayTour}
                  onChange={(e) => setIsThursdayTour(e.target.checked)}
                  className="w-4 h-4 accent-[#16A6A6]"
                />
                <span className="font-semibold">
                  Include in Upcoming Thursday Weekend Tours section
                </span>
              </label>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#F9C91D] text-[#10283B] font-extrabold"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
