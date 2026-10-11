'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import TourCatalogView from '@/components/TourCatalogView';

function BangladeshToursContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'all';

  return (
    <TourCatalogView
      initialType="bangladesh"
      initialCategory={category}
      pageTitleBn="বাংলাদেশ ট্যুর প্যাকেজসমূহ"
      pageTitleEn="Bangladesh Domestic Tour Packages"
      subtitleBn="কক্সবাজার, সাজেক ভ্যালি, সুন্দরবন, সিলেট ও শ্রীমঙ্গলে আমাদের নির্বাচিত নমুনা ট্যুর প্যাকেজ। (প্রদর্শিত সকল মূল্য ও তারিখ ডেমো প্রোটোটাইপের জন্য)"
      subtitleEn="Explore sample domestic packages across Cox's Bazar, Sajek Valley, Sundarbans, and Sylhet. All pricing and dates are sample prototype data."
    />
  );
}

export default function BangladeshToursPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading tours...</div>}>
      <BangladeshToursContent />
    </Suspense>
  );
}
