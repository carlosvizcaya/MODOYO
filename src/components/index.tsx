/**
 * Design System Components — MODO YO
 * Componentes UI reutilizables (ADR-008: NativeWind)
 * Basados en docs/ux-specification.md §5
 */

import React from 'react';
import {
  Text,
  View,
  Pressable,
  ViewProps,
  TextProps,
  PressableProps,
} from 'react-native';

// ---------- Colores del tema (para usos no-className) ----------
export const theme = {
  primary: '#A78BFA',
  primaryDark: '#7C3AED',
  secondary: '#06B6D4',
  success: '#10B981',
  bg: '#0F172A',
  bgCard: '#1E293B',
  bgElevated: '#334155',
  textPrimary: '#F1F5F9',
  textSecondary: '#CBD5E1',
  textMuted: '#94A3B8',
  danger: '#EF4444',
  warning: '#EAB308',
};

// ---------- Botón ----------
interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ title, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  const base = 'rounded-2xl items-center justify-center flex-row';
  const sizes: Record<string, string> = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3.5',
    lg: 'px-8 py-4',
  };
  const variants: Record<string, string> = {
    primary: 'bg-primary',
    secondary: 'border-2 border-primary bg-transparent',
    tertiary: 'bg-transparent',
  };
  const textVariants: Record<string, string> = {
    primary: 'text-white font-bold',
    secondary: 'text-primary font-bold',
    tertiary: 'text-primary font-semibold',
  };
  const textSizes: Record<string, string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <Pressable
      className={`${base} ${sizes[size]} ${variants[variant]} active:opacity-80`}
      {...props}
    >
      <Text className={`${textVariants[variant]} ${textSizes[size]}`}>{title}</Text>
    </Pressable>
  );
}

// ---------- Card ----------
interface CardProps extends ViewProps {
  variant?: 'standard' | 'hero' | 'mini';
  children: React.ReactNode;
}

export function Card({ variant = 'standard', children, className = '', ...props }: CardProps) {
  const variants: Record<string, string> = {
    standard: 'bg-background-card rounded-3xl p-5 border border-white/5',
    hero: 'bg-background-card rounded-3xl p-6 border border-primary/30',
    mini: 'bg-background-card rounded-2xl p-4 border border-white/5',
  };
  return (
    <View className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </View>
  );
}

// ---------- Barra de Progreso (XP) ----------
export function ProgressBar({ value, max, color = theme.primary }: { value: number; max: number; color?: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <View className="h-3 w-full rounded-full bg-background-elevated overflow-hidden">
      <View
        style={{ width: `${pct}%`, backgroundColor: color }}
        className="h-full rounded-full"
      />
    </View>
  );
}

// ---------- Badge de Racha ----------
export function StreakBadge({ count }: { count: number }) {
  return (
    <View className="flex-row items-center bg-orange-500/20 px-3 py-1.5 rounded-full">
      <Text className="text-base">🔥</Text>
      <Text className="text-orange-400 font-bold ml-1">{count}</Text>
    </View>
  );
}

// ---------- Badge genérico ----------
export function Badge({ label, color = theme.primary }: { label: string; color?: string }) {
  return (
    <View style={{ backgroundColor: `${color}30` }} className="px-3 py-1 rounded-full">
      <Text style={{ color }} className="text-xs font-semibold">{label}</Text>
    </View>
  );
}

// ---------- Avatar circular ----------
export function AvatarCircle({ emoji, size = 48, color = theme.primary }: { emoji: string; size?: number; color?: string }) {
  return (
    <View
      style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: `${color}30`, borderColor: color, borderWidth: 2 }}
      className="items-center justify-center"
    >
      <Text style={{ fontSize: size * 0.5 }}>{emoji}</Text>
    </View>
  );
}

// ---------- Título de sección ----------
export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <Text className="text-text-primary text-lg font-bold mb-3">{children}</Text>;
}

// ---------- Texto helpers ----------
export function Heading({ children, className = '', ...props }: TextProps & { children: React.ReactNode }) {
  return <Text className={`text-text-primary text-2xl font-extrabold ${className}`} {...props}>{children}</Text>;
}

export function Body({ children, className = '', ...props }: TextProps & { children: React.ReactNode }) {
  return <Text className={`text-text-secondary text-base ${className}`} {...props}>{children}</Text>;
}

export function Muted({ children, className = '', ...props }: TextProps & { children: React.ReactNode }) {
  return <Text className={`text-text-muted text-sm ${className}`} {...props}>{children}</Text>;
}
