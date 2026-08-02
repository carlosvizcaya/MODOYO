/**
 * Mock Data — Demo del MVP
 * Datos de ejemplo para la demo navegable (sin backend real).
 * En producción, estos datos vendrán de Supabase (ADR-001).
 */

import type { Exercise, UserGoal } from '../types';

export const mockUser = {
  id: 'demo-user-1',
  alias: 'Santi',
  avatar_state: 'avatar-3',
  level: 5,
  xp: 340,
  xpToNextLevel: 500,
  streak_count: 12,
  tutor_id: 'demo-tutor-1',
  created_at: '2026-07-01T10:00:00Z',
  updated_at: '2026-08-02T10:00:00Z',
};

// Avatares disponibles en el onboarding (género-neutro)
export const avatarOptions = [
  { id: 'avatar-1', emoji: '🦊', color: '#F97316', name: 'Zorro' },
  { id: 'avatar-2', emoji: '🦉', color: '#8B5CF6', name: 'Búho' },
  { id: 'avatar-3', emoji: '🐺', color: '#06B6D4', name: 'Lobo' },
  { id: 'avatar-4', emoji: '🦁', color: '#EAB308', name: 'León' },
  { id: 'avatar-5', emoji: '🐉', color: '#10B981', name: 'Dragón' },
  { id: 'avatar-6', emoji: '🦅', color: '#EF4444', name: 'Águila' },
];

// Mapa de Poder — Funciones Ejecutivas (US-002)
export const powerMap = [
  { key: 'inhibit', label: 'Control de Impulsos', score: 72, icon: '🛑', color: '#EF4444' },
  { key: 'auto', label: 'Autorregulación', score: 65, icon: '⚖️', color: '#06B6D4' },
  { key: 'workmem', label: 'Memoria de Trabajo', score: 80, icon: '🧠', color: '#A78BFA' },
  { key: 'flex', label: 'Flexibilidad', score: 58, icon: '🔄', color: '#10B981' },
  { key: 'plan', label: 'Planificación', score: 68, icon: '🎯', color: '#EAB308' },
];

// Ejercicio del día
export const dailyExercise: Exercise = {
  id: 'ex-daily-1',
  title: 'Control de Impulsos',
  description: 'Detén la señal antes de que el tiempo se acabe. Entrena tu freno mental.',
  function_type: 'inhibit',
  xp_reward: 50,
  duration_minutes: 3,
  is_interactive: true,
};

// Biblioteca de ejercicios (15 para MVP)
export const exerciseLibrary: Exercise[] = [
  { id: 'ex-1', title: 'Semáforo Mental', description: 'Reacciona solo a la luz verde.', function_type: 'inhibit', xp_reward: 30, duration_minutes: 2, is_interactive: true },
  { id: 'ex-2', title: 'Memoria Relámpago', description: 'Recuerda la secuencia de símbolos.', function_type: 'workmem', xp_reward: 40, duration_minutes: 4, is_interactive: true },
  { id: 'ex-3', title: 'Cambio de Regla', description: 'Adapta tu respuesta cuando cambian las reglas.', function_type: 'flex', xp_reward: 40, duration_minutes: 3, is_interactive: true },
  { id: 'ex-4', title: 'Plan Maestro', description: 'Ordena los pasos para lograr la meta.', function_type: 'plan', xp_reward: 50, duration_minutes: 5, is_interactive: true },
  { id: 'ex-5', title: 'Respira y Elige', description: 'Regula tu impulso antes de decidir.', function_type: 'auto', xp_reward: 35, duration_minutes: 3, is_interactive: true },
  { id: 'ex-6', title: 'No Toques el Botón', description: 'Inhibe la respuesta automática.', function_type: 'inhibit', xp_reward: 30, duration_minutes: 2, is_interactive: true },
  { id: 'ex-7', title: 'Cadena de Números', description: 'Mantén la secuencia en tu mente.', function_type: 'workmem', xp_reward: 45, duration_minutes: 4, is_interactive: true },
  { id: 'ex-8', title: 'Doble Tarea', description: 'Alterna entre dos objetivos.', function_type: 'flex', xp_reward: 45, duration_minutes: 4, is_interactive: true },
  { id: 'ex-9', title: 'Ruta Óptima', description: 'Planifica el camino más eficiente.', function_type: 'plan', xp_reward: 50, duration_minutes: 5, is_interactive: true },
];

// Categorías de filtro para la biblioteca
export const exerciseFilters = [
  { key: 'all', label: 'Todos' },
  { key: 'inhibit', label: 'Control' },
  { key: 'workmem', label: 'Memoria' },
  { key: 'flex', label: 'Flexibilidad' },
  { key: 'plan', label: 'Planificación' },
  { key: 'auto', label: 'Autorregulación' },
];

// Metas del adolescente (US-004)
export const mockGoals: UserGoal[] = [
  { id: 'goal-1', user_id: 'demo-user-1', title: 'Llegar a la hora toda la semana', status: 'pending', created_at: '2026-07-28T10:00:00Z' },
  { id: 'goal-2', user_id: 'demo-user-1', title: 'Terminar la tarea antes de jugar', status: 'pending', created_at: '2026-07-30T10:00:00Z' },
  { id: 'goal-3', user_id: 'demo-user-1', title: 'Completar 5 días seguidos', status: 'achieved', created_at: '2026-07-20T10:00:00Z', achieved_at: '2026-07-30T10:00:00Z' },
  { id: 'goal-4', user_id: 'demo-user-1', title: 'Meditar 3 minutos al día', status: 'achieved', created_at: '2026-07-15T10:00:00Z', achieved_at: '2026-07-25T10:00:00Z' },
];

// Datos de constancia semanal (para dashboard facilitador y home)
export const weeklyActivity = [
  { day: 'Lun', completed: true },
  { day: 'Mar', completed: true },
  { day: 'Mié', completed: true },
  { day: 'Jue', completed: false },
  { day: 'Vie', completed: true },
  { day: 'Sáb', completed: true },
  { day: 'Dom', completed: true },
];

// Métricas para el dashboard del facilitador (US-005, ADR-002)
export const facilitatorMetrics = {
  alias: 'Santi',
  streak: 12,
  level: 5,
  xp: 850,
  exercisesCompleted: 23,
  weeklyActivity,
};

// Pasos del test EFEF (US-002) — versión demo simplificada
export const efefQuestions = [
  { id: 'q1', text: 'Cuando algo me molesta, ¿logro calmarme antes de reaccionar?', fe: 'auto' },
  { id: 'q2', text: '¿Recuerdo instrucciones de varios pasos sin que me las repitan?', fe: 'workmem' },
  { id: 'q3', text: 'Si un plan falla, ¿encuentro otra forma de resolverlo rápido?', fe: 'flex' },
  { id: 'q4', text: '¿Puedo esperar mi turno aunque quiera hacerlo ya?', fe: 'inhibit' },
  { id: 'q5', text: '¿Organizo mis tareas antes de empezar?', fe: 'plan' },
];
