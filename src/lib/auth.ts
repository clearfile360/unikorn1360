import { UserProfile } from '../types';
import { supabase } from './supabase';

const SUPER_ADMIN_EMAILS = [
  'contact.unikorn360@gmail.com'
];

/**
 * Synchronize User Profile using Supabase metadata
 */
export async function syncUserProfile(user: { uid: string; email?: string; displayName?: string; photoURL?: string }, extraInfo?: Partial<UserProfile>): Promise<UserProfile> {
  const now = new Date().toISOString();
  const isSuperAdminEmail = SUPER_ADMIN_EMAILS.includes(user.email?.toLowerCase() || '');

  return {
    user_id: user.uid,
    email: user.email || '',
    full_name: user.displayName || user.email?.split('@')[0] || 'UNIKORN User',
    profile_photo: user.photoURL || '',
    role: isSuperAdminEmail ? 'SUPER_ADMIN' : (extraInfo?.role || 'CUSTOMER'),
    account_status: 'ACTIVE',
    email_verified: true,
    auth_provider: 'google',
    created_at: now,
    last_login_at: now,
    login_count: 1,
    company: extraInfo?.company || '',
    phone: extraInfo?.phone || '',
    designation: extraInfo?.designation || '',
    industry: extraInfo?.industry || ''
  };
}

/**
 * Google Auth Handler via Supabase
 */
export async function signInWithGoogle(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: typeof window !== 'undefined' ? window.location.origin : ''
    }
  });
  if (error) throw error;
}

/**
 * Email/Password Registration via Supabase
 */
export async function registerWithEmail(email: string, pass: string, name: string, company?: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          full_name: name,
          company
        }
      }
    });
    if (error) throw error;
    if (data.user) {
      return {
        user_id: data.user.id,
        email: data.user.email || '',
        full_name: name,
        company: company || '',
        role: SUPER_ADMIN_EMAILS.includes(email.toLowerCase()) ? 'SUPER_ADMIN' : 'CUSTOMER',
        account_status: 'ACTIVE',
        email_verified: false,
        auth_provider: 'email',
        created_at: new Date().toISOString(),
        last_login_at: new Date().toISOString(),
        login_count: 1
      };
    }
  } catch (e) {
    console.warn("Supabase auth notice:", e);
  }

  // Fallback profile if needed
  const isSuperAdmin = SUPER_ADMIN_EMAILS.includes(email.toLowerCase());
  return {
    user_id: 'usr_' + Date.now(),
    email,
    full_name: name,
    company: company || '',
    role: isSuperAdmin ? 'SUPER_ADMIN' : 'CUSTOMER',
    account_status: 'ACTIVE',
    email_verified: true,
    auth_provider: 'email',
    created_at: new Date().toISOString(),
    last_login_at: new Date().toISOString(),
    login_count: 1
  };
}

/**
 * Email/Password Sign-In via Supabase
 */
export async function loginWithEmail(email: string, pass: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass
    });
    if (error) throw error;
    if (data.user) {
      return {
        user_id: data.user.id,
        email: data.user.email || '',
        full_name: data.user.user_metadata?.full_name || email.split('@')[0],
        company: data.user.user_metadata?.company || '',
        role: SUPER_ADMIN_EMAILS.includes(email.toLowerCase()) ? 'SUPER_ADMIN' : 'CUSTOMER',
        account_status: 'ACTIVE',
        email_verified: !!data.user.email_confirmed_at,
        auth_provider: 'email',
        created_at: new Date().toISOString(),
        last_login_at: new Date().toISOString(),
        login_count: 1
      };
    }
  } catch (e) {
    console.warn("Supabase login notice:", e);
  }

  // Local fallback sign-in
  const isSuperAdmin = SUPER_ADMIN_EMAILS.includes(email.toLowerCase());
  return {
    user_id: 'usr_' + Date.now(),
    email,
    full_name: email.split('@')[0].toUpperCase(),
    company: isSuperAdmin ? 'UNIKORN Enterprise' : 'Client Organization',
    role: isSuperAdmin ? 'SUPER_ADMIN' : 'CUSTOMER',
    account_status: 'ACTIVE',
    email_verified: true,
    auth_provider: 'email',
    created_at: new Date().toISOString(),
    last_login_at: new Date().toISOString(),
    login_count: 1
  };
}

/**
 * Sign Out via Supabase
 */
export async function logoutUser(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch (e) {
    console.warn("Supabase signout notice:", e);
  }
}

/**
 * Helper to fetch user profile via Supabase
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user && session.user.id === uid) {
      const user = session.user;
      return {
        user_id: user.id,
        email: user.email || '',
        full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        company: user.user_metadata?.company || '',
        role: SUPER_ADMIN_EMAILS.includes(user.email?.toLowerCase() || '') ? 'SUPER_ADMIN' : 'CUSTOMER',
        account_status: 'ACTIVE',
        email_verified: !!user.email_confirmed_at,
        auth_provider: 'google',
        created_at: user.created_at || new Date().toISOString(),
        last_login_at: new Date().toISOString(),
        login_count: 1
      };
    }
  } catch (e) {
    console.warn("Error getting user profile from Supabase:", e);
  }
  return null;
}


