
import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Clock, CreditCard, AlertCircle } from 'lucide-react';
import { Booking } from '../types';

export const PaymentStatus: React.FC = () => {
  const [bookingId, setBookingId] = useState('');
  const [result, setResult] = useState<Booking | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const allBookings: Booking[] = JSON.parse(localStorage.getItem('bookings') || '[]');
    // Case insensitive search
    const found = allBookings.find(b => b.id.toLowerCase() === bookingId.toLowerCase().trim());
    setResult(found || null);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        
        <div className="text-center mb-10">
           <h1 className="text-3xl font-serif font-bold text-royal-900 mb-2">Check Payment Status</h1>
           <p className="text-slate-500">Enter your Booking Reference ID to track your payment and booking status.</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8 mb-8 animate-fade-in-up">
           <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Enter Booking ID (e.g. BK171...)" 
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                className="flex-1 p-4 border border-slate-300 rounded-lg outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-lg uppercase tracking-wider"
                required
              />
              <button 
                type="submit" 
                className="bg-royal-900 text-white px-8 py-4 rounded-lg font-bold hover:bg-royal-800 transition-colors flex items-center justify-center"
              >
                 <Search className="h-5 w-5 mr-2" /> Check Status
              </button>
           </form>
        </div>

        {searched && (
          <div className="animate-fade-in-up">
            {result ? (
              <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                 <div className={`p-6 text-white flex items-center justify-between ${
                    result.status === 'Confirmed' ? 'bg-green-600' : 
                    result.status === 'Cancelled' ? 'bg-red-600' : 'bg-gold-500'
                 }`}>
                    <div className="flex items-center">
                       {result.status === 'Confirmed' ? <CheckCircle className="h-8 w-8 mr-3"/> :
                        result.status === 'Cancelled' ? <XCircle className="h-8 w-8 mr-3"/> :
                        <Clock className="h-8 w-8 mr-3"/>
                       }
                       <div>
                          <div className="text-xs font-bold uppercase opacity-80">Booking Status</div>
                          <div className="text-2xl font-bold">{result.status}</div>
                       </div>
                    </div>
                    <div className="text-right hidden md:block">
                        <div className="text-xs opacity-80">Booking Ref</div>
                        <div className="font-mono font-bold">{result.id}</div>
                    </div>
                 </div>

                 <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div>
                          <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 tracking-wider">Payment Details</h3>
                          <div className="space-y-4">
                             <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                                <span className="text-slate-600">Amount Paid</span>
                                <span className="font-bold text-xl text-royal-900">₹{result.amount.toLocaleString()}</span>
                             </div>
                             <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                                <span className="text-slate-600">Payment Method</span>
                                <span className="font-medium flex items-center">
                                    <CreditCard className="h-4 w-4 mr-2 text-slate-400"/>
                                    {result.paymentMethod || 'Pending'}
                                </span>
                             </div>
                             <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                                <span className="text-slate-600">Transaction ID</span>
                                <span className="font-mono text-slate-800">{result.paymentId || '-'}</span>
                             </div>
                             <div className="flex justify-between items-center">
                                <span className="text-slate-600">Date</span>
                                <span className="text-slate-800">{result.paymentDate ? new Date(result.paymentDate).toLocaleDateString() : '-'}</span>
                             </div>
                          </div>
                       </div>

                       <div>
                          <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 tracking-wider">Booking Info</h3>
                          <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                              <div className="mb-2">
                                 <span className="text-xs text-slate-500 block">Customer Name</span>
                                 <span className="font-bold text-slate-800">{result.customerName}</span>
                              </div>
                              <div className="mb-2">
                                 <span className="text-xs text-slate-500 block">Service Type</span>
                                 <span className="font-bold text-slate-800">{result.type}</span>
                              </div>
                              <div className="mb-2">
                                 <span className="text-xs text-slate-500 block">Travel Date</span>
                                 <span className="font-bold text-slate-800">{result.date}</span>
                              </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow p-8 text-center border border-slate-100">
                 <div className="bg-red-50 text-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="h-8 w-8" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-800 mb-2">Booking Not Found</h3>
                 <p className="text-slate-500">
                    We couldn't find any booking with ID <span className="font-bold font-mono text-slate-700">"{bookingId}"</span>. 
                    <br/>Please check the ID and try again.
                 </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
