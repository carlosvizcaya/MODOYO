/**
 * WelcomeScreen — Landing / selección de rol
 * Punto de entrada de la demo. Permite elegir el flujo del adolescente
 * o el del facilitador (tutor).
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useDemoStore } from '../store/useDemoStore';
import { Button, Card, Heading, Body, Muted, theme } from '../components';
import { ScreenBody } from '../components/Layout';

export function WelcomeScreen() {
  const navigate = useDemoStore((s) => s.navigate);
  const completeOnboarding = useDemoStore((s) => s.completeOnboarding);

  return (
    <ScreenBody>
      <View className="flex-1 justify-center" style={{ minHeight: 720 }}>
        {/* Logo / marca */}
        <View className="items-center mb-10">
          <View
            className="items-center justify-center mb-4"
            style={{ width: 96, height: 96, borderRadius: 28, backgroundColor: theme.primary }}
          >
            <Text style={{ fontSize: 48 }}>🧠</Text>
          </View>
          <Heading className="text-3xl">MODO YO</Heading>
          <Muted className="mt-2 text-center">Tu centro de mando.{'\n'}De adentro hacia afuera.</Muted>
        </View>

        {/* Tarjetas de rol */}
        <SectionCard
          emoji="🚀"
          title="Soy Adolescente"
          desc="Entra a tu espacio. Entrena tu mente, sube de nivel y desbloquea tu poder."
          color={theme.primary}
          cta="Comenzar mi viaje"
          onPress={() => navigate('onboarding')}
        />

        <View className="h-4" />

        <SectionCard
          emoji="👥"
          title="Soy Tutor / Facilitador"
          desc="Acompaña el proceso. Ve la constancia, nunca el contenido privado."
          color={theme.secondary}
          cta="Entrar como facilitador"
          onPress={() => navigate('facilitator')}
        />

        <View className="h-8" />

        {/* Acceso directo demo (salta onboarding) */}
        <Button
          title="Ver demo del dashboard directamente →"
          variant="tertiary"
          size="sm"
          onPress={completeOnboarding}
        />
      </View>
    </ScreenBody>
  );
}

function SectionCard({
  emoji,
  title,
  desc,
  color,
  cta,
  onPress,
}: {
  emoji: string;
  title: string;
  desc: string;
  color: string;
  cta: string;
  onPress: () => void;
}) {
  return (
    <Card variant="hero">
      <View className="flex-row items-center mb-3">
        <View
          style={{ backgroundColor: `${color}30`, width: 48, height: 48, borderRadius: 14 }}
          className="items-center justify-center mr-3"
        >
          <Text style={{ fontSize: 26 }}>{emoji}</Text>
        </View>
        <Text className="text-text-primary text-xl font-bold flex-1">{title}</Text>
      </View>
      <Body className="mb-4 text-sm">{desc}</Body>
      <Button title={cta} onPress={onPress} style={{ backgroundColor: color }} />
    </Card>
  );
}
