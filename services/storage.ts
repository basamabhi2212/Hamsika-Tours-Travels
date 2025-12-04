
import { Package, User, Lead, Invoice, CompanySettings, Booking } from '../types';

// Initial Mock Data Seeding
const SEED_PACKAGES: Package[] = [
  {
    id: '1', title: 'Majestic Dubai', destination: 'Dubai, UAE', duration: '5 Days / 4 Nights', price: 45000,
    image: 'https://picsum.photos/800/600?random=1', rating: 4.8,
    description: 'Experience the luxury of Dubai.',
    hotelsIncluded: 'Grand Hyatt, Atlantis', activitiesIncluded: 'Burj Khalifa, Desert Safari',
    inclusions: ['Breakfast', 'Visa', 'Transfers'], exclusions: ['Lunch', 'Airfare'], itinerary: []
  },
  {
    id: '2', title: 'Bali Bliss', destination: 'Bali, Indonesia', duration: '6 Days / 5 Nights', price: 62000,
    image: 'https://picsum.photos/800/600?random=2', rating: 4.9,
    description: 'Relax in the pristine beaches of Bali.',
    hotelsIncluded: 'The Westin, Ubud Village Resort', activitiesIncluded: 'Water Sports, Temple Tour',
    inclusions: ['Breakfast', 'Transfers'], exclusions: ['Personal Expenses'], itinerary: []
  }
];

const SEED_USERS: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@hamsika.com', mobile: '9999999999', role: 'Admin', status: 'Active', password: 'admin' },
  { id: '2', name: 'Support Agent', email: 'support@hamsika.com', mobile: '8888888888', role: 'Support', status: 'Active', password: 'user' }
];

const SEED_LEADS: Lead[] = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@test.com', mobile: '9876543210', destination: 'Dubai', travelDate: '2023-12-10', budget: 150000, source: 'Website', status: 'New', createdAt: '2023-10-01' },
  { id: '2', name: 'Priya Singh', email: 'priya@test.com', mobile: '9123456780', destination: 'Bali', travelDate: '2024-01-15', budget: 80000, source: 'Instagram', status: 'Follow-up', createdAt: '2023-10-02' }
];

const DEFAULT_SETTINGS: CompanySettings = {
  officeName: 'Hamsika Travels HO',
  brandName: 'Hamsika Travels',
  invoiceCompanyName: 'Hamsika Travels Pvt Ltd',
  companyAddress: 'Plot No 123, Jubilee Hills, Hyderabad, Telangana - 500033',
  companyMobile: '+91 9493936084',
  companyEmail: 'abhishekamt0@gmail.com',
  gstNumber: '36ABCDE1234F1Z5',
  kiwiApiKey: '',
  markupConfig: {
    flight: { type: 'fixed', value: 0 },
    hotel: { type: 'fixed', value: 0 },
    package: { type: 'fixed', value: 0 }
  }
};

const SEED_INVOICES: Invoice[] = [
  { 
    id: '1', invoiceNumber: 'INV-001', date: '2023-10-15', dueDate: '2023-10-15', 
    customerName: 'Rahul Sharma', customerEmail: 'rahul@test.com', customerMobile: '9876543210',
    items: [{ id: '1', description: 'Dubai Package Advance', quantity: 1, unitPrice: 20000, total: 20000 }],
    subtotal: 20000, tax: 1000, discount: 0, grandTotal: 21000, status: 'Paid'
  }
];

const getCollection = <T>(key: string, seed: T[]): T[] => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(stored);
};

const saveCollection = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const PackageService = {
  getAll: (): Package[] => getCollection('packages', SEED_PACKAGES),
  add: (pkg: Package) => {
    const list = PackageService.getAll();
    const newPkg = { ...pkg, id: Date.now().toString() };
    saveCollection('packages', [...list, newPkg]);
    return newPkg;
  },
  update: (pkg: Package) => {
    const list = PackageService.getAll();
    const updated = list.map(p => p.id === pkg.id ? pkg : p);
    saveCollection('packages', updated);
  },
  delete: (id: string) => {
    const list = PackageService.getAll();
    saveCollection('packages', list.filter(p => p.id !== id));
  }
};

export const UserService = {
  getAll: (): User[] => getCollection('users', SEED_USERS),
  add: (user: User) => {
    const list = UserService.getAll();
    const newUser = { ...user, id: Date.now().toString() };
    saveCollection('users', [...list, newUser]);
    return newUser;
  },
  update: (user: User) => {
    const list = UserService.getAll();
    const updated = list.map(u => u.id === user.id ? user : u);
    saveCollection('users', updated);
  },
  delete: (id: string) => {
    const list = UserService.getAll();
    saveCollection('users', list.filter(u => u.id !== id));
  }
};

export const LeadService = {
  getAll: (): Lead[] => getCollection('leads', SEED_LEADS),
  add: (lead: Lead) => {
    const list = LeadService.getAll();
    const newLead = { ...lead, id: Date.now().toString(), createdAt: new Date().toISOString().split('T')[0] };
    saveCollection('leads', [...list, newLead]);
    return newLead;
  },
  update: (lead: Lead) => {
    const list = LeadService.getAll();
    const updated = list.map(l => l.id === lead.id ? lead : l);
    saveCollection('leads', updated);
  },
  delete: (id: string) => {
    const list = LeadService.getAll();
    saveCollection('leads', list.filter(l => l.id !== id));
  }
};

export const BookingService = {
    getAll: (): Booking[] => getCollection('bookings', []),
    update: (booking: Booking) => {
        const list = BookingService.getAll();
        const updated = list.map(b => b.id === booking.id ? booking : b);
        saveCollection('bookings', updated);
    },
    delete: (id: string) => {
        const list = BookingService.getAll();
        saveCollection('bookings', list.filter(b => b.id !== id));
    }
};

export const SettingsService = {
  get: (): CompanySettings => {
    const stored = localStorage.getItem('companySettings');
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
  },
  save: (settings: CompanySettings) => {
    localStorage.setItem('companySettings', JSON.stringify(settings));
  }
};

export const InvoiceService = {
  getAll: (): Invoice[] => getCollection('invoices', SEED_INVOICES),
  add: (inv: Invoice) => {
    const list = InvoiceService.getAll();
    const newInv = { ...inv, id: Date.now().toString() };
    saveCollection('invoices', [...list, newInv]);
    return newInv;
  },
  update: (inv: Invoice) => {
    const list = InvoiceService.getAll();
    const updated = list.map(i => i.id === inv.id ? inv : i);
    saveCollection('invoices', updated);
  },
  delete: (id: string) => {
    const list = InvoiceService.getAll();
    saveCollection('invoices', list.filter(i => i.id !== id));
  }
};
