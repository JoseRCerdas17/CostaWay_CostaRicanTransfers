const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Route {
  id: number;
  slug: string;
  origin: string;
  destination: string;
  price: number;
  currency: string;
  vehicle_type: string;
  duration_estimate: string;
  description: string | null;
  image_url: string | null;
  active: boolean;
  sort_order: number;
}

interface BookingRequest {
  route_slug: string;
  customerName: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  passengers: number;
  flightNumber?: string;
  paymentType: "full" | "deposit";
}

interface BookingResponse {
  id: number;
  route_id: number;
  customer_name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  passengers: number;
  flight_number?: string;
  amount_due: number;
  payment_type: string;
  deposit_percentage: number;
  payment_status: string;
  stripe_session_id?: string;
  status: string;
  created_at: string;
}

interface QuoteRequest {
  origin: string;
  destination: string;
  date?: string;
  time?: string;
  passengers: number;
  customerName: string;
  email: string;
  phone?: string;
  notes?: string;
}

export async function getRoutes(): Promise<Route[]> {
  const response = await fetch(`${API_BASE_URL}/api/v1/routes`);
  if (!response.ok) throw new Error("Failed to fetch routes");
  return response.json();
}

export async function getRoute(slug: string): Promise<Route> {
  const response = await fetch(`${API_BASE_URL}/api/v1/routes/${slug}`);
  if (!response.ok) throw new Error("Failed to fetch route");
  return response.json();
}

export async function createBooking(data: BookingRequest): Promise<BookingResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create booking");
  return response.json();
}

export async function getBooking(id: number): Promise<BookingResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/bookings/${id}`);
  if (!response.ok) throw new Error("Failed to fetch booking");
  return response.json();
}

export async function createQuoteRequest(data: QuoteRequest): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/v1/quote-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to submit quote request");
}

export async function getStripeSessionUrl(bookingId: number): Promise<{ url: string }> {
  const response = await fetch(`${API_BASE_URL}/api/v1/payments/session?booking_id=${bookingId}`);
  if (!response.ok) throw new Error("Failed to get payment session");
  return response.json();
}

export type { Route, BookingRequest, BookingResponse, QuoteRequest };
