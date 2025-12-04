
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Package as PackageIcon, Settings, LogOut, Save, Plus, Search, Trash2, Edit, 
  CheckCircle, XCircle, X, Phone, Mail, Calendar, MapPin, CreditCard, UserPlus, FileText, Printer, Eye, Database, Key, Download,
  BookOpen, Plane
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { User, Lead, Package, CompanySettings, Invoice, InvoiceItem, Booking, MarkupConfig } from '../types';
import { PackageService, UserService, LeadService, SettingsService, InvoiceService, BookingService } from '../services/storage';

// --- SHARED COMPONENTS ---

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children?: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-700 animate-scale-up">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center sticky top-0 bg-slate-800 z-10">
          <h3 className="text-2xl font-bold text-white font-serif">{title}</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  const links = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Leads & CRM', path: '/admin/leads' },
    { icon: PackageIcon, label: 'Packages', path: '/admin/packages' },
    { icon: BookOpen, label: 'Bookings', path: '/admin/bookings' },
    { icon: UserPlus, label: 'Users & Staff', path: '/admin/users' },
    { icon: FileText, label: 'Invoices', path: '/admin/invoices' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 overflow-y-auto hidden md:block z-20 border-r border-slate-800 shadow-2xl">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-2xl font-serif font-bold text-gold-500">Hamsika<br/><span className="text-slate-400 text-sm tracking-widest font-sans font-normal uppercase">Admin Portal</span></h2>
      </div>
      <nav className="mt-6 px-4 space-y-2">
        {links.map(link => (
          <Link 
            key={link.path}
            to={link.path}
            className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              location.pathname === link.path 
                ? 'bg-gold-500 text-royal-900 shadow-lg font-bold' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <link.icon className="h-5 w-5 mr-3" />
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
        <button onClick={handleLogout} className="flex items-center justify-center px-4 py-3 text-sm font-medium text-red-400 hover:text-white hover:bg-red-900/50 rounded-lg w-full transition-colors">
          <LogOut className="h-5 w-5 mr-3" /> Logout
        </button>
      </div>
    </div>
  );
};

// --- PAGES ---

const DashboardHome = () => {
  const data = [
    { name: 'Jan', revenue: 4000 }, { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 5000 }, { name: 'Apr', revenue: 7500 },
    { name: 'May', revenue: 6000 }, { name: 'Jun', revenue: 9000 },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white font-serif">Dashboard Overview</h1>
        <div className="text-sm text-slate-400 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">Welcome, Admin</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '₹12.5L', color: 'text-gold-400' },
          { label: 'Active Leads', value: '45', color: 'text-blue-400' },
          { label: 'Total Bookings', value: '128', color: 'text-green-400' },
          { label: 'Packages Active', value: '8', color: 'text-purple-400' }
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg hover:border-gold-500/30 transition-colors">
             <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{stat.label}</div>
             <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
        <h3 className="text-lg font-bold text-white mb-6">Revenue Analytics</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} tickFormatter={(value) => `₹${value}`} />
              <Tooltip 
                cursor={{fill: '#1e293b'}} 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
              />
              <Bar dataKey="revenue" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// --- BOOKINGS ---
const BookingsPage = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        setBookings(BookingService.getAll());
    }, []);

    const handleDelete = (id: string) => {
        if(window.confirm("Are you sure you want to delete this booking?")) {
            BookingService.delete(id);
            setBookings(BookingService.getAll());
        }
    };

    const handleStatusUpdate = (booking: Booking, status: 'Confirmed' | 'Cancelled' | 'Pending') => {
        BookingService.update({...booking, status});
        setBookings(BookingService.getAll());
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-white font-serif">Manage Bookings</h1>
            
            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
                <table className="w-full text-left">
                    <thead className="bg-slate-700 border-b border-slate-600 text-white">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold uppercase">Ref ID</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase">Customer</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase">Type</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase">Amount</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700 text-slate-300">
                        {bookings.map(b => (
                            <tr key={b.id} className="hover:bg-slate-700/50">
                                <td className="px-6 py-4 font-mono font-bold text-white">{b.id}</td>
                                <td className="px-6 py-4">
                                    <div className="text-white">{b.customerName}</div>
                                    <div className="text-xs text-slate-400">{b.customerEmail}</div>
                                </td>
                                <td className="px-6 py-4">{b.type}</td>
                                <td className="px-6 py-4 font-bold text-gold-400">₹{b.amount.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <select 
                                        value={b.status} 
                                        onChange={(e) => handleStatusUpdate(b, e.target.value as any)}
                                        className={`bg-slate-900 border border-slate-600 rounded px-2 py-1 text-xs font-bold ${
                                            b.status === 'Confirmed' ? 'text-green-400' :
                                            b.status === 'Cancelled' ? 'text-red-400' : 'text-yellow-400'
                                        }`}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleDelete(b.id)} className="text-red-400 hover:text-white hover:bg-red-900/50 p-2 rounded transition-colors">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {bookings.length === 0 && (
                             <tr><td colSpan={6} className="text-center py-12 text-slate-500">No bookings found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- PACKAGES ---
const PackagesPage = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPkg, setCurrentPkg] = useState<Package | null>(null);
  
  const initialForm = {
    title: '', destination: '', duration: '', price: 0, 
    image: 'https://picsum.photos/800/600', rating: 5, description: '',
    hotelsIncluded: '', activitiesIncluded: '', inclusions: '', exclusions: '',
    flightAirline: '', flightNumber: '', flightDep: '', flightArr: ''
  };
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => { setPackages(PackageService.getAll()); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {
      ...formData,
      inclusions: typeof formData.inclusions === 'string' ? (formData.inclusions as string).split('\n').filter(x => x.trim()) : formData.inclusions,
      exclusions: typeof formData.exclusions === 'string' ? (formData.exclusions as string).split('\n').filter(x => x.trim()) : formData.exclusions,
      flightDetails: (formData.flightAirline && formData.flightNumber) ? {
          airline: formData.flightAirline,
          flightNumber: formData.flightNumber,
          departureTime: formData.flightDep,
          arrivalTime: formData.flightArr
      } : undefined,
      itinerary: []
    };
    
    // Clean up temp fields
    delete payload.flightAirline; delete payload.flightNumber; delete payload.flightDep; delete payload.flightArr;

    if (currentPkg) PackageService.update({ ...payload, id: currentPkg.id });
    else PackageService.add(payload);
    
    setPackages(PackageService.getAll());
    setIsFormOpen(false);
    setFormData(initialForm);
    setCurrentPkg(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      PackageService.delete(id);
      setPackages(PackageService.getAll());
    }
  };

  const openEdit = (pkg: Package) => {
    setCurrentPkg(pkg);
    setFormData({
      title: pkg.title, destination: pkg.destination, duration: pkg.duration, price: pkg.price,
      image: pkg.image, rating: pkg.rating, description: pkg.description,
      hotelsIncluded: pkg.hotelsIncluded, activitiesIncluded: pkg.activitiesIncluded,
      inclusions: pkg.inclusions.join('\n'), exclusions: pkg.exclusions.join('\n'),
      flightAirline: pkg.flightDetails?.airline || '',
      flightNumber: pkg.flightDetails?.flightNumber || '',
      flightDep: pkg.flightDetails?.departureTime || '',
      flightArr: pkg.flightDetails?.arrivalTime || ''
    });
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white font-serif">Manage Packages</h1>
        <button 
          onClick={() => { setFormData(initialForm); setCurrentPkg(null); setIsFormOpen(true); }} 
          className="bg-gold-500 text-royal-900 px-6 py-3 rounded-lg font-bold hover:bg-gold-400 flex items-center shadow-md transform hover:-translate-y-0.5 transition-all"
        >
          <Plus className="h-5 w-5 mr-2" /> Create Package
        </button>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-slate-700 border-b border-slate-600 text-white">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Package Details</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Destination</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Inclusions</th>
              <th className="px-6 py-4 text-right tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700 text-slate-300">
            {packages.map(p => (
              <tr key={p.id} className="hover:bg-slate-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-white text-base">{p.title}</div>
                  <div className="text-xs text-gold-500 font-medium mt-1 flex items-center"><Calendar className="h-3 w-3 mr-1"/> {p.duration}</div>
                </td>
                <td className="px-6 py-4 text-sm flex items-center"><MapPin className="h-3 w-3 mr-1 text-slate-500"/> {p.destination}</td>
                <td className="px-6 py-4 font-bold text-gold-400 text-lg">₹{p.price.toLocaleString()}</td>
                <td className="px-6 py-4 text-xs text-slate-400 max-w-xs truncate">
                  <span className="block mb-1">🏨 {p.hotelsIncluded}</span>
                  <span className="block">🎢 {p.activitiesIncluded}</span>
                  {p.flightDetails && <span className="block text-blue-400">✈️ {p.flightDetails.airline}</span>}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => openEdit(p)} className="bg-blue-900/50 text-blue-400 hover:text-white hover:bg-blue-600 p-2 rounded-lg transition-colors" title="Edit"><Edit className="h-4 w-4"/></button>
                  <button onClick={() => handleDelete(p.id)} className="bg-red-900/50 text-red-400 hover:text-white hover:bg-red-600 p-2 rounded-lg transition-colors" title="Delete"><Trash2 className="h-4 w-4"/></button>
                </td>
              </tr>
            ))}
            {packages.length === 0 && (
               <tr><td colSpan={5} className="text-center py-12 text-slate-500">No packages found. Create one to get started.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={currentPkg ? 'Edit Package' : 'Create New Package'}>
         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {['title', 'destination', 'duration'].map(field => (
                <div key={field} className="space-y-1">
                  <label className="text-xs font-bold text-slate-200 uppercase tracking-wide">{field}</label>
                  <input required value={(formData as any)[field]} onChange={e => setFormData({...formData, [field]: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-gold-500 outline-none transition-colors" placeholder={`Enter ${field}`} />
                </div>
             ))}
             <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wide">Price (₹)</label>
                <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-gold-500 outline-none transition-colors" />
             </div>
             <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wide">Image URL</label>
                <input value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-gold-500 outline-none transition-colors" placeholder="https://..." />
             </div>
             
             {/* Hotel & Activity */}
             <div className="md:col-span-2 grid grid-cols-2 gap-6 bg-slate-700/30 p-4 rounded-xl border border-slate-600/50">
               <div className="space-y-1">
                  <label className="text-xs font-bold text-gold-400 uppercase tracking-wide">Hotels Included</label>
                  <input value={formData.hotelsIncluded} onChange={e => setFormData({...formData, hotelsIncluded: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-gold-500 outline-none" placeholder="e.g. Hyatt, Atlantis" />
               </div>
               <div className="space-y-1">
                  <label className="text-xs font-bold text-gold-400 uppercase tracking-wide">Activities Included</label>
                  <input value={formData.activitiesIncluded} onChange={e => setFormData({...formData, activitiesIncluded: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-gold-500 outline-none" placeholder="e.g. Safari, Cruise" />
               </div>
             </div>

             {/* Flight Details */}
             <div className="md:col-span-2 grid grid-cols-4 gap-4 bg-blue-900/20 p-4 rounded-xl border border-blue-800/50">
                <div className="col-span-4 mb-2 text-sm font-bold text-blue-400 flex items-center"><Plane className="h-4 w-4 mr-2"/> Flight Information (Optional)</div>
                <div className="space-y-1">
                    <label className="text-xs text-slate-400">Airline</label>
                    <input value={formData.flightAirline} onChange={e => setFormData({...formData, flightAirline: e.target.value})} className="w-full p-2 bg-slate-900 border border-slate-600 rounded text-white text-sm" placeholder="e.g. IndiGo" />
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-slate-400">Flight No</label>
                    <input value={formData.flightNumber} onChange={e => setFormData({...formData, flightNumber: e.target.value})} className="w-full p-2 bg-slate-900 border border-slate-600 rounded text-white text-sm" placeholder="6E-123" />
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-slate-400">Departure</label>
                    <input value={formData.flightDep} onChange={e => setFormData({...formData, flightDep: e.target.value})} className="w-full p-2 bg-slate-900 border border-slate-600 rounded text-white text-sm" placeholder="10:00 AM" />
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-slate-400">Arrival</label>
                    <input value={formData.flightArr} onChange={e => setFormData({...formData, flightArr: e.target.value})} className="w-full p-2 bg-slate-900 border border-slate-600 rounded text-white text-sm" placeholder="2:00 PM" />
                </div>
             </div>

             <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wide">Description</label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-gold-500 outline-none transition-colors" rows={3} placeholder="Describe the package highlights..." />
             </div>
             
             <div className="space-y-1">
                <label className="text-xs font-bold text-green-400 uppercase tracking-wide flex items-center"><CheckCircle className="h-3 w-3 mr-1"/> Inclusions (One per line)</label>
                <textarea className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-gold-500 outline-none" rows={5} value={formData.inclusions} onChange={e => setFormData({...formData, inclusions: e.target.value})} placeholder="- Breakfast&#10;- Transfers&#10;- Visa" />
             </div>
             <div className="space-y-1">
                <label className="text-xs font-bold text-red-400 uppercase tracking-wide flex items-center"><XCircle className="h-3 w-3 mr-1"/> Exclusions (One per line)</label>
                <textarea className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-gold-500 outline-none" rows={5} value={formData.exclusions} onChange={e => setFormData({...formData, exclusions: e.target.value})} placeholder="- Airfare&#10;- Lunch" />
             </div>
             
             <div className="md:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-slate-700">
               <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-3 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 font-bold transition-colors">Cancel</button>
               <button type="submit" className="px-8 py-3 bg-gold-500 text-royal-900 rounded-lg font-bold hover:bg-gold-400 shadow-lg hover:shadow-xl transition-all">Save Package</button>
             </div>
         </form>
      </Modal>
    </div>
  );
};

// --- LEADS ---
const LeadsPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);
  const initialForm = { name: '', email: '', mobile: '', destination: '', travelDate: '', budget: 0, source: 'Website', status: 'New' };
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => { setLeads(LeadService.getAll()); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = { ...formData };
    if (currentLead) LeadService.update({ ...payload, id: currentLead.id, createdAt: currentLead.createdAt });
    else LeadService.add(payload);
    setLeads(LeadService.getAll());
    setIsFormOpen(false);
    setFormData(initialForm);
    setCurrentLead(null);
  };

  const openEdit = (lead: Lead) => {
    setCurrentLead(lead);
    setFormData(lead as any);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white font-serif">Leads CRM</h1>
        <button 
          onClick={() => { setFormData(initialForm); setCurrentLead(null); setIsFormOpen(true); }} 
          className="bg-gold-500 text-royal-900 px-6 py-3 rounded-lg font-bold hover:bg-gold-400 shadow-md flex items-center transform hover:-translate-y-0.5 transition-all"
        >
           <Plus className="h-5 w-5 mr-2" /> Create Lead
        </button>
      </div>
      
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
        <table className="w-full text-left text-slate-300">
          <thead className="bg-slate-700 text-white border-b border-slate-600">
             <tr>
               <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Customer Info</th>
               <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Requirements</th>
               <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Status</th>
               <th className="px-6 py-4 text-right tracking-wider">Actions</th>
             </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {leads.map(lead => (
              <tr key={lead.id} className="hover:bg-slate-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-white text-base">{lead.name}</div>
                  <div className="text-xs text-slate-400 flex flex-col mt-1">
                    <span className="flex items-center mb-0.5"><Phone className="h-3 w-3 mr-1"/> {lead.mobile}</span>
                    <span className="flex items-center"><Mail className="h-3 w-3 mr-1"/> {lead.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gold-400 font-bold">{lead.destination}</div>
                  <div className="text-xs text-slate-500">{lead.travelDate} • Budget: ₹{lead.budget.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    lead.status === 'New' ? 'bg-blue-900 text-blue-300' :
                    lead.status === 'Booked' ? 'bg-green-900 text-green-300' :
                    'bg-slate-700 text-slate-300'
                  }`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                   <button onClick={() => openEdit(lead)} className="bg-blue-900/50 text-blue-400 hover:text-white hover:bg-blue-600 p-2 rounded-lg transition-colors"><Edit className="h-4 w-4"/></button>
                   <button onClick={() => { if(window.confirm('Delete?')) { LeadService.delete(lead.id); setLeads(LeadService.getAll()); } }} className="bg-red-900/50 text-red-400 hover:text-white hover:bg-red-600 p-2 rounded-lg transition-colors"><Trash2 className="h-4 w-4"/></button>
                </td>
              </tr>
            ))}
             {leads.length === 0 && (
               <tr><td colSpan={4} className="text-center py-12 text-slate-500">No leads found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={currentLead ? 'Edit Lead' : 'Create New Lead'}>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {['name', 'mobile', 'email', 'destination'].map(f => (
                <div key={f} className="space-y-1">
                   <label className="text-xs font-bold text-slate-200 uppercase tracking-wide">{f}</label>
                   <input required value={(formData as any)[f]} onChange={e => setFormData({...formData, [f]: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-gold-500 outline-none transition-colors" placeholder={f} />
                </div>
             ))}
             <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wide">Travel Date</label>
                <input type="date" value={formData.travelDate} onChange={e => setFormData({...formData, travelDate: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-gold-500 outline-none transition-colors" />
             </div>
             <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wide">Budget</label>
                <input type="number" value={formData.budget} onChange={e => setFormData({...formData, budget: Number(e.target.value)})} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-gold-500 outline-none transition-colors" />
             </div>
             <div className="space-y-1">
               <label className="text-xs font-bold text-slate-200 uppercase tracking-wide">Status</label>
               <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-gold-500 outline-none transition-colors">
                 {['New', 'Follow-up', 'Booked', 'Closed', 'Lost'].map(s => <option key={s} value={s}>{s}</option>)}
               </select>
             </div>
             <div className="md:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-slate-700">
                 <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-3 border border-slate-600 text-white rounded-lg hover:bg-slate-700 font-bold">Cancel</button>
                 <button type="submit" className="px-8 py-3 bg-gold-500 text-royal-900 font-bold rounded-lg hover:bg-gold-400">Save Lead</button>
             </div>
        </form>
      </Modal>
    </div>
  );
};

// --- USERS ---
const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const initialForm = { name: '', email: '', mobile: '', role: 'Staff', status: 'Active', password: '' };
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => { setUsers(UserService.getAll()); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = { ...formData };
    if (currentUser) UserService.update({ ...payload, id: currentUser.id });
    else UserService.add(payload);
    setUsers(UserService.getAll());
    setIsFormOpen(false);
    setFormData(initialForm);
    setCurrentUser(null);
  };

  const openEdit = (u: User) => {
    setCurrentUser(u);
    setFormData({...u, password: ''} as any);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
       <div className="flex justify-between items-center">
         <h1 className="text-3xl font-bold text-white font-serif">User Management</h1>
         <button onClick={() => { setIsFormOpen(true); setCurrentUser(null); setFormData(initialForm); }} className="bg-gold-500 text-royal-900 px-6 py-3 rounded-lg font-bold hover:bg-gold-400 flex items-center shadow-md transform hover:-translate-y-0.5 transition-all">
           <UserPlus className="h-5 w-5 mr-2"/> Create User
         </button>
       </div>

       <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
         <table className="w-full text-left text-slate-300">
           <thead className="bg-slate-700 text-white border-b border-slate-600">
             <tr>
               <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Name & Email</th>
               <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Role</th>
               <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Status</th>
               <th className="px-6 py-4 text-right tracking-wider">Actions</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-slate-700">
             {users.map(u => (
               <tr key={u.id} className="hover:bg-slate-700/50 transition-colors">
                 <td className="px-6 py-4">
                    <div className="font-bold text-white text-base">{u.name}</div>
                    <div className="text-xs text-slate-400">{u.email} • {u.mobile}</div>
                 </td>
                 <td className="px-6 py-4"><span className="bg-slate-900 border border-slate-600 px-2 py-1 rounded text-xs">{u.role}</span></td>
                 <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${u.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
                        {u.status}
                    </span>
                 </td>
                 <td className="px-6 py-4 text-right space-x-2">
                   <button onClick={() => openEdit(u)} className="bg-blue-900/50 text-blue-400 hover:text-white hover:bg-blue-600 p-2 rounded-lg transition-colors"><Edit className="h-4 w-4"/></button>
                   <button onClick={() => { if(window.confirm('Delete?')) { UserService.delete(u.id); setUsers(UserService.getAll()); } }} className="bg-red-900/50 text-red-400 hover:text-white hover:bg-red-600 p-2 rounded-lg transition-colors"><Trash2 className="h-4 w-4"/></button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>

       <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={currentUser ? 'Edit User' : 'Create New User'}>
           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wide">Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-gold-500 outline-none" placeholder="Full Name" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wide">Email</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-gold-500 outline-none" placeholder="email@example.com" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wide">Mobile</label>
                <input required value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-gold-500 outline-none" placeholder="Mobile Number" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wide">Role</label>
                <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-gold-500 outline-none">
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Agent">Agent</option>
                    <option value="Support">Support</option>
                </select>
              </div>
              <div className="space-y-1">
                 <label className="text-xs font-bold text-slate-200 uppercase tracking-wide">Status</label>
                 <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-gold-500 outline-none">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                 </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wide">Password</label>
                <input type="password" placeholder={currentUser ? "Leave blank to keep same" : "Enter Password"} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-gold-500 outline-none" />
              </div>
              <div className="md:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-slate-700">
                 <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-3 border border-slate-600 text-white rounded-lg hover:bg-slate-700 font-bold">Cancel</button>
                 <button type="submit" className="px-8 py-3 bg-gold-500 text-royal-900 font-bold rounded-lg hover:bg-gold-400">Save User</button>
              </div>
           </form>
       </Modal>
    </div>
  );
};

// --- SETTINGS ---
const SettingsPage = () => {
  const [settings, setSettings] = useState<CompanySettings>(SettingsService.get());
  
  // Default markup config if missing
  const [markupConfig, setMarkupConfig] = useState<MarkupConfig>(settings.markupConfig || {
      flight: { type: 'fixed', value: 0 },
      hotel: { type: 'fixed', value: 0 },
      package: { type: 'fixed', value: 0 }
  } as MarkupConfig);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    SettingsService.save(settings);
    alert('General Settings Saved Successfully!');
  };

  const handleSaveMarkup = () => {
      SettingsService.save({ ...settings, markupConfig });
      alert('Markup Settings Saved & Applied!');
  };

  const handleExportData = () => {
    const data = {
      packages: PackageService.getAll(),
      leads: LeadService.getAll(),
      users: UserService.getAll(),
      invoices: InvoiceService.getAll(),
      bookings: BookingService.getAll(),
      settings: SettingsService.get()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hamsika_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white font-serif">Company Settings</h1>
        <button onClick={handleExportData} className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 flex items-center text-sm font-bold border border-slate-600">
          <Database className="h-4 w-4 mr-2" /> Export Database
        </button>
      </div>

      {/* General Settings */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-4">General Configuration</h3>
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(settings).filter(key => key !== 'kiwiApiKey' && key !== 'markupConfig').map((key) => (
             <div key={key} className="space-y-2">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input 
                  value={(settings as any)[key]} 
                  onChange={(e) => setSettings({...settings, [key]: e.target.value})}
                  className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-gold-500 outline-none transition-colors"
                />
             </div>
          ))}

          {/* Secure API Key Field */}
           <div className="md:col-span-2 space-y-2 pt-4 border-t border-slate-700">
              <h3 className="text-lg font-bold text-gold-500 mb-4 flex items-center"><Key className="h-5 w-5 mr-2" /> Flight API Configuration</h3>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wide">Kiwi Tequila API Key</label>
                <input 
                  type="password"
                  value={settings.kiwiApiKey || ''} 
                  onChange={(e) => setSettings({...settings, kiwiApiKey: e.target.value})}
                  className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-gold-500 outline-none transition-colors"
                  placeholder="Enter your API Key here"
                />
                <p className="text-xs text-slate-500">This key is stored locally in your browser for security.</p>
              </div>
           </div>

          <div className="md:col-span-2 pt-4 border-t border-slate-700 mt-4">
             <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-500 flex items-center shadow-lg hover:shadow-xl transition-all">
               <Save className="h-5 w-5 mr-2" /> Save General Settings
             </button>
          </div>
        </form>
      </div>

      {/* Markup Settings */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 shadow-xl">
         <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-4">Markup Configuration</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['flight', 'hotel', 'package'].map((type) => (
                <div key={type} className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                    <h4 className="text-gold-400 font-bold uppercase mb-4 text-sm">{type} Markup</h4>
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setMarkupConfig({...markupConfig, [type]: { ...markupConfig[type as keyof typeof markupConfig], type: 'fixed' }})}
                                className={`flex-1 py-2 text-xs font-bold rounded ${markupConfig[type as keyof typeof markupConfig].type === 'fixed' ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-400'}`}
                            >
                                Fixed (₹)
                            </button>
                            <button 
                                onClick={() => setMarkupConfig({...markupConfig, [type]: { ...markupConfig[type as keyof typeof markupConfig], type: 'percentage' }})}
                                className={`flex-1 py-2 text-xs font-bold rounded ${markupConfig[type as keyof typeof markupConfig].type === 'percentage' ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-400'}`}
                            >
                                Percent (%)
                            </button>
                        </div>
                        <input 
                            type="number" 
                            value={markupConfig[type as keyof typeof markupConfig].value}
                            onChange={(e) => setMarkupConfig({...markupConfig, [type]: { ...markupConfig[type as keyof typeof markupConfig], value: Number(e.target.value) }})}
                            className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-white font-bold text-center"
                        />
                    </div>
                </div>
            ))}
         </div>
         <div className="mt-8">
            <button onClick={handleSaveMarkup} className="w-full bg-gold-500 text-royal-900 px-8 py-3 rounded-lg font-bold hover:bg-gold-400 flex items-center justify-center shadow-lg hover:shadow-xl transition-all">
               <Save className="h-5 w-5 mr-2" /> Save Markup Changes
            </button>
         </div>
      </div>
    </div>
  );
};

// --- INVOICES ---
const InvoicesPage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Invoice>>({
    invoiceNumber: `INV-${Date.now().toString().slice(-4)}`, date: new Date().toISOString().split('T')[0],
    dueDate: new Date().toISOString().split('T')[0], customerName: '', customerEmail: '', customerMobile: '',
    items: [], subtotal: 0, tax: 0, discount: 0, grandTotal: 0, status: 'Unpaid'
  });
  const [items, setItems] = useState<InvoiceItem[]>([]);

  useEffect(() => { setInvoices(InvoiceService.getAll()); }, []);

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), description: '', quantity: 1, unitPrice: 0, total: 0 }]);
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...items];
    const item = { ...newItems[index], [field]: value };
    if (field === 'quantity' || field === 'unitPrice') {
       item.total = Number(item.quantity) * Number(item.unitPrice);
    }
    newItems[index] = item;
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((acc, item) => acc + item.total, 0);
    const tax = Number(formData.tax || 0);
    const discount = Number(formData.discount || 0);
    return { subtotal, grandTotal: subtotal + tax - discount };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totals = calculateTotals();
    const payload: Invoice = {
      ...(formData as Invoice),
      items,
      ...totals
    };
    InvoiceService.add(payload);
    setInvoices(InvoiceService.getAll());
    setIsFormOpen(false);
    setItems([]);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white font-serif">Invoices</h1>
        <button onClick={() => setIsFormOpen(true)} className="bg-gold-500 text-royal-900 px-6 py-3 rounded-lg font-bold hover:bg-gold-400 flex items-center shadow-md transform hover:-translate-y-0.5 transition-all">
           <Plus className="h-5 w-5 mr-2" /> Generate Invoice
        </button>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
        <table className="w-full text-left text-slate-300">
          <thead className="bg-slate-700 text-white border-b border-slate-600">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Invoice #</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-right tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {invoices.map(inv => (
              <tr key={inv.id} className="hover:bg-slate-700/50 transition-colors">
                <td className="px-6 py-4 font-bold text-white font-mono">{inv.invoiceNumber}</td>
                <td className="px-6 py-4">{inv.customerName}</td>
                <td className="px-6 py-4 text-sm">{inv.date}</td>
                <td className="px-6 py-4 font-bold text-gold-400">₹{inv.grandTotal.toLocaleString()}</td>
                <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${inv.status === 'Paid' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                        {inv.status}
                    </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/invoice/${inv.id}`} target="_blank" className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center"><Eye className="h-3 w-3 mr-1"/> View</Link>
                </td>
              </tr>
            ))}
             {invoices.length === 0 && (
               <tr><td colSpan={6} className="text-center py-12 text-slate-500">No invoices generated yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title="New Invoice">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                 <label className="text-xs font-bold text-slate-200 uppercase">Customer Name</label>
                 <input required value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white" />
              </div>
              <div className="space-y-1">
                 <label className="text-xs font-bold text-slate-200 uppercase">Email</label>
                 <input required value={formData.customerEmail} onChange={e => setFormData({...formData, customerEmail: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white" />
              </div>
              <div className="space-y-1">
                 <label className="text-xs font-bold text-slate-200 uppercase">Mobile</label>
                 <input required value={formData.customerMobile} onChange={e => setFormData({...formData, customerMobile: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white" />
              </div>
              <div className="space-y-1">
                 <label className="text-xs font-bold text-slate-200 uppercase">Invoice Date</label>
                 <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white" />
              </div>
              <div className="space-y-1">
                 <label className="text-xs font-bold text-slate-200 uppercase">Due Date</label>
                 <input type="date" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white" />
              </div>
            </div>

            {/* Line Items */}
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
               <div className="flex justify-between mb-4">
                 <h4 className="font-bold text-white flex items-center"><FileText className="h-4 w-4 mr-2"/> Line Items</h4>
                 <button type="button" onClick={addItem} className="text-gold-400 text-sm font-bold hover:text-gold-300">+ Add Item</button>
               </div>
               <div className="space-y-3">
                   {items.map((item, idx) => (
                     <div key={idx} className="flex gap-2 items-center">
                        <input placeholder="Description" value={item.description} onChange={e => updateItem(idx, 'description', e.target.value)} className="flex-[3] p-2 bg-slate-900 border border-slate-500 rounded text-white" />
                        <input type="number" placeholder="Qty" value={item.quantity} onChange={e => updateItem(idx, 'quantity', Number(e.target.value))} className="flex-1 p-2 bg-slate-900 border border-slate-500 rounded text-white" />
                        <input type="number" placeholder="Price" value={item.unitPrice} onChange={e => updateItem(idx, 'unitPrice', Number(e.target.value))} className="flex-1 p-2 bg-slate-900 border border-slate-500 rounded text-white" />
                        <div className="flex-1 text-right text-white font-bold p-2">₹{item.total}</div>
                        <button type="button" onClick={() => removeItem(idx)} className="text-red-400 hover:text-red-300"><XCircle className="h-5 w-5"/></button>
                     </div>
                   ))}
               </div>
               <div className="mt-6 flex flex-col items-end gap-3 text-white border-t border-slate-600 pt-4">
                 <div className="flex items-center gap-4">
                   <span className="text-sm font-bold text-slate-300">Tax (Amount):</span>
                   <input type="number" value={formData.tax} onChange={e => setFormData({...formData, tax: Number(e.target.value)})} className="p-2 bg-slate-900 border border-slate-500 rounded text-white w-32 text-right" />
                 </div>
                 <div className="flex items-center gap-4">
                   <span className="text-sm font-bold text-slate-300">Discount:</span>
                   <input type="number" value={formData.discount} onChange={e => setFormData({...formData, discount: Number(e.target.value)})} className="p-2 bg-slate-900 border border-slate-500 rounded text-white w-32 text-right" />
                 </div>
                 <div className="text-2xl font-bold text-gold-500 mt-2">
                    Total: ₹{(items.reduce((acc, i) => acc + i.total, 0) + Number(formData.tax || 0) - Number(formData.discount || 0)).toLocaleString()}
                 </div>
               </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
              <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-3 border border-slate-600 text-white rounded-lg hover:bg-slate-700 font-bold">Cancel</button>
              <button type="submit" className="px-8 py-3 bg-gold-500 text-royal-900 font-bold rounded-lg hover:bg-gold-400">Generate Invoice</button>
            </div>
          </form>
      </Modal>
    </div>
  );
};

// --- INVOICE PRINT VIEW COMPONENT ---
export const InvoicePrint = () => {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const settings = SettingsService.get();

  useEffect(() => {
    const all = InvoiceService.getAll();
    const found = all.find(i => i.id === id);
    if (found) setInvoice(found);
  }, [id]);

  if (!invoice) return <div className="p-10 text-center">Loading Invoice...</div>;

  return (
    <div className="bg-white min-h-screen text-slate-800 p-8 md:p-16 print:p-0">
      <div className="max-w-4xl mx-auto border border-slate-200 p-12 shadow-2xl print:shadow-none print:border-none">
         {/* Header */}
         <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-8">
            <div>
               <h1 className="text-4xl font-serif font-bold text-royal-900 mb-2">{settings.brandName}</h1>
               <div className="text-sm text-slate-500 space-y-1">
                 <p>{settings.companyAddress}</p>
                 <p>Phone: {settings.companyMobile} | Email: {settings.companyEmail}</p>
                 {settings.gstNumber && <p>GSTIN: {settings.gstNumber}</p>}
               </div>
            </div>
            <div className="text-right">
               <h2 className="text-3xl font-bold text-slate-300 uppercase tracking-widest mb-4">Invoice</h2>
               <div className="space-y-1">
                 <p className="font-bold text-lg text-slate-800">#{invoice.invoiceNumber}</p>
                 <p className="text-sm text-slate-500">Date: {invoice.date}</p>
                 <p className="text-sm text-slate-500">Due Date: {invoice.dueDate}</p>
               </div>
            </div>
         </div>

         {/* Bill To */}
         <div className="mb-12">
            <h3 className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Bill To</h3>
            <h4 className="text-xl font-bold text-royal-900">{invoice.customerName}</h4>
            <div className="text-sm text-slate-600 mt-1 space-y-0.5">
               <p>{invoice.customerEmail}</p>
               <p>{invoice.customerMobile}</p>
               {invoice.customerAddress && <p>{invoice.customerAddress}</p>}
            </div>
         </div>

         {/* Table */}
         <table className="w-full mb-12 border-collapse">
            <thead>
               <tr className="bg-slate-50 text-left">
                  <th className="p-4 font-bold text-slate-600 border-b-2 border-slate-100 text-sm uppercase tracking-wide">Description</th>
                  <th className="p-4 font-bold text-slate-600 border-b-2 border-slate-100 text-center text-sm uppercase tracking-wide">Qty</th>
                  <th className="p-4 font-bold text-slate-600 border-b-2 border-slate-100 text-right text-sm uppercase tracking-wide">Unit Price</th>
                  <th className="p-4 font-bold text-slate-600 border-b-2 border-slate-100 text-right text-sm uppercase tracking-wide">Total</th>
               </tr>
            </thead>
            <tbody>
               {invoice.items.map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-50 last:border-0">
                     <td className="p-4 text-slate-700">{item.description}</td>
                     <td className="p-4 text-center text-slate-700">{item.quantity}</td>
                     <td className="p-4 text-right text-slate-700">₹{item.unitPrice.toLocaleString()}</td>
                     <td className="p-4 text-right font-bold text-slate-800">₹{item.total.toLocaleString()}</td>
                  </tr>
               ))}
            </tbody>
         </table>

         {/* Totals */}
         <div className="flex justify-end mb-16">
            <div className="w-1/2 space-y-3">
               <div className="flex justify-between text-slate-600">
                  <span className="font-medium">Subtotal</span>
                  <span>₹{invoice.subtotal.toLocaleString()}</span>
               </div>
               {invoice.tax > 0 && (
                 <div className="flex justify-between text-slate-600">
                    <span className="font-medium">Tax</span>
                    <span>₹{invoice.tax.toLocaleString()}</span>
                 </div>
               )}
               {invoice.discount > 0 && (
                 <div className="flex justify-between text-green-600">
                    <span className="font-medium">Discount</span>
                    <span>-₹{invoice.discount.toLocaleString()}</span>
                 </div>
               )}
               <div className="flex justify-between text-2xl font-bold text-royal-900 border-t-2 border-slate-100 pt-4 mt-2">
                  <span>Total</span>
                  <span>₹{invoice.grandTotal.toLocaleString()}</span>
               </div>
            </div>
         </div>

         {/* Footer */}
         <div className="text-center text-sm text-slate-400 border-t border-slate-100 pt-8 mt-auto">
            <p className="font-bold text-slate-600 mb-2">Thank you for your business!</p>
            <p className="italic">Authorized Signature</p>
            <div className="mt-8 font-serif italic text-2xl text-royal-900 opacity-20">{settings.invoiceCompanyName}</div>
         </div>
      </div>
      <div className="fixed bottom-8 right-8 print:hidden flex gap-4">
         <button onClick={() => window.print()} className="bg-royal-900 text-white px-6 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center font-bold">
            <Download className="h-5 w-5 mr-2" /> Download / Print PDF
         </button>
      </div>
    </div>
  );
};

// --- LAYOUT ---
export const AdminLayout = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') navigate('/login');
    else setIsAuthenticated(true);
  }, [navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="bg-slate-900 min-h-screen font-sans">
        <AdminSidebar />
        <div className="md:ml-64 p-8">
            <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="/leads" element={<LeadsPage />} />
                <Route path="/bookings" element={<BookingsPage />} />
                <Route path="/packages" element={<PackagesPage />} />
                <Route path="/users" element={<UserManagementPage />} />
                <Route path="/invoices" element={<InvoicesPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>
        </div>
    </div>
  );
};
