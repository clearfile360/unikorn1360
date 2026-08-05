import React, { useState, useEffect } from 'react';
import { 
  User, 
  Building2, 
  ShieldCheck, 
  FileText, 
  Brain, 
  HelpCircle, 
  Briefcase, 
  Plus, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Phone,
  Mail,
  Send
} from 'lucide-react';
import { UserProfile, SupportTicketRecord, AssessmentRecord, LeadRecord } from '../types';
import { SOLUTIONS_DATA } from '../data/solutionsData';

interface CustomerPortalProps {
  currentUser: UserProfile;
  onOpenDemoBooking: (sol?: string) => void;
  onOpenAssessment: () => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  currentUser,
  onOpenDemoBooking,
  onOpenAssessment
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'solutions' | 'assessments' | 'tickets' | 'organization'>('overview');
  const [tickets, setTickets] = useState<SupportTicketRecord[]>([]);
  const [assessments, setAssessments] = useState<AssessmentRecord[]>([]);
  const [leads, setLeads] = useState<LeadRecord[]>([]);

  // New ticket state
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketMessage, setNewTicketMessage] = useState('');
  const [newTicketCategory, setNewTicketCategory] = useState('General');
  const [creatingTicket, setCreatingTicket] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [currentUser.user_id]);

  const fetchUserData = async () => {
    // Keep local ticket & assessment lists
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject.trim() || !newTicketMessage.trim()) return;

    setCreatingTicket(true);
    try {
      const newTicket: SupportTicketRecord = {
        id: `tick_${Date.now()}`,
        ticket_id: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
        user_id: currentUser.user_id,
        user_email: currentUser.email,
        subject: newTicketSubject,
        category: newTicketCategory,
        priority: 'MEDIUM',
        status: 'OPEN',
        message: newTicketMessage,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setTickets(prev => [newTicket, ...prev]);

      setNewTicketSubject('');
      setNewTicketMessage('');
    } catch (err) {
      console.error("Failed to create support ticket:", err);
    } finally {
      setCreatingTicket(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Welcome Header */}
        <div className="p-6 sm:p-8 rounded-xl bg-[#001F3F] text-white border-2 border-[#D4AF37] shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded bg-[#D4AF37] flex items-center justify-center font-bold text-[#001F3F] text-2xl shadow-md">
              {currentUser.full_name.charAt(0)}
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-white uppercase tracking-wider">
                  Welcome, {currentUser.full_name}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-white/10 text-[#D4AF37] px-2.5 py-1 rounded border border-[#D4AF37]/50">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-white/70 mt-1">
                {currentUser.company || 'Enterprise Account'} • {currentUser.email}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onOpenDemoBooking()}
              className="bg-[#D4AF37] text-[#001F3F] hover:bg-[#c49f27] font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded shadow transition-all"
            >
              Request New Solution
            </button>
            <button
              onClick={onOpenAssessment}
              className="bg-white/10 text-[#D4AF37] border border-[#D4AF37]/50 font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded hover:bg-white/20 transition-all"
            >
              Take AI Assessment
            </button>
          </div>
        </div>

        {/* Workspace Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2 text-xs font-bold">
          {[
            { id: 'overview', label: 'My Workspace Overview', icon: Building2 },
            { id: 'solutions', label: 'My Business360 Stack', icon: Briefcase },
            { id: 'assessments', label: 'AI Readiness Reports', icon: Brain },
            { id: 'tickets', label: 'Support & Inquiries', icon: HelpCircle },
            { id: 'organization', label: 'Company & Team', icon: Users }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#001F3F] text-white font-bold shadow border border-[#D4AF37]'
                    : 'bg-white text-gray-700 hover:text-[#001F3F] border border-gray-200 shadow-sm'
                }`}
              >
                <Icon className="w-4 h-4 text-[#D4AF37]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Quick Stats */}
            <div className="p-5 rounded-lg bg-white border border-gray-200 shadow-sm space-y-3">
              <div className="text-xs uppercase font-bold text-gray-500">Digital Brain Status</div>
              <div className="text-2xl font-bold text-[#001F3F]">Active</div>
              <p className="text-xs text-gray-600">
                UNIKORN360 Intelligence engine connected to account {currentUser.email}
              </p>
            </div>

            <div className="p-5 rounded-lg bg-white border border-gray-200 shadow-sm space-y-3">
              <div className="text-xs uppercase font-bold text-gray-500">Saved AI Assessments</div>
              <div className="text-2xl font-bold text-[#001F3F]">{assessments.length}</div>
              <p className="text-xs text-gray-600">Business Intelligence readiness reports generated</p>
            </div>

            <div className="p-5 rounded-lg bg-white border border-gray-200 shadow-sm space-y-3">
              <div className="text-xs uppercase font-bold text-gray-500">Demo Requests</div>
              <div className="text-2xl font-bold text-[#001F3F]">{leads.length}</div>
              <p className="text-xs text-gray-600">Inbound solution demonstrations scheduled</p>
            </div>

            {/* Recent Leads / Requests */}
            <div className="md:col-span-2 p-6 rounded-lg bg-white border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#001F3F]">My Solution & Demo Requests</h3>
              {leads.length === 0 ? (
                <p className="text-xs text-gray-500">No active demo requests yet. Click "Request New Solution" above to schedule a demo.</p>
              ) : (
                <div className="space-y-2">
                  {leads.map(lead => (
                    <div key={lead.id} className="p-3.5 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-[#001F3F]">{lead.solution_interested}</div>
                        <div className="text-[11px] text-gray-500">{lead.company} • Requested on {new Date(lead.created_at).toLocaleDateString()}</div>
                      </div>
                      <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded text-[10px] uppercase">
                        Status: {lead.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Info Card */}
            <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm space-y-4 text-xs">
              <h3 className="text-base font-bold text-[#001F3F]">UNIKORN ID Account Details</h3>
              <div className="space-y-2 text-gray-600">
                <div><b className="text-[#001F3F]">Full Name:</b> {currentUser.full_name}</div>
                <div><b className="text-[#001F3F]">Email:</b> {currentUser.email}</div>
                <div><b className="text-[#001F3F]">Role:</b> {currentUser.role}</div>
                <div><b className="text-[#001F3F]">Provider:</b> {currentUser.auth_provider}</div>
                <div><b className="text-[#001F3F]">Account Status:</b> <span className="text-green-600 font-bold">{currentUser.account_status}</span></div>
                <div><b className="text-[#001F3F]">Logins Count:</b> {currentUser.login_count}</div>
              </div>
            </div>

          </div>
        )}

        {/* Solutions Stack Tab */}
        {activeTab === 'solutions' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#001F3F]">Available UNIKORN360 Modules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {SOLUTIONS_DATA.map(sol => (
                <div key={sol.id} className="p-5 rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col justify-between space-y-3">
                  <div>
                    <div className="font-bold text-sm text-[#001F3F] mb-1">{sol.name}</div>
                    <p className="text-gray-600 text-[11px] line-clamp-2">{sol.tagline}</p>
                  </div>

                  <button
                    onClick={() => onOpenDemoBooking(sol.name)}
                    className="w-full bg-[#001F3F] hover:bg-[#002B5B] text-white border border-[#D4AF37] font-bold py-2 rounded transition-all text-center uppercase tracking-wider text-[10px]"
                  >
                    Request Demo
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Support Tickets Tab */}
        {activeTab === 'tickets' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            
            {/* Create Ticket */}
            <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#001F3F]">Create Support Ticket</h3>
              <form onSubmit={handleCreateTicket} className="space-y-3">
                <div>
                  <label className="block text-[11px] text-gray-600 mb-1 font-semibold">Subject</label>
                  <input
                    type="text"
                    required
                    value={newTicketSubject}
                    onChange={(e) => setNewTicketSubject(e.target.value)}
                    placeholder="e.g. GST integration inquiry"
                    className="w-full bg-gray-50 border border-gray-300 rounded p-2 text-[#1A1A1A] focus:outline-none focus:border-[#001F3F]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1 font-semibold">Category</label>
                  <select
                    value={newTicketCategory}
                    onChange={(e) => setNewTicketCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded p-2 text-[#1A1A1A] focus:outline-none focus:border-[#001F3F]"
                  >
                    <option value="General">General Inquiry</option>
                    <option value="Finance360">Finance360 Support</option>
                    <option value="Legal360">Legal360 Support</option>
                    <option value="AI360">AI Agents Technical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1 font-semibold">Message Detail</label>
                  <textarea
                    rows={3}
                    required
                    value={newTicketMessage}
                    onChange={(e) => setNewTicketMessage(e.target.value)}
                    placeholder="Describe your question or issue..."
                    className="w-full bg-gray-50 border border-gray-300 rounded p-2 text-[#1A1A1A] focus:outline-none focus:border-[#001F3F]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={creatingTicket}
                  className="w-full bg-[#001F3F] text-white border border-[#D4AF37] font-bold py-2.5 rounded uppercase tracking-wider text-[11px]"
                >
                  {creatingTicket ? 'Submitting...' : 'Submit Ticket'}
                </button>
              </form>
            </div>

            {/* Ticket List */}
            <div className="md:col-span-2 p-6 rounded-lg bg-white border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#001F3F]">My Tickets History</h3>
              {tickets.length === 0 ? (
                <p className="text-xs text-gray-500">No support tickets created yet.</p>
              ) : (
                <div className="space-y-3">
                  {tickets.map(tick => (
                    <div key={tick.id} className="p-4 rounded-md bg-gray-50 border border-gray-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#001F3F] text-sm">{tick.subject}</span>
                        <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded text-[10px]">
                          {tick.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs">{tick.message}</p>
                      <div className="text-[10px] text-gray-400">
                        Ticket ID: {tick.ticket_id} • Created: {new Date(tick.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
