/**
 * User Store - Zustand
 * ADR-004: Zustand como Gestor de Estado
 * ADR-006: Estrategia de Sincronización Offline
 * 
 * Gestiona el estado del perfil del adolescente con persistencia local
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  alias: string;
  avatar_state: string;
  level: number;
  xp: number;
  streak_count: number;
  created_at: string;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  
  // Actions
  setUser: (user: User) => void;
  updateXP: (xp: number) => void;
  incrementStreak: () => void;
  levelUp: () => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,

      setUser: (user) => set({ user }),

      updateXP: (xp) =>
        set((state) => {
          if (!state.user) return state;
          const newXP = state.user.xp + xp;
          // TODO: Calcular si sube de nivel según umbrales
          return {
            user: { ...state.user, xp: newXP },
          };
        }),

      incrementStreak: () =>
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              streak_count: state.user.streak_count + 1,
            },
          };
        }),

      levelUp: () =>
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              level: state.user.level + 1,
            },
          };
        }),

      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // nombre único para AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
