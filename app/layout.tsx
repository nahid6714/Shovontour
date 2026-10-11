import type { Metadata } from 'next';
import { Hind_Siliguri, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/lib/app-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shovon Tour & Travel BD | বাংলাদেশ ও আন্তর্জাতিক ট্যুর প্যাকেজ',
  description:
    'Premium Domestic & International Tour Packages, Indian Visa Assistance, Medical Travel & Corporate Tours in Bangladesh by Md. Tawhid Hossan Shovon.',
  openGraph: {
    title: 'Shovon Tour & Travel BD | বাংলাদেশ ও আন্তর্জাতিক ট্যুর প্যাকেজ',
    description:
      'Premium Domestic & International Tour Packages, Indian Visa Assistance, Medical Travel & Corporate Tours in Bangladesh by Md. Tawhid Hossan Shovon.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shovon Tour & Travel BD | বাংলাদেশ ও আন্তর্জাতিক ট্যুর প্যাকেজ',
    description:
      'Premium Domestic & International Tour Packages, Indian Visa Assistance, Medical Travel & Corporate Tours in Bangladesh by Md. Tawhid Hossan Shovon.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${plusJakarta.variable} overflow-x-hidden`}>
      <body
        suppressHydrationWarning
        className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#F4F8FB] text-[#10283B] antialiased font-[family-name:var(--font-hind),var(--font-jakarta),sans-serif]"
      >
        <AppProvider>
          <Header />
          <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}

