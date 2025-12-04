import React from 'react';
import { Star, Clock, MapPin, Check, ArrowRight, Plane, Coffee, Wifi, Calendar, Luggage, Info } from 'lucide-react';
import { Flight, Hotel, Package, Activity } from '../types';
import { Link, useNavigate } from 'react-router-dom';

export const FlightCard: React.FC<{ flight: Flight }> = ({ flight }) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate('/flight-booking', { state: { flight } });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-4 hover:shadow-md transition-shadow animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        {/* Airline Info */}
        <div className="flex items-center space-x-4 w-full md:w-1/4">
          <div className="p-2 border border-slate-100 rounded-lg">
            <img src={flight.airlineLogo} alt={flight.airline} className="h-10 w-10 object-contain" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-lg">{flight.airline}</h4>
            <div className="flex items-center text-xs text-slate-500 mt-1 space-x-2">
              <span className="bg-slate-100 px-2 py-0.5 rounded font-mono">{flight.flightNumber}</span>
            </div>
          </div>
        </div>
        
        {/* Flight Route & Timing */}
        <div className="flex-1 px-4 flex items-center justify-center space-x-6 text-center w-full md:w-1/2">
          <div className="text-right min-w-[60px]">
            <div className="text-xl font-bold text-slate-800">{flight.departureTime}</div>
            <div className="text-sm text-slate-500 font-medium">{flight.from}</div>
          </div>
          
          <div className="flex flex-col items-center flex-1 max-w-[120px]">
            <div className="text-xs text-slate-400 mb-1">{flight.duration}</div>
            <div className="w-full h-[1px] bg-slate-300 relative my-1">
               <Plane className="h-3 w-3 text-gold-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90" />
            </div>
            <div className="text-xs text-gold-600 mt-1 font-medium whitespace-nowrap">
              {flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop`}
            </div>
          </div>
          
          <div className="text-left min-w-[60px]">
            <div className="text-xl font-bold text-slate-800">{flight.arrivalTime}</div>
            <div className="text-sm text-slate-500 font-medium">{flight.to}</div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto mt-4 md:mt-0 gap-3 md:pl-6 md:border-l md:border-slate-100">
          <div className="text-right">
             <div className="text-2xl font-bold text-royal-900">₹{flight.price.toLocaleString()}</div>
             <div className="flex items-center justify-end text-xs text-slate-500 mt-1 bg-blue-50 px-2 py-1 rounded text-blue-700">
               <Luggage className="h-3 w-3 mr-1" /> {flight.baggage}
             </div>
          </div>
          
          <button 
            onClick={handleSelect}
            className="bg-royal-900 text-white px-8 py-2.5 rounded-lg text-sm font-bold hover:bg-royal-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export const HotelCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all group flex flex-col md:flex-row h-full md:h-64 mb-6">
    <div className="md:w-1/3 relative overflow-hidden">
      <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md flex items-center text-xs font-bold shadow-sm">
        <Star className="h-3 w-3 text-gold-500 fill-current mr-1" />
        {hotel.rating}
      </div>
    </div>
    <div className="p-6 md:w-2/3 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-1">{hotel.name}</h3>
        <div className="flex items-center text-slate-500 text-sm mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          {hotel.location}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.map(am => (
            <span key={am} className="text-xs bg-slate-50 text-slate-600 px-2 py-1 rounded border border-slate-100 flex items-center">
              {am === 'WiFi' && <Wifi className="h-3 w-3 mr-1" />}
              {am === 'Breakfast' && <Coffee className="h-3 w-3 mr-1" />}
              {am}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-end justify-between border-t border-slate-100 pt-4">
        <div>
          <span className="text-slate-400 text-xs">Per Night</span>
          <div className="text-2xl font-bold text-royal-900">₹{hotel.pricePerNight.toLocaleString()}</div>
        </div>
        <button className="bg-white border border-royal-900 text-royal-900 hover:bg-royal-50 px-6 py-2 rounded-lg font-medium transition-colors">
          View Details
        </button>
      </div>
    </div>
  </div>
);

export const PackageCard: React.FC<{ pkg: Package }> = ({ pkg }) => (
  <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl transition-all group flex flex-col h-full">
    <div className="h-48 relative overflow-hidden">
      <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-xl font-bold font-serif">{pkg.title}</h3>
        <div className="flex items-center text-sm opacity-90">
          <Clock className="h-3 w-3 mr-1" /> {pkg.duration}
        </div>
      </div>
    </div>
    <div className="p-5 flex flex-col flex-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center text-sm text-slate-600">
           <MapPin className="h-4 w-4 mr-1 text-gold-500" /> {pkg.destination}
        </div>
        <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-bold">
          {pkg.rating} <Star className="h-3 w-3 ml-1 fill-current" />
        </div>
      </div>
      <p className="text-slate-500 text-sm line-clamp-3 mb-4 flex-1">{pkg.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {pkg.inclusions.slice(0,3).map((inc, i) => (
          <span key={i} className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100">{inc}</span>
        ))}
        {pkg.inclusions.length > 3 && <span className="text-xs text-slate-500 px-2 py-1">+ {pkg.inclusions.length - 3} more</span>}
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div>
           <span className="text-xs text-slate-400 block">Starting from</span>
           <span className="text-xl font-bold text-royal-900">₹{pkg.price.toLocaleString()}</span>
        </div>
        <Link to={`/package/${pkg.id}`} className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          View Details
        </Link>
      </div>
    </div>
  </div>
);

export const LeadForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Our travel expert will contact you shortly.");
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
      <h3 className="text-xl font-bold text-royal-900 mb-2 font-serif">Get a Custom Quote</h3>
      <p className="text-slate-500 text-sm mb-6">Tell us your plans, and we'll craft the perfect itinerary.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-royal-500 outline-none transition-colors text-sm" required />
        <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-royal-500 outline-none transition-colors text-sm" required />
        <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-royal-500 outline-none transition-colors text-sm" required />
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Destination" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-royal-500 outline-none transition-colors text-sm" />
          <input type="date" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-royal-500 outline-none transition-colors text-sm text-slate-500" />
        </div>
        <textarea placeholder="Any specific requirements?" rows={3} className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-royal-500 outline-none transition-colors text-sm"></textarea>
        
        <div className="flex items-center space-x-2">
           <input type="checkbox" id="whatsapp" className="rounded text-royal-900 focus:ring-royal-500" />
           <label htmlFor="whatsapp" className="text-sm text-slate-600">Contact me via WhatsApp</label>
        </div>

        <button type="submit" className="w-full bg-royal-900 text-white font-bold py-3 rounded-lg hover:bg-royal-800 transition-colors shadow-lg">
          Submit Enquiry
        </button>
      </form>
    </div>
  );
};