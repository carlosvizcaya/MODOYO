/**
 * ProfileScreen — Perfil + Mapa de Poder (US-001, US-002, US-011)
 * Avatar grande, nivel/racha, radar de FE y configuración.
 */

import React from 'react';
import { View, Text, Pressable, Switch } from 'react-native';
import { useDemoStore, avatarOptions } from '../store/useDemoStore';
import { powerMap } from '../data/mockData';
import { Card, Muted, StreakBadge, theme } from '../components';
import { ScreenBody } from '../components/Layout';
import { PowerMapRadar } from '../components/PowerMapRadar';

export function ProfileScreen() {
  const { alias, avatarId, level, streak, navigate, resetDemo } = useDemoStore();
  const avatar = avatarOptions.find((a) => a.id === avatarId) ?? avatarOptions[2];
  const [notifications, setNotifications] = React.useState(true);

  return (
    <ScreenBody>
      {/* Header de perfil */}
      <View className="items-center mb-6">
        <View
          className="items-center justify-center mb-3"
          style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: `${avatar.color}30`, borderWidth: 3, borderColor: avatar.color }}
        >
          <Text style={{ fontSize: 52 }}>{avatar.emoji}</Text>
        </View>
        <Text className="text-text-primary text-2xl font-extrabold">{alias}</Text>
        <View className="flex-row items-center mt-2">
          <View className="bg-primary/20 px-3 py-1 rounded-full mr-2">
            <Text className="text-primary font-bold text-sm">Nivel {level}</Text>
          </View>
          <StreakBadge count={streak} />
        </View>
      </View>

      {/* Mapa de Poder */}
      <Text className="text-text-primary text-lg font-bold mb-3">📊 Tu Mapa de Poder</Text>
      <Card variant="hero" className="mb-6 items-center">
        <PowerMapRadar data={powerMap} size={230} />
        <View className="flex-row flex-wrap justify-center mt-4">
          {powerMap.map((fe) => (
            <View key={fe.key} className="flex-row items-center mr-3 mb-2">
              <Text className="mr-1">{fe.icon}</Text>
              <Muted className="text-xs">{fe.label} {fe.score}</Muted>
            </View>
          ))}
        </View>
      </Card>

      {/* Configuración */}
      <Text className="text-text-primary text-lg font-bold mb-3">⚙️ Configuración</Text>
      <Card className="mb-6">
        <SettingRow label="Editar Alias" icon="✏️" />
        <SettingRow label="Cambiar Avatar" icon="🎭" />
        <SettingRow label="Cambiar PIN" icon="🔐" />
        <View className="flex-row items-center justify-between py-3">
          <View className="flex-row items-center">
            <Text className="mr-3">🔔</Text>
            <Text className="text-text-secondary text-base">Notificaciones</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ true: theme.primary, false: theme.bgElevated }}
            thumbColor="#fff"
          />
        </View>
      </Card>

      {/* Botones demo */}
      <Pressable onPress={() => navigate('facilitator')} className="mb-3">
        <Card>
          <Text className="text-secondary font-semibold text-center">👥 Ver Dashboard del Facilitador</Text>
        </Card>
      </Pressable>
      <Pressable onPress={resetDemo}>
        <Muted className="text-center py-2">↺ Reiniciar demo</Muted>
      </Pressable>
    </ScreenBody>
  );
}

function SettingRow({ label, icon }: { label: string; icon: string }) {
  return (
    <Pressable className="flex-row items-center justify-between py-3 border-b border-white/5">
      <View className="flex-row items-center">
        <Text className="mr-3">{icon}</Text>
        <Text className="text-text-secondary text-base">{label}</Text>
      </View>
      <Text className="text-text-muted">›</Text>
    </Pressable>
  );
}
