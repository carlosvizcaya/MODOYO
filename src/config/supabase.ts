/**
 * Supabase Configuration
 * ADR-001: Supabase como Backend-as-a-Service
 * 
 * Variables de entorno requeridas:
 * - EXPO_PUBLIC_SUPABASE_URL
 * - EXPO_PUBLIC_SUPABASE_ANON_KEY
 */

import { createClient } from '@supabase/supabase-js';

// TODO: Configurar variables de entorno en .env
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not configured. Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Helper para verificar conexión
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('users').select('count');
    if (error) throw error;
    console.log('✅ Supabase connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
    return false;
  }
};
