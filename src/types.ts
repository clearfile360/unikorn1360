export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'ADMIN' 
  | 'SALES' 
  | 'SUPPORT' 
  | 'CONSULTANT' 
  | 'CUSTOMER' 
  | 'USER';

export type AccountStatus = 'ACTIVE' | 'SUSPENDED' | 'PENDING';

export type LeadStatus = 
  | 'NEW' 
  | 'CONTACTED' 
  | 'QUALIFIED' 
  | 'DEMO_SCHEDULED' 
  | 'PROPOSAL' 
  | 'NEGOTIATION' 
  | 'WON' 
  | 'LOST';

export interface UserProfile {
  user_id: string;
  email: string;
  full_name: string;
  profile_photo?: string;
  phone?: string;
  company?: string;
  designation?: string;
  industry?: string;
  city?: string;
  state?: string;
  country?: string;
  role: UserRole;
  account_status: AccountStatus;
  email_verified: boolean;
  auth_provider: 'google' | 'email' | 'demo';
  created_at: string;
  last_login_at: string;
  login_count: number;
  organization_id?: string;
  admin_notes?: string;
}

export interface LeadRecord {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company: string;
  designation?: string;
  industry: string;
  company_size?: string;
  solution_interested: string;
  business_problem?: string;
  preferred_date?: string;
  status: LeadStatus;
  assigned_to?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
}

export interface AssessmentRecord {
  id: string;
  user_id?: string;
  user_email?: string;
  company_name: string;
  overall_score: number;
  scores: Record<string, number>;
  recommendations: string[];
  created_at: string;
}

export interface SupportTicketRecord {
  id: string;
  ticket_id: string;
  user_id: string;
  user_email: string;
  subject: string;
  category: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  message: string;
  response?: string;
  created_at: string;
  updated_at: string;
}

export interface OrganizationRecord {
  id: string;
  name: string;
  industry: string;
  size: string;
  owner_id: string;
  address?: string;
  created_at: string;
  status: 'ACTIVE' | 'INACTIVE';
  membersCount?: number;
}

export interface AuditLogRecord {
  id: string;
  user_id: string;
  user_email: string;
  action: string;
  details: string;
  ip_address?: string;
  timestamp: string;
}

export interface CMSContent {
  heroHeading: string;
  heroSubheading: string;
  statsDisclaimer: boolean;
  noticeBanner?: string;
  announcements: string[];
}
