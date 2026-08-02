/**
 * Demo Store — Zustand (ADR-004)
 * Maneja el estado de la demo navegable del MVP: navegación, onboarding,
 * XP, metas, etc. En producción esto se conecta a Supabase (ADR-001).
 */

import { create } from 'zustand';
import { mockUser, mockGoals, avatarOptions } from '../data/mockData';
import type { UserGoal } from '../types';
import { addXp } from '../utils/xp';

export type Screen =
  | 'welcome'        // Landing / selección de rol
  | 'onboarding'     // Flujo del adolescente (test + avatar + pin)
  | 'home'           // Dashboard principal
  | 'library'        // Biblioteca de ejercicios
  | 'goals'          // Muro de victorias
  | 'profile'        // Perfil + mapa de poder
  | 'exercise'       // Ejercicio interactivo
  | 'facilitator';   // Dashboard del facilitador

export type Tab = 'home' | 'library' | 'goals' | 'profile';

interface DemoState {
  // Navegación
  screen: Screen;
  activeTab: Tab;
  navigate: (screen: Screen) => void;
  setTab: (tab: Tab) => void;

  // Perfil (mock)
  alias: string;
  avatarId: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  setAlias: (alias: string) => void;
  setAvatar: (avatarId: string) => void;
  addXP: (amount: number) => { leveledUp: boolean; newLevel: number };

  // Metas
  goals: UserGoal[];
  addGoal: (title: string) => void;
  achieveGoal: (id: string) => void;

  // Onboarding
  onboardingComplete: boolean;
  completeOnboarding: () => void;
  resetDemo: () => void;
}

export const useDemoStore = create<DemoState>((set, get) => ({
  screen: 'welcome',
  activeTab: 'home',
  navigate: (screen) => set({ screen }),
  setTab: (tab) => {
    // Mapea tab -> screen
    const map: Record<Tab, Screen> = {
      home: 'home',
      library: 'library',
      goals: 'goals',
      profile: 'profile',
    };
    set({ activeTab: tab, screen: map[tab] });
  },

  alias: mockUser.alias,
  avatarId: mockUser.avatar_state,
  level: mockUser.level,
  xp: mockUser.xp,
  xpToNextLevel: mockUser.xpToNextLevel,
  streak: mockUser.streak_count,

  setAlias: (alias) => set({ alias }),
  setAvatar: (avatarId) => set({ avatarId }),

  addXP: (amount) => {
    const state = get();
    // Usa la lógica pura y testeada (US-003, src/utils/xp.ts).
    const { xp, level, xpToNextLevel, leveledUp } = addXp(state.xp, state.level, amount);
    set({ xp, level, xpToNextLevel });
    return { leveledUp, newLevel: level };
  },

  goals: mockGoals,
  addGoal: (title) =>
    set((state) => ({
      goals: [
        {
          id: `goal-${Date.now()}`,
          user_id: mockUser.id,
          title,
          status: 'pending',
          created_at: new Date().toISOString(),
        },
        ...state.goals,
      ],
    })),
  achieveGoal: (id) =>
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === id
          ? { ...g, status: 'achieved' as const, achieved_at: new Date().toISOString() }
          : g
      ),
    })),

  onboardingComplete: false,
  completeOnboarding: () => set({ onboardingComplete: true, screen: 'home', activeTab: 'home' }),
  resetDemo: () =>
    set({
      screen: 'welcome',
      activeTab: 'home',
      alias: mockUser.alias,
      avatarId: mockUser.avatar_state,
      level: mockUser.level,
      xp: mockUser.xp,
      xpToNextLevel: mockUser.xpToNextLevel,
      streak: mockUser.streak_count,
      goals: mockGoals,
      onboardingComplete: false,
    }),
}));

export { avatarOptions };
