'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Language,
  BilingualText,
  TourPackage,
  DestinationItem,
  CategoryItem,
  BookingRecord,
  PaymentRecord,
  ServiceInquiry,
  BlogArticle,
  DemoReview,
  SmsLogItem,
  SiteSettings,
  BookingStatus,
  PaymentVerificationStatus,
} from './types';
import {
  INITIAL_SITE_SETTINGS,
  INITIAL_CATEGORIES,
  INITIAL_DESTINATIONS,
  INITIAL_PACKAGES,
  INITIAL_BOOKINGS,
  INITIAL_PAYMENTS,
  INITIAL_INQUIRIES,
  INITIAL_BLOG_ARTICLES,
  INITIAL_DEMO_REVIEWS,
  INITIAL_SMS_LOGS,
} from './mock-data';

interface ToastMessage {
  id: string;
  title: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (text: BilingualText | string) => string;
  formatBdt: (amount: number) => string;
  packages: TourPackage[];
  destinations: DestinationItem[];
  categories: CategoryItem[];
  bookings: BookingRecord[];
  payments: PaymentRecord[];
  inquiries: ServiceInquiry[];
  blogs: BlogArticle[];
  reviews: DemoReview[];
  smsLogs: SmsLogItem[];
  settings: SiteSettings;
  favorites: string[];
  toggleFavorite: (pkgId: string) => void;
  addPackage: (pkg: Omit<TourPackage, 'id'>) => void;
  updatePackage: (pkg: TourPackage) => void;
  deletePackage: (id: string) => void;
  createDemoBooking: (input: {
    packageId: string;
    departureDate: string;
    travelerCount: number;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    emergencyContact: string;
    specialRequirements: string;
    paymentSimulatedOutcome: 'success' | 'failed';
  }) => BookingRecord;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  updatePaymentVerification: (paymentId: string, status: PaymentVerificationStatus) => void;
  createServiceInquiry: (input: Omit<ServiceInquiry, 'id' | 'reference' | 'status' | 'internalNotes' | 'createdAt'>) => ServiceInquiry;
  updateInquiryStatus: (id: string, status: ServiceInquiry['status'], notes?: string) => void;
  updateSettings: (newSettings: SiteSettings) => void;
  resetDemoData: () => void;
  toasts: ToastMessage[];
  showToast: (title: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
  customerDemoUser: { name: string; phone: string; email: string } | null;
  loginDemoCustomer: (name: string, phone: string, email?: string) => void;
  logoutDemoCustomer: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANG: 'shovon_demo_lang_v1',
  PACKAGES: 'shovon_demo_packages_v2',
  BOOKINGS: 'shovon_demo_bookings_v1',
  PAYMENTS: 'shovon_demo_payments_v1',
  INQUIRIES: 'shovon_demo_inquiries_v1',
  SMS_LOGS: 'shovon_demo_sms_v1',
  SETTINGS: 'shovon_demo_settings_v1',
  FAVORITES: 'shovon_demo_favorites_v1',
  CUSTOMER: 'shovon_demo_customer_v1',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('bn');
  const [packages, setPackages] = useState<TourPackage[]>(INITIAL_PACKAGES);
  const [destinations] = useState<DestinationItem[]>(INITIAL_DESTINATIONS);
  const [categories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_BOOKINGS);
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);
  const [inquiries, setInquiries] = useState<ServiceInquiry[]>(INITIAL_INQUIRIES);
  const [blogs] = useState<BlogArticle[]>(INITIAL_BLOG_ARTICLES);
  const [reviews] = useState<DemoReview[]>(INITIAL_DEMO_REVIEWS);
  const [smsLogs, setSmsLogs] = useState<SmsLogItem[]>(INITIAL_SMS_LOGS);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [favorites, setFavorites] = useState<string[]>(['pkg-1', 'pkg-2']);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [customerDemoUser, setCustomerDemoUser] = useState<{
    name: string;
    phone: string;
    email: string;
  } | null>({
    name: 'তানভীর আহমেদ (ডেমো গ্রাহক)',
    phone: '01711-001122',
    email: 'tanvir.demo@example.com',
  });

  // Load persisted state from localStorage on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEYS.LANG) as Language | null;
      if (savedLang === 'bn' || savedLang === 'en') {
        setLangState(savedLang);
      }
      const savedPackages = localStorage.getItem(STORAGE_KEYS.PACKAGES);
      if (savedPackages) setPackages(JSON.parse(savedPackages));

