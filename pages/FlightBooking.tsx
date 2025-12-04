import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flight, Passenger } from '../types';
import { ShieldCheck, User, Luggage, Armchair, Plus, Trash2 } from 'lucide-react';

export const FlightBooking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const flight = location.state?.flight as Flight;
  
  const [passengers, setPassengers] = useState<Passenger[]>([
    { type: 'Adult', title: 'Mr', firstName: '', lastName: '', gender: 'Male' }
  ]);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  if (!flight) return <div className="p-8 text-center">No flight selected. Please search again.</div>;

  const handleAddPassenger = () => {
    setPassengers([...passengers, { type: 'Adult', title: 'Mr', firstName: '', lastName: '', gender: 'Male' }]);
  };

  const handleRemovePassenger = (index: number) => {
    if (passengers.length > 1) {
      const newPax = [...passengers];
      newPax.splice(index, 1);
      setPassengers(newPax);
    }
  };

  const updatePassenger = (index: number, field: keyof Passenger, value: string) => {
    const newPax = [...passengers];
    newPax[index] = { ...newPax[index], [field]: value };
    setPassengers(newPax);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalAmount = flight.price * passengers.length;
    
    // Create Booking Object
    const newBooking = {
      id: `BK${Date.now()}`,
      type: 'Flight',
      date: new Date().toISOString().split('T')[0],
      customerName: `${passengers[0].firstName} ${passengers[0].lastName}`,
      customerEmail: email,
      customerPhone: mobile,
      status: 'Pending',
      amount: totalAmount,
      details: {
        flightId: flight.id,
        airline: flight.airline,
        flightNumber: flight.flightNumber,
        from: flight.from,
        to: flight.to,
        passengers: passengers
      }
    };

    // Save to local storage mock DB
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([...existingBookings, newBooking]));

    // Redirect to Payment
    navigate(`/payment?bookingId=${newBooking.id}`);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-serif font-bold text-royal-900 mb-8">Complete Your Booking</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Passenger Details */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-lg text-royal-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" /> Passenger Details
              </h3>
              
              <div className="space-y-6">
                {passengers.map((pax, index) => (
                  <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-200 relative">
                    <div className="flex justify-between items-center mb-3">
                       <span className="text-xs font-bold text-slate-500 uppercase">Passenger {index + 1}</span>
                       {index > 0 && (
                         <button onClick={() => handleRemovePassenger(index)} className="text-red-500 hover:text-red-700">
                           <Trash2 className="h-4 w-4" />
                         </button>
                       )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Title</label>
                        <select 
                          value={pax.title}
                          onChange={(e) => updatePassenger(index, 'title', e.target.value)}
                          className="w-full p-2 rounded border border-slate-300 text-sm outline-none focus:border-royal-500"
                        >
                          <option>Mr</option>
                          <option>Ms</option>
                          <option>Mrs</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">First Name</label>
                        <input 
                          type="text" 
                          required
                          value={pax.firstName}
                          onChange={(e) => updatePassenger(index, 'firstName', e.target.value)}
                          className="w-full p-2 rounded border border-slate-300 text-sm outline-none focus:border-royal-500"
                          placeholder="As per ID"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Last Name</label>
                        <input 
                          type="text" 
                          required
                          value={pax.lastName}
                          onChange={(e) => updatePassenger(index, 'lastName', e.target.value)}
                          className="w-full p-2 rounded border border-slate-300 text-sm outline-none focus:border-royal-500"
                          placeholder="Surname"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                type="button" 
                onClick={handleAddPassenger}
                className="mt-4 text-royal-900 text-sm font-bold flex items-center hover:text-gold-600 transition-colors"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Another Passenger
              </button>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
               <h3 className="font-bold text-lg text-royal-900 mb-4">Contact Information</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 font-bold uppercase mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:border-royal-500"
                      placeholder="ticket@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 font-bold uppercase mb-1">Mobile Number</label>
                    <input 
                      type="tel" 
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:border-royal-500"
                      placeholder="+91 98765 43210"
                    />
                  </div>
               </div>
               <div className="mt-2 text-xs text-slate-500">
                 Your ticket will be sent to this email and mobile number.
               </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start">
              <ShieldCheck className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-bold">Secure Booking</p>
                <p>Your personal data is protected. By booking, you agree to our terms and conditions.</p>
              </div>
            </div>

          </div>

          {/* Fare Summary Sidebar */}
          <div className="lg:col-span-1">
             <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 sticky top-24">
                <h3 className="font-bold text-lg text-royal-900 mb-4">Fare Summary</h3>
                
                <div className="flex items-start space-x-3 mb-6 pb-6 border-b border-slate-100">
                   <img src={flight.airlineLogo} alt={flight.airline} className="h-10 w-10 object-contain" />
                   <div>
                      <div className="font-bold text-slate-800">{flight.airline}</div>
                      <div className="text-xs text-slate-500">{flight.flightNumber} • {flight.from} → {flight.to}</div>
                      <div className="text-xs text-slate-500 mt-1">{flight.duration} • {flight.stops === 0 ? 'Non-stop' : '1 Stop'}</div>
                   </div>
                </div>

                <div className="space-y-3 text-sm mb-6">
                   <div className="flex justify-between">
                      <span className="text-slate-600">Base Fare ({passengers.length} Pax)</span>
                      <span className="font-medium">₹{(flight.price * passengers.length).toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-slate-600">Taxes & Fees</span>
                      <span className="font-medium">₹{(500 * passengers.length).toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹0</span>
                   </div>
                </div>

                <div className="flex justify-between items-center text-lg font-bold text-royal-900 border-t border-slate-100 pt-4 mb-6">
                   <span>Total Pay</span>
                   <span>₹{(flight.price * passengers.length + 500 * passengers.length).toLocaleString()}</span>
                </div>

                <button 
                  onClick={handleBooking}
                  className="w-full bg-royal-900 text-white font-bold py-4 rounded-lg hover:bg-royal-800 transition-all shadow-lg transform hover:-translate-y-0.5"
                >
                  Proceed to Payment
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
