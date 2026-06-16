const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchRoutes() {
  const res = await fetch(`${API_BASE_URL}/api/v1/routes`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch routes");
  return res.json();
}

export async function fetchRouteBySlug(slug: string) {
  const res = await fetch(`${API_BASE_URL}/api/v1/routes/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch route");
  return res.json();
}

export async function createBooking(data: {
  routeSlug?: string;
  customerName: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  passengers: number;
  flightNumber?: string;
  paymentType: "full" | "deposit";
}) {
  const res = await fetch(`${API_BASE_URL}/api/v1/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create booking");
  return res.json();
}

export async function createQuoteRequest(data: {
  origin: string;
  destination: string;
  date?: string;
  passengers: number;
  customerName: string;
  email: string;
  phone?: string;
  notes?: string;
}) {
  const res = await fetch(`${API_BASE_URL}/api/v1/quote-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create quote request");
  return res.json();
}

export async function createPaymentSession(bookingId: number) {
  const res = await fetch(`${API_BASE_URL}/api/v1/payments/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookingId }),
  });
  if (!res.ok) throw new Error("Failed to create payment session");
  return res.json();
}

export async function getBooking(id: number) {
  const res = await fetch(`${API_BASE_URL}/api/v1/bookings/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch booking");
  return res.json();
}