import React, { useState } from 'react';
import { X, Lock, Mail, User, Building, AlertCircle } from 'lucide-react';
import { loginWithEmail, registerWithEmail, signInWithGoogle } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google.");
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (tab === 'login') {
        const user = await loginWithEmail(email, password);
        if (user) onSuccess(user);
      } else {
        if (!fullName.trim()) {
          throw new Error("Full name is required.");
        }
        const user = await registerWithEmail(email, password, fullName, company);
        if (user) onSuccess(user);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-white border-2 border-[#D4AF37] rounded-xl shadow-2xl p-6 sm:p-8 text-[#1A1A1A]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-[#001F3F] rounded-full hover:bg-gray-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-full bg-[#001F3F] text-[#D4AF37] mb-3 shadow">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#001F3F] uppercase tracking-wider">
            {tab === 'login' ? 'Sign In to UNIKORN360' : 'Create Your UNIKORN ID'}
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            Access your Enterprise Portal & Digital Business Brain
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-lg mb-6 border border-gray-200 text-xs font-bold">
          <button
            onClick={() => { setTab('login'); setError(null); }}
            className={`flex-1 py-2 rounded transition-all uppercase tracking-wider ${
              tab === 'login' ? 'bg-[#001F3F] text-white shadow' : 'text-gray-600 hover:text-[#001F3F]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setTab('register'); setError(null); }}
            className={`flex-1 py-2 rounded transition-all uppercase tracking-wider ${
              tab === 'register' ? 'bg-[#001F3F] text-white shadow' : 'text-gray-600 hover:text-[#001F3F]'
            }`}
          >
            Register
          </button>
        </div>

        {/* Google Sign-In Button */}
        <div className="mb-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-3 bg-white text-gray-800 font-bold py-3 px-4 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 transition-all text-xs disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-3 text-[10px] text-gray-500 font-bold uppercase tracking-wider">or with email</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Error / Info Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-lg text-xs flex items-start space-x-2 font-semibold bg-red-50 border border-red-200 text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {tab === 'register' && (
            <>
              <div>
                <label className="block text-[11px] text-gray-700 font-semibold mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-[#001F3F]" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="S. Rajkumar"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#001F3F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-gray-700 font-semibold mb-1">Company / Organization</label>
                <div className="relative">
                  <Building className="w-4 h-4 absolute left-3 top-3 text-[#001F3F]" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="UNIKORN Enterprise"
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#001F3F]"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-[11px] text-gray-700 font-semibold mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-[#001F3F]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rajkumar@unikorn360.com"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#001F3F]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-gray-700 font-semibold mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-[#001F3F]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#001F3F]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#001F3F] text-white border border-[#D4AF37] font-bold py-3 rounded-lg shadow hover:bg-[#002B5B] transition-all text-xs uppercase tracking-wider disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : tab === 'login' ? 'Sign In to Portal' : 'Create Account'}
          </button>
        </form>

        <p className="text-[10px] text-center text-gray-500 mt-4 font-medium">
          By continuing, you agree to UNIKORN360's <a href="#" className="text-[#001F3F] underline font-bold">Terms of Service</a> & <a href="#" className="text-[#001F3F] underline font-bold">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};
