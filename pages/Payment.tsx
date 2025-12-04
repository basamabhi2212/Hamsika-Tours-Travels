
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, CheckCircle, ShieldCheck, Lock } from 'lucide-react';

export const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<'card' | 'upi'>('card');
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    // Retrieve pending booking
    const params = new URLSearchParams(location.search);
    const bookingId = params.get('bookingId');
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const current = allBookings.find((b: any) => b.id === bookingId);

    if (!current) {
      alert("Booking session expired");
      navigate('/');
    }
    setBookingData(current);
  }, [location, navigate]);

  const handlePayment = () => {
    setLoading(true);
    // Simulate Payment Gateway API Call
    setTimeout(() => {
      const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const updatedBookings = allBookings.map((b: any) => {
        if (b.id === bookingData.id) {
          return {
            ...b,
            status: 'Confirmed',
            paymentId: `TXN${Date.now()}`,
            paymentMethod: method === 'card' ? 'Credit Card' : 'UPI',
            paymentDate: new Date().toISOString()
          };
        }
        return b;
      });
      
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
      setLoading(false);
      navigate(`/confirmation?bookingId=${bookingData.id}`);
    }, 2000);
  };

  if (!bookingData) return <div className="p-10 text-center">Loading Gateway...</div>;

  // Construct UPI String for dynamic QR Code
  // Format: upi://pay?pa=ADDRESS&pn=NAME&am=AMOUNT&cu=INR
  const upiVpa = "9493936084@upi"; // Using the phone number provided as a mock VPA
  const upiName = "Hamsika Travels";
  const upiAmount = bookingData.amount;
  const upiString = `upi://pay?pa=${upiVpa}&pn=${encodeURIComponent(upiName)}&am=${upiAmount}&cu=INR&tn=BookingRef_${bookingData.id}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiString)}`;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-royal-900">Secure Payment Gateway</h1>
          <div className="flex justify-center items-center text-green-600 mt-2 text-sm font-medium">
             <ShieldCheck className="h-4 w-4 mr-1" /> 256-bit SSL Encrypted Connection
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Order Summary */}
          <div className="md:col-span-1">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4">Order Summary</h3>
                <div className="space-y-3 text-sm">
                   <div className="flex justify-between">
                     <span className="text-slate-500">Booking Ref</span>
                     <span className="font-mono text-royal-900">{bookingData.id.slice(-6).toUpperCase()}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-slate-500">Type</span>
                     <span className="font-medium">{bookingData.type}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-slate-500">Travel Date</span>
                     <span className="font-medium">{bookingData.date}</span>
                   </div>
                   <div className="border-t border-slate-100 my-2"></div>
                   <div className="flex justify-between text-lg font-bold text-royal-900">
                     <span>Total Amount</span>
                     <span>₹{bookingData.amount.toLocaleString()}</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Payment Methods */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
              <div className="flex border-b border-slate-100">
                <button 
                  onClick={() => setMethod('card')}
                  className={`flex-1 py-4 flex items-center justify-center space-x-2 font-medium transition-colors ${method === 'card' ? 'bg-royal-50 text-royal-900 border-b-2 border-royal-900' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <CreditCard className="h-5 w-5" /> <span>Card Payment</span>
                </button>
                <button 
                  onClick={() => setMethod('upi')}
                  className={`flex-1 py-4 flex items-center justify-center space-x-2 font-medium transition-colors ${method === 'upi' ? 'bg-royal-50 text-royal-900 border-b-2 border-royal-900' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <Smartphone className="h-5 w-5" /> <span>UPI / QR</span>
                </button>
              </div>

              <div className="p-8">
                {method === 'card' && (
                  <div className="space-y-4 animate-fade-in-up">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase">Card Number</label>
                       <div className="relative">
                         <CreditCard className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                         <input type="text" placeholder="0000 0000 0000 0000" className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-royal-900" />
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-royal-900" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">CVV</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <input type="password" placeholder="123" className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-royal-900" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase">Card Holder Name</label>
                       <input type="text" placeholder="Name on Card" className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-royal-900" />
                    </div>
                  </div>
                )}

                {method === 'upi' && (
                  <div className="text-center space-y-6 animate-fade-in-up py-4">
                    <div className="bg-white p-4 inline-block border-2 border-slate-900 rounded-xl shadow-inner">
                      <img src={qrCodeUrl} alt="UPI QR Code" className="w-48 h-48 mix-blend-multiply" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-royal-900">Scan to Pay ₹{bookingData.amount.toLocaleString()}</h4>
                      <p className="text-sm text-slate-500 mb-4">Use PhonePe, Google Pay, Paytm, or any UPI app</p>
                      
                      <div className="flex justify-center space-x-4 grayscale opacity-70">
                         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1280px-UPI-Logo-vector.svg.png" className="h-8" alt="UPI" />
                      </div>
                      <p className="text-xs text-slate-400 mt-4">Merchant: Hamsika Travels</p>
                    </div>
                  </div>
                )}

                <button 
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-royal-900 text-white font-bold py-4 rounded-lg mt-8 hover:bg-royal-800 transition-all flex justify-center items-center shadow-lg disabled:opacity-70"
                >
                  {loading ? (
                    <span className="flex items-center"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> Verifying Payment...</span>
                  ) : (
                    <span>{method === 'upi' ? 'I Have Paid' : `Pay ₹${bookingData.amount.toLocaleString()}`}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
