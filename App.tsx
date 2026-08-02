/**
 * MODO YO - Main App Entry Point
 * Blueprint v1.0 | ADR-005 (React Native + Expo) | ADR-008 (NativeWind)
 */

import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import './global.css'; // NativeWind styles

export default function App() {
  return (
    <View className="flex-1 bg-background items-center justify-center">
      <Text className="text-text-primary text-2xl font-bold mb-4">
        MODO YO
      </Text>
      <Text className="text-text-secondary text-base">
        Tu centro de mando. De adentro hacia afuera.
      </Text>
      <StatusBar style="light" />
    </View>
  );
}
