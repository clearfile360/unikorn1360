import React, { useState } from 'react';
import { X, Sparkles, Building, Phone, Mail, User, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SOLUTIONS_DATA } from '../data/solutionsData';
import { TurnstileWidget } from './TurnstileWidget';

interface DemoBookingModalProps {
  isOpen: boolean;
  preselectedSolution?: string;
  onClose: () => void;
  userId?: string;
  userEmail?: string;
}

export const DemoBookingModal: React.FC<DemoBookingModalProps> = ({
  isOpen,
  preselectedSolution,
  onClose,
  userId,
  userEmail
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(userEmail || '');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState('Manufacturing');
  const [companySize, setCompanySize] = useState('10-50 employees');
  const [solutionInterested, setSolutionInterested] = useState(preselectedSolution || 'Finance360');
  const [businessProblem, setBusinessProblem] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const session = (await supabase.auth.getSession()).data.session;
      const token = session?.access_token || null;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // 1. Single-source-of-truth backend persistence with validation & rate limiting
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          full_name: fullName,
          email,
          phone,
          company,
          industry,
          company_size: companySize,
          solution_interested: solutionInterested,
          business_problem: businessProblem,
          preferred_date: preferredDate,
          turnstileToken
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Verification or validation error.');
      }

      setSuccess(true);
    } catch (err: any) {
      console.error("Failed to submit demo lead:", err);
      setError(err.message || "Failed to submit demo request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0e1a3a] border border-[#d4af37]/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-[#f6f3ea] max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#a9b0c6] hover:text-[#f0d878] rounded-full hover:bg-white/5 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4">
            <div className="inline-flex p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#f0d878]">Demo Requested Successfully!</h3>
            <p className="text-xs text-[#a9b0c6] leading-relaxed max-w-sm mx-auto">
              Thank you, <b className="text-[#f6f3ea]">{fullName}</b>. An Enterprise Solutions Consultant from UNIKORN360 will contact you shortly via email / phone ({phone || email}) to conduct your personalized Business360 demonstration.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="bg-[#d4af37] text-[#0a1128] font-bold text-xs uppercase px-6 py-2.5 rounded-lg shadow"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex p-3 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#f0d878] mb-2">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#f6f3ea]">
                Book Executive Demo / Consultation
              </h3>
              <p className="text-xs text-[#a9b0c6] mt-1">
                Experience the Digital Business Brain built for your organization
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[#a9b0c6] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="S. Rajkumar"
                    className="w-full bg-[#0a1128] border border-[#d4af37]/30 rounded-lg px-3 py-2 text-[#f6f3ea] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#a9b0c6] mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98848 24360"
                    className="w-full bg-[#0a1128] border border-[#d4af37]/30 rounded-lg px-3 py-2 text-[#f6f3ea] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[#a9b0c6] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rajkumar@company.com"
                    className="w-full bg-[#0a1128] border border-[#d4af37]/30 rounded-lg px-3 py-2 text-[#f6f3ea] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#a9b0c6] mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="ABC Manufacturing Ltd."
                    className="w-full bg-[#0a1128] border border-[#d4af37]/30 rounded-lg px-3 py-2 text-[#f6f3ea] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[#a9b0c6] mb-1">Industry</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-[#0a1128] border border-[#d4af37]/30 rounded-lg px-3 py-2 text-[#f6f3ea] focus:outline-none focus:border-[#d4af37]"
                  >
                    {['Manufacturing', 'Retail', 'Healthcare', 'Education', 'Construction', 'Textiles', 'Export/Import', 'Logistics', 'Professional Services', 'Government/NGO'].map(i => (
                      <option key={i} value={i} className="bg-[#0a1128] text-white">{i}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-[#a9b0c6] mb-1">Primary Solution Interested</label>
                  <select
                    value={solutionInterested}
                    onChange={(e) => setSolutionInterested(e.target.value)}
                    className="w-full bg-[#0a1128] border border-[#d4af37]/30 rounded-lg px-3 py-2 text-[#f6f3ea] focus:outline-none focus:border-[#d4af37]"
                  >
                    {SOLUTIONS_DATA.map(s => (
                      <option key={s.id} value={s.name} className="bg-[#0a1128] text-white">{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#a9b0c6] mb-1">Key Business Problem / Objective</label>
                <textarea
                  rows={2}
                  value={businessProblem}
                  onChange={(e) => setBusinessProblem(e.target.value)}
                  placeholder="e.g. Unifying GST accounting with sales pipeline, automating vendor invoice processing..."
                  className="w-full bg-[#0a1128] border border-[#d4af37]/30 rounded-lg p-2.5 text-[#f6f3ea] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#a9b0c6] mb-1">Preferred Meeting Date</label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-[#0a1128] border border-[#d4af37]/30 rounded-lg px-3 py-2 text-[#f6f3ea] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <TurnstileWidget onVerify={setTurnstileToken} />

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-[#f0d878] via-[#d4af37] to-[#a8862f] text-[#0a1128] font-bold py-3 rounded-xl shadow-lg hover:scale-[1.01] transition-all text-xs uppercase tracking-wider disabled:opacity-50 mt-2"
              >
                {submitting ? 'Submitting Request...' : 'Schedule My Demo'}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
};
