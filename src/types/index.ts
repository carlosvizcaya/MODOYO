/**
 * Types & Interfaces
 * Definiciones de tipos centralizadas según Data Schema (Blueprint §8)
 */

// User (Adolescente)
export interface User {
  id: string;
  alias: string;
  avatar_state: string;
  level: number;
  xp: number;
  streak_count: number;
  tutor_id: string;
  created_at: string;
  updated_at: string;
}

// Funciones Ejecutivas Scores (US-002)
export interface ExecutiveFunctionsScores {
  user_id: string;
  fc_inhibit: number;     // Control inhibitorio
  fc_auto: number;        // Autorregulación
  fc_workmem: number;     // Memoria de trabajo
  fc_flex: number;        // Flexibilidad cognitiva
  fc_plan: number;        // Planificación
  created_at: string;
}

// Daily Logs (US-003)
export interface DailyLog {
  id: string;
  user_id: string;
  exercise_id: string;
  completed: boolean;
  xp_earned: number;
  timestamp: string;
}

// User Goals (US-004)
export interface UserGoal {
  id: string;
  user_id: string;
  title: string;
  status: 'pending' | 'achieved';
  created_at: string;
  achieved_at?: string;
}

// Exercise
export interface Exercise {
  id: string;
  title: string;
  description: string;
  function_type: 'inhibit' | 'auto' | 'workmem' | 'flex' | 'plan';
  xp_reward: number;
  duration_minutes: number;
  is_interactive: boolean;
  illustration_url?: string;
}

// Tutor (Facilitador)
export interface Tutor {
  id: string;
  email: string;
  created_at: string;
}
