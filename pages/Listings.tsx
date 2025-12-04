
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FlightCard, HotelCard } from '../components/Shared';
import { Flight, Hotel, Activity } from '../types';
import { Filter, Sliders, MapPin } from 'lucide-react';
import { searchFlights } from '../services/flightApi';

// Mock Data for other tabs
const hotels: Hotel[] = [
  { id: '1', name: 'Taj Krishna', location: 'Banjara Hills, Hyderabad', rating: 5, pricePerNight: 12000, amenities: ['WiFi', 'Pool', 'Spa', 'Breakfast'], image: 'https://picsum.photos/400/300?random=10' },
  { id: '2', name: 'ITC Kohenur', location: 'HITEC City, Hyderabad', rating: 5, pricePerNight: 15500, amenities: ['WiFi', 'Pool', 'Gym', 'Bar'], image: 'https://picsum.photos/400/300?random=11' },
  { id: '3', name: 'Novotel', location: 'Airport, Hyderabad', rating: 4, pricePerNight: 8500, amenities: ['WiFi', 'Shuttle', 'Breakfast'], image: 'https://picsum.photos/400/300?random=12' },
];

const activities: Activity[] = [
  { id: '1', title: 'Burj Khalifa At The Top', location: 'Dubai', price: 4000, image: 'https://picsum.photos/400/300?random=20', rating: 4.8, duration: '2 Hours' },
  { id: '2', title: 'Desert Safari with BBQ', location: 'Dubai', price: 3500, image: 'https://picsum.photos/400/300?random=21', rating: 4.9, duration: '6 Hours' },
  { id: '3', title: 'Scuba Diving', location: 'Andaman', price: 6000, image: 'https://picsum.photos/400/300?random=22', rating: 4.7, duration: '3 Hours' },
];

