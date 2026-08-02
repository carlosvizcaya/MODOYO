/**
 * MODO YO - Main App Entry Point
 * Blueprint v1.0 | ADR-005 (React Native + Expo) | ADR-008 (NativeWind)
 *
 * Demo navegable del MVP con datos mock. Router simple basado en Zustand
 * (en producción se migrará a React Navigation).
 */

import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import './global.css';

import { useDemoStore } from './src/store/useDemoStore';
import { MobileFrame, TabBar } from './src/components/Layout';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { LibraryScreen } from './src/screens/LibraryScreen';
import { GoalsScreen } from './src/screens/GoalsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { ExerciseScreen } from './src/screens/ExerciseScreen';
import { FacilitatorScreen } from './src/screens/FacilitatorScreen';

export default function App() {
  const screen = useDemoStore((s) => s.screen);

  const renderScreen = () => {
    switch (screen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'onboarding':
        return <OnboardingScreen />;
      case 'home':
        return <HomeScreen />;
      case 'library':
        return <LibraryScreen />;
      case 'goals':
        return <GoalsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'exercise':
        return <ExerciseScreen />;
      case 'facilitator':
        return <FacilitatorScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <MobileFrame>
      <View className="flex-1 bg-background">
        {renderScreen()}
        <TabBar />
      </View>
      <StatusBar style="light" />
    </MobileFrame>
  );
}
