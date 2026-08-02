/**
 * GoalsScreen — Muro de Victorias / Mis Metas (US-004)
 * Crear metas, marcarlas como logradas. Contenido PRIVADO (ADR-002):
 * nunca visible para el tutor.
 */

import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Modal } from 'react-native';
import { useDemoStore } from '../store/useDemoStore';
import { Card, Muted, Button, theme } from '../components';
import { ScreenBody } from '../components/Layout';

export function GoalsScreen() {
  const { goals, addGoal, achieveGoal } = useDemoStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState('');

  const active = goals.filter((g) => g.status === 'pending');
  const achieved = goals.filter((g) => g.status === 'achieved');

  const handleAdd = () => {
    if (newGoal.trim()) {
      addGoal(newGoal.trim());
      setNewGoal('');
      setModalOpen(false);
    }
  };

  return (
    <ScreenBody>
      {/* Header */}
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-text-primary text-2xl font-extrabold">Mis Metas</Text>
        <Pressable
          onPress={() => setModalOpen(true)}
          className="items-center justify-center rounded-full"
          style={{ width: 40, height: 40, backgroundColor: theme.primary }}
        >
          <Text className="text-white text-2xl font-bold" style={{ marginTop: -2 }}>+</Text>
        </Pressable>
      </View>
      <Muted className="mb-6">🔒 Solo tú ves esto. Nadie más.</Muted>

      {/* Activas */}
      <Text className="text-text-primary text-lg font-bold mb-3">🎯 Activas</Text>
      {active.length === 0 && (
        <Card className="mb-3"><Muted>No tienes metas activas. ¡Crea una con el botón +!</Muted></Card>
      )}
      {active.map((g) => (
        <Card key={g.id} className="mb-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1 pr-2">
              <View
                className="rounded-md mr-3"
                style={{ width: 22, height: 22, borderWidth: 2, borderColor: theme.textMuted }}
              />
              <Text className="text-text-primary text-base flex-1">{g.title}</Text>
            </View>
          </View>
          <Pressable onPress={() => achieveGoal(g.id)} className="mt-3">
            <View className="bg-success/20 rounded-xl py-2.5 items-center">
              <Text className="text-success font-bold">✓ Marcar lograda</Text>
            </View>
          </Pressable>
        </Card>
      ))}

      {/* Logradas */}
      <Text className="text-text-primary text-lg font-bold mb-3 mt-4">✅ Logradas</Text>
      {achieved.map((g) => (
        <Card key={g.id} className="mb-3" style={{ opacity: 0.85 }}>
          <View className="flex-row items-center">
            <Text style={{ fontSize: 20 }} className="mr-3">✅</Text>
            <View className="flex-1">
              <Text className="text-text-secondary text-base line-through">{g.title}</Text>
              <Muted className="text-xs mt-0.5">¡Lograda! 🎉</Muted>
            </View>
          </View>
        </Card>
      ))}

      {/* Modal nueva meta */}
      <Modal visible={modalOpen} transparent animationType="fade" onRequestClose={() => setModalOpen(false)}>
        <View className="flex-1 items-center justify-center px-6" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <View className="w-full rounded-3xl p-6" style={{ backgroundColor: theme.bgCard }}>
            <Text className="text-text-primary text-xl font-bold mb-4">Nueva meta</Text>
            <TextInput
              value={newGoal}
              onChangeText={setNewGoal}
              placeholder="¿Qué quieres lograr?"
              placeholderTextColor={theme.textMuted}
              className="bg-background text-text-primary rounded-2xl px-4 py-4 mb-4"
              style={{ borderWidth: 1, borderColor: theme.bgElevated }}
              autoFocus
            />
            <View className="flex-row">
              <View className="flex-1 mr-2">
                <Button title="Cancelar" variant="secondary" onPress={() => setModalOpen(false)} />
              </View>
              <View className="flex-1 ml-2">
                <Button title="Crear" onPress={handleAdd} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenBody>
  );
}