const SidebarFilter = ({ title, options, selected, onChange }: { title: string, options: string[], selected: string[], onChange: (val: string) => void }) => {
  return (
    <div className="mb-6">
      <h4 className="font-bold text-slate-800 mb-3">{title}</h4>
      <div className="space-y-2">
        {options.map(opt => (
          <div key={opt} className="flex items-center group">
            <input 
              type="checkbox" 
              id={`${title}-${opt}`} 
              checked={selected.includes(opt)}
              onChange={() => onChange(opt)}
              className="rounded text-royal-900 focus:ring-royal-500 border-slate-300 w-4 h-4 cursor-pointer" 
            />
            <label htmlFor={`${title}-${opt}`} className="ml-2 text-sm text-slate-600 cursor-pointer select-none group-hover:text-royal-900 transition-colors">{opt}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Flights: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);

  // Filter States
  const [selectedStops, setSelectedStops] = useState<string[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedDepTimes, setSelectedDepTimes] = useState<string[]>([]);
  const [selectedArrTimes, setSelectedArrTimes] = useState<string[]>([]);

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      const params = new URLSearchParams(location.search);
      // Fetch using the smart service (Real API -> Mock Fallback)
      const results = await searchFlights({
        from: { code: params.get('from') || 'HYD', city: '', name: '', country: '' },
        to: { code: params.get('to') || 'DXB', city: '', name: '', country: '' },
        departDate: params.get('depart') || '',
        returnDate: params.get('return') || undefined,
        travelers: {
           adults: Number(params.get('adults')) || 1,
           children: 0, infants: 0,
           class: params.get('class') as any || 'Economy'
        },
        tripType: 0 as any
      });
      setFlights(results);
      setLoading(false);
    };

    fetchFlights();
  }, [location.search]);

  // Helper for Time Filtering
  const checkTime = (timeStr: string, filters: string[]) => {
    if (filters.length === 0) return true;
    const hour = parseInt(timeStr.split(':')[0]);
    let label = '';
    
    if (hour >= 6 && hour < 12) label = 'Morning';
    else if (hour >= 12 && hour < 18) label = 'Afternoon';
    else if (hour >= 18 && hour < 24) label = 'Evening';
    else label = 'Night'; // 0-6 AM

    return filters.some(f => f.startsWith(label));
  };

  // Apply Filters
  useEffect(() => {
    let result = flights;

    // Filter by Stops
    if (selectedStops.length > 0) {
      result = result.filter(f => {
        const stopLabel = f.stops === 0 ? 'Non-stop' : f.stops === 1 ? '1 Stop' : '2+ Stops';
        return selectedStops.includes(stopLabel);
      });
    }

    // Filter by Airlines
    if (selectedAirlines.length > 0) {
      result = result.filter(f => selectedAirlines.includes(f.airline)); // Note: Kiwi API returns codes, might need mapping
    }

    // Filter by Departure Time
    if (selectedDepTimes.length > 0) {
      result = result.filter(f => checkTime(f.departureTime, selectedDepTimes));
    }

    // Filter by Arrival Time
    if (selectedArrTimes.length > 0) {
      result = result.filter(f => checkTime(f.arrivalTime, selectedArrTimes));
    }

    setFilteredFlights(result);
  }, [flights, selectedStops, selectedAirlines, selectedDepTimes, selectedArrTimes]);

  const toggleFilter = (item: string, current: string[], setter: (val: string[]) => void) => {
    if (current.includes(item)) {
      setter(current.filter(i => i !== item));
    } else {
      setter([...current, item]);
    }
  };

  const clearAllFilters = () => {
    setSelectedStops([]);
    setSelectedAirlines([]);
    setSelectedDepTimes([]);
    setSelectedArrTimes([]);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-serif font-bold text-royal-900 mb-8">Search Results</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto hide-scrollbar">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-50">
                <h3 className="font-bold text-lg flex items-center"><Filter className="h-4 w-4 mr-2" /> Filters</h3>
                <button onClick={clearAllFilters} className="text-xs font-bold text-royal-900 hover:text-gold-600">RESET ALL</button>
              </div>
              
              <SidebarFilter 
                title="Stops" 
                options={['Non-stop', '1 Stop', '2+ Stops']} 
                selected={selectedStops}
                onChange={(val) => toggleFilter(val, selectedStops, setSelectedStops)}
              />
              
              <SidebarFilter 
                title="Airlines" 
                options={['IndiGo', 'Air India', 'Vistara', 'Emirates', 'Qatar Airways']} 
                selected={selectedAirlines}
                onChange={(val) => toggleFilter(val, selectedAirlines, setSelectedAirlines)}
              />
              
              <div className="border-t border-slate-50 pt-4 mt-4">
                <SidebarFilter 
                  title="Departure Time" 
                  options={['Morning (6AM-12PM)', 'Afternoon (12PM-6PM)', 'Evening (6PM-12AM)', 'Night (12AM-6AM)']} 
                  selected={selectedDepTimes}
                  onChange={(val) => toggleFilter(val, selectedDepTimes, setSelectedDepTimes)}
                />
              </div>

              <div className="border-t border-slate-50 pt-4 mt-4">
                <SidebarFilter 
                  title="Arrival Time" 
                  options={['Morning (6AM-12PM)', 'Afternoon (12PM-6PM)', 'Evening (6PM-12AM)', 'Night (12AM-6AM)']} 
                  selected={selectedArrTimes}
                  onChange={(val) => toggleFilter(val, selectedArrTimes, setSelectedArrTimes)}
                />
              </div>
              
            </div>
          </div>

          {/* Listings */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="space-y-4">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="bg-white h-48 rounded-xl animate-pulse shadow-sm p-6">
                      <div className="flex justify-between h-full">
                         <div className="w-1/4 bg-slate-100 rounded-lg"></div>
                         <div className="w-1/2 mx-4 bg-slate-100 rounded-lg"></div>
                         <div className="w-1/4 bg-slate-100 rounded-lg"></div>
                      </div>
                    </div>
                 ))}
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-slate-500 font-medium">
                  Showing {filteredFlights.length} flights
                </div>
                {filteredFlights.length > 0 ? (
                  filteredFlights.map(f => <FlightCard key={f.id} flight={f} />)
                ) : (
                  <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-100">
                    <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                       <Filter className="h-8 w-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">No flights found</h3>
                    <p className="text-slate-500 mb-6">Try adjusting your filters to see more results.</p>
                    <button 
                      onClick={clearAllFilters} 
                      className="text-white bg-royal-900 px-6 py-2 rounded-lg font-bold hover:bg-royal-800 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Hotels: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-serif font-bold text-royal-900 mb-8">Find Hotels</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Filters</h3>
                <Filter className="h-4 w-4 text-slate-400" />
              </div>
              {/* Note: In a real app, logic would be similar to Flights component */}
              <div className="mb-6">
                <h4 className="font-bold text-slate-800 mb-3">Star Rating</h4>
                {['5 Star', '4 Star', '3 Star'].map(opt => (
                  <div key={opt} className="flex items-center mb-2">
                    <input type="checkbox" id={opt} className="rounded text-royal-900 focus:ring-royal-500 border-slate-300 w-4 h-4" />
                    <label htmlFor={opt} className="ml-2 text-sm text-slate-600 cursor-pointer">{opt}</label>
                  </div>
                ))}
              </div>
              <div className="mb-6">
                <h4 className="font-bold text-slate-800 mb-3">Amenities</h4>
                {['WiFi', 'Pool', 'Breakfast Included', 'Spa'].map(opt => (
                  <div key={opt} className="flex items-center mb-2">
                    <input type="checkbox" id={opt} className="rounded text-royal-900 focus:ring-royal-500 border-slate-300 w-4 h-4" />
                    <label htmlFor={opt} className="ml-2 text-sm text-slate-600 cursor-pointer">{opt}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:w-3/4 grid grid-cols-1 gap-6">
            {hotels.map(h => <HotelCard key={h.id} hotel={h} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Activities: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-serif font-bold text-royal-900 mb-8">Experiences & Activities</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activities.map(act => (
             <div key={act.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all group">
                <div className="h-48 overflow-hidden relative">
                   <img src={act.image} alt={act.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                   <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold shadow">
                     {act.duration}
                   </div>
                </div>
                <div className="p-4">
                   <h3 className="font-bold text-slate-800 mb-1">{act.title}</h3>
                   <p className="text-sm text-slate-500 mb-3 flex items-center"><MapPin className="h-3 w-3 mr-1" /> {act.location}</p>
                   <div className="flex items-center justify-between">
                     <div className="text-royal-900 font-bold">₹{act.price.toLocaleString()}</div>
                     <button className="text-sm text-gold-600 font-medium hover:text-gold-700">Book Now</button>
                   </div>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};
