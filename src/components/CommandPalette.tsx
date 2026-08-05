import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles, Brain, Bot, ShieldCheck, ArrowRight, DollarSign, Users, Factory, LayoutDashboard, Cpu } from 'lucide-react';
import { SOLUTIONS_DATA, AI_EXECUTIVES } from '../data/solutionsData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSolutions: (solutionId?: string) => void;
  onOpenAssessment: () => void;
  onOpenDemoBooking: (solution?: string) => void;
  onOpenConcierge: () => void;
  onOpenAdmin: () => void;
  isAdmin: boolean;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenSolutions,
  onOpenAssessment,
  onOpenDemoBooking,
  onOpenConcierge,
  onOpenAdmin,
  isAdmin
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered by parent state, handled via props or global listener
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredSolutions = SOLUTIONS_DATA.filter(s => 
    s.name.toLowerCase().includes(query.toLowerCase()) || 
    s.tagline.toLowerCase().includes(query.toLowerCase()) ||
    s.capabilities.some(c => c.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredExecutives = AI_EXECUTIVES.filter(e =>
    e.title.toLowerCase().includes(query.toLowerCase()) ||
    e.role.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#0e1a3a] border border-[#d4af37]/40 rounded-2xl shadow-2xl overflow-hidden text-[#f6f3ea]">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-[#d4af37]/25">
          <Search className="w-5 h-5 text-[#d4af37] mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a solution name, AI executive, feature, or command..."
            className="w-full bg-transparent text-sm text-[#f6f3ea] placeholder-gray-400 focus:outline-none font-sans"
          />
          <kbd className="text-[10px] bg-[#0a1128] text-[#d4af37] px-2 py-1 rounded border border-[#d4af37]/30 font-mono">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 text-xs font-sans">
          
          {/* Quick Actions */}
          <div>
            <div className="text-[10px] font-semibold text-[#d4af37] uppercase tracking-wider mb-2">Quick Actions</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => { onOpenAssessment(); onClose(); }}
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#0a1128] border border-[#d4af37]/20 hover:border-[#d4af37] transition-all text-left"
              >
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-[#f0d878]" />
                  <span className="font-semibold text-[#f6f3ea]">Take AI Business Assessment</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
              </button>

              <button
                onClick={() => { onOpenConcierge(); onClose(); }}
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#0a1128] border border-emerald-500/20 hover:border-emerald-500 transition-all text-left"
              >
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-[#f6f3ea]">Ask UNIKORN360 AI Concierge</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>

              <button
                onClick={() => { onOpenDemoBooking(); onClose(); }}
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#0a1128] border border-[#d4af37]/20 hover:border-[#d4af37] transition-all text-left"
              >
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#f0d878]" />
                  <span className="font-semibold text-[#f6f3ea]">Book Executive Demo</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
              </button>

              {isAdmin && (
                <button
                  onClick={() => { onOpenAdmin(); onClose(); }}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/40 hover:bg-[#d4af37]/20 transition-all text-left"
                >
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-[#f0d878]" />
                    <span className="font-bold text-[#f0d878]">Super Admin Command Center</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#f0d878]" />
                </button>
              )}
            </div>
          </div>

          {/* Solutions Search Results */}
          {filteredSolutions.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold text-[#d4af37] uppercase tracking-wider mb-2">Business360 Solutions</div>
              <div className="space-y-1.5">
                {filteredSolutions.map(sol => (
                  <button
                    key={sol.id}
                    onClick={() => { onOpenSolutions(sol.id); onClose(); }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#0a1128] border border-transparent hover:border-[#d4af37]/30 transition-all text-left"
                  >
                    <div>
                      <div className="font-semibold text-[#f0d878] flex items-center space-x-2">
                        <span>{sol.name}</span>
                        <span className="text-[10px] bg-[#d4af37]/20 text-[#f0d878] px-1.5 py-0.5 rounded uppercase font-mono">{sol.shortCode}</span>
                      </div>
                      <div className="text-[11px] text-[#a9b0c6]">{sol.tagline}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* AI Executives */}
          {filteredExecutives.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold text-[#d4af37] uppercase tracking-wider mb-2">AI Executives</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredExecutives.map(exec => (
                  <div key={exec.id} className="p-2.5 rounded-lg bg-[#0a1128] border border-[#d4af37]/20 text-left">
                    <div className="font-semibold text-[#f0d878]">{exec.title}</div>
                    <div className="text-[11px] text-[#a9b0c6]">{exec.role}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#0a1128] border-t border-[#d4af37]/20 text-[10px] text-[#a9b0c6] flex justify-between items-center">
          <span>Search UNIKORN360 Enterprise Intelligence Stack</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
