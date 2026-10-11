'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  FolderKanban,
  MapPin,
  CalendarClock,
  ClipboardList,
  CreditCard,
  FileText,
  Stethoscope,
  Briefcase,
  Users,
  Image as ImageIcon,
  Tag,
  Star,
  BookOpen,
  MessageSquare,
  Settings,
  ArrowLeft,
  Globe,
  RotateCcw,
  Menu,
  X,
  Plane,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '@/lib/app-context';

const ADMIN_NAV_ITEMS = [
  { href: '/admin', icon: LayoutDashboard, label: { bn: 'ড্যাশবোর্ড ওভারভিউ', en: 'Dashboard Overview' } },
  { href: '/admin/packages', icon: Package, label: { bn: 'প্যাকেজ ম্যানেজমেন্ট', en: 'Packages' } },
  { href: '/admin/bookings', icon: ClipboardList, label: { bn: 'বুকিং ম্যানেজমেন্ট', en: 'Bookings' } },
  { href: '/admin/payments', icon: CreditCard, label: { bn: 'পেমেন্ট তালিকা (ডেমো)', en: 'Demo Payments' } },
  { href: '/admin/departures', icon: CalendarClock, label: { bn: 'যাত্রার তারিখ ও সিট', en: 'Departures & Seats' } },
  { href: '/admin/categories', icon: FolderKanban, label: { bn: 'ট্যুর ক্যাটাগরি', en: 'Categories' } },
  { href: '/admin/destinations', icon: MapPin, label: { bn: 'গন্তব্য তালিকা', en: 'Destinations' } },
  { href: '/admin/visa-requests', icon: FileText, label: { bn: 'ভিসা অনুসন্ধান', en: 'Visa Requests' } },
  { href: '/admin/medical-requests', icon: Stethoscope, label: { bn: 'মেডিকেল অনুসন্ধান', en: 'Medical Requests' } },
  { href: '/admin/corporate-requests', icon: Briefcase, label: { bn: 'কর্পোরেট কোটেশন', en: 'Corporate Requests' } },
  { href: '/admin/customers', icon: Users, label: { bn: 'গ্রাহক তালিকা (ডেমো)', en: 'Customers' } },
  { href: '/admin/banners', icon: ImageIcon, label: { bn: 'হোমপেজ ব্যানার', en: 'Banners' } },
  { href: '/admin/offers', icon: Tag, label: { bn: 'প্রমোশনাল অফার', en: 'Offers' } },
  { href: '/admin/reviews', icon: Star, label: { bn: 'ডেমো রিভিউ', en: 'Reviews' } },
  { href: '/admin/blog', icon: BookOpen, label: { bn: 'ট্রাভেল ব্লগ', en: 'Blog Articles' } },
  { href: '/admin/gallery', icon: ImageIcon, label: { bn: 'গ্যালারি ম্যানেজমেন্ট', en: 'Gallery' } },
  { href: '/admin/sms-settings', icon: MessageSquare, label: { bn: 'এসএমএস টেমপ্লেট (ডেমো)', en: 'SMS Settings' } },
  { href: '/admin/sms-logs', icon: MessageSquare, label: { bn: 'এসএমএস লগ (ডেমো)', en: 'SMS Logs' } },
  { href: '/admin/settings', icon: Settings, label: { bn: 'ওয়েবসাইট সেটিংস', en: 'Site Settings' } },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { lang, setLang, settings, resetDemoData } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#F4F8FB] text-[#10283B]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-[#10283B] text-white shrink-0 border-r border-white/10">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#F9C91D] text-[#10283B] flex items-center justify-center shrink-0">
              <Plane className="w-4 h-4" />
            </span>
            <div className="leading-tight">
              <span className="text-sm font-extrabold block">Admin Demo</span>
              <span className="text-[10px] text-[#F9C91D] font-mono">PROTOTYPE ONLY</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-[#F9C91D] text-[#10283B] font-extrabold'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label[lang]}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#16A6A6] hover:bg-[#128c8c] text-white text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'পাবলিক ওয়েবসাইটে ফিরুন' : 'Return to Website'}</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 max-w-full overflow-x-hidden">
        {/* Top Admin Header */}
        <header className="bg-white border-b border-slate-200 px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 text-[#10283B] shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#EF174F] min-w-0">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span className="truncate">
                {lang === 'bn'
                  ? 'ভিজ্যুয়াল অ্যাডমিন প্রোটোটাইপ (ডেমো)'
                  : 'VISUAL ADMIN PROTOTYPE (DEMO)'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={resetDemoData}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {lang === 'bn' ? 'ডেমো ডাটা রিসেট' : 'Reset Demo Data'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#10283B] text-white text-[11px] sm:text-xs font-semibold"
            >
              <Globe className="w-3.5 h-3.5 text-[#F9C91D]" />
              <span>{lang === 'bn' ? 'EN' : 'বাংলা'}</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#F9C91D] text-[#10283B] text-[11px] sm:text-xs font-extrabold whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'সাইট' : 'Site'}</span>
            </Link>
          </div>
        </header>

        {/* Mobile Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60"
            />
            <div className="relative z-10 w-64 bg-[#10283B] text-white flex flex-col h-full">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <span className="font-extrabold text-sm">{settings.brandName} Admin</span>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                {ADMIN_NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
                        pathname === item.href
                          ? 'bg-[#F9C91D] text-[#10283B]'
                          : 'text-slate-200 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label[lang]}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Page Body */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">{children}</div>
      </div>
    </div>
  );
}
