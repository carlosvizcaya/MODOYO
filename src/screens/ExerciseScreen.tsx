/**
 * ExerciseScreen — Ejercicio Interactivo + Animación de Éxito (US-003)
 * Demo de un ejercicio de control de impulsos ("Semáforo Mental") con
 * pantalla de recompensa de XP al finalizar.
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { useDemoStore } from '../store/useDemoStore';
import { dailyExercise } from '../data/mockData';
import { Button, Muted, ProgressBar, theme } from '../components';
import { ScreenBody } from '../components/Layout';

type Phase = 'intro' | 'playing' | 'success';

export function ExerciseScreen() {
  const [phase, setPhase] = useState<Phase>('intro');
  const navigate = useDemoStore((s) => s.navigate);

  return (
    <ScreenBody>
      {phase === 'intro' && <ExerciseIntro onStart={() => setPhase('playing')} onExit={() => navigate('home')} />}
      {phase === 'playing' && <ExerciseGame onComplete={() => setPhase('success')} onExit={() => navigate('home')} />}
      {phase === 'success' && <ExerciseSuccess />}
    </ScreenBody>
  );
}

// ---------- Intro ----------
function ExerciseIntro({ onStart, onExit }: { onStart: () => void; onExit: () => void }) {
  return (
    <View style={{ minHeight: 700 }}>
      <View className="flex-row items-center mb-8">
        <Pressable onPress={onExit} className="pr-3">
          <Text className="text-text-secondary text-2xl">←</Text>
        </Pressable>
        <Text className="text-text-primary font-bold text-base">{dailyExercise.title}</Text>
      </View>

      <View className="flex-1 justify-center items-center">
        <Text style={{ fontSize: 80 }} className="mb-6">🚦</Text>
        <Text className="text-text-primary text-2xl font-extrabold mb-4 text-center">Semáforo Mental</Text>
        <Text className="text-text-secondary text-base text-center mb-2 px-4">
          Toca el botón SOLO cuando la luz esté en <Text className="text-success font-bold">VERDE</Text>.
        </Text>
        <Text className="text-text-secondary text-base text-center mb-10 px-4">
          Si tocas en rojo, entrenas tu freno. ¡Controla el impulso! 🛑
        </Text>
      </View>

      <Button title="Empezar" size="lg" onPress={onStart} />
    </View>
  );
}

// ---------- Juego (Semáforo Mental) ----------
function ExerciseGame({ onComplete, onExit }: { onComplete: () => void; onExit: () => void }) {
  const TOTAL_ROUNDS = 5;
  const [round, setRound] = useState(0);
  const [light, setLight] = useState<'red' | 'green'>('red');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    // Cambia a verde tras un tiempo aleatorio
    setLight('red');
    setFeedback(null);
    const delay = 900 + Math.random() * 1800;
    timerRef.current = setTimeout(() => setLight('green'), delay);
    return () => clearTimeout(timerRef.current);
  }, [round]);

  const handleTap = () => {
    if (light === 'green') {
      setScore((s) => s + 1);
      setFeedback('✅ ¡Bien!');
    } else {
      setFeedback('🛑 ¡Espera el verde!');
    }
    // Avanzar tras breve feedback
    clearTimeout(timerRef.current);
    setTimeout(() => {
      if (round < TOTAL_ROUNDS - 1) {
        setRound((r) => r + 1);
      } else {
        onComplete();
      }
    }, 700);
  };

  return (
    <View style={{ minHeight: 700 }}>
      <View className="flex-row items-center justify-between mb-6">
        <Pressable onPress={onExit} className="pr-3">
          <Text className="text-text-secondary text-2xl">←</Text>
        </Pressable>
        <Muted>Ronda {round + 1}/{TOTAL_ROUNDS}</Muted>
      </View>
      <View className="mb-8">
        <ProgressBar value={round + 1} max={TOTAL_ROUNDS} color={theme.secondary} />
      </View>

      <View className="flex-1 justify-center items-center">
        {/* Semáforo */}
        <View
          className="items-center justify-center mb-10 rounded-full"
          style={{
            width: 180,
            height: 180,
            backgroundColor: light === 'green' ? theme.success : theme.danger,
          }}
        >
          <Text style={{ fontSize: 80 }}>{light === 'green' ? '🟢' : '🔴'}</Text>
        </View>

        <Text className="text-text-primary text-xl font-bold mb-2 h-8">
          {feedback ?? (light === 'green' ? '¡AHORA!' : 'Espera...')}
        </Text>
        <Muted className="mb-10">Aciertos: {score}</Muted>
      </View>

      <Pressable onPress={handleTap}>
        <View
          className="rounded-3xl py-6 items-center"
          style={{ backgroundColor: light === 'green' ? theme.success : theme.bgElevated }}
        >
          <Text className="text-white font-extrabold text-xl">TOCAR</Text>
        </View>
      </Pressable>
    </View>
  );
}

// ---------- Éxito + XP ----------
function ExerciseSuccess() {
  const { addXP, navigate, streak } = useDemoStore();
  const [result, setResult] = useState<{ leveledUp: boolean; newLevel: number } | null>(null);
  const scale = useRef(new Animated.Value(0)).current;
  const xpAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const r = addXP(dailyExercise.xp_reward);
    setResult(r);
    Animated.sequence([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 4 }),
      Animated.timing(xpAnim, { toValue: 1, duration: 800, useNativeDriver: false }),
    ]).start();
  }, []);

  return (
    <View style={{ minHeight: 720 }} className="flex-1 justify-center items-center">
      <Animated.View style={{ transform: [{ scale }] }} className="items-center">
        <Text style={{ fontSize: 96 }} className="mb-4">🎉</Text>
        <Text className="text-text-primary text-3xl font-extrabold mb-2">¡GENIAL!</Text>
        <Text className="text-text-secondary text-base mb-8 text-center px-6">
          Completaste el ejercicio. Tu freno mental está más fuerte. 💪
        </Text>
      </Animated.View>

      {/* XP ganada */}
      <View
        className="rounded-3xl px-8 py-5 mb-6 items-center"
        style={{ backgroundColor: theme.primaryDark }}
      >
        <Text className="text-white/80 text-sm font-bold tracking-widest mb-1">RECOMPENSA</Text>
        <Text className="text-white text-4xl font-extrabold">+{dailyExercise.xp_reward} XP</Text>
      </View>

      {result?.leveledUp && (
        <View className="bg-success/20 px-6 py-3 rounded-2xl mb-4">
          <Text className="text-success font-extrabold text-lg">⭐ ¡Subiste al Nivel {result.newLevel}!</Text>
        </View>
      )}

      <View className="bg-orange-500/20 px-6 py-3 rounded-2xl mb-10">
        <Text className="text-orange-400 font-bold">🔥 ¡Racha de {streak} días!</Text>
      </View>

      <View className="w-full px-2">
        <Button title="Continuar" size="lg" onPress={() => navigate('home')} />
      </View>
    </View>
  );
}
