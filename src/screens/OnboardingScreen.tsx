/**
 * OnboardingScreen — Flujo del adolescente (US-008, US-002, US-001)
 * Pasos: Bienvenida → Test EFEF → Mapa de Poder → Avatar + Alias → PIN → Dashboard
 */

import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { useDemoStore, avatarOptions } from '../store/useDemoStore';
import { efefQuestions, powerMap } from '../data/mockData';
import { Button, Card, Heading, Body, Muted, ProgressBar, theme } from '../components';
import { ScreenBody } from '../components/Layout';
import { PowerMapRadar } from '../components/PowerMapRadar';

const TOTAL_STEPS = 5;

export function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const navigate = useDemoStore((s) => s.navigate);
  const completeOnboarding = useDemoStore((s) => s.completeOnboarding);
  const setAlias = useDemoStore((s) => s.setAlias);
  const setAvatar = useDemoStore((s) => s.setAvatar);

  const [localAlias, setLocalAlias] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [pin, setPin] = useState('');

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const back = () => (step === 0 ? navigate('welcome') : setStep((s) => s - 1));

  const finish = () => {
    if (localAlias.trim()) setAlias(localAlias.trim());
    if (selectedAvatar) setAvatar(selectedAvatar);
    completeOnboarding();
  };

  return (
    <ScreenBody>
      {/* Header con progreso */}
      <View className="flex-row items-center mb-6">
        <Pressable onPress={back} className="pr-3">
          <Text className="text-text-secondary text-2xl">←</Text>
        </Pressable>
        <View className="flex-1">
          <ProgressBar value={step + 1} max={TOTAL_STEPS} />
        </View>
        <Muted className="ml-3">{step + 1}/{TOTAL_STEPS}</Muted>
      </View>

      {step === 0 && <StepWelcome onNext={next} />}
      {step === 1 && (
        <StepTest answers={answers} setAnswers={setAnswers} onNext={next} />
      )}
      {step === 2 && <StepPowerMap onNext={next} />}
      {step === 3 && (
        <StepAvatar
          localAlias={localAlias}
          setLocalAlias={setLocalAlias}
          selectedAvatar={selectedAvatar}
          setSelectedAvatar={setSelectedAvatar}
          onNext={next}
        />
      )}
      {step === 4 && <StepPin pin={pin} setPin={setPin} onFinish={finish} />}
    </ScreenBody>
  );
}

// ---------- Paso 0: Bienvenida ----------
function StepWelcome({ onNext }: { onNext: () => void }) {
  return (
    <View className="flex-1 justify-center" style={{ minHeight: 600 }}>
      <View className="items-center mb-8">
        <Text style={{ fontSize: 72 }}>👋</Text>
      </View>
      <Heading className="text-center mb-4">Este es TU espacio</Heading>
      <Body className="text-center mb-2">
        Nadie más entra aquí. Ni tus papás, ni nadie.
      </Body>
      <Body className="text-center mb-8">
        Vamos a descubrir tus talentos y a entrenarlos como en un videojuego. ¿List@?
      </Body>
      <Button title="¡Vamos!" size="lg" onPress={onNext} />
    </View>
  );
}

// ---------- Paso 1: Test EFEF ----------
function StepTest({
  answers,
  setAnswers,
  onNext,
}: {
  answers: Record<string, number>;
  setAnswers: (a: Record<string, number>) => void;
  onNext: () => void;
}) {
  const [qIndex, setQIndex] = useState(0);
  const q = efefQuestions[qIndex];
  const options = [
    { label: 'Casi nunca', value: 1 },
    { label: 'A veces', value: 2 },
    { label: 'Casi siempre', value: 3 },
  ];

  const answer = (value: number) => {
    const updated = { ...answers, [q.id]: value };
    setAnswers(updated);
    if (qIndex < efefQuestions.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      onNext();
    }
  };

  return (
    <View>
      <Heading className="mb-2">Descubre tu Mapa de Poder</Heading>
      <Muted className="mb-6">Pregunta {qIndex + 1} de {efefQuestions.length} · Responde con sinceridad</Muted>

      <Card variant="hero" className="mb-6">
        <Text style={{ fontSize: 40 }} className="mb-3">🧩</Text>
        <Text className="text-text-primary text-xl font-bold leading-7">{q.text}</Text>
      </Card>

      {options.map((opt) => (
        <Pressable key={opt.value} onPress={() => answer(opt.value)} className="mb-3">
          <Card>
            <Text className="text-text-primary text-base font-semibold text-center">{opt.label}</Text>
          </Card>
        </Pressable>
      ))}
    </View>
  );
}

