'use client';

import React from 'react';
import TourCatalogView from '@/components/TourCatalogView';

export default function InternationalToursPage() {
  return (
    <TourCatalogView
      initialType="international"
      pageTitleBn="আন্তর্জাতিক ট্যুর প্যাকেজসমূহ"
      pageTitleEn="International Tour Packages"
      subtitleBn="নেপাল, ভারত (কাশ্মীর ও দার্জিলিং), থাইল্যান্ড, মালয়েশিয়া, সিঙ্গাপুর এবং দুবাই ভ্রমণের নমুনা প্যাকেজ। (সকল মূল্য ও তথ্য ডেমো রিভিউয়ের জন্য)"
      subtitleEn="Discover sample international packages for Nepal, India, Thailand, Malaysia, Singapore, and Dubai. Displayed prices are sample figures."
    />
  );
}
