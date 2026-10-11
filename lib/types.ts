export type Language = 'bn' | 'en';

export interface BilingualText {
  bn: string;
  en: string;
}

export type TourType = 'bangladesh' | 'international';

export type TourCategorySlug =
  | 'sea'
  | 'mountain'
  | 'river-haor'
  | 'adventure'
  | 'family'
  | 'couple'
  | 'religious'
  | 'international';

export interface ItineraryDay {
  day: number;
  title: BilingualText;
  description: BilingualText;
  meals: string[];
}

export interface TourPackage {
  id: string;
  slug: string;
  title: BilingualText;
  destinationSlug: string;
  destinationName: BilingualText;
  type: TourType;
  category: TourCategorySlug;
  durationDays: number;
  durationNights: number;
  durationText: BilingualText;
  pricePerPerson: number; // Sample price in BDT
  advancePerPerson: number; // Sample advance in BDT
  image: string;
  gallery: string[];
  transportHighlight: BilingualText;
  accommodationHighlight: BilingualText;
  overview: BilingualText;
  itinerary: ItineraryDay[];
  included: BilingualText[];
  excluded: BilingualText[];
  departureDates: string[]; // YYYY-MM-DD sample dates
  availableSeats: number;
  isThursdayTour: boolean;
  isFeatured: boolean;
  isPublished: boolean;
  popularityScore: number;
}

export interface DestinationItem {
  id: string;
  slug: string;
  name: BilingualText;
  country: BilingualText;
  type: TourType;
  image: string;
  shortDescription: BilingualText;
  bestTimeToVisit: BilingualText;
  highlights: BilingualText[];
  packageCount: number;
}

export interface CategoryItem {
  id: string;
  slug: TourCategorySlug;
  name: BilingualText;
  subtitle: BilingualText;
  image: string;
  count: number;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type PaymentStatus = 'demo_paid' | 'demo_pending' | 'demo_failed';
export type PaymentVerificationStatus = 'unverified_demo' | 'reviewed_demo' | 'rejected_demo';

export interface BookingRecord {
  id: string;
  reference: string;
  packageId: string;
  packageSlug: string;
  packageTitle: BilingualText;
  departureDate: string;
  travelerCount: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  emergencyContact: string;
  specialRequirements: string;
  totalPrice: number;
  advanceAmount: number;
  remainingBalance: number;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  transactionRef: string;
  createdAt: string;
  customerSmsPreview: string;
  adminSmsPreview: string;
}

export interface PaymentRecord {
  id: string;
  transactionRef: string;
  bookingReference: string;
  customerName: string;
  customerPhone: string;
  amount: number;
  method: 'bKash Demo' | 'Nagad Demo' | 'Bank Demo';
  paymentStatus: PaymentStatus;
  verificationStatus: PaymentVerificationStatus;
  createdAt: string;
}

export interface ServiceInquiry {
  id: string;
  reference: string;
  category: 'visa' | 'medical' | 'corporate';
  serviceType: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  travelDate: string;
  travelersOrGroupSize: number;
  details: string;
  status: 'new' | 'in_review' | 'contacted' | 'closed';
  internalNotes: string;
  createdAt: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: BilingualText;
  excerpt: BilingualText;
  content: BilingualText[];
  category: BilingualText;
  readTime: BilingualText;
  publishDate: string;
  image: string;
  author: string;
}

export interface DemoReview {
  id: string;
  customerName: string;
  roleOrCity: BilingualText;
  tourTitle: BilingualText;
  rating: number;
  comment: BilingualText;
  date: string;
  isApproved: boolean;
}

export interface SmsLogItem {
  id: string;
  recipientRole: 'customer' | 'admin';
  phone: string;
  bookingReference: string;
  message: string;
  status: 'simulated_delivered' | 'simulated_queued';
  timestamp: string;
}

export interface SiteSettings {
  brandName: string;
  ownerName: string;
  tagline: BilingualText;
  primaryPhone: string;
  secondaryPhone: string;
  whatsappNumber: string;
  supportEmail: string;
  facebookPageUrl: string;
  facebookGroupUrl: string;
  facebookProfileUrl: string;
  bkashDemoMerchantNumber: string;
  customerSmsTemplate: string;
  adminSmsTemplate: string;
  adminNotificationPhone: string;
  heroBangladeshHeading: BilingualText;
  heroInternationalHeading: BilingualText;
  promoQuote: BilingualText;
}
