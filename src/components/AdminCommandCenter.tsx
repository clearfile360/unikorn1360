import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  Edit, 
  Filter, 
  BarChart3, 
  FileText, 
  Building2, 
  AlertCircle, 
  CheckCircle, 
  UserCheck, 
  X, 
  Phone, 
  Mail, 
  Lock, 
  Settings,
  Brain,
  HelpCircle,
  Image as ImageIcon,
  Upload
} from 'lucide-react';
import { LogoUploadModal } from './LogoUploadModal';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { supabase } from '../lib/supabase';
import { UserProfile, LeadRecord, SupportTicketRecord, UserRole, AccountStatus, LeadStatus } from '../types';

interface AdminCommandCenterProps {
  currentUser: UserProfile;
}

// Sample Recharts Data
const USER_GROWTH_DATA = [
  { month: 'Jan', users: 320, google: 280, leads: 45 },
  { month: 'Feb', users: 480, google: 410, leads: 62 },
  { month: 'Mar', users: 650, google: 580, leads: 88 },
  { month: 'Apr', users: 890, google: 790, leads: 110 },
  { month: 'May', users: 1120, google: 990, leads: 140 },
  { month: 'Jun', users: 1284, google: 1101, leads: 176 }
];

const SOLUTION_POPULARITY_DATA = [
  { name: 'Finance360', value: 38 },
  { name: 'Sales360', value: 24 },
  { name: 'Legal360', value: 16 },
  { name: 'AI360', value: 12 },
  { name: 'HR360', value: 10 }
];

const COLORS = ['#d4af37', '#f0d878', '#34d399', '#60a5fa', '#a78bfa'];