      const savedBookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (savedBookings) setBookings(JSON.parse(savedBookings));

      const savedPayments = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
      if (savedPayments) setPayments(JSON.parse(savedPayments));

      const savedInquiries = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (savedInquiries) setInquiries(JSON.parse(savedInquiries));

      const savedSms = localStorage.getItem(STORAGE_KEYS.SMS_LOGS);
      if (savedSms) setSmsLogs(JSON.parse(savedSms));

      const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (savedSettings) setSettings(JSON.parse(savedSettings));

      const savedFavs = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedCustomer = localStorage.getItem(STORAGE_KEYS.CUSTOMER);
      if (savedCustomer) setCustomerDemoUser(JSON.parse(savedCustomer));
    } catch {
      // Ignore storage errors in sandboxed iframes
    }
  }, []);

  const showToast = (title: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, title, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };

  const setLang = (nextLang: Language) => {
    setLangState(nextLang);
    try {
      localStorage.setItem(STORAGE_KEYS.LANG, nextLang);
    } catch {}
    showToast(
      nextLang === 'bn' ? 'ভাষা বাংলায় পরিবর্তন করা হয়েছে' : 'Language switched to English',
      'info'
    );
  };

  const t = (text: BilingualText | string): string => {
    if (typeof text === 'string') return text;
    return text[lang] || text.bn || text.en || '';
  };

  const formatBdt = (amount: number): string => {
    if (lang === 'bn') {
      return `৳ ${amount.toLocaleString('bn-BD')}`;
    }
    return `BDT ${amount.toLocaleString('en-US')}`;
  };

  const toggleFavorite = (pkgId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(pkgId);
      const next = exists ? prev.filter((id) => id !== pkgId) : [...prev, pkgId];
      try {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(next));
      } catch {}
      showToast(
        exists
          ? lang === 'bn'
            ? 'পছন্দের তালিকা থেকে সরানো হয়েছে'
            : 'Removed from saved packages'
          : lang === 'bn'
          ? 'পছন্দের তালিকায় যুক্ত হয়েছে'
          : 'Saved to your favorite packages',
        'info'
      );
      return next;
    });
  };

  const addPackage = (pkgInput: Omit<TourPackage, 'id'>) => {
    const newPkg: TourPackage = {
      ...pkgInput,
      id: `pkg-${Date.now()}`,
    };
    setPackages((prev) => {
      const next = [newPkg, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(next));
      } catch {}
      return next;
    });
    showToast(
      lang === 'bn' ? 'নতুন ডেমো প্যাকেজ সফলভাবে যুক্ত হয়েছে' : 'New demo tour package added',
      'success'
    );
  };

  const updatePackage = (updated: TourPackage) => {
    setPackages((prev) => {
      const next = prev.map((p) => (p.id === updated.id ? updated : p));
      try {
        localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(next));
      } catch {}
      return next;
    });
    showToast(
      lang === 'bn' ? 'প্যাকেজের তথ্য আপডেট করা হয়েছে' : 'Package details updated in demo state',
      'success'
    );
  };

  const deletePackage = (id: string) => {
    setPackages((prev) => {
      const next = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(next));
      } catch {}
      return next;
    });
    showToast(
      lang === 'bn' ? 'ডেমো প্যাকেজ মুছে ফেলা হয়েছে' : 'Demo package deleted',
      'info'
    );
  };

  const createDemoBooking = (input: {
    packageId: string;
    departureDate: string;
    travelerCount: number;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    emergencyContact: string;
    specialRequirements: string;
    paymentSimulatedOutcome: 'success' | 'failed';
  }): BookingRecord => {
    const pkg = packages.find((p) => p.id === input.packageId) || packages[0];
    const totalPrice = pkg.pricePerPerson * input.travelerCount;
    const advanceAmount = pkg.advancePerPerson * input.travelerCount;
    const remainingBalance = totalPrice - advanceAmount;
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const reference = `STT-DEMO-${randomNum}`;
    const trxRef = `DEMO-BKASH-${Math.floor(10000 + Math.random() * 90000)}X`;
    const nowStr = new Date().toISOString().slice(0, 16).replace('T', ' ');

    const isSuccess = input.paymentSimulatedOutcome === 'success';

    const customerSms = settings.customerSmsTemplate
      .replace('{name}', input.customerName)
      .replace('{ref}', reference)
      .replace('{package}', pkg.title.bn)
      .replace('{advance}', String(advanceAmount));

    const adminSms = settings.adminSmsTemplate
      .replace('{ref}', reference)
      .replace('{name}', input.customerName)
      .replace('{phone}', input.customerPhone)
      .replace('{package}', pkg.title.bn)
      .replace('{travelers}', String(input.travelerCount))
      .replace('{advance}', String(advanceAmount));

    const newBooking: BookingRecord = {
      id: `bk-${Date.now()}`,
      reference,
      packageId: pkg.id,
      packageSlug: pkg.slug,
      packageTitle: pkg.title,
      departureDate: input.departureDate,
      travelerCount: input.travelerCount,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      customerEmail: input.customerEmail || 'demo@example.com',
      emergencyContact: input.emergencyContact,
      specialRequirements: input.specialRequirements,
      totalPrice,
      advanceAmount,
      remainingBalance,
      paymentStatus: isSuccess ? 'demo_paid' : 'demo_failed',
      bookingStatus: isSuccess ? 'pending' : 'cancelled',
      transactionRef: trxRef,
      createdAt: nowStr,
      customerSmsPreview: customerSms,
      adminSmsPreview: adminSms,
    };

    const newPayment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      transactionRef: trxRef,
      bookingReference: reference,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      amount: advanceAmount,
      method: 'bKash Demo',
      paymentStatus: isSuccess ? 'demo_paid' : 'demo_failed',
      verificationStatus: 'unverified_demo',
      createdAt: nowStr,
    };

    setBookings((prev) => {
      const next = [newBooking, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(next));
      } catch {}
      return next;
    });

    setPayments((prev) => {
      const next = [newPayment, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(next));
      } catch {}
      return next;
    });

    if (isSuccess) {
      const newSmsEntries: SmsLogItem[] = [
        {
          id: `sms-c-${Date.now()}`,
          recipientRole: 'customer',
          phone: input.customerPhone,
          bookingReference: reference,
          message: customerSms,
          status: 'simulated_delivered',
          timestamp: nowStr,
        },
        {
          id: `sms-a-${Date.now() + 1}`,
          recipientRole: 'admin',
          phone: settings.adminNotificationPhone,
          bookingReference: reference,
          message: adminSms,
          status: 'simulated_delivered',
          timestamp: nowStr,
        },
      ];
      setSmsLogs((prev) => {
        const next = [...newSmsEntries, ...prev];
        try {
          localStorage.setItem(STORAGE_KEYS.SMS_LOGS, JSON.stringify(next));
        } catch {}
        return next;
      });
    }

    showToast(
      isSuccess
        ? lang === 'bn'
          ? `ডেমো বুকিং ${reference} সফলভাবে তৈরি হয়েছে!`
          : `Demo booking ${reference} created!`
        : lang === 'bn'
        ? `ডেমো পেমেন্ট ব্যর্থ সিমুলেশন রেকর্ড করা হয়েছে (${reference})`
        : `Simulated failed payment recorded (${reference})`,
      isSuccess ? 'success' : 'error'
    );

    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings((prev) => {
      const next = prev.map((b) => (b.id === bookingId ? { ...b, bookingStatus: status } : b));
      try {
        localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(next));
      } catch {}
      return next;
    });
    showToast(
      lang === 'bn'
        ? `বুকিং স্ট্যাটাস "${status}" এ পরিবর্তন করা হয়েছে (ডেমো)`
        : `Booking status updated to "${status}" (Demo)`,
      'success'
    );
  };

  const updatePaymentVerification = (paymentId: string, status: PaymentVerificationStatus) => {
    setPayments((prev) => {
      const next = prev.map((p) =>
        p.id === paymentId ? { ...p, verificationStatus: status } : p
      );
      try {
        localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(next));
      } catch {}
      return next;
    });
    showToast(
      lang === 'bn'
        ? 'ডেমো পেমেন্ট যাচাই স্ট্যাটাস আপডেট হয়েছে'
        : 'Demo payment verification status updated',
      'success'
    );
  };

  const createServiceInquiry = (
    input: Omit<ServiceInquiry, 'id' | 'reference' | 'status' | 'internalNotes' | 'createdAt'>
  ): ServiceInquiry => {
    const prefix =
      input.category === 'visa' ? 'VISA' : input.category === 'medical' ? 'MED' : 'CORP';
    const ref = `${prefix}-DEMO-${Math.floor(100 + Math.random() * 900)}`;
    const newInq: ServiceInquiry = {
      ...input,
      id: `inq-${Date.now()}`,
      reference: ref,
      status: 'new',
      internalNotes: 'ওয়েবসাইট ফর্ম থেকে প্রাপ্ত নতুন ডেমো অনুসন্ধান।',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setInquiries((prev) => {
      const next = [newInq, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(next));
      } catch {}
      return next;
    });
    showToast(
      lang === 'bn'
        ? `আপনার অনুসন্ধান (${ref}) সফলভাবে জমা হয়েছে (ডেমো)`
        : `Your inquiry (${ref}) has been submitted (Demo)`,
      'success'
    );
    return newInq;
  };

  const updateInquiryStatus = (
    id: string,
    status: ServiceInquiry['status'],
    notes?: string
  ) => {
    setInquiries((prev) => {
      const next = prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              internalNotes: notes !== undefined ? notes : item.internalNotes,
            }
          : item
      );
      try {
        localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(next));
      } catch {}
      return next;
    });
    showToast(
      lang === 'bn' ? 'অনুসন্ধান স্ট্যাটাস আপডেট করা হয়েছে' : 'Inquiry status updated',
      'success'
    );
  };

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
    } catch {}
    showToast(
      lang === 'bn'
        ? 'ওয়েবসাইট ও এসএমএস সেটিংস সংরক্ষিত হয়েছে (ডেমো)'
        : 'Website & SMS settings saved in demo state',
      'success'
    );
  };

  const resetDemoData = () => {
    setPackages(INITIAL_PACKAGES);
    setBookings(INITIAL_BOOKINGS);
    setPayments(INITIAL_PAYMENTS);
    setInquiries(INITIAL_INQUIRIES);
    setSmsLogs(INITIAL_SMS_LOGS);
    setSettings(INITIAL_SITE_SETTINGS);
    try {
      Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    } catch {}
    showToast(
      lang === 'bn'
        ? 'সকল ডেমো ডাটা পুনরায় ডিফল্ট অবস্থায় রিসেট করা হয়েছে'
        : 'All demo data reset to initial state',
      'info'
    );
  };

  const loginDemoCustomer = (name: string, phone: string, email = 'customer.demo@example.com') => {
    const user = { name, phone, email };
    setCustomerDemoUser(user);
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOMER, JSON.stringify(user));
    } catch {}
    showToast(
      lang === 'bn' ? `স্বাগতম, ${name} (ডেমো সেশন)` : `Welcome, ${name} (Demo Session)`,
      'success'
    );
  };

  const logoutDemoCustomer = () => {
    setCustomerDemoUser(null);
    try {
      localStorage.removeItem(STORAGE_KEYS.CUSTOMER);
    } catch {}
    showToast(
      lang === 'bn' ? 'ডেমো কাস্টমার অ্যাকাউন্ট থেকে লগআউট হয়েছে' : 'Logged out of demo customer account',
      'info'
    );
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t,
        formatBdt,
        packages,
        destinations,
        categories,
        bookings,
        payments,
        inquiries,
        blogs,
        reviews,
        smsLogs,
        settings,
        favorites,
        toggleFavorite,
        addPackage,
        updatePackage,
        deletePackage,
        createDemoBooking,
        updateBookingStatus,
        updatePaymentVerification,
        createServiceInquiry,
        updateInquiryStatus,
        updateSettings,
        resetDemoData,
        toasts,
        showToast,
        dismissToast,
        customerDemoUser,
        loginDemoCustomer,
        logoutDemoCustomer,
      }}
    >
      {children}
      {/* Global Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => dismissToast(toast.id)}
            className={`pointer-events-auto cursor-pointer rounded-xl px-4 py-3 shadow-lg border text-sm font-medium flex items-center justify-between gap-3 transition-all duration-200 ${
              toast.type === 'error'
                ? 'bg-[#EF174F] text-white border-[#EF174F]'
                : toast.type === 'info'
                ? 'bg-[#10283B] text-white border-[#16A6A6]'
                : 'bg-[#10283B] text-[#F9C91D] border-[#F9C91D]/40'
            }`}
          >
            <span>{toast.title}</span>
            <span className="text-xs opacity-75 shrink-0">✕</span>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
