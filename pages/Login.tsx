
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Plane } from 'lucide-react';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Strict credential check as requested
    if (username === 'admin' && password === 'Admin@143476') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Dark Theme Background */}
      <div className="absolute inset-0 opacity-10">
        <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="background" />
      </div>

      <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden max-w-md w-full p-8 relative z-10 border border-slate-700">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gold-500 text-royal-900 mb-4 shadow-lg">
            <Plane className="h-8 w-8 transform -rotate-45" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-white">Admin Portal</h1>
          <p className="text-slate-400 text-sm mt-2">Hamsika Travels Management System</p>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-800 text-red-200 text-sm p-3 rounded-lg mb-6 text-center font-medium animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Username</label>
            <div className="relative flex items-center">
              <User className="absolute left-3 text-slate-500 h-5 w-5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-white outline-none transition-all placeholder-slate-500"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-slate-500 h-5 w-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-white outline-none transition-all placeholder-slate-500"
                placeholder="Enter password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gold-500 text-royal-900 font-bold py-3.5 rounded-lg hover:bg-gold-400 hover:shadow-lg hover:scale-[1.02] transition-all transform duration-200"
          >
            Access Dashboard
          </button>
        </form>
        
        <div className="mt-6 text-center">
           <a href="/" className="text-xs text-slate-400 hover:text-white transition-colors">← Back to Website</a>
        </div>
      </div>
    </div>
  );
};
