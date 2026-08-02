/**
 * HomeScreen — Dashboard Principal (US-003, US-009, US-010)
 * Header con avatar/nivel/racha, Hero Card del ejercicio del día,
 * y progreso semanal.
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useDemoStore, avatarOptions } from '../store/useDemoStore';
import { dailyExercise, weeklyActivity } from '../data/mockData';
import { Card, Body, Muted, ProgressBar, StreakBadge, AvatarCircle, theme } from '../components';
import { ScreenBody } from '../components/Layout';

export function HomeScreen() {
  const { alias, avatarId, level, xp, xpToNextLevel, streak, navigate } = useDemoStore();
  const avatar = avatarOptions.find((a) => a.id === avatarId) ?? avatarOptions[2];

  return (
    <ScreenBody>
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <AvatarCircle emoji={avatar.emoji} size={48} color={avatar.color} />
          <View className="ml-3">
            <Muted>Hola,</Muted>
            <Text className="text-text-primary text-xl font-extrabold">{alias}</Text>
          </View>
        </View>
        <Pressable className="p-2">
          <Text style={{ fontSize: 22 }}>🔔</Text>
        </Pressable>
      </View>

      {/* Nivel + XP + Racha */}
      <Card className="mb-6">
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center">
            <View
              style={{ backgroundColor: theme.primary, width: 30, height: 30, borderRadius: 15 }}
              className="items-center justify-center mr-2"
            >
              <Text className="text-white font-bold text-xs">{level}</Text>
            </View>
            <Text className="text-text-primary font-bold">Nivel {level}</Text>
          </View>
          <StreakBadge count={streak} />
        </View>
        <ProgressBar value={xp} max={xpToNextLevel} />
        <Muted className="mt-2">{xp} / {xpToNextLevel} XP para el siguiente nivel</Muted>
      </Card>

      {/* Hero Card — Ejercicio del día */}
      <Pressable onPress={() => navigate('exercise')}>
        <View
          className="rounded-3xl p-6 mb-6 overflow-hidden"
          style={{ backgroundColor: theme.primaryDark }}
        >
          <View className="flex-row items-center mb-2">
            <Text className="text-white/80 font-bold text-xs tracking-widest">EJERCICIO DEL DÍA</Text>
          </View>
          <Text style={{ fontSize: 56 }} className="mb-2">🛑</Text>
          <Text className="text-white text-2xl font-extrabold mb-1">{dailyExercise.title}</Text>
          <Text className="text-white/80 text-sm mb-4">{dailyExercise.description}</Text>
          <View className="flex-row items-center mb-4">
            <View className="bg-white/20 px-3 py-1 rounded-full mr-2">
              <Text className="text-white font-bold text-xs">+{dailyExercise.xp_reward} XP</Text>
            </View>
            <View className="bg-white/20 px-3 py-1 rounded-full">
              <Text className="text-white font-bold text-xs">⏱ {dailyExercise.duration_minutes} min</Text>
            </View>
          </View>
          <View className="bg-white rounded-2xl py-3.5 items-center">
            <Text style={{ color: theme.primaryDark }} className="font-extrabold text-base">COMENZAR</Text>
          </View>
        </View>
      </Pressable>

      {/* Progreso semanal */}
      <Text className="text-text-primary text-lg font-bold mb-3">📊 Tu Progreso Esta Semana</Text>
      <Card>
        <View className="flex-row justify-between items-end" style={{ height: 90 }}>
          {weeklyActivity.map((d, i) => (
            <View key={i} className="items-center flex-1">
              <View
                className="rounded-lg mb-2"
                style={{
                  width: 22,
                  height: d.completed ? 56 : 14,
                  backgroundColor: d.completed ? theme.secondary : theme.bgElevated,
                }}
              />
              <Muted className="text-[10px]">{d.day}</Muted>
            </View>
          ))}
        </View>
        <View className="border-t border-white/10 mt-4 pt-3">
          <Body className="text-sm">
            <Text className="font-bold text-secondary">6 de 7 días</Text> activos. ¡Vas increíble! 🔥
          </Body>
        </View>
      </Card>
    </ScreenBody>
  );
}
