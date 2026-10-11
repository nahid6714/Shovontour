'use client';

import React from 'react';
import AdminInquiryTable from '@/components/AdminInquiryTable';

export default function AdminVisaRequestsPage() {
  return (
    <AdminInquiryTable
      category="visa"
      titleBn="ভারতীয় ভিসা সহায়তা রিকোয়েস্ট (ডেমো রেকর্ড)"
      titleEn="Indian Visa Assistance Requests (Demo Records)"
      subtitleBn="ভিসা ফরম, ডকুমেন্ট চেকলিস্ট ও স্লট অনুসন্ধানের কাল্পনিক ডেমো তালিকা।"
      subtitleEn="Fictional demo records for visa application and documentation inquiries."
    />
  );
}
