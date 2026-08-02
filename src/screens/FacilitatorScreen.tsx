/**
 * FacilitatorScreen — Dashboard del Facilitador (US-005, ADR-002)
 * Muestra SOLO métricas de constancia (racha, nivel, XP, actividad).
 * NUNCA el contenido privado del adolescente (metas, respuestas).
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useDemoStore } from '../store/useDemoStore';
import { facilitatorMetrics } from '../data/mockData';
import { Card, Muted, theme } from '../components';
import { ScreenBody } from '../components/Layout';

export function FacilitatorScreen() {
  const navigate = useDemoStore((s) => s.navigate);
  const m = facilitatorMetrics;

  return (
    <ScreenBody>
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <Pressable onPress={() => navigate('welcome')} className="pr-3">
          <Text className="text-text-secondary text-2xl">←</Text>
        </Pressable>
        <View>
          <Muted>Dashboard de</Muted>
          <Text className="text-text-primary text-xl font-extrabold">{m.alias}</Text>
        </View>
      </View>

      {/* Métricas principales */}
      <View className="flex-row mb-4">
        <View className="flex-1 mr-2">
          <Card className="items-center">
            <Text style={{ fontSize: 32 }}>🔥</Text>
            <Text className="text-text-primary text-2xl font-extrabold mt-1">{m.streak}</Text>
            <Muted className="text-xs">días de racha</Muted>
          </Card>
        </View>
        <View className="flex-1 ml-2">
          <Card className="items-center">
            <Text style={{ fontSize: 32 }}>⭐</Text>
            <Text className="text-text-primary text-2xl font-extrabold mt-1">Nivel {m.level}</Text>
            <Muted className="text-xs">{m.xp} XP total</Muted>
          </Card>
        </View>
      </View>

      {/* Actividad semanal */}
      <Text className="text-text-primary text-lg font-bold mb-3">Últimos 7 días</Text>
      <Card className="mb-4">
        <View className="flex-row justify-between">
          {m.weeklyActivity.map((d, i) => (
            <View key={i} className="items-center flex-1">
              <View
                className="items-center justify-center rounded-full mb-2"
                style={{
                  width: 34,
                  height: 34,
                  backgroundColor: d.completed ? theme.success + '30' : theme.danger + '20',
                }}
              >
                <Text style={{ fontSize: 16 }}>{d.completed ? '✅' : '❌'}</Text>
              </View>
              <Muted className="text-[10px]">{d.day}</Muted>
            </View>
          ))}
        </View>
      </Card>

      {/* Ejercicios completados */}
      <Card className="mb-6">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Text style={{ fontSize: 26 }} className="mr-3">🎯</Text>
            <Text className="text-text-secondary text-base">Ejercicios completados</Text>
          </View>
          <Text className="text-text-primary text-2xl font-extrabold">{m.exercisesCompleted}</Text>
        </View>
      </Card>

      {/* Banner de privacidad */}
      <View
        className="rounded-3xl p-5 border"
        style={{ backgroundColor: theme.secondary + '15', borderColor: theme.secondary + '40' }}
      >
        <View className="flex-row items-center mb-2">
          <Text style={{ fontSize: 22 }} className="mr-2">🔒</Text>
          <Text className="text-secondary font-bold text-base">Privacidad Radical</Text>
        </View>
        <Text className="text-text-secondary text-sm leading-5">
          Ves la <Text className="font-bold">constancia</Text> de {m.alias}, nunca el contenido.
          Sus metas y respuestas son 100% privadas. Tú eres el arquitecto del contexto, no un vigilante.
        </Text>
      </View>

      <View className="h-6" />
      <Pressable onPress={() => navigate('welcome')}>
        <Muted className="text-center py-2">← Volver al inicio</Muted>
      </Pressable>
    </ScreenBody>
  );
}
