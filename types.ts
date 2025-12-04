
export enum FlightType {
  ONE_WAY = 'One Way',
  ROUND_TRIP = 'Round Trip',
  MULTI_CITY = 'Multi City'
}

export interface Airport {
  code: string;
  city: string;
  name: string;
  country: string;
}

export interface TravelerConfig {
  adults: number;
  children: number;
  infants: number;
  class: 'Economy' | 'Premium Economy' | 'Business' | 'First';
}

export interface FlightSearchParams {
  from: Airport | null;
  to: Airport | null;
  departDate: string;
  returnDate?: string;
  travelers: TravelerConfig;
  tripType: FlightType;
}

export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  stops: number;
  from: string;
  to: string;
  baggage: string;
  bookingToken?: string; // For deep links if needed
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  pricePerNight: number;
  image: string;
  amenities: string[];
}

export interface Package {
  id: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  image: string;
  rating: number;
  description: string;
  hotelsIncluded: string;
  activitiesIncluded: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: number; title: string; desc: string }[];
}

export interface Activity {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  rating: number;
  duration: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  mobile: string;
  destination: string;
  travelDate: string;
  budget: number;
  source: string;
  status: 'New' | 'Follow-up' | 'Booked' | 'Closed' | 'Lost';
  createdAt: string;
}

export interface MarkupSettings {
  flightMarkup: number;
  hotelMarkup: number;
  packageMarkup: number;
  isPercentage: boolean;
}

export interface Passenger {
  type: 'Adult' | 'Child' | 'Infant';
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob?: string;
  passportNumber?: string;
  passportExpiry?: string;
}

export interface Booking {
  id: string;
  type: 'Flight' | 'Hotel' | 'Package';
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Failed';
  amount: number;
  details: any;
  paymentId?: string;
  paymentMethod?: string;
  paymentDate?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: 'Admin' | 'Manager' | 'Support' | 'Agent';
  status: 'Active' | 'Inactive';
  password?: string;
}

// --- NEW TYPES FOR SETTINGS & INVOICES ---

export interface CompanySettings {
  officeName: string;
  brandName: string;
  invoiceCompanyName: string;
  companyAddress: string;
  companyMobile: string;
  companyEmail: string;
  gstNumber?: string;
  kiwiApiKey?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  customerAddress?: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number; // Amount
  discount: number; // Amount
  grandTotal: number;
  status: 'Paid' | 'Unpaid' | 'Overdue';
}