// ---------- Paso 2: Mapa de Poder ----------
function StepPowerMap({ onNext }: { onNext: () => void }) {
  return (
    <View>
      <Heading className="mb-2">¡Este es tu Mapa de Poder! 🗺️</Heading>
      <Muted className="mb-6">Estos son tus talentos mentales. Los vamos a hacer crecer juntos.</Muted>

      <Card variant="hero" className="mb-6 items-center">
        <PowerMapRadar data={powerMap} size={240} />
      </Card>

      {powerMap.map((fe) => (
        <View key={fe.key} className="flex-row items-center mb-3">
          <Text style={{ fontSize: 22 }} className="mr-3">{fe.icon}</Text>
          <View className="flex-1">
            <View className="flex-row justify-between mb-1">
              <Text className="text-text-secondary text-sm font-semibold">{fe.label}</Text>
              <Text className="text-text-muted text-sm">{fe.score}</Text>
            </View>
            <ProgressBar value={fe.score} max={100} color={fe.color} />
          </View>
        </View>
      ))}

      <View className="h-6" />
      <Button title="Crear mi avatar →" size="lg" onPress={onNext} />
    </View>
  );
}

// ---------- Paso 3: Avatar + Alias ----------
function StepAvatar({
  localAlias,
  setLocalAlias,
  selectedAvatar,
  setSelectedAvatar,
  onNext,
}: {
  localAlias: string;
  setLocalAlias: (v: string) => void;
  selectedAvatar: string | null;
  setSelectedAvatar: (v: string) => void;
  onNext: () => void;
}) {
  const canContinue = localAlias.trim().length > 0 && selectedAvatar;
  return (
    <View>
      <Heading className="mb-2">Elige tu Avatar</Heading>
      <Muted className="mb-6">Será tu identidad en MODO YO. Evolucionará contigo.</Muted>

      <View className="flex-row flex-wrap justify-between mb-6">
        {avatarOptions.map((av) => {
          const active = selectedAvatar === av.id;
          return (
            <Pressable
              key={av.id}
              onPress={() => setSelectedAvatar(av.id)}
              style={{ width: '31%', marginBottom: 12 }}
            >
              <View
                className="items-center justify-center py-4 rounded-2xl"
                style={{
                  backgroundColor: active ? `${av.color}30` : theme.bgCard,
                  borderWidth: 2,
                  borderColor: active ? av.color : 'transparent',
                }}
              >
                <Text style={{ fontSize: 40 }}>{av.emoji}</Text>
                <Text className="text-text-muted text-xs mt-1">{av.name}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <Text className="text-text-secondary text-sm font-semibold mb-2">Tu Alias</Text>
      <TextInput
        value={localAlias}
        onChangeText={setLocalAlias}
        placeholder="¿Cómo quieres que te llamen?"
        placeholderTextColor={theme.textMuted}
        className="bg-background-card text-text-primary rounded-2xl px-4 py-4 mb-6"
        style={{ borderWidth: 1, borderColor: theme.bgElevated }}
      />

      <Button
        title="Continuar →"
        size="lg"
        onPress={onNext}
        disabled={!canContinue}
        style={{ opacity: canContinue ? 1 : 0.4 }}
      />
    </View>
  );
}

// ---------- Paso 4: PIN ----------
function StepPin({ pin, setPin, onFinish }: { pin: string; setPin: (v: string) => void; onFinish: () => void }) {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];

  const press = (d: string) => {
    if (d === '⌫') {
      setPin(pin.slice(0, -1));
    } else if (d !== '' && pin.length < 4) {
      const newPin = pin + d;
      setPin(newPin);
    }
  };

  return (
    <View>
      <Heading className="mb-2">Crea tu PIN 🔐</Heading>
      <Muted className="mb-8">4 dígitos para entrar rápido a tu espacio.</Muted>

      {/* Indicadores de PIN */}
      <View className="flex-row justify-center mb-10">
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            className="mx-2"
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: i < pin.length ? theme.primary : 'transparent',
              borderWidth: 2,
              borderColor: theme.primary,
            }}
          />
        ))}
      </View>

      {/* Teclado */}
      <View className="flex-row flex-wrap justify-between px-4">
        {digits.map((d, i) => (
          <Pressable
            key={i}
            onPress={() => press(d)}
            disabled={d === ''}
            style={{ width: '30%', marginBottom: 16 }}
            className="items-center"
          >
            {d !== '' && (
              <View
                className="items-center justify-center bg-background-card rounded-full"
                style={{ width: 68, height: 68 }}
              >
                <Text className="text-text-primary text-2xl font-bold">{d}</Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>

      <View className="h-4" />
      <Button
        title="Entrar a MODO YO 🚀"
        size="lg"
        onPress={onFinish}
        disabled={pin.length < 4}
        style={{ opacity: pin.length < 4 ? 0.4 : 1 }}
      />
    </View>
  );
}
