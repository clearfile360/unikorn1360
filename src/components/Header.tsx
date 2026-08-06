import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  User, 
  LogOut, 
  ShieldCheck, 
  LayoutDashboard, 
  ChevronDown, 
  Menu, 
  X,
  Sparkles,
  Bot,
  Brain,
  FileText,
  PhoneCall,
  Globe,
  Check
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyInfo';
import { UserProfile } from '../types';

const LANGUAGES = [
  { code: 'EN', name: 'English', native: 'English' },
  { code: 'HI', name: 'Hindi', native: 'हिन्दी' },
  { code: 'TA', name: 'Tamil', native: 'தமிழ்' },
  { code: 'TE', name: 'Telugu', native: 'తెలుగు' },
  { code: 'KN', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'MR', name: 'Marathi', native: 'मराठी' },
  { code: 'ES', name: 'Spanish', native: 'Español' },
  { code: 'FR', name: 'French', native: 'Français' },
  { code: 'DE', name: 'German', native: 'Deutsch' },
  { code: 'AR', name: 'Arabic', native: 'العربية' },
];

interface HeaderProps {
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenCommandPalette: () => void;
  onOpenSolutions: (solutionId?: string) => void;
  onOpenAssessment: () => void;
  onOpenDemoBooking: (solutionId?: string) => void;
  onOpenConcierge: () => void;
  activeView: 'website' | 'portal' | 'admin';
  setActiveView: (view: 'website' | 'portal' | 'admin') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenCommandPalette,
  onOpenSolutions,
  onOpenAssessment,
  onOpenDemoBooking,
  onOpenConcierge,
  activeView,
  setActiveView
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('unikorn_lang');
    if (savedLang) {
      setSelectedLang(savedLang);
    }

    const savedLogo = localStorage.getItem('unikorn_brand_logo');
    if (savedLogo) {
      setCustomLogo(savedLogo);
    }

