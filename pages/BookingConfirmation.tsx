import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Printer, Home, Plane, Download } from 'lucide-react';

export const BookingConfirmation: React.FC = () => {
  const location = useLocation();
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const bookingId = params.get('bookingId');
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const current = allBookings.find((b: any) => b.id === bookingId);
    setBooking(current);
  }, [location]);

  if (!booking) return <div className="p-10 text-center">Loading Booking Details...</div>;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Success Header */}
        <div className="bg-white rounded-t-2xl p-8 text-center border-b border-slate-100 shadow-sm">
          <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-royal-900 mb-2">Booking Confirmed!</h1>
          <p className="text-slate-500">Thank you for booking with Hamsika Travels. Your e-ticket has been sent to <span className="font-bold text-slate-800">{booking.customerEmail}</span></p>
        </div>

        {/* Ticket Details */}
        <div className="bg-white p-8 shadow-sm">
           <div className="flex justify-between items-start mb-8">
             <div>
               <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Booking Reference</div>
               <div className="text-xl font-mono font-bold text-royal-900">{booking.id.slice(0, 8).toUpperCase()}</div>
             </div>
             <div className="text-right">
               <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payment Status</div>
               <div className="text-green-600 font-bold flex items-center justify-end"><CheckCircle className="h-4 w-4 mr-1"/> Paid</div>
               <div className="text-xs text-slate-400 mt-1">Txn ID: {booking.paymentId}</div>
             </div>
           </div>

           <div className="border border-slate-200 rounded-xl p-6 mb-8">
              <div className="flex items-center space-x-3 mb-4">
                 <Plane className="h-6 w-6 text-royal-900" />
                 <h3 className="font-bold text-lg text-slate-800">Flight Details</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                 <div>
                    <span className="block text-slate-400 text-xs">Airline</span>
                    <span className="font-bold text-slate-800">{booking.details.airline}</span>
                 </div>
                 <div>
                    <span className="block text-slate-400 text-xs">Flight No</span>
                    <span className="font-bold text-slate-800">{booking.details.flightNumber}</span>
                 </div>
                 <div>
                    <span className="block text-slate-400 text-xs">From</span>
                    <span className="font-bold text-slate-800">{booking.details.from}</span>
                 </div>
                 <div>
                    <span className="block text-slate-400 text-xs">To</span>
                    <span className="font-bold text-slate-800">{booking.details.to}</span>
                 </div>
              </div>
           </div>

           <div className="border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-slate-800 mb-4">Passenger(s)</h3>
              <div className="space-y-2">
                 {booking.details.passengers.map((p: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm border-b border-slate-50 last:border-0 pb-2 last:pb-0">
                       <span className="font-medium text-slate-700">{p.title} {p.firstName} {p.lastName}</span>
                       <span className="text-slate-500">{p.type}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-100 rounded-b-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
           <Link to="/" className="text-slate-600 font-medium hover:text-royal-900 flex items-center">
             <Home className="h-4 w-4 mr-2" /> Back to Home
           </Link>
           <button onClick={() => window.print()} className="bg-royal-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-royal-800 transition-colors flex items-center shadow-md">
             <Printer className="h-4 w-4 mr-2" /> Print E-Ticket
           </button>
        </div>
      </div>
    </div>
  );
};
