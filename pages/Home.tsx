import React from 'react';
import { SearchWidget } from '../components/Search';
import { PackageCard, HotelCard } from '../components/Shared';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock Data
const trendingPackages = [
  {
    id: '1', title: 'Majestic Dubai', duration: '5 Days / 4 Nights', price: 45000,
    image: 'https://picsum.photos/800/600?random=1', destination: 'Dubai, UAE', rating: 4.8,
    description: 'Experience the luxury of Dubai with Desert Safari, Burj Khalifa, and Marina Dhow Cruise.',
    itinerary: [], inclusions: ['Hotel', 'Breakfast', 'Transfers', 'Visa'], exclusions: [],
    hotelsIncluded: 'Citymax', activitiesIncluded: 'Desert Safari'
  },
  {
    id: '2', title: 'Tropical Bali Escape', duration: '6 Days / 5 Nights', price: 62000,
    image: 'https://picsum.photos/800/600?random=2', destination: 'Bali, Indonesia', rating: 4.9,
    description: 'Relax in the pristine beaches of Bali, visit Ubud temples, and enjoy water sports.',
    itinerary: [], inclusions: ['Resort', 'Flights', 'Tours'], exclusions: [],
    hotelsIncluded: 'Kuta Resort', activitiesIncluded: 'Water Sports'
  },
  {
    id: '3', title: 'European Dream', duration: '10 Days / 9 Nights', price: 180000,
    image: 'https://picsum.photos/800/600?random=3', destination: 'Paris & Swiss', rating: 4.7,
    description: 'A romantic getaway covering Paris Eiffel Tower and Swiss Alps.',
    itinerary: [], inclusions: ['Hotels', 'Train Pass', 'Breakfast'], exclusions: [],
    hotelsIncluded: 'Ibis', activitiesIncluded: 'Sightseeing'
  }
];

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[85vh] w-full bg-slate-900 overflow-hidden">
        {/* Simulated Video Background */}
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" alt="Travel Hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50"></div>
        </div>
        
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto mt-[-40px]">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight animate-fade-in-up">
            Your Journey, <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">Made Beautiful.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto font-light">
            Discover premium holidays, luxury stays, and seamless travel experiences curated just for you.
          </p>
        </div>
      </div>

      {/* Search Widget Container */}
      <div className="px-4">
        <SearchWidget />
      </div>

      {/* Stats/Trust Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4">
            <h3 className="text-4xl font-bold text-royal-900 mb-2">10k+</h3>
            <p className="text-slate-500">Happy Travelers</p>
          </div>
          <div className="p-4">
            <h3 className="text-4xl font-bold text-royal-900 mb-2">500+</h3>
            <p className="text-slate-500">Destinations</p>
          </div>
          <div className="p-4">
            <h3 className="text-4xl font-bold text-royal-900 mb-2">24/7</h3>
            <p className="text-slate-500">Support</p>
          </div>
          <div className="p-4">
            <h3 className="text-4xl font-bold text-royal-900 mb-2">4.9</h3>
            <p className="text-slate-500">Google Rating</p>
          </div>
        </div>
      </div>

      {/* Trending Destinations */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-royal-900 mb-2">Trending Destinations</h2>
              <p className="text-slate-500">Curated packages for the season's most loved places.</p>
            </div>
            <Link to="/packages" className="hidden md:flex items-center text-royal-900 font-medium hover:text-gold-600 transition-colors">
              View All <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Note: trendingPackages must match Package interface expected by PackageCard */}
            {trendingPackages.map((pkg: any) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/packages" className="inline-flex items-center text-royal-900 font-medium">
              View All <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-royal-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Why Hamsika Travels?</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-gold-500/20 p-3 rounded-lg mr-4 text-gold-500">
                    <Star className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Premium Experience</h4>
                    <p className="text-slate-300">We don't just book trips; we craft experiences. Handpicked hotels and verified activities only.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gold-500/20 p-3 rounded-lg mr-4 text-gold-500">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Transparent Pricing</h4>
                    <p className="text-slate-300">No hidden charges. What you see is what you pay. Custom markup options available for agents.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gold-500/20 p-3 rounded-lg mr-4 text-gold-500">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">24/7 Expert Support</h4>
                    <p className="text-slate-300">Stuck somewhere? Our dedicated team is just a call or WhatsApp away, anytime, anywhere.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=2069&auto=format&fit=crop" alt="Traveler" className="rounded-2xl shadow-2xl transform md:rotate-3 hover:rotate-0 transition-transform duration-500" />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl text-royal-900 max-w-xs hidden md:block">
                <p className="font-serif italic text-lg mb-2">"The best trip of my life! Hamsika Travels took care of every detail."</p>
                <div className="flex items-center justify-between">
                   <span className="font-bold text-sm">- Priya S.</span>
                   <div className="flex text-gold-500"><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-royal-900 mb-4">Subscribe & Get Exclusive Deals</h2>
          <p className="text-slate-500 mb-8">Join our newsletter to receive the latest offers and travel inspiration directly in your inbox.</p>
          <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-6 py-4 rounded-full border border-slate-200 focus:border-royal-500 outline-none shadow-sm" />
            <button className="bg-royal-900 text-white px-8 py-4 rounded-full font-bold hover:bg-royal-800 transition-colors shadow-lg">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};