    const handleStorageChange = () => {
      const updatedLogo = localStorage.getItem('unikorn_brand_logo');
      setCustomLogo(updatedLogo);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('unikorn_logo_updated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('unikorn_logo_updated', handleStorageChange);
    };
  }, []);

  const handleSelectLang = (code: string) => {
    setSelectedLang(code);
    localStorage.setItem('unikorn_lang', code);
    setLangDropdownOpen(false);
    window.dispatchEvent(new CustomEvent('unikorn_lang_changed', { detail: code }));
  };

  const currentLangObj = LANGUAGES.find(l => l.code === selectedLang) || LANGUAGES[0];

  const isAdmin = currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'ADMIN';

  return (
    <nav className="sticky top-0 z-50 bg-[#001F3F] border-b-2 border-[#D4AF37] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveView('website')}>
            <div className="shrink-0">
              {customLogo ? (
                <img 
                  src={customLogo} 
                  alt="UNIKORN360 Brand Logo" 
                  className="w-11 h-11 object-contain rounded bg-[#001F3F] p-0.5 border-2 border-[#D4AF37] shadow-md group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-11 h-11 bg-[#D4AF37] rounded flex items-center justify-center font-bold text-[#001F3F] text-xl shadow-md shrink-0 group-hover:scale-105 transition-transform">
                  U3
                </div>
              )}
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-sans font-bold text-lg sm:text-xl tracking-wider text-white uppercase">
                  UNIKORN<span className="text-[#D4AF37]">360</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-white/10 text-[#D4AF37] border border-[#D4AF37]/40 font-sans font-bold">
                  AI SOLUTIONS
                </span>
              </div>
              <span className="text-[10px] text-white/70 tracking-widest uppercase font-sans hidden md:block">
                The Enterprise Intelligence Company
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-6 text-xs uppercase tracking-widest font-semibold text-white/80">
            
            {/* Solutions Dropdown */}
            <div className="relative group" onMouseEnter={() => setSolutionsDropdownOpen(true)} onMouseLeave={() => setSolutionsDropdownOpen(false)}>
              <button 
                onClick={() => onOpenSolutions()}
                className="flex items-center space-x-1 py-2 hover:text-[#D4AF37] transition-colors"
              >
                <span>Solutions</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>

              {solutionsDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-[#001F3F] border-2 border-[#D4AF37] rounded-lg shadow-2xl p-3 grid grid-cols-2 gap-2 text-left lowercase capitalize">
                  {[
                    { id: 'finance360', name: 'Finance360', desc: 'Accounting & GST' },
                    { id: 'legal360', name: 'Legal360', desc: 'Compliance & Legal AI' },
                    { id: 'hr360', name: 'HR360', desc: 'Payroll & Talent AI' },
                    { id: 'sales360', name: 'Sales360', desc: 'CRM & Quotes' },
                    { id: 'factory360', name: 'Factory360', desc: 'Manufacturing' },
                    { id: 'executive360', name: 'Executive360', desc: 'CEO Dashboard' },
                    { id: 'ai360', name: 'AI360', desc: 'AI Agents Studio' },
                    { id: 'compliance360', name: 'Compliance360', desc: 'Subsidies & Audits' }
                  ].map(sol => (
                    <button
                      key={sol.id}
                      onClick={() => {
                        onOpenSolutions(sol.id);
                        setSolutionsDropdownOpen(false);
                      }}
                      className="p-2 rounded hover:bg-white/10 transition-colors text-left"
                    >
                      <div className="text-xs font-bold text-[#D4AF37]">{sol.name}</div>
                      <div className="text-[10px] text-white/70">{sol.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href="#exec" className="hover:text-[#D4AF37] transition-colors">AI Executives</a>
            <a href="#industries" className="hover:text-[#D4AF37] transition-colors">Industries</a>
            
            <button 
              onClick={onOpenAssessment}
              className="flex items-center space-x-1.5 text-[#D4AF37] bg-white/10 px-3 py-1.5 rounded border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-[#001F3F] font-bold transition-all"
            >
              <Brain className="w-3.5 h-3.5" />
              <span>AI Assessment</span>
            </button>

            <button 
              onClick={onOpenConcierge}
              className="flex items-center space-x-1.5 text-green-400 bg-green-500/10 px-3 py-1.5 rounded border border-green-500/30 hover:bg-green-500/20 font-bold transition-all"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Ask AI</span>
            </button>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-3">
            
            {/* Command Palette Trigger Button */}
            <button
              onClick={onOpenCommandPalette}
              className="p-2 text-white/80 hover:text-[#D4AF37] bg-[#002B5B] border border-[#D4AF37]/30 rounded-lg hover:border-[#D4AF37] transition-all flex items-center space-x-2 text-xs"
              title="Search & Quick Actions (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden xl:inline text-[11px] text-white/70">Search...</span>
              <kbd className="hidden xl:inline text-[9px] bg-[#001F3F] px-1.5 py-0.5 rounded text-[#D4AF37] border border-[#D4AF37]/30">⌘K</kbd>
            </button>

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1.5 bg-[#002B5B] hover:bg-[#003670] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm"
                title="Select Language / भाषा चुनें"
                aria-label="Select Language"
              >
                <Globe className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-xs font-bold text-white tracking-wider uppercase">{currentLangObj.code}</span>
                <ChevronDown className="w-3 h-3 text-[#D4AF37]" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#001F3F] border-2 border-[#D4AF37] rounded-xl shadow-2xl py-2 z-50 text-left max-h-72 overflow-y-auto font-sans">
                  <div className="px-3 py-1.5 border-b border-white/10 mb-1">
                    <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider">Select Language</span>
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleSelectLang(lang.code)}
                      className={`w-full text-left px-3 py-1.5 hover:bg-white/10 flex items-center justify-between text-xs transition-colors ${
                        selectedLang === lang.code ? 'text-[#D4AF37] font-bold bg-white/5' : 'text-white/80'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white font-bold">{lang.code}</span>
                        <span>{lang.name}</span>
                        <span className="text-[10px] text-white/50">({lang.native})</span>
                      </div>
                      {selectedLang === lang.code && <Check className="w-3.5 h-3.5 text-[#D4AF37]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Book Demo Button */}
            <button
              onClick={() => onOpenDemoBooking()}
              className="hidden sm:inline-flex items-center space-x-2 bg-[#D4AF37] hover:bg-[#c49f27] text-[#001F3F] font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded shadow-md transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Demo</span>
            </button>

            {/* Auth / User Control */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 bg-[#002B5B] border border-[#D4AF37]/50 rounded-full px-3 py-1.5 text-xs text-white hover:border-[#D4AF37] transition-all"
                >
                  {currentUser.profile_photo ? (
                    <img src={currentUser.profile_photo} alt={currentUser.full_name} className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#001F3F] font-bold flex items-center justify-center text-xs">
                      {currentUser.full_name.charAt(0)}
                    </div>
                  )}
                  <span className="max-w-[100px] truncate font-semibold">{currentUser.full_name.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-[#D4AF37]" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#001F3F] border-2 border-[#D4AF37] rounded-xl shadow-2xl py-2 z-50 text-left">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-xs font-bold text-white">{currentUser.full_name}</p>
                      <p className="text-[11px] text-white/70 truncate">{currentUser.email}</p>
                      <div className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                        Role: {currentUser.role}
                      </div>
                    </div>

                    <div className="py-1 text-xs">
                      <button
                        onClick={() => {
                          setActiveView('website');
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-white/10 text-white/80 hover:text-[#D4AF37] flex items-center space-x-2"
                      >
                        <Building2 className="w-4 h-4 text-[#D4AF37]" />
                        <span>Corporate Website</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveView('portal');
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-white/10 text-white/80 hover:text-[#D4AF37] flex items-center space-x-2"
                      >
                        <User className="w-4 h-4 text-[#D4AF37]" />
                        <span>My UNIKORN360 Portal</span>
                      </button>

                      {isAdmin && (
                        <button
                          onClick={() => {
                            setActiveView('admin');
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-white/15 text-[#D4AF37] font-bold flex items-center space-x-2 bg-white/5"
                        >
                          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                          <span>Super Admin Command Center</span>
                        </button>
                      )}

                      <div className="border-t border-white/10 my-1"></div>

                      <button
                        onClick={() => {
                          onLogout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-red-500/15 text-red-400 flex items-center space-x-2 font-semibold"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37] px-4 py-2 rounded hover:bg-[#D4AF37] hover:text-[#001F3F] transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-[#D4AF37]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#002B5B] border-b-2 border-[#D4AF37] px-4 pt-2 pb-6 space-y-3 text-sm">
          <button onClick={() => { onOpenSolutions(); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-white font-semibold">
            Solutions (8 Modules)
          </button>
          <a href="#exec" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-white/80">AI Executives</a>
          <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-white/80">Industries</a>
          
          <button onClick={() => { onOpenAssessment(); setMobileMenuOpen(false); }} className="flex items-center space-x-2 text-[#D4AF37] py-2 font-semibold">
            <Brain className="w-4 h-4" />
            <span>AI Business Intelligence Assessment</span>
          </button>

          <button onClick={() => { onOpenConcierge(); setMobileMenuOpen(false); }} className="flex items-center space-x-2 text-green-400 py-2 font-semibold">
            <Bot className="w-4 h-4" />
            <span>Ask UNIKORN360 AI</span>
          </button>

          <div className="pt-2 border-t border-white/10">
            <div className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider mb-2 flex items-center space-x-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>Language / भाषा:</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => {
                    handleSelectLang(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2 py-1.5 rounded text-xs text-left flex items-center justify-between transition-colors ${
                    selectedLang === lang.code ? 'bg-[#D4AF37] text-[#001F3F] font-bold' : 'bg-white/5 text-white/80 hover:bg-white/10'
                  }`}
                >
                  <span className="truncate">{lang.name} ({lang.native})</span>
                  {selectedLang === lang.code && <Check className="w-3 h-3 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => { onOpenDemoBooking(); setMobileMenuOpen(false); }} className="w-full bg-[#D4AF37] text-[#001F3F] font-bold py-2.5 rounded text-center uppercase text-xs tracking-widest mt-2">
            Book Executive Demo
          </button>
        </div>
      )}
    </nav>
  );
};
