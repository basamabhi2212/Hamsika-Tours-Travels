import React, { useState, useEffect, useRef } from 'react';
import { Plane, Hotel, Package, Map as MapIcon, Search, Calendar, User, MapPin, X, ChevronDown, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchAirports } from '../services/data/airports';
import { Airport, FlightType, TravelerConfig } from '../types';

const TabButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all flex-1 md:flex-none justify-center ${
      active 
        ? 'text-royal-900 border-b-2 border-royal-900 bg-blue-50/50' 
        : 'text-slate-500 hover:text-royal-800 hover:bg-slate-50'
    }`}
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </button>
);

const AutocompleteInput = ({ label, placeholder, icon: Icon, onSelect, initialValue }: any) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Airport[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Airport | null>(initialValue || null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setSelected(null);
    if (val.length > 1) {
      setResults(searchAirports(val));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (airport: Airport) => {
    setSelected(airport);
    setQuery(`${airport.city} (${airport.code})`);
    setIsOpen(false);
    onSelect(airport);
  };

  return (
    <div className="space-y-1 relative" ref={wrapperRef}>
      <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">{label}</label>
      <div className={`relative flex items-center border rounded-lg transition-colors p-3 ${isOpen ? 'border-royal-500 ring-2 ring-royal-100 bg-white' : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-royal-200'}`}>
         <Icon className={`h-5 w-5 mr-3 ${selected ? 'text-royal-900' : 'text-slate-400'}`} />
         <input 
           type="text" 
           value={query}
           onChange={handleSearch}
           onFocus={() => query.length > 1 && setIsOpen(true)}
           placeholder={placeholder} 
           className="bg-transparent w-full outline-none text-slate-800 font-medium placeholder-slate-400 truncate" 
         />
         {query && <button onClick={() => { setQuery(''); setSelected(null); setIsOpen(false); }}><X className="h-4 w-4 text-slate-400 hover:text-slate-600"/></button>}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white rounded-lg shadow-xl border border-slate-100 mt-2 z-50 max-h-60 overflow-y-auto">
          {results.map((airport) => (
            <button 
              key={airport.code}
              onClick={() => handleSelect(airport)}
              className="w-full text-left px-4 py-3 hover:bg-slate-50 flex justify-between items-center border-b border-slate-50 last:border-0"
            >
              <div>
                <div className="font-bold text-slate-800 text-sm">{airport.city} <span className="text-slate-400 font-normal">- {airport.name}</span></div>
                <div className="text-xs text-slate-500">{airport.country}</div>
              </div>
              <span className="bg-royal-50 text-royal-900 text-xs font-bold px-2 py-1 rounded">{airport.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const DateInput = ({ label, value, onChange, min }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, min?: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    // Attempt to show the native picker programmatically
    if (inputRef.current) {
      if ('showPicker' in HTMLInputElement.prototype) {
        try {
          (inputRef.current as any).showPicker();
        } catch (error) {
          inputRef.current.focus();
        }
      } else {
        inputRef.current.focus();
        inputRef.current.click();
      }
    }
  };

  return (
    <div className="space-y-1 group flex-1">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-wide group-hover:text-royal-900 transition-colors">{label}</label>
      <div 
        className="relative flex items-center border border-slate-200 rounded-lg bg-slate-50 hover:bg-white hover:border-royal-300 transition-all p-3 cursor-pointer"
        onClick={handleContainerClick}
      >
         <Calendar className="h-5 w-5 mr-3 text-slate-400 group-hover:text-royal-900 transition-colors pointer-events-none" />
         <input 
           ref={inputRef}
           type="date" 
           value={value} 
           min={min}
           onChange={onChange}
           className="bg-transparent w-full outline-none text-slate-800 font-medium text-sm cursor-pointer z-10" 
           style={{ colorScheme: 'light' }}
         />
      </div>
    </div>
  );
};

const TravelerSelector = ({ config, onChange }: { config: TravelerConfig, onChange: (c: TravelerConfig) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateCount = (type: 'adults' | 'children' | 'infants', delta: number) => {
    const newVal = config[type] + delta;
    if (newVal >= 0 && newVal <= 9) {
      onChange({ ...config, [type]: newVal });
    }
  };

  const total = config.adults + config.children + config.infants;

  return (
    <div className="space-y-1 relative" ref={wrapperRef}>
      <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Travelers & Class</label>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-full flex items-center justify-between border rounded-lg transition-colors p-3 ${isOpen ? 'border-royal-500 ring-2 ring-royal-100 bg-white' : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-royal-200'}`}
      >
         <div className="flex items-center truncate">
            <User className="text-slate-400 h-5 w-5 mr-3" />
            <span className="text-slate-800 font-medium truncate text-sm">
              {total} Traveler{total !== 1 ? 's' : ''}, {config.class}
            </span>
         </div>
         <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 w-72 bg-white rounded-xl shadow-xl border border-slate-100 mt-2 z-50 p-4">
          
          {/* Passenger Counts */}
          <div className="space-y-4 mb-4">
            {[
              { label: 'Adults', sub: '12+ yrs', key: 'adults' },
              { label: 'Children', sub: '2-12 yrs', key: 'children' },
              { label: 'Infants', sub: '0-2 yrs', key: 'infants' }
            ].map((item) => (
              <div key={item.key} className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-800 text-sm">{item.label}</div>
                  <div className="text-xs text-slate-400">{item.sub}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => updateCount(item.key as any, -1)}
                    className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                    disabled={(config as any)[item.key] <= (item.key === 'adults' ? 1 : 0)}
                  >
                    -
                  </button>
                  <span className="text-sm font-bold w-4 text-center">{(config as any)[item.key]}</span>
                  <button 
                    onClick={() => updateCount(item.key as any, 1)}
                    className="w-7 h-7 rounded-full border border-royal-200 text-royal-900 hover:bg-royal-50 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 my-4"></div>

          {/* Cabin Class */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Cabin Class</div>
            {['Economy', 'Premium Economy', 'Business', 'First'].map((cls) => (
              <label key={cls} className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-slate-50 rounded">
                <input 
                  type="radio" 
                  name="cabinClass" 
                  checked={config.class === cls} 
                  onChange={() => onChange({ ...config, class: cls as any })}
                  className="text-royal-900 focus:ring-royal-500"
                />
                <span className="text-sm text-slate-700">{cls}</span>
              </label>
            ))}
          </div>

          <button 
            onClick={() => setIsOpen(false)}
            className="w-full mt-4 bg-royal-900 text-white py-2 rounded-lg text-sm font-bold hover:bg-royal-800"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export const SearchWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'packages' | 'activities'>('flights');
  const navigate = useNavigate();

  // Flight State
  const [flightType, setFlightType] = useState<FlightType>(FlightType.ONE_WAY);
  const [fromAirport, setFromAirport] = useState<Airport | null>(null);
  const [toAirport, setToAirport] = useState<Airport | null>(null);
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travelers, setTravelers] = useState<TravelerConfig>({ adults: 1, children: 0, infants: 0, class: 'Economy' });

  const today = new Date().toISOString().split('T')[0];

  const handleSearch = () => {
    if (activeTab === 'flights') {
        const queryParams = new URLSearchParams({
            from: fromAirport?.code || '',
            to: toAirport?.code || '',
            depart: departDate,
            return: returnDate,
            adults: travelers.adults.toString(),
            class: travelers.class
        });
        navigate(`/flights?${queryParams.toString()}`);
    } else {
        navigate(`/${activeTab}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto -mt-24 relative z-20 animate-fade-in-up">
      {/* Tabs */}
      <div className="flex border-b border-slate-100 overflow-x-auto hide-scrollbar">
        <TabButton active={activeTab === 'flights'} onClick={() => setActiveTab('flights')} icon={Plane} label="Flights" />
        <TabButton active={activeTab === 'hotels'} onClick={() => setActiveTab('hotels')} icon={Hotel} label="Hotels" />
        <TabButton active={activeTab === 'packages'} onClick={() => setActiveTab('packages')} icon={Package} label="Packages" />
        <TabButton active={activeTab === 'activities'} onClick={() => setActiveTab('activities')} icon={MapIcon} label="Activities" />
      </div>

      {/* Flight Specific Controls */}
      {activeTab === 'flights' && (
        <div className="px-6 md:px-8 pt-6 pb-2 border-b border-slate-50 flex flex-wrap gap-4">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {Object.values(FlightType).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setFlightType(type);
                  if (type === FlightType.ONE_WAY) setReturnDate('');
                }}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  flightType === type ? 'bg-white text-royal-900 shadow-sm' : 'text-slate-500 hover:text-royal-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="direct" className="rounded text-royal-900 focus:ring-royal-500 border-slate-300" />
            <label htmlFor="direct" className="text-sm font-medium text-slate-600 cursor-pointer">Direct Flights Only</label>
          </div>
        </div>
      )}

      {/* Inputs Grid */}
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* FROM */}
          <div className="md:col-span-3">
            <AutocompleteInput 
              label={activeTab === 'flights' ? "From" : "Location"} 
              placeholder={activeTab === 'flights' ? "Airport or City" : "Where are you going?"}
              icon={activeTab === 'flights' ? Plane : MapPin} 
              onSelect={setFromAirport}
              initialValue={fromAirport}
            />
          </div>

          {/* Swap Button (Visual only for now) */}
           {activeTab === 'flights' && (
             <div className="hidden md:flex md:col-span-1 items-center justify-center pt-6">
               <button className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-royal-900 transition-colors">
                 <div className="transform rotate-90 md:rotate-0">⇄</div>
               </button>
             </div>
           )}

          {/* TO (Only for flights) */}
          {activeTab === 'flights' ? (
            <div className="md:col-span-3">
               <AutocompleteInput 
                 label="To" 
                 placeholder="Airport or City" 
                 icon={MapPin}
                 onSelect={setToAirport}
                 initialValue={toAirport}
               />
            </div>
          ) : null}

          {/* DATES */}
          <div className={`${activeTab === 'flights' ? 'md:col-span-3' : 'md:col-span-4'}`}>
             <div className="grid grid-cols-2 gap-2">
                <DateInput 
                  label={activeTab === 'hotels' ? "Check-In" : "Departure"} 
                  value={departDate} 
                  onChange={(e) => setDepartDate(e.target.value)}
                  min={today}
                />
                
                {/* Always show Return/Check-Out field if in Flights or Hotels tab */}
                {(activeTab === 'flights' || activeTab === 'hotels') && (
                   <DateInput 
                    label={activeTab === 'hotels' ? "Check-Out" : "Return"} 
                    value={returnDate} 
                    onChange={(e) => {
                      setReturnDate(e.target.value);
                      // If user picks a return date in One Way mode, switch to Round Trip
                      if (activeTab === 'flights' && e.target.value && flightType === FlightType.ONE_WAY) {
                        setFlightType(FlightType.ROUND_TRIP);
                      }
                    }}
                    min={departDate || today}
                   />
                )}
             </div>
          </div>

          {/* TRAVELERS (Only for flights) */}
          {activeTab === 'flights' && (
            <div className="md:col-span-2">
               <TravelerSelector config={travelers} onChange={setTravelers} />
            </div>
          )}

          {/* SEARCH BUTTON */}
          <div className={`${activeTab === 'flights' ? 'md:col-span-12 mt-4' : 'md:col-span-2 flex items-end'}`}>
            <button 
              onClick={handleSearch}
              className={`w-full bg-gradient-to-r from-royal-900 to-blue-700 text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex justify-center items-center space-x-2 ${activeTab === 'flights' ? 'text-lg' : ''}`}
            >
              <Search className="h-5 w-5" />
              <span>Search {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};