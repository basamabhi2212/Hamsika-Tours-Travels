
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer, AIChatWidget } from './components/Layout';
import { Home } from './pages/Home';
import { Flights } from './pages/Listings';
import { Hotels } from './pages/Listings';
import { Packages } from './pages/Packages';
import { Activities } from './pages/Listings';
import { PackageDetails } from './pages/PackageDetails';
import { FlightBooking } from './pages/FlightBooking';
import { Payment } from './pages/Payment';
import { BookingConfirmation } from './pages/BookingConfirmation';
import { PaymentStatus } from './pages/PaymentStatus';
import { AdminLayout, InvoicePrint } from './pages/Admin';
import { Login } from './pages/Login';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        {/* Navbar is conditional inside layouts mostly, but we want it everywhere except maybe print view or login */}
        <div className="no-print">
            <Navbar />
        </div>
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/package/:id" element={<PackageDetails />} />
            <Route path="/flight-booking" element={<FlightBooking />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/confirmation" element={<BookingConfirmation />} />
            <Route path="/payment-status" element={<PaymentStatus />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path="/invoice/:id" element={<InvoicePrint />} />
          </Routes>
        </main>

        <div className="no-print">
            <Footer />
            <AIChatWidget />
        </div>
      </div>
    </Router>
  );
};

export default App;
