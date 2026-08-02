/**
 * LibraryScreen — Biblioteca de Ejercicios (US-003)
 * Grid de ejercicios con filtros por función ejecutiva.
 */

import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useDemoStore } from '../store/useDemoStore';
import { exerciseLibrary, exerciseFilters } from '../data/mockData';
import { Card, Muted, Badge, theme } from '../components';
import { ScreenBody } from '../components/Layout';

const feColors: Record<string, string> = {
  inhibit: '#EF4444',
  auto: '#06B6D4',
  workmem: '#A78BFA',
  flex: '#10B981',
  plan: '#EAB308',
};

const feIcons: Record<string, string> = {
  inhibit: '🛑',
  auto: '⚖️',
  workmem: '🧠',
  flex: '🔄',
  plan: '🎯',
};

export function LibraryScreen() {
  const navigate = useDemoStore((s) => s.navigate);
  const [filter, setFilter] = useState('all');

  const filtered =
    filter === 'all' ? exerciseLibrary : exerciseLibrary.filter((e) => e.function_type === filter);

  return (
    <ScreenBody>
      <Text className="text-text-primary text-2xl font-extrabold mb-1">Biblioteca</Text>
      <Muted className="mb-4">Elige un ejercicio y entrena tu poder mental.</Muted>

      {/* Filtros */}
      <View className="flex-row flex-wrap mb-4">
        {exerciseFilters.map((f) => {
          const active = filter === f.key;
          return (
            <Pressable
              key={f.key}
              onPress={() => setFilter(f.key)}
              className="mr-2 mb-2 px-4 py-2 rounded-full"
              style={{ backgroundColor: active ? theme.primary : theme.bgCard }}
            >
              <Text
                style={{ color: active ? '#fff' : theme.textSecondary }}
                className="text-sm font-semibold"
              >
                {f.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Grid */}
      <View className="flex-row flex-wrap justify-between">
        {filtered.map((ex) => (
          <Pressable
            key={ex.id}
            onPress={() => navigate('exercise')}
            style={{ width: '48%', marginBottom: 14 }}
          >
            <Card variant="mini" className="h-full">
              <View
                className="items-center justify-center rounded-2xl mb-3"
                style={{ height: 64, backgroundColor: `${feColors[ex.function_type]}22` }}
              >
                <Text style={{ fontSize: 32 }}>{feIcons[ex.function_type]}</Text>
              </View>
              <Text className="text-text-primary font-bold text-sm mb-1" numberOfLines={1}>
                {ex.title}
              </Text>
              <Muted className="text-xs mb-3" numberOfLines={2}>{ex.description}</Muted>
              <View className="flex-row items-center justify-between mt-auto">
                <Badge label={`+${ex.xp_reward} XP`} color={theme.primary} />
                <Muted className="text-xs">⏱ {ex.duration_minutes}m</Muted>
              </View>
            </Card>
          </Pressable>
        ))}
      </View>
    </ScreenBody>
  );
}
