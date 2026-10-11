'use client';

import React from 'react';
import AdminInquiryTable from '@/components/AdminInquiryTable';

export default function AdminMedicalRequestsPage() {
  return (
    <AdminInquiryTable
      category="medical"
      titleBn="মেডিকেল ট্রাভেল ও অ্যাপয়েন্টমেন্ট অনুসন্ধান (ডেমো)"
      titleEn="Medical Travel & Hospital Appointment Inquiries (Demo)"
      subtitleBn="হাসপাতাল অ্যাপয়েন্টমেন্ট সমন্বয় ও ভ্রমণ পরিকল্পনার কাল্পনিক ডেমো তালিকা।"
      subtitleEn="Fictional demo records for hospital appointment coordination and travel planning."
    />
  );
}
