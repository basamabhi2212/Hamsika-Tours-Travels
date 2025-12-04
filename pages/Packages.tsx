import React from 'react';
import { PackageCard } from '../components/Shared';
import { Package } from '../types';

const allPackages: Package[] = [
  {
    id: '1', title: 'Majestic Dubai', duration: '5 Days / 4 Nights', price: 45000,
    image: 'https://picsum.photos/800/600?random=1', destination: 'Dubai, UAE', rating: 4.8,
    description: 'Experience the luxury of Dubai with Desert Safari, Burj Khalifa, and Marina Dhow Cruise.',
    itinerary: [], inclusions: ['Hotel', 'Breakfast', 'Transfers', 'Visa'], exclusions: [],
    hotelsIncluded: 'Citymax Hotel', activitiesIncluded: 'Desert Safari, Dhow Cruise'
  },
  {
    id: '2', title: 'Tropical Bali Escape', duration: '6 Days / 5 Nights', price: 62000,
    image: 'https://picsum.photos/800/600?random=2', destination: 'Bali, Indonesia', rating: 4.9,
    description: 'Relax in the pristine beaches of Bali, visit Ubud temples, and enjoy water sports.',
    itinerary: [], inclusions: ['Resort', 'Flights', 'Tours'], exclusions: [],
    hotelsIncluded: 'Kuta Resort', activitiesIncluded: 'Water Sports, Temple Tour'
  },
  {
    id: '3', title: 'European Dream', duration: '10 Days / 9 Nights', price: 180000,
    image: 'https://picsum.photos/800/600?random=3', destination: 'Paris & Swiss', rating: 4.7,
    description: 'A romantic getaway covering Paris Eiffel Tower and Swiss Alps.',
    itinerary: [], inclusions: ['Hotels', 'Train Pass', 'Breakfast'], exclusions: [],
    hotelsIncluded: 'Ibis Paris, Swiss Lodge', activitiesIncluded: 'Eiffel Tower, Mt Titlis'
  },
  {
    id: '4', title: 'Simply Singapore', duration: '4 Days / 3 Nights', price: 38000,
    image: 'https://picsum.photos/800/600?random=4', destination: 'Singapore', rating: 4.6,
    description: 'Visit Sentosa Island, Universal Studios, and Gardens by the Bay.',
    itinerary: [], inclusions: ['Hotel', 'Breakfast', 'Visa'], exclusions: ['Lunch'],
    hotelsIncluded: 'Hotel Boss', activitiesIncluded: 'Universal Studios, Sentosa'
  },
  {
    id: '5', title: 'Thailand Beaches', duration: '5 Days / 4 Nights', price: 32000,
    image: 'https://picsum.photos/800/600?random=5', destination: 'Phuket & Krabi', rating: 4.5,
    description: 'Island hopping tour, snorkeling, and vibrant nightlife.',
    itinerary: [], inclusions: ['Hotel', 'Ferry', 'Breakfast'], exclusions: ['Flights'],
    hotelsIncluded: 'Phuket Resort', activitiesIncluded: 'Island Tour'
  },
  {
    id: '6', title: 'Vietnam Explorer', duration: '7 Days / 6 Nights', price: 55000,
    image: 'https://picsum.photos/800/600?random=6', destination: 'Hanoi & Da Nang', rating: 4.8,
    description: 'Explore ancient towns, Halong Bay cruise and Golden Bridge.',
    itinerary: [], inclusions: ['Hotel', 'Cruise', 'Visa'], exclusions: [],
    hotelsIncluded: 'Hanoi Hotel', activitiesIncluded: 'Halong Bay Cruise'
  }
];

export const Packages: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-royal-900 mb-4">Curated Holiday Packages</h1>
            <p className="text-slate-500 max-w-2xl mx-auto">From quick getaways to grand international tours, find the perfect itinerary crafted by our experts.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPackages.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </div>
  );
};