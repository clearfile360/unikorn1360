import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles, ShieldCheck, DollarSign, Users, Factory, LayoutDashboard, Cpu, FileCheck, TrendingUp } from 'lucide-react';
import { SOLUTIONS_DATA, SolutionModule } from '../data/solutionsData';

interface SolutionsModalProps {
  isOpen: boolean;
  selectedSolutionId?: string;
  onClose: () => void;
  onBookDemo: (solutionName: string) => void;
}

export const SolutionsModal: React.FC<SolutionsModalProps> = ({
  isOpen,
  selectedSolutionId,
  onClose,
  onBookDemo
}) => {
  const [activeTab, setActiveTab] = useState<string>(selectedSolutionId || 'finance360');

  if (!isOpen) return null;

  const currentSolution = SOLUTIONS_DATA.find(s => s.id === activeTab) || SOLUTIONS_DATA[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'DollarSign': return <DollarSign className="w-5 h-5 text-[#f0d878]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#f0d878]" />;
      case 'Users': return <Users className="w-5 h-5 text-[#f0d878]" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-[#f0d878]" />;
      case 'Factory': return <Factory className="w-5 h-5 text-[#f0d878]" />;
      case 'LayoutDashboard': return <LayoutDashboard className="w-5 h-5 text-[#f0d878]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#f0d878]" />;
      default: return <FileCheck className="w-5 h-5 text-[#f0d878]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-5xl bg-[#0e1a3a] border border-[#d4af37]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] text-[#f6f3ea]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#a9b0c6] hover:text-[#f0d878] rounded-full hover:bg-white/10 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Sidebar Tabs (8 Solutions) */}
        <div className="w-full md:w-64 bg-[#0a1128] border-r border-[#d4af37]/20 p-4 space-y-1 overflow-y-auto shrink-0">
          <div className="text-[10px] uppercase font-bold text-[#d4af37] tracking-widest px-2 mb-3">
            Business360 Solutions
          </div>
          {SOLUTIONS_DATA.map(sol => (
            <button
              key={sol.id}
              onClick={() => setActiveTab(sol.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                activeTab === sol.id
                  ? 'bg-gradient-to-r from-[#d4af37]/30 to-[#d4af37]/10 text-[#f0d878] border border-[#d4af37]/50 shadow-md'
                  : 'text-[#a9b0c6] hover:text-[#f6f3ea] hover:bg-white/5'
              }`}
            >
              {getIcon(sol.iconName)}
              <div>
                <div>{sol.name}</div>
                <div className="text-[9px] text-[#a9b0c6] font-mono">{sol.shortCode}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Content Details Area */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
          
          {/* Header */}
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="p-2 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40">
                {getIcon(currentSolution.iconName)}
              </span>
              <div>
                <h2 className="text-2xl font-serif font-bold text-[#f0d878]">{currentSolution.name}</h2>
                <p className="text-xs text-[#a9b0c6]">{currentSolution.tagline}</p>
              </div>
            </div>
          </div>

          {/* Business Problem Card */}
          <div className="p-4 rounded-xl bg-[#0a1128] border border-red-500/30 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-400 block mb-1">
              Core Business Problem Solved
            </span>
            <p className="text-[#f6f3ea] leading-relaxed">{currentSolution.problem}</p>
          </div>

          {/* Capabilities Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-3">
              Platform Capabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {currentSolution.capabilities.map((cap, idx) => (
                <div key={idx} className="flex items-start space-x-2 p-2.5 rounded-lg bg-[#0a1128]/70 border border-[#d4af37]/15">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span className="text-[#f6f3ea]">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Workflows & AI Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            <div className="p-4 rounded-xl bg-[#0a1128] border border-[#d4af37]/20 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#f0d878] block">
                Automated Workflows
              </span>
              <ul className="space-y-1.5 text-[#a9b0c6]">
                {currentSolution.workflows.map((wf, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                    <span>{wf}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#0a1128] border border-emerald-500/30 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block">
                Embedded AI Intelligence
              </span>
              <ul className="space-y-1.5 text-[#a9b0c6]">
                {currentSolution.aiFeatures.map((ai, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{ai}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Outcomes */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#d4af37]/15 via-[#d4af37]/5 to-transparent border border-[#d4af37]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#f0d878]">
                Proven Business Outcomes
              </span>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {currentSolution.outcomes.map((out, idx) => (
                  <span key={idx} className="text-xs bg-[#0a1128] text-[#f6f3ea] px-2.5 py-1 rounded border border-[#d4af37]/40 font-semibold">
                    {out}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onBookDemo(currentSolution.name);
                onClose();
              }}
              className="shrink-0 bg-gradient-to-r from-[#f0d878] via-[#d4af37] to-[#a8862f] text-[#0a1128] font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg shadow-lg shadow-[#d4af37]/20 hover:scale-[1.02] transition-all flex items-center space-x-2"
            >
              <span>Book {currentSolution.name} Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