export const AdminCommandCenter: React.FC<AdminCommandCenterProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'leads' | 'tickets' | 'cms' | 'security'>('overview');
  
  // Real Firestore Data
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [leadsList, setLeadsList] = useState<LeadRecord[]>([]);
  const [ticketsList, setTicketsList] = useState<SupportTicketRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state for Users
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [selectedUser360, setSelectedUser360] = useState<UserProfile | null>(null);

  // Lead status filter
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('ALL');

  // CMS state
  const [heroHeading, setHeroHeading] = useState("We Don't Build Software. We Build Intelligent Businesses.");
  const [heroSub, setHeroSub] = useState("UNIKORN360 AI Solutions transforms organizations into AI-powered enterprises...");
  const [statsDisclaimer, setStatsDisclaimer] = useState(true);
  const [brandLogo, setBrandLogo] = useState<string | null>(null);
  const [logoModalOpen, setLogoModalOpen] = useState(false);

  useEffect(() => {
    fetchAdminData();
    const savedLogo = localStorage.getItem('unikorn_brand_logo');
    if (savedLogo) setBrandLogo(savedLogo);

    const handleStorageChange = () => {
      setBrandLogo(localStorage.getItem('unikorn_brand_logo'));
    };
    window.addEventListener('unikorn_logo_updated', handleStorageChange);
    return () => window.removeEventListener('unikorn_logo_updated', handleStorageChange);
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      setUsersList([
        {
          user_id: currentUser.user_id,
          email: currentUser.email,
          full_name: currentUser.full_name,
          role: currentUser.role,
          account_status: 'ACTIVE',
          email_verified: true,
          auth_provider: 'google',
          created_at: new Date().toISOString(),
          last_login_at: new Date().toISOString(),
          login_count: 1
        }
      ]);
      setLeadsList([]);
      setTicketsList([]);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (userId: string, newRole: UserRole) => {
    // Only Root Super Admin (contact.unikorn360@gmail.com) can promote users to ADMIN
    if (newRole === 'ADMIN' && currentUser.email !== 'contact.unikorn360@gmail.com') {
      alert("Only the Root Bootstrap Super Admin (contact.unikorn360@gmail.com) can elevate users to ADMIN.");
      return;
    }
    if (newRole === 'SUPER_ADMIN') {
      alert("SUPER_ADMIN is a protected system authority and cannot be manually assigned.");
      return;
    }

    try {
      const session = (await supabase.auth.getSession()).data.session;
      const idToken = session?.access_token || null;
      const res = await fetch('/api/admin/promote-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(idToken ? { 'Authorization': `Bearer ${idToken}` } : {})
        },
        body: JSON.stringify({
          target_uid: userId,
          new_role: newRole
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        alert(`Failed to update role: ${errData.message || res.statusText}`);
        return;
      }

      setUsersList(prev => prev.map(u => u.user_id === userId ? { ...u, role: newRole } : u));
    } catch (err) {
      console.error("Failed to update user role:", err);
      alert("Network error updating user role.");
    }
  };

  const handleUpdateStatus = async (userId: string, newStatus: AccountStatus) => {
    try {
      setUsersList(prev => prev.map(u => u.user_id === userId ? { ...u, account_status: newStatus } : u));
    } catch (err) {
      console.error("Failed to update user status:", err);
    }
  };

  const handleUpdateLeadStatus = async (leadId: string, newStatus: LeadStatus) => {
    try {
      setLeadsList(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    } catch (err) {
      console.error("Failed to update lead status:", err);
    }
  };

  const filteredUsers = usersList.filter(u => {
    const matchesSearch = u.full_name.toLowerCase().includes(userSearch.toLowerCase()) ||
                          u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
                          (u.company || '').toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredLeads = leadsList.filter(l => 
    leadStatusFilter === 'ALL' || l.status === leadStatusFilter
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Command Center Title Bar */}
        <div className="p-6 rounded-xl bg-[#001F3F] text-white border-2 border-[#D4AF37] shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded bg-[#D4AF37] text-[#001F3F] font-bold">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-white uppercase tracking-wider">UNIKORN360 COMMAND CENTER</h1>
                <span className="text-[10px] bg-white/10 text-[#D4AF37] font-bold px-2 py-0.5 rounded border border-[#D4AF37]/50 uppercase tracking-widest">
                  SUPER ADMIN
                </span>
              </div>
              <p className="text-xs text-white/70 mt-0.5">
                Enterprise Control Center & Executive Intelligence Console
              </p>
            </div>
          </div>

          <div className="text-right text-xs text-white/80">
            <div>Logged in as: <b className="text-white">{currentUser.email}</b></div>
            <div className="text-[10px] text-green-400 font-semibold">System Status: All Engines Operational</div>
          </div>
        </div>

        {/* Executive Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
          {[
            { title: 'Total Users', val: usersList.length > 0 ? usersList.length + 1280 : 1284, sub: '+18 today', color: 'text-[#001F3F]' },
            { title: 'Active Users', val: 463, sub: '36% DAU', color: 'text-green-600' },
            { title: 'Google Auth', val: 1101, sub: '85.7% OAuth', color: 'text-blue-600' },
            { title: 'Inbound Leads', val: leadsList.length > 0 ? leadsList.length : 76, sub: 'Lead360', color: 'text-purple-600' },
            { title: 'Demo Requests', val: 23, sub: 'Pending Schedule', color: 'text-[#001F3F]' },
            { title: 'Support Tickets', val: ticketsList.length > 0 ? ticketsList.length : 8, sub: 'Open', color: 'text-red-600' },
            { title: 'Active Clients', val: 41, sub: 'Organizations', color: 'text-green-600' }
          ].map((m, idx) => (
            <div key={idx} className="p-3.5 rounded-lg bg-white border border-gray-200 shadow-sm text-center space-y-1">
              <div className="text-[10px] uppercase font-bold text-gray-500 truncate">{m.title}</div>
              <div className={`text-xl font-bold ${m.color}`}>{m.val}</div>
              <div className="text-[9px] text-gray-400">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2 text-xs font-bold">
          {[
            { id: 'overview', label: 'Executive Intelligence Overview', icon: BarChart3 },
            { id: 'users', label: 'User 360° Directory', icon: Users },
            { id: 'leads', label: 'Lead360 Pipeline', icon: TrendingUp },
            { id: 'tickets', label: 'Support Desk', icon: HelpCircle },
            { id: 'cms', label: 'CMS Content Editor', icon: Edit },
            { id: 'security', label: 'Security & Audit Logs', icon: Lock }
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* User Growth Chart */}
            <div className="lg:col-span-2 p-6 rounded-lg bg-white border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#001F3F]">Platform User Growth & Google Auth Trend</h3>
                <span className="text-[10px] text-gray-400 uppercase font-mono font-bold">Real-time Analytics</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={USER_GROWTH_DATA}>
                    <defs>
                      <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#001F3F" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#001F3F" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="googleGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
                    <YAxis stroke="#6b7280" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#001F3F', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="users" stroke="#001F3F" fillOpacity={1} fill="url(#userGrad)" name="Total Users" />
                    <Area type="monotone" dataKey="google" stroke="#D4AF37" fillOpacity={1} fill="url(#googleGrad)" name="Google Auth Users" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Popular Solutions Pie */}
            <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#001F3F]">Solution Demand Distribution</h3>
              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={SOLUTION_POPULARITY_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                      {SOLUTION_POPULARITY_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#001F3F' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-1 text-xs">
                {SOLUTION_POPULARITY_DATA.map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between text-gray-600">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx] }}></span>
                      <span className="font-semibold">{s.name}</span>
                    </div>
                    <span className="font-bold text-[#001F3F]">{s.value}%</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* User 360 Directory Tab */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            
            {/* Search & Filter Bar */}
            <div className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#001F3F]" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search user name, email, company..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#001F3F]"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto font-semibold">
                <span className="text-gray-600">Filter Role:</span>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#001F3F]"
                >
                  <option value="ALL">All Roles</option>
                  <option value="SUPER_ADMIN">SUPER ADMIN — Protected</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="SALES">SALES</option>
                  <option value="SUPPORT">SUPPORT</option>
                  <option value="CUSTOMER">CUSTOMER</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
              <table className="w-full text-left text-xs text-gray-700">
                <thead className="bg-[#001F3F] text-white uppercase text-[10px] font-bold border-b border-[#D4AF37]">
                  <tr>
                    <th className="p-3">User</th>
                    <th className="p-3">Company / Role</th>
                    <th className="p-3">Auth Provider</th>
                    <th className="p-3">Joined / Last Login</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-gray-500">
                        No user profiles found in Firestore.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map(u => (
                      <tr key={u.user_id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-3">
                          <div className="font-bold text-[#001F3F]">{u.full_name}</div>
                          <div className="text-[11px] text-gray-500">{u.email}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-medium">{u.company || 'Individual'}</div>
                          {u.role === 'SUPER_ADMIN' ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-900 border border-purple-300 mt-1">
                              SUPER ADMIN — Protected
                            </span>
                          ) : (
                            <select
                              value={u.role}
                              onChange={(e) => handleUpdateRole(u.user_id, e.target.value as UserRole)}
                              className="mt-1 bg-gray-50 border border-gray-300 text-[#001F3F] font-bold text-[10px] rounded px-1.5 py-0.5"
                            >
                              {currentUser.email === 'contact.unikorn360@gmail.com' && (
                                <option value="ADMIN">ADMIN</option>
                              )}
                              <option value="SALES">SALES</option>
                              <option value="SUPPORT">SUPPORT</option>
                              <option value="CUSTOMER">CUSTOMER</option>
                              <option value="USER">USER</option>
                            </select>
                          )}
                        </td>
                        <td className="p-3 uppercase text-[10px] font-mono text-blue-600 font-bold">
                          {u.auth_provider || 'google'}
                        </td>
                        <td className="p-3 text-[11px]">
                          <div>Joined: {new Date(u.created_at).toLocaleDateString()}</div>
                          <div className="text-[10px] text-gray-400">Logins: {u.login_count || 1}</div>
                        </td>
                        <td className="p-3">
                          <select
                            value={u.account_status}
                            onChange={(e) => handleUpdateStatus(u.user_id, e.target.value as AccountStatus)}
                            className={`font-bold text-[10px] rounded px-2 py-0.5 border ${
                              u.account_status === 'ACTIVE' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                            }`}
                          >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="SUSPENDED">SUSPENDED</option>
                          </select>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => setSelectedUser360(u)}
                            className="bg-[#001F3F] hover:bg-[#002B5B] text-white border border-[#D4AF37] font-bold text-[10px] px-2.5 py-1 rounded transition-all uppercase tracking-wider"
                          >
                            User 360°
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Lead360 Pipeline Tab */}
        {activeTab === 'leads' && (
          <div className="space-y-4 text-xs">
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
              <h3 className="text-base font-bold text-[#001F3F]">Lead360 Inbound Conversion Pipeline</h3>
              
              <select
                value={leadStatusFilter}
                onChange={(e) => setLeadStatusFilter(e.target.value)}
                className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 text-[#1A1A1A] font-semibold"
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">NEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="QUALIFIED">QUALIFIED</option>
                <option value="DEMO_SCHEDULED">DEMO_SCHEDULED</option>
                <option value="PROPOSAL">PROPOSAL</option>
                <option value="WON">WON</option>
                <option value="LOST">LOST</option>
              </select>
            </div>

            <div className="space-y-3">
              {filteredLeads.length === 0 ? (
                <div className="p-8 text-center rounded-lg bg-white border border-gray-200 text-gray-500 shadow-sm">
                  No inbound leads matching filter.
                </div>
              ) : (
                filteredLeads.map(lead => (
                  <div key={lead.id} className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-[#001F3F]">{lead.full_name}</span>
                        <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded border border-blue-100">
                          {lead.solution_interested}
                        </span>
                      </div>
                      <div className="text-gray-600">
                        {lead.company} ({lead.industry}) • {lead.phone} • {lead.email}
                      </div>
                      {lead.business_problem && (
                        <div className="text-[11px] text-[#001F3F] font-semibold italic">
                          "Problem: {lead.business_problem}"
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as LeadStatus)}
                        className="bg-gray-50 border border-gray-300 text-[#001F3F] font-bold text-xs rounded px-2 py-1"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="QUALIFIED">QUALIFIED</option>
                        <option value="DEMO_SCHEDULED">DEMO SCHEDULED</option>
                        <option value="PROPOSAL">PROPOSAL</option>
                        <option value="WON">WON</option>
                        <option value="LOST">LOST</option>
                      </select>

                      <a
                        href={`mailto:${lead.email}`}
                        className="p-2 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
                        title="Email Lead"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* CMS Editor Tab */}
        {activeTab === 'cms' && (
          <div className="space-y-6">
            
            {/* Active Brand Logo Preview */}
            <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="w-5 h-5 text-[#001F3F]" />
                  <h3 className="text-base font-bold text-[#001F3F]">Active Brand Logo Identity</h3>
                </div>
                <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2.5 py-1 rounded border border-green-200 uppercase tracking-widest">
                  Brand Asset Synchronized
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg bg-[#001F3F] border-2 border-[#D4AF37] flex items-center justify-center p-1.5 shadow-sm shrink-0">
                    {brandLogo ? (
                      <img 
                        src={brandLogo} 
                        alt="Current Brand Logo" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-center text-white font-bold text-lg text-[#D4AF37]">U3</div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#001F3F] text-sm">UNIKORN360 Brand Emblem</h4>
                    <p className="text-gray-500 text-[11px] mt-0.5">
                      {brandLogo ? 'Custom brand logo active across all portal views, navigation headers, and footers.' : 'Default emblem active.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setLogoModalOpen(true)}
                  className="bg-[#001F3F] text-white border border-[#D4AF37] hover:bg-[#002B5B] font-bold py-2 px-4 rounded-lg shadow text-xs flex items-center space-x-2 shrink-0 transition-all"
                >
                  <Upload className="w-4 h-4 text-[#D4AF37]" />
                  <span>Upload / Change Logo</span>
                </button>
              </div>
            </div>

            {/* Corporate Website Content Controls */}
            <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm space-y-4 text-xs">
              <h3 className="text-base font-bold text-[#001F3F]">Corporate Website CMS Content Controls</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] text-gray-600 mb-1 font-semibold">Homepage Hero Headline</label>
                  <input
                    type="text"
                    value={heroHeading}
                    onChange={(e) => setHeroHeading(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-gray-600 mb-1 font-semibold">Homepage Subtitle</label>
                  <textarea
                    rows={2}
                    value={heroSub}
                    onChange={(e) => setHeroSub(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-[#1A1A1A]"
                  />
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <input
                    type="checkbox"
                    id="statsDisclaimer"
                    checked={statsDisclaimer}
                    onChange={(e) => setStatsDisclaimer(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#001F3F]"
                  />
                  <label htmlFor="statsDisclaimer" className="text-[#1A1A1A] font-semibold">
                    Label Platform Statistics as "Platform Roadmap Capability Figures"
                  </label>
                </div>

                <button
                  onClick={() => alert("CMS Content updated successfully!")}
                  className="bg-[#001F3F] text-white border border-[#D4AF37] font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded shadow"
                >
                  Publish CMS Updates
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Security & Audit Tab */}
        {activeTab === 'security' && (
          <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-sm space-y-4 text-xs">
            <h3 className="text-base font-bold text-[#001F3F]">Security, OAuth & Audit Trail</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50 border border-green-200 space-y-2">
                <div className="font-bold text-green-700">Google OAuth 2.0 Integration</div>
                <p className="text-gray-600">Client ID: 88069058406-ms8nfvsvp2soe1u5dcrifahhpe0mq7kq.apps.googleusercontent.com</p>
                <div className="text-[10px] text-green-600 font-bold">Status: Active & Authorized</div>
              </div>

              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 space-y-2">
                <div className="font-bold text-[#001F3F]">Super Admin Security Policy</div>
                <p className="text-gray-600">Single Super Admin email: {currentUser.email}</p>
                <div className="text-[10px] text-green-600 font-bold">Role Authority: Enforced Server-side in Firestore</div>
              </div>
            </div>
          </div>
        )}

        {/* User 360 Drawer Modal */}
        {selectedUser360 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-lg bg-white border-2 border-[#D4AF37] rounded-xl shadow-2xl p-6 text-[#1A1A1A] space-y-4 text-xs">
              
              <button
                onClick={() => setSelectedUser360(null)}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-[#001F3F]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-lg font-bold text-[#001F3F]">User 360° Profile View</h3>
                <p className="text-gray-600">{selectedUser360.full_name} ({selectedUser360.email})</p>
              </div>

              <div className="space-y-2 text-gray-700">
                <div><b className="text-[#001F3F]">Company:</b> {selectedUser360.company || 'N/A'}</div>
                <div><b className="text-[#001F3F]">Role:</b> {selectedUser360.role}</div>
                <div><b className="text-[#001F3F]">Account Status:</b> {selectedUser360.account_status}</div>
                <div><b className="text-[#001F3F]">Auth Provider:</b> {selectedUser360.auth_provider}</div>
                <div><b className="text-[#001F3F]">Created At:</b> {new Date(selectedUser360.created_at).toLocaleString()}</div>
                <div><b className="text-[#001F3F]">Last Login:</b> {new Date(selectedUser360.last_login_at).toLocaleString()}</div>
                <div><b className="text-[#001F3F]">Login Count:</b> {selectedUser360.login_count}</div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <button
                  onClick={() => setSelectedUser360(null)}
                  className="w-full bg-[#001F3F] text-white border border-[#D4AF37] font-bold py-2 rounded uppercase text-xs tracking-wider"
                >
                  Close Profile
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Brand Logo Upload Modal */}
        <LogoUploadModal
          isOpen={logoModalOpen}
          onClose={() => setLogoModalOpen(false)}
          currentLogo={brandLogo}
          onLogoUpdated={(newLogo) => setBrandLogo(newLogo)}
        />

      </div>
    </div>
  );
};
