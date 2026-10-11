'use client';

import React, { useState, useEffect } from 'react';
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
  ShieldAlert,
  Lock,
  Phone,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '@/lib/app-context';
import BrandLogo from '@/components/BrandLogo';

const ADMIN_AUTH_KEY = 'shovon_admin_auth_v1';
const VALID_ADMIN_ID = '01931866636';
const VALID_ADMIN_PASS = '3012024';

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
  const { lang, setLang, settings, resetDemoData, showToast } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Admin Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(ADMIN_AUTH_KEY);
      if (saved === 'authenticated') {
        setIsAuthenticated(true);
      }
    } catch {}
    setAuthChecked(true);
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const cleanId = loginId.trim();
    const cleanPass = password.trim();

    if (cleanId === VALID_ADMIN_ID && cleanPass === VALID_ADMIN_PASS) {
      setIsAuthenticated(true);
      try {
        localStorage.setItem(ADMIN_AUTH_KEY, 'authenticated');
      } catch {}
      showToast(
        lang === 'bn'
          ? 'অ্যাডমিন প্যানেলে সফলভাবে লগইন হয়েছে'
          : 'Successfully logged in to Admin Panel',
        'success'
      );
    } else {
      setLoginError(
        lang === 'bn'
          ? 'ভুল লগইন নাম্বার বা পাসওয়ার্ড! সঠিক নাম্বার (01931866636) ও পাসওয়ার্ড (3012024) দিন।'
          : 'Invalid Login ID or Password! Use 01931866636 and 3012024.'
      );
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    setLoginId('');
    setPassword('');
    try {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    } catch {}
    showToast(
      lang === 'bn' ? 'অ্যাডমিন প্যানেল থেকে লগআউট করা হয়েছে' : 'Logged out from Admin Panel',
      'info'
    );
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#1E3540] flex items-center justify-center p-4">
        <div className="w-8 h-8 rounded-full border-3 border-[#FAD814] border-t-transparent animate-spin" />
      </div>
    );
  }

  // Show Admin Login Gate directly when visiting /admin while not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#132630] via-[#1E3540] to-[#10283B] flex flex-col justify-center items-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Top Brand Header inside Login Card */}
          <div className="bg-[#1E3540] px-6 py-6 text-center space-y-2 border-b border-white/10">
            <div className="flex justify-center">
              <BrandLogo href="/admin" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#FAD814] text-[11px] font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>
                {lang === 'bn' ? 'অ্যাডমিন কন্ট্রোল প্যানেল লগইন' : 'ADMIN CONTROL PANEL LOGIN'}
              </span>
            </div>
          </div>

          {/* Login Form Body */}
          <form onSubmit={handleAdminLogin} className="p-6 sm:p-7 space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-[#EE2454]">
                {loginError}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold text-[#10283B]">
                {lang === 'bn' ? 'লগইন আইডি / মোবাইল নাম্বার' : 'Login ID / Mobile Number'}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="01931866636"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm font-mono font-bold text-[#10283B] focus:outline-none focus:border-[#0F8E95]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold text-[#10283B]">
                {lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#F4F8FB] border border-slate-200 text-sm font-mono font-bold text-[#10283B] focus:outline-none focus:border-[#0F8E95]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Toggle Password Visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-5 rounded-xl bg-[#FAD814] hover:bg-[#e5c40e] text-[#10283B] font-black text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <span>{lang === 'bn' ? 'লগইন করুন' : 'Login to Admin Panel'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link
                href="/"
                className="inline-flex items-center gap-1 font-bold text-slate-500 hover:text-[#10283B]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'ওয়েবসাইটে ফিরে যান' : 'Back to Website'}</span>
              </Link>

              <button
                type="button"
                onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
                className="inline-flex items-center gap-1 font-bold text-[#0F8E95]"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F4F8FB] text-[#10283B]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-[#1E3540] text-white shrink-0 border-r border-white/10">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <BrandLogo href="/admin" />
            <span className="text-[10px] text-[#FAD814] font-mono tracking-wider pl-1">
              ADMIN PANEL · {VALID_ADMIN_ID}
            </span>
          </div>
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
                    ? 'bg-[#FAD814] text-[#10283B] font-extrabold'
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
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#0F8E95] hover:bg-[#0c787e] text-white text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'পাবলিক ওয়েবসাইটে ফিরুন' : 'Return to Website'}</span>
          </Link>
          <button
            type="button"
            onClick={handleAdminLogout}
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#EE2454]/90 hover:bg-[#EE2454] text-white text-xs font-bold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'লগআউট করুন' : 'Logout'}</span>
          </button>
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
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#10283B] min-w-0">
              <ShieldAlert className="w-4 h-4 text-[#0F8E95] shrink-0" />
              <span className="truncate">
                {lang === 'bn' ? 'অ্যাডমিন প্যানেল' : 'ADMIN PANEL'} ({VALID_ADMIN_ID})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={resetDemoData}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {lang === 'bn' ? 'ডেমো ডাটা রিসেট' : 'Reset Data'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#1E3540] text-white text-[11px] sm:text-xs font-semibold"
            >
              <Globe className="w-3.5 h-3.5 text-[#FAD814]" />
              <span>{lang === 'bn' ? 'EN' : 'বাংলা'}</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#FAD814] text-[#10283B] text-[11px] sm:text-xs font-extrabold whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'সাইট' : 'Site'}</span>
            </Link>

            <button
              type="button"
              onClick={handleAdminLogout}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#EE2454] text-white text-[11px] sm:text-xs font-bold whitespace-nowrap"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{lang === 'bn' ? 'লগআউট' : 'Logout'}</span>
            </button>
          </div>
        </header>

        {/* Mobile Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60"
            />
            <div className="relative z-10 w-64 bg-[#1E3540] text-white flex flex-col h-full">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <BrandLogo href="/admin" compact />
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
                          ? 'bg-[#FAD814] text-[#10283B]'
                          : 'text-slate-200 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label[lang]}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="p-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleAdminLogout}
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#EE2454] text-white text-xs font-bold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'লগআউট করুন' : 'Logout'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Body */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">{children}</div>
      </div>
    </div>
  );
}
