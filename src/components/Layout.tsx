/**
 * Layout — Frame móvil + Tab Bar
 * Envuelve la demo en un marco tipo teléfono para visualización web.
 */

import React from 'react';
import { View, Text, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { useDemoStore, Tab } from '../store/useDemoStore';
import { theme } from './index';

const TABS: { key: Tab; icon: string; label: string }[] = [
  { key: 'home', icon: '🏠', label: 'Home' },
  { key: 'library', icon: '📚', label: 'Biblioteca' },
  { key: 'goals', icon: '🎯', label: 'Metas' },
  { key: 'profile', icon: '👤', label: 'Perfil' },
];

export function TabBar() {
  const activeTab = useDemoStore((s) => s.activeTab);
  const setTab = useDemoStore((s) => s.setTab);
  const screen = useDemoStore((s) => s.screen);

  // Ocultar tab bar en pantallas de flujo completo
  const hidden = ['welcome', 'onboarding', 'exercise', 'facilitator'].includes(screen);
  if (hidden) return null;

  return (
    <View className="flex-row bg-background-card border-t border-white/10 pt-2 pb-4 px-2">
      {TABS.map((tab) => {
        const active = activeTab === tab.key;
        return (
          <Pressable
            key={tab.key}
            onPress={() => setTab(tab.key)}
            className="flex-1 items-center py-1"
          >
            <View
              className={active ? 'bg-primary/20 px-4 py-1.5 rounded-full' : 'px-4 py-1.5'}
            >
              <Text style={{ fontSize: 20, opacity: active ? 1 : 0.5 }}>{tab.icon}</Text>
            </View>
            <Text
              style={{ color: active ? theme.primary : theme.textMuted }}
              className="text-[10px] font-semibold mt-0.5"
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/**
 * MobileFrame — marco tipo teléfono centrado (para web).
 * En un dispositivo real ocuparía toda la pantalla.
 */
export function MobileFrame({ children }: { children: React.ReactNode }) {
  const { width } = useWindowDimensions();
  const isWide = width > 500;

  return (
    <View className="flex-1 bg-black items-center justify-center" style={{ padding: isWide ? 16 : 0 }}>
      <View
        className="bg-background overflow-hidden"
        style={{
          width: isWide ? 390 : '100%',
          height: isWide ? 800 : '100%',
          maxHeight: '100%',
          borderRadius: isWide ? 40 : 0,
          borderWidth: isWide ? 8 : 0,
          borderColor: '#1E293B',
        }}
      >
        {children}
      </View>
    </View>
  );
}

/** Contenedor scrollable estándar de pantalla */
export function ScreenBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <ScrollView
      className={`flex-1 bg-background ${className}`}
      contentContainerStyle={{ padding: 20, paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}
