import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Sparkles, 
  ArrowRight, 
  DollarSign, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  Factory, 
  LayoutDashboard, 
  Cpu, 
  FileCheck, 
  Brain, 
  Bot, 
  PhoneCall, 
  Mail, 
  Globe, 
  MapPin, 
  CheckCircle2, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { logoutUser } from './lib/auth';
import { supabase } from './lib/supabase';
import { UserProfile } from './types';
import { COMPANY_INFO } from './data/companyInfo';
import { SOLUTIONS_DATA, AI_EXECUTIVES } from './data/solutionsData';

// Components
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { CommandPalette } from './components/CommandPalette';
import { SolutionsModal } from './components/SolutionsModal';
import { DemoBookingModal } from './components/DemoBookingModal';
import { AiConcierge } from './components/AiConcierge';
import { AssessmentQuiz } from './components/AssessmentQuiz';
import { CustomerPortal } from './components/CustomerPortal';
import { AdminCommandCenter } from './components/AdminCommandCenter';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [activeView, setActiveView] = useState<'website' | 'portal' | 'admin'>('website');

  // Modal states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [solutionsModalOpen, setSolutionsModalOpen] = useState(false);
  const [selectedSolutionId, setSelectedSolutionId] = useState<string | undefined>();
  const [demoBookingOpen, setDemoBookingOpen] = useState(false);
  const [demoSolution, setDemoSolution] = useState<string | undefined>();
  const [aiConciergeOpen, setAiConciergeOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [footerLogo, setFooterLogo] = useState<string | null>(null);

  useEffect(() => {
    const savedLogo = localStorage.getItem('unikorn_brand_logo');
    if (savedLogo) setFooterLogo(savedLogo);

    const handleLogoUpdate = () => {
      setFooterLogo(localStorage.getItem('unikorn_brand_logo'));
    };

    window.addEventListener('unikorn_logo_updated', handleLogoUpdate);
    return () => window.removeEventListener('unikorn_logo_updated', handleLogoUpdate);
  }, []);

  useEffect(() => {
    let isMounted = true;

    // Listen to Supabase auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const user = session.user;
        const isSuperAdmin = user.email?.toLowerCase() === 'contact.unikorn360@gmail.com';
        const profile: UserProfile = {
          user_id: user.id,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'UNIKORN User',
          profile_photo: user.user_metadata?.avatar_url || '',
          role: isSuperAdmin ? 'SUPER_ADMIN' : 'CUSTOMER',
          account_status: 'ACTIVE',
          email_verified: !!user.email_confirmed_at,
          auth_provider: 'google',
          created_at: user.created_at || new Date().toISOString(),
          last_login_at: new Date().toISOString(),
          login_count: 1,
          company: user.user_metadata?.company || '',
          phone: user.phone || '',
          designation: user.user_metadata?.designation || '',
          industry: user.user_metadata?.industry || ''
        };
        if (isMounted) {
          setCurrentUser(profile);
        }
      } else {
        if (isMounted) {
          setCurrentUser(null);
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
    setActiveView('website');
  };

  const openSolutionsModal = (solId?: string) => {
    setSelectedSolutionId(solId);
    setSolutionsModalOpen(true);
  };

  const openDemoModal = (solName?: string) => {
    setDemoSolution(solName);
    setDemoBookingOpen(true);
  };

  const getSolutionIcon = (iconName: string) => {
    switch (iconName) {
      case 'DollarSign': return <DollarSign className="w-6 h-6 text-[#f0d878]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#f0d878]" />;
      case 'Users': return <Users className="w-6 h-6 text-[#f0d878]" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-[#f0d878]" />;
      case 'Factory': return <Factory className="w-6 h-6 text-[#f0d878]" />;
      case 'LayoutDashboard': return <LayoutDashboard className="w-6 h-6 text-[#f0d878]" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-[#f0d878]" />;
      default: return <FileCheck className="w-6 h-6 text-[#f0d878]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-[#D4AF37] selection:text-[#001F3F]">
      
      {/* Sticky Navigation Bar */}
      <Header
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenSolutions={openSolutionsModal}
        onOpenAssessment={() => setAssessmentOpen(true)}
        onOpenDemoBooking={openDemoModal}
        onOpenConcierge={() => setAiConciergeOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main View Router */}
      {activeView === 'portal' && currentUser ? (
        <CustomerPortal
          currentUser={currentUser}
          onOpenDemoBooking={openDemoModal}
          onOpenAssessment={() => setAssessmentOpen(true)}
        />
      ) : activeView === 'admin' && currentUser ? (
        <AdminCommandCenter 
          currentUser={currentUser} 
        />
      ) : (
        /* PUBLIC CORPORATE WEBSITE */
        <main>
          
          {/* Hero Section */}
          <section className="relative pt-20 pb-24 text-center border-b-2 border-[#D4AF37] bg-gradient-to-b from-[#001F3F] via-[#002B5B] to-[#001F3F] text-white overflow-hidden shadow-lg">
            
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-[#D4AF37]/15 to-transparent pointer-events-none blur-3xl"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <span className="font-sans uppercase text-xs tracking-[0.28em] text-[#D4AF37] font-bold block mb-4">
                The Enterprise Intelligence Company
              </span>

              <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight text-white">
                We Don't Build Software.<br />
                We Build <span className="text-[#D4AF37]">Intelligent Businesses.</span>
              </h1>

              <p className="max-w-3xl mx-auto mt-6 text-base sm:text-lg text-white/80 leading-relaxed font-sans">
                {COMPANY_INFO.name} transforms organizations into AI-powered enterprises — combining Business Intelligence, Process Automation, Compliance, Finance, Legal Operations, and Executive Decision Intelligence into one unified ecosystem.
              </p>

              <div className="mt-8 font-sans text-xs tracking-widest text-[#D4AF37] space-y-1 font-bold uppercase">
                <div>ONE PLATFORM. • ONE BUSINESS BRAIN. • UNLIMITED POSSIBILITIES.</div>
              </div>

              {/* Action CTA Buttons */}
              <div className="mt-10 flex flex-wrap justify-center gap-4 font-sans">
                <button
                  onClick={() => openDemoModal()}
                  className="bg-[#D4AF37] hover:bg-[#c49f27] text-[#001F3F] font-bold text-xs uppercase tracking-widest px-8 py-4 rounded shadow-lg hover:scale-105 transition-all flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Transformation</span>
                </button>

                <button
                  onClick={() => openDemoModal()}
                  className="border-2 border-[#D4AF37] text-white hover:bg-white/10 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded transition-all"
                >
                  Book Executive Demo
                </button>

                <button
                  onClick={() => setAssessmentOpen(true)}
                  className="bg-[#002B5B] border border-green-400/50 text-green-300 font-bold text-xs uppercase tracking-widest px-6 py-4 rounded hover:bg-green-500/20 transition-all flex items-center space-x-2"
                >
                  <Brain className="w-4 h-4 text-green-400" />
                  <span>Check AI Readiness Score</span>
                </button>
              </div>
            </div>
          </section>

          {/* Trust Strip */}
          <div className="py-5 border-b border-gray-200 bg-white font-sans text-xs uppercase tracking-widest text-gray-600 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-x-8 gap-y-2 font-semibold">
              <span>MSMEs</span>
              <span className="text-[#D4AF37]">·</span>
              <span>Growing Businesses</span>
              <span className="text-[#D4AF37]">·</span>
              <span>Manufacturers</span>
              <span className="text-[#D4AF37]">·</span>
              <span>Exporters</span>
              <span className="text-[#D4AF37]">·</span>
              <span>Professionals</span>
              <span className="text-[#D4AF37]">·</span>
              <span>Enterprises</span>
              <span className="text-[#D4AF37]">·</span>
              <span>Government Bodies</span>
            </div>
          </div>

          {/* Core Problem Section */}
          <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="font-sans uppercase text-xs tracking-[0.28em] text-[#001F3F] font-bold block mb-2">
              The Problem
            </span>
            <div className="w-16 h-1 bg-[#D4AF37] mb-6"></div>

            <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-[#001F3F]">
              Every business has data.<br />
              <span className="text-gray-500 italic font-normal">Very few have intelligence.</span>
            </h2>

            <p className="mt-6 text-gray-700 text-lg max-w-2xl font-sans leading-relaxed">
              Most companies run on disconnected software — every system knows something, nothing knows everything. UNIKORN360 creates a living Business Intelligence Layer that connects every department into one continuously learning ecosystem.
            </p>

            <div className="flex flex-wrap gap-2 mt-8 font-sans text-xs text-gray-700">
              {['Accounting Software', 'HR Software', 'GST Software', 'CRM', 'Excel', 'Email', 'WhatsApp', 'Documents'].map((sys, i) => (
                <span key={i} className="px-4 py-2 rounded-lg border border-gray-200 bg-white shadow-sm font-semibold text-[#001F3F]">
                  {sys}
                </span>
              ))}
            </div>
          </section>

          {/* Business360 Solutions Grid Section */}
          <section id="stack" className="py-20 bg-[#001F3F] text-white border-t-2 border-b-2 border-[#D4AF37]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
                <div>
                  <span className="font-sans uppercase text-xs tracking-[0.28em] text-[#D4AF37] font-bold block mb-2">
                    Our Intelligence Stack
                  </span>
                  <div className="w-16 h-1 bg-[#D4AF37] mb-4"></div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white">
                    Business360 — <span className="text-white/70 italic font-normal">the complete business management platform.</span>
                  </h2>
                </div>

                <button
                  onClick={() => openSolutionsModal()}
                  className="mt-4 sm:mt-0 font-sans text-xs uppercase font-bold text-[#D4AF37] flex items-center space-x-1.5 hover:underline tracking-widest"
                >
                  <span>Explore All Capabilities</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* 8 Solution Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SOLUTIONS_DATA.map((sol, idx) => (
                  <div
                    key={sol.id}
                    onClick={() => openSolutionsModal(sol.id)}
                    className="bg-[#002B5B] hover:bg-[#001F3F] border border-[#D4AF37]/30 hover:border-[#D4AF37] p-6 rounded-lg transition-all cursor-pointer group flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs text-[#D4AF37] font-bold">0{idx + 1}</span>
                        {getSolutionIcon(sol.iconName)}
                      </div>
                      <h3 className="text-xl text-[#D4AF37] font-bold group-hover:translate-x-1 transition-transform mb-2">
                        {sol.name}
                      </h3>
                      <p className="text-xs text-white/80 font-sans line-clamp-2 leading-relaxed">
                        {sol.tagline}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-sans text-[#D4AF37] font-bold uppercase tracking-wider">
                      <span>View Workflows</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* AI Executives Section */}
          <section id="exec" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="font-sans uppercase text-xs tracking-[0.28em] text-[#001F3F] font-bold block mb-2">
              Meet Your AI Executive Team
            </span>
            <div className="w-16 h-1 bg-[#D4AF37] mb-6"></div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#001F3F] mb-12">
              Not chatbots. <span className="text-gray-500 italic font-normal">Business executives powered by AI.</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {AI_EXECUTIVES.map(exec => (
                <div key={exec.id} className="bg-white border-l-4 border-l-[#D4AF37] border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-all relative">
                  <span className="absolute top-4 right-4 font-sans text-[10px] font-bold uppercase tracking-widest bg-[#001F3F] text-[#D4AF37] px-2.5 py-1 rounded">
                    AI EXECUTIVE
                  </span>
                  <h4 className="text-lg text-[#001F3F] font-bold mb-1">{exec.title}</h4>
                  <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">{exec.role}</div>
                  <p className="text-xs text-gray-600 leading-relaxed">{exec.focusArea}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Morning Executive Briefing Panel */}
          <section className="py-20 bg-[#001F3F] text-white border-t-2 border-b-2 border-[#D4AF37]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <span className="font-sans uppercase text-xs tracking-[0.28em] text-[#D4AF37] font-bold block mb-2">
                Executive Morning Brief
              </span>
              <div className="w-16 h-1 bg-[#D4AF37] mb-6"></div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
                Instead of opening twenty applications —<br />
                <span className="text-white/70 italic font-normal">open one dashboard. Know everything.</span>
              </h2>

              <div className="bg-[#002B5B] border border-[#D4AF37]/40 p-8 rounded-xl shadow-xl grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 font-sans text-xs">
                {[
                  { label: 'Revenue Yesterday', val: 'Live' },
                  { label: 'Profit Trends', val: 'Live' },
                  { label: 'GST Summary & Filings', val: 'Live' },
                  { label: 'Pending Collections', val: 'Live' },
                  { label: 'Vendor Alerts & Shortages', val: 'Live' },
                  { label: 'Compliance & Permit Deadlines', val: 'Live' },
                  { label: 'Employee Attendance & Payroll', val: 'Live' },
                  { label: 'Business Risk Score', val: 'Live' },
                  { label: 'Real-time Cash Position', val: 'Live' },
                  { label: 'Growth Opportunities Radar', val: 'Live' }
                ].map((brief, i) => (
                  <div key={i} className="flex justify-between py-2.5 border-b border-white/10 text-white/80">
                    <span className="font-medium">{brief.label}</span>
                    <b className="text-[#D4AF37] uppercase tracking-wider font-bold">{brief.val}</b>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Industries Section */}
          <section id="industries" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="font-sans uppercase text-xs tracking-[0.28em] text-[#001F3F] font-bold block mb-2">
              Industries We Transform
            </span>
            <div className="w-16 h-1 bg-[#D4AF37] mb-6"></div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#001F3F] mb-8">
              Built for how <span className="text-gray-500 italic font-normal">real businesses operate.</span>
            </h2>

            <div className="flex flex-wrap gap-3 font-sans text-xs">
              {['Manufacturing', 'Retail', 'Healthcare', 'Education', 'Construction', 'Textiles', 'Export', 'Import', 'Hospitality', 'Professional Services', 'Logistics', 'Government', 'NGOs', 'Startups', 'Large Enterprises'].map((ind, i) => (
                <span key={i} className="border border-gray-300 text-[#001F3F] bg-white font-bold px-4 py-2 rounded-md shadow-sm hover:border-[#D4AF37] transition-colors">
                  {ind}
                </span>
              ))}
            </div>
          </section>

          {/* Statistics Grid */}
          <div className="border-t-2 border-b-2 border-[#D4AF37] bg-[#001F3F] text-white py-12">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
              {COMPANY_INFO.stats.map((st, i) => (
                <div key={i} className="p-4 border-r last:border-r-0 border-white/10">
                  <div className="text-3xl sm:text-4xl font-bold text-[#D4AF37]">{st.number}</div>
                  <div className="font-sans text-[11px] text-white/80 uppercase tracking-wider font-bold mt-1">{st.label}</div>
                  <div className="font-sans text-[9px] text-[#D4AF37]/80 mt-0.5">{st.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Call To Action */}
          <section className="py-24 text-center bg-white border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4">
              <span className="font-sans uppercase text-xs tracking-[0.28em] text-[#001F3F] font-bold block mb-2">
                Ready to Build the Future?
              </span>
              <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-6"></div>

              <h2 className="text-3xl sm:text-5xl font-bold text-[#001F3F] leading-tight">
                The next generation of businesses<br />
                <span className="text-gray-500 italic font-normal">will compete using better intelligence.</span>
              </h2>
              <p className="mt-4 text-gray-600 text-lg">Become one of them.</p>

              <div className="mt-8 flex flex-wrap justify-center gap-4 font-sans">
                <button
                  onClick={() => openDemoModal()}
                  className="bg-[#001F3F] text-white hover:bg-[#002B5B] border border-[#D4AF37] font-bold text-xs uppercase tracking-widest px-8 py-4 rounded shadow-md hover:scale-105 transition-all"
                >
                  Start Your AI Transformation
                </button>

                <button
                  onClick={() => openDemoModal()}
                  className="bg-[#D4AF37] hover:bg-[#c49f27] text-[#001F3F] font-bold text-xs uppercase tracking-widest px-8 py-4 rounded shadow-md transition-all"
                >
                  Book Executive Consultation
                </button>
              </div>
            </div>
          </section>

          {/* Full Corporate Footer with Letterhead / Business Card Details */}
          <footer id="contact" className="bg-[#001F3F] text-white pt-16 pb-12 border-t-2 border-[#D4AF37] text-center font-sans shadow-lg">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              
              {/* Logo & Company Name */}
              <div className="flex flex-col items-center justify-center space-y-2">
                {footerLogo ? (
                  <img 
                    src={footerLogo} 
                    alt="UNIKORN360 Brand Logo" 
                    className="w-16 h-16 object-contain rounded bg-[#001F3F] p-1 border-2 border-[#D4AF37] shadow-lg" 
                  />
                ) : (
                  <div className="w-12 h-12 rounded bg-[#D4AF37] flex items-center justify-center font-bold text-[#001F3F] text-2xl shadow-lg">
                    U3
                  </div>
                )}
                <h3 className="text-2xl text-white font-bold tracking-wider uppercase">
                  {COMPANY_INFO.name}
                </h3>
                <p className="text-xs text-white/70 italic max-w-lg">
                  "{COMPANY_INFO.slogan}"
                </p>
                <p className="text-[11px] text-[#D4AF37] font-bold">
                  Founder & CEO: {COMPANY_INFO.ceo.name}
                </p>
              </div>

              {/* Pillars list from letterpad */}
              <div className="py-4 border-t border-b border-white/10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#D4AF37] font-bold">
                {COMPANY_INFO.pillars.map((pil, idx) => (
                  <span key={idx}>• {pil.title}</span>
                ))}
              </div>

              {/* Contact Info Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-white/80">
                <div className="flex flex-col items-center space-y-1">
                  <PhoneCall className="w-5 h-5 text-[#D4AF37]" />
                  <span className="font-bold text-white uppercase tracking-wider">Phone / WhatsApp</span>
                  <a href={`tel:${COMPANY_INFO.contacts.phoneNumeric}`} className="hover:text-[#D4AF37]">
                    {COMPANY_INFO.contacts.phone}
                  </a>
                </div>

                <div className="flex flex-col items-center space-y-1">
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                  <span className="font-bold text-white uppercase tracking-wider">Email</span>
                  <a href={`mailto:${COMPANY_INFO.contacts.primaryEmail}`} className="hover:text-[#D4AF37]">
                    {COMPANY_INFO.contacts.primaryEmail}
                  </a>
                </div>

                <div className="flex flex-col items-center space-y-1">
                  <Globe className="w-5 h-5 text-[#D4AF37]" />
                  <span className="font-bold text-white uppercase tracking-wider">Website</span>
                  <a href={COMPANY_INFO.contacts.websiteUrl} target="_blank" rel="noreferrer" className="hover:text-[#D4AF37]">
                    {COMPANY_INFO.contacts.website}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col items-center space-y-1 text-xs text-white/80">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
                <span className="font-bold text-white uppercase tracking-wider">Registered Office Address</span>
                <p className="max-w-xl text-[11px] leading-relaxed text-white/70">
                  {COMPANY_INFO.address.fullAddress}
                </p>
              </div>

              {/* Social Media Links */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap justify-center gap-6 text-xs font-semibold">
                <a href={COMPANY_INFO.socials.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-1.5 text-white/80 hover:text-[#D4AF37]">
                  <Instagram className="w-4 h-4 text-[#D4AF37]" />
                  <span>{COMPANY_INFO.socials.instagram}</span>
                </a>
                <a href={COMPANY_INFO.socials.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-1.5 text-white/80 hover:text-[#D4AF37]">
                  <Linkedin className="w-4 h-4 text-[#D4AF37]" />
                  <span>{COMPANY_INFO.socials.linkedin}</span>
                </a>
                <a href={COMPANY_INFO.socials.xUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-1.5 text-white/80 hover:text-[#D4AF37]">
                  <Twitter className="w-4 h-4 text-[#D4AF37]" />
                  <span>{COMPANY_INFO.socials.x}</span>
                </a>
                <a href={COMPANY_INFO.socials.youtubeUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-1.5 text-white/80 hover:text-[#D4AF37]">
                  <Youtube className="w-4 h-4 text-[#D4AF37]" />
                  <span>{COMPANY_INFO.socials.youtube}</span>
                </a>
              </div>

              {/* Copyright */}
              <div className="text-[10px] text-white/50 tracking-widest uppercase font-semibold">
                © {new Date().getFullYear()} {COMPANY_INFO.legalName}. All rights reserved. • Intelligent Systems. Real-World Impact.
              </div>

            </div>
          </footer>

        </main>
      )}

      {/* Floating "Ask UNIKORN360 AI" Trigger Button */}
      <button
        onClick={() => setAiConciergeOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#001F3F] text-white font-bold text-xs px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center space-x-2 border-2 border-[#D4AF37]"
      >
        <Bot className="w-5 h-5 text-[#D4AF37]" />
        <span className="hidden sm:inline uppercase tracking-wider">Ask UNIKORN360 AI</span>
      </button>

      {/* Global Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
          setActiveView(user.role === 'SUPER_ADMIN' || user.role === 'ADMIN' ? 'admin' : 'portal');
        }}
      />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenSolutions={openSolutionsModal}
        onOpenAssessment={() => setAssessmentOpen(true)}
        onOpenDemoBooking={openDemoModal}
        onOpenConcierge={() => setAiConciergeOpen(true)}
        onOpenAdmin={() => setActiveView('admin')}
        isAdmin={currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'ADMIN'}
      />

      <SolutionsModal
        isOpen={solutionsModalOpen}
        selectedSolutionId={selectedSolutionId}
        onClose={() => setSolutionsModalOpen(false)}
        onBookDemo={(sol) => openDemoModal(sol)}
      />

      <DemoBookingModal
        isOpen={demoBookingOpen}
        preselectedSolution={demoSolution}
        onClose={() => setDemoBookingOpen(false)}
        userId={currentUser?.user_id}
        userEmail={currentUser?.email}
      />

      <AiConcierge
        isOpen={aiConciergeOpen}
        onClose={() => setAiConciergeOpen(false)}
        onBookDemo={(sol) => openDemoModal(sol)}
      />

      <AssessmentQuiz
        isOpen={assessmentOpen}
        onClose={() => setAssessmentOpen(false)}
        userId={currentUser?.user_id}
        userEmail={currentUser?.email}
        onBookConsultation={() => openDemoModal('AI Business Readiness Consultation')}
      />

    </div>
  );
}
