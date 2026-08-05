import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { SOLUTIONS_DATA } from '../data/solutionsData';
import { TurnstileWidget } from './TurnstileWidget';
import { supabase } from '../lib/supabase';

interface AiConciergeProps {
  isOpen: boolean;
  onClose: () => void;
  onBookDemo: (solution: string) => void;
}

export const AiConcierge: React.FC<AiConciergeProps> = ({ isOpen, onClose, onBookDemo }) => {
  const [industry, setIndustry] = useState('Manufacturing');
  const [companySize, setCompanySize] = useState('10-50 employees');
  const [bottlenecks, setBottlenecks] = useState('Fragmented accounting and slow sales quotations');
  const [currentSystems, setCurrentSystems] = useState('Excel, Tally, WhatsApp');
  const [query, setQuery] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    recommendations: { solution: string; matchScore: number; reason: string }[];
    executiveAdvice: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const session = (await supabase.auth.getSession()).data.session;
      const token = session?.access_token || null;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch('/api/ai/concierge', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          industry,
          size: companySize,
          bottlenecks,
          currentSystems,
          query,
          turnstileToken
        })
      });

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Concierge request error:", err);
      // Fallback
      setResults({
        recommendations: [
          { solution: "Finance360", matchScore: 94, reason: "Automates accounting, GST filings, and real-time cash flow." },
          { solution: "Sales360", matchScore: 88, reason: "Accelerates quotation generation and lead pipeline tracking." },
          { solution: "Executive360", matchScore: 84, reason: "Provides a single CEO dashboard for instant visibility." }
        ],
        executiveAdvice: "Your organization will gain maximum velocity by unifying financial accounting with sales quotation automation."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#0e1a3a] border border-[#d4af37]/40 rounded-2xl shadow-2xl p-6 text-[#f6f3ea] max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#d4af37]/20 mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-[#f0d878]">Ask UNIKORN360 AI</h3>
              <p className="text-[11px] text-[#a9b0c6]">Enterprise Stack Strategy & AI Advisor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#a9b0c6] hover:text-[#f0d878] rounded-full hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-3 text-xs mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-[#a9b0c6] uppercase font-bold mb-1">Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-[#0a1128] border border-[#d4af37]/30 rounded-lg px-2.5 py-2 text-[#f6f3ea] focus:outline-none focus:border-[#d4af37]"
              >
                {['Manufacturing', 'Retail', 'Healthcare', 'Education', 'Construction', 'Textiles', 'Export/Import', 'Logistics', 'Professional Services', 'Government/NGO'].map(i => (
                  <option key={i} value={i} className="bg-[#0a1128]">{i}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-[#a9b0c6] uppercase font-bold mb-1">Company Size</label>
              <select
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                className="w-full bg-[#0a1128] border border-[#d4af37]/30 rounded-lg px-2.5 py-2 text-[#f6f3ea] focus:outline-none focus:border-[#d4af37]"
              >
                {['1-10 employees', '10-50 employees', '50-200 employees', '200-500 employees', '500+ Enterprise'].map(s => (
                  <option key={s} value={s} className="bg-[#0a1128]">{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-[#a9b0c6] uppercase font-bold mb-1">Primary Operational Bottleneck</label>
            <input
              type="text"
              value={bottlenecks}
              onChange={(e) => setBottlenecks(e.target.value)}
              placeholder="e.g. GST filing delay, lost sales leads, manual stock entry..."
              className="w-full bg-[#0a1128] border border-[#d4af37]/30 rounded-lg px-3 py-2 text-[#f6f3ea] focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-[10px] text-[#a9b0c6] uppercase font-bold mb-1">Current Software Systems Used</label>
            <input
              type="text"
              value={currentSystems}
              onChange={(e) => setCurrentSystems(e.target.value)}
              placeholder="e.g. Tally, Excel, WhatsApp, Paper invoices"
              className="w-full bg-[#0a1128] border border-[#d4af37]/30 rounded-lg px-3 py-2 text-[#f6f3ea] focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <TurnstileWidget onVerify={setTurnstileToken} />

          <button
            onClick={() => handleAnalyze()}
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-[#0a1128] font-bold py-2.5 rounded-xl shadow hover:scale-[1.01] transition-all flex items-center justify-center space-x-2 text-xs uppercase tracking-wider disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing Enterprise Data...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Recommended Transformation Stack</span>
              </>
            )}
          </button>
        </div>

        {/* Results Display */}
        {results && (
          <div className="space-y-4 text-xs pt-4 border-t border-[#d4af37]/20">
            <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-widest flex items-center space-x-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Recommended Transformation Stack</span>
            </div>

            <div className="space-y-2">
              {results.recommendations.map((rec, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#0a1128] border border-[#d4af37]/30 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-[#f0d878] text-sm">{rec.solution}</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                        {rec.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-[11px] text-[#a9b0c6]">{rec.reason}</p>
                  </div>

                  <button
                    onClick={() => {
                      onBookDemo(rec.solution);
                      onClose();
                    }}
                    className="shrink-0 bg-[#d4af37]/20 hover:bg-[#d4af37] text-[#f0d878] hover:text-[#0a1128] text-[10px] font-bold px-3 py-1.5 rounded transition-all"
                  >
                    Demo
                  </button>
                </div>
              ))}
            </div>

            {results.executiveAdvice && (
              <div className="p-3.5 rounded-xl bg-[#0a1128] border border-emerald-500/20 text-[#a9b0c6] text-[11px] leading-relaxed">
                <b className="text-emerald-400 block mb-1">Executive AI Recommendation:</b>
                {results.executiveAdvice}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
