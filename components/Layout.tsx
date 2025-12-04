
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, Menu, X, Phone, MessageCircle, Bot, Send, Facebook, Instagram, Twitter, Mail, MapPin } from 'lucide-react';
import { chatWithTravelAI } from '../services/gemini';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Flights', path: '/flights' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Packages', path: '/packages' },
    { name: 'Activities', path: '/activities' },
    { name: 'Payments', path: '/payment-status' },
    { name: 'My Bookings', path: '/payment-status' }, // Reusing payment status page as portal for now
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || location.pathname !== '/' ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className={`p-2 rounded-lg ${scrolled || location.pathname !== '/' ? 'bg-royal-900 text-white' : 'bg-white text-royal-900'}`}>
              <Plane className="h-6 w-6 transform -rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-serif font-bold ${scrolled || location.pathname !== '/' ? 'text-royal-900' : 'text-white'}`}>Hamsika</span>
              <span className={`text-xs uppercase tracking-widest ${scrolled || location.pathname !== '/' ? 'text-gold-600' : 'text-gold-400'}`}>Travels</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-gold-500 ${scrolled || location.pathname !== '/' ? 'text-slate-700' : 'text-white/90'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/login" className="bg-gold-500 hover:bg-gold-600 text-white px-5 py-2 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={scrolled || location.pathname !== '/' ? 'text-slate-800' : 'text-white'}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl absolute w-full top-full left-0">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-royal-900 hover:bg-slate-50"
              >
                {link.name}
              </Link>
            ))}
            <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-gold-600 hover:bg-slate-50"
            >
                Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <div className="p-2 rounded-lg bg-white text-royal-900">
              <Plane className="h-6 w-6 transform -rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-bold">Hamsika</span>
              <span className="text-xs uppercase tracking-widest text-gold-400">Travels</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Crafting premium travel experiences tailored to your dreams. From luxury getaways to adventurous expeditions, we handle it all.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-slate-400 hover:text-gold-500 transition-colors"><Facebook className="h-5 w-5" /></a>
            <a href="#" className="text-slate-400 hover:text-gold-500 transition-colors"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="text-slate-400 hover:text-gold-500 transition-colors"><Twitter className="h-5 w-5" /></a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-6 font-serif">Quick Links</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><Link to="/about" className="hover:text-gold-500 transition-colors">About Us</Link></li>
            <li><Link to="/packages" className="hover:text-gold-500 transition-colors">Destinations</Link></li>
            <li><Link to="/flights" className="hover:text-gold-500 transition-colors">Flights</Link></li>
            <li><Link to="/hotels" className="hover:text-gold-500 transition-colors">Hotels</Link></li>
            <li><Link to="/payment-status" className="hover:text-gold-500 transition-colors">Check Payment Status</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-6 font-serif">Support</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><Link to="/contact" className="hover:text-gold-500 transition-colors">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-gold-500 transition-colors">FAQs</Link></li>
            <li><Link to="/terms" className="hover:text-gold-500 transition-colors">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-gold-500 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/refund" className="hover:text-gold-500 transition-colors">Refund Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-6 font-serif">Contact</h3>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 text-gold-500 flex-shrink-0" />
              <span>Hyderabad, Telangana, India</span>
            </li>
            <li className="flex items-center">
              <Phone className="h-5 w-5 mr-3 text-gold-500 flex-shrink-0" />
              <span>+91 9493936084</span>
            </li>
            <li className="flex items-center">
              <Mail className="h-5 w-5 mr-3 text-gold-500 flex-shrink-0" />
              <span>abhishekamt0@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} Hamsika Travels. All rights reserved.
      </div>
    </footer>
  );
};

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([
    { role: 'model', content: 'Hello! I am your AI travel concierge for Hamsika Travels. How can I help you plan your next trip?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const response = await chatWithTravelAI(userMsg, messages);
      // Clean up response if it has extra newlines
      const cleanResponse = response?.trim() || "I'm not sure about that, please contact our support.";
      setMessages(prev => [...prev, { role: 'model', content: cleanResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
      {/* Floating Action Buttons */}
      <a href="https://wa.me/919493936084" target="_blank" rel="noreferrer" className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center">
        <MessageCircle className="h-6 w-6" />
      </a>
      <a href="tel:+919493936084" className="bg-royal-900 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center">
        <Phone className="h-6 w-6" />
      </a>

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 md:w-96 h-[500px] flex flex-col overflow-hidden border border-slate-100 animate-fade-in-up">
          <div className="bg-royal-900 p-4 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-gold-400" />
              <span className="font-bold">Travel Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X className="h-5 w-5" /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-royal-900 text-white rounded-br-none' 
                    : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-bl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-100">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-slate-100">
            <div className="flex items-center bg-slate-100 rounded-full px-4 py-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about flights, packages..."
                className="bg-transparent flex-1 outline-none text-sm text-slate-800"
              />
              <button onClick={handleSend} disabled={loading} className="text-royal-900 hover:text-gold-600 ml-2">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-gold-500 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center justify-center"
        >
          <Bot className="h-7 w-7" />
        </button>
      )}
    </div>
  );
};
