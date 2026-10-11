'use client';

import React from 'react';
import AdminInquiryTable from '@/components/AdminInquiryTable';

export default function AdminCorporateRequestsPage() {
  return (
    <AdminInquiryTable
      category="corporate"
      titleBn="কর্পোরেট ও গ্রুপ ট্যুর কোটেশন রিকোয়েস্ট (ডেমো)"
      titleEn="Corporate & Group Tour Quotation Requests (Demo)"
      subtitleBn="অফিস রিট্রিট ও গ্রুপ ট্যুরের কাস্টম কোটেশন অনুরোধ তালিকা।"
      subtitleEn="Fictional demo records for corporate and group tour quotation inquiries."
    />
  );
}
