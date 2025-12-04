
import { FlightSearchParams, Flight } from '../types';
import { SettingsService } from './storage';

/**
 * Mocks the flight search for fallback
 */
export const searchFlightsMock = (params: FlightSearchParams): Promise<Flight[]> => {
  return new Promise((resolve) => {
    // Simulate API delay - Reduced to 600ms for better UX
    setTimeout(() => {
      const fromCode = params.from?.code || 'HYD';
      const toCode = params.to?.code || 'DXB';
      
      const airlines = [
        { name: 'IndiGo', logo: 'https://logo.clearbit.com/goindigo.in', code: '6E' },
        { name: 'Air India', logo: 'https://logo.clearbit.com/airindia.in', code: 'AI' },
        { name: 'Emirates', logo: 'https://logo.clearbit.com/emirates.com', code: 'EK' },
        { name: 'Vistara', logo: 'https://logo.clearbit.com/airvistara.com', code: 'UK' },
        { name: 'Qatar Airways', logo: 'https://logo.clearbit.com/qatarairways.com', code: 'QR' },
      ];

      // Randomly generate 5-8 flight options based on the route
      const results: Flight[] = Array.from({ length: 6 }).map((_, i) => {
        const airline = airlines[i % airlines.length];
        const isDirect = i % 2 === 0;
        const flightNum = `${airline.code}-${100 + Math.floor(Math.random() * 900)}`;
        
        // Generate random times
        const startHour = 5 + Math.floor(Math.random() * 15); // 05:00 to 20:00
        const durationHours = isDirect ? 2 + Math.random() * 2 : 5 + Math.random() * 5;
        const endHour = (startHour + Math.floor(durationHours)) % 24;
        
        const depTime = `${startHour.toString().padStart(2, '0')}:${Math.random() > 0.5 ? '00' : '30'}`;
        const arrTime = `${endHour.toString().padStart(2, '0')}:${Math.random() > 0.5 ? '15' : '45'}`;
        
        // Base price calculation with random variation
        const basePrice = 4000 + (durationHours * 500);
        const travelerCount = (params.travelers.adults || 1) + (params.travelers.children || 0);
        const price = Math.floor(basePrice * travelerCount * (airline.name === 'Emirates' ? 1.5 : 1));

        return {
          id: `fl_${Date.now()}_${i}`,
          airline: airline.name,
          airlineLogo: airline.logo,
          flightNumber: flightNum,
          departureTime: depTime,
          arrivalTime: arrTime,
          duration: `${Math.floor(durationHours)}h ${Math.floor((durationHours % 1) * 60)}m`,
          price: price,
          stops: isDirect ? 0 : 1,
          from: fromCode,
          to: toCode,
          baggage: airline.name === 'IndiGo' ? '15kg Check-in' : '30kg Check-in'
        };
      });

      resolve(results);
    }, 600);
  });
};

/**
 * Formats date from YYYY-MM-DD to DD/MM/YYYY for Kiwi API
 */
const formatDateForKiwi = (dateStr: string) => {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
};

/**
 * Real API call to Kiwi Tequila
 */
const searchFlightsKiwi = async (params: FlightSearchParams, apiKey: string): Promise<Flight[]> => {
    try {
        const flyFrom = params.from?.code || 'HYD';
        const flyTo = params.to?.code || 'DEL';
        const dateFrom = formatDateForKiwi(params.departDate); // dd/mm/yyyy
        // Kiwi requires a range, for specific date set both to same
        const dateTo = formatDateForKiwi(params.departDate); 
        
        let url = `https://tequila-api.kiwi.com/v2/search?fly_from=${flyFrom}&fly_to=${flyTo}&date_from=${dateFrom}&date_to=${dateTo}&curr=INR&limit=20`;
        
        if (params.returnDate) {
             const retDate = formatDateForKiwi(params.returnDate);
             url += `&return_from=${retDate}&return_to=${retDate}`;
        }

        const response = await fetch(url, {
            headers: {
                'apikey': apiKey
            }
        });

        if (!response.ok) {
            console.error('Kiwi API Error', await response.text());
            return []; // Fallback will be triggered if we throw, or return empty to show nothing
        }

        const data = await response.json();
        
        // Map Kiwi Data to Flight Interface
        return data.data.map((item: any) => {
            const airlineCode = item.airlines[0];
            const route = item.route[0]; // First leg details
            
            // Convert UNIX timestamp to HH:mm
            const depDate = new Date(item.local_departure);
            const arrDate = new Date(item.local_arrival);
            
            const formatTime = (date: Date) => {
                return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
            };

            const durationSec = item.duration.total;
            const hours = Math.floor(durationSec / 3600);
            const minutes = Math.floor((durationSec % 3600) / 60);

            // Simple baggage logic based on availability in response or generic
            const baggage = item.baglimit.hold_weight ? `${item.baglimit.hold_weight}kg Check-in` : 'Cabin Only';

            return {
                id: item.id,
                airline: route.airline, // You might want a map of codes to names here
                airlineLogo: `https://images.kiwi.com/airlines/64/${airlineCode}.png`, 
                flightNumber: `${route.airline} ${route.flight_no}`,
                departureTime: formatTime(depDate),
                arrivalTime: formatTime(arrDate),
                duration: `${hours}h ${minutes}m`,
                price: Math.ceil(item.price), // Already in INR requested
                stops: item.route.length - 1,
                from: item.flyFrom,
                to: item.flyTo,
                baggage: baggage,
                bookingToken: item.booking_token
            };
        });

    } catch (error) {
        console.error("Failed to fetch from Kiwi", error);
        throw error; // Let the main function handle fallback
    }
};

/**
 * Main Flight Search Entry Point
 */
export const searchFlights = async (params: FlightSearchParams): Promise<Flight[]> => {
    const settings = SettingsService.get();
    const apiKey = settings.kiwiApiKey;

    // Use Real API if Key is present
    if (apiKey && apiKey.trim() !== '') {
        try {
            console.log("Fetching from Kiwi API...");
            const results = await searchFlightsKiwi(params, apiKey);
            if (results.length > 0) return results;
            console.warn("Kiwi returned no results, falling back to mock.");
        } catch (e) {
            console.error("Kiwi API failed, falling back to mock.", e);
        }
    } else {
        console.log("No API Key found, using Mock Data.");
    }

    // Fallback to Mock
    return searchFlightsMock(params);
};
