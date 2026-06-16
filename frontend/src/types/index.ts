export interface Route {
  id: number;
  slug: string;
  origin: string;
  destination: string;
  price: number;
  currency: string;
  vehicleType: string;
  durationEstimate: string;
  description?: string;
  imageUrl?: string;
  active: boolean;
  sortOrder: number;
}

export interface Booking {
  id: number;
  routeId?: number;
  quoteRequestId?: number;
  customerName: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  passengers: number;
  flightNumber?: string;
  amountDue: number;
  paymentType: "full" | "deposit";
  depositPercentage: number;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  stripePaymentId?: string;
  stripeSessionId?: string;
  status: "pending" | "confirmed" | "cancelled";
  providerStatus?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteRequest {
  id: number;
  origin: string;
  destination: string;
  date?: string;
  passengers: number;
  customerName: string;
  email: string;
  phone?: string;
  notes?: string;
  status: "pending" | "quoted" | "converted" | "rejected";
  quotedPrice?: number;
  paymentLink?: string;
  convertedBookingId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: number;
  email: string;
}