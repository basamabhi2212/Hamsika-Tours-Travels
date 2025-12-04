
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package } from '../types';
import { Clock, MapPin, Star, CheckCircle, XCircle, Printer, Download, Share2, Plane } from 'lucide-react';
import { LeadForm } from '../components/Shared';
import { PackageService } from '../services/storage';

export const PackageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // In real app we fetch, here we get from storage
  const [pkg, setPkg] = React.useState<Package | undefined>(undefined);

  React.useEffect(() => {
    const all = PackageService.getAll();
    const found = all.find(p => p.id === id);
    setPkg(found);
  }, [id]);

  if (!pkg) return <div className="p-10 text-center">Loading Package Details...</div>;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-12 print:bg-white print:pb-0">
      {/* Hero Image */}
      <div className="h-[50vh] relative w-full overflow-hidden print:h-[300px]">
        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent print:hidden"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 text-white print:text-black print:static print:p-0 print:mt-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{pkg.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm md:text-base">
              <span className="flex items-center"><Clock className="h-5 w-5 mr-2 text-gold-500" /> {pkg.duration}</span>
              <span className="flex items-center"><MapPin className="h-5 w-5 mr-2 text-gold-500" /> {pkg.destination}</span>
              <span className="flex items-center"><Star className="h-5 w-5 mr-2 text-gold-500 fill-current" /> {pkg.rating}/5 Ratings</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 print:mt-8 print:block">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 print:shadow-none print:border-none print:p-0">
            <h2 className="text-2xl font-bold text-royal-900 mb-4 font-serif">Overview</h2>
            <p className="text-slate-600 leading-relaxed">{pkg.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 print:grid-cols-2">
              <div>
                <h3 className="font-bold text-green-700 mb-3 flex items-center"><CheckCircle className="h-5 w-5 mr-2" /> Inclusions</h3>
                <ul className="space-y-2">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start"><span className="mr-2">•</span> {inc}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-red-700 mb-3 flex items-center"><XCircle className="h-5 w-5 mr-2" /> Exclusions</h3>
                <ul className="space-y-2">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start"><span className="mr-2">•</span> {exc}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <h3 className="font-bold text-slate-800 mb-2">Hotels Included</h3>
                   <p className="text-sm text-slate-600">{pkg.hotelsIncluded}</p>
                </div>
                <div>
                   <h3 className="font-bold text-slate-800 mb-2">Activities Covered</h3>
                   <p className="text-sm text-slate-600">{pkg.activitiesIncluded}</p>
                </div>
            </div>

            {/* Flight Details if available */}
            {pkg.flightDetails && (
                <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-800 mb-4 flex items-center"><Plane className="h-5 w-5 mr-2" /> Flight Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="block text-slate-500 text-xs">Airline</span>
                            <span className="font-bold text-slate-800">{pkg.flightDetails.airline}</span>
                        </div>
                        <div>
                            <span className="block text-slate-500 text-xs">Flight No</span>
                            <span className="font-bold text-slate-800">{pkg.flightDetails.flightNumber}</span>
                        </div>
                        <div>
                            <span className="block text-slate-500 text-xs">Departure</span>
                            <span className="font-bold text-slate-800">{pkg.flightDetails.departureTime}</span>
                        </div>
                        <div>
                            <span className="block text-slate-500 text-xs">Arrival</span>
                            <span className="font-bold text-slate-800">{pkg.flightDetails.arrivalTime}</span>
                        </div>
                    </div>
                </div>
            )}
          </div>

          {/* Itinerary */}
          {pkg.itinerary && pkg.itinerary.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 print:shadow-none print:border-none print:p-0 print:break-before-page">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-2xl font-bold text-royal-900 font-serif">Day-wise Itinerary</h2>
               <button onClick={handlePrint} className="flex items-center space-x-2 text-royal-900 hover:text-gold-600 font-medium print:hidden">
                 <Printer className="h-4 w-4" /> <span>Download PDF</span>
               </button>
            </div>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              {pkg.itinerary.map((day) => (
                <div key={day.day} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-royal-50 text-royal-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">
                    {day.day}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 mb-1">{day.title}</h3>
                    <p className="text-sm text-slate-500">{day.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}

        </div>

        {/* Sidebar Booking Form */}
        <div className="lg:col-span-1 print:hidden">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6">
              <div className="text-slate-500 text-sm mb-1">Starting from</div>
              <div className="text-3xl font-bold text-royal-900 mb-6">₹{pkg.price.toLocaleString()} <span className="text-sm font-normal text-slate-400">/ person</span></div>
              
              <button className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all mb-4">
                Book This Package
              </button>
              <button className="w-full bg-white border border-royal-200 text-royal-900 font-bold py-3 rounded-lg hover:bg-royal-50 transition-all flex justify-center items-center">
                <Share2 className="h-4 w-4 mr-2" /> Share Itinerary
              </button>
            </div>
            
            <LeadForm />
          </div>
        </div>
      </div>
      
      {/* Print Footer */}
      <div className="hidden print:block mt-12 text-center border-t border-slate-300 pt-8">
        <h2 className="text-xl font-serif font-bold text-royal-900">Hamsika Travels</h2>
        <p className="text-slate-500 text-sm">Your Journey, Made Beautiful.</p>
        <p className="text-slate-500 text-sm mt-2">+91 9493936084 | abhishekamt0@gmail.com</p>
      </div>
    </div>
  );
};
