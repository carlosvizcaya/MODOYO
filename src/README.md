# Source Code Structure — MODO YO

Estructura de código según Blueprint §17 (Project Structure)

## Directorios

### `/components`
Componentes UI atomizados y reutilizables.
- Diseñados según el Design System (docs/ux-specification.md §5)
- Estilizados con NativeWind (ADR-008)
- Ejemplos: Button, Card, Avatar, ProgressBar, Badge

### `/screens`
Vistas principales de la aplicación.
- Una carpeta por flujo principal (Onboarding, Dashboard, Exercises, Goals, Profile)
- Corresponden a las pantallas del wireframe (docs/wireframes/)

### `/navigation`
Configuración de React Navigation.
- Tab Navigation (barra inferior)
- Stack Navigation (flujos anidados)

### `/store`
Gestión de estado con Zustand (ADR-004).
- `useUserStore.ts` — Estado del perfil del adolescente
- `useProgressStore.ts` — Progreso, XP, rachas (pendiente)
- `useGoalsStore.ts` — Metas personales (pendiente)

### `/services`
Servicios de backend (Supabase) y lógica de negocio.
- `authService.ts` — Autenticación dual (ADR-003)
- `exerciseService.ts` — CRUD de ejercicios
- `progressService.ts` — Registro de actividad y XP
- `syncService.ts` — Sincronización offline-first (ADR-006)

### `/config`
Configuración de la aplicación.
- `supabase.ts` — Cliente de Supabase (ADR-001)
- `constants.ts` — Constantes globales

### `/types`
Definiciones de TypeScript.
- Interfaces según Data Schema (Blueprint §8)

### `/utils`
Funciones auxiliares y helpers.
- Cálculos de XP/niveles
- Validaciones
- Formateo de fechas

## Convenciones

### Naming
- Componentes: PascalCase (`Button.tsx`, `HeroCard.tsx`)
- Servicios: camelCase (`authService.ts`)
- Stores: use + PascalCase (`useUserStore.ts`)
- Types: PascalCase (`User`, `Exercise`)

### Imports
```typescript
// External dependencies
import { View, Text } from 'react-native';
import { create } from 'zustand';

// Internal: types
import type { User } from '@/types';

// Internal: services
import { authService } from '@/services/authService';

// Internal: stores
import { useUserStore } from '@/store/useUserStore';

// Internal: components
import { Button } from '@/components/Button';
```

### File Headers
Cada archivo debe incluir un comentario indicando su propósito y ADRs relacionados:
```typescript
/**
 * [Nombre del componente/servicio]
 * ADR-XXX: [Decisión relacionada]
 * US-XXX: [User Story implementada]
 */
```

## Testing

### `/tests`
Tests unitarios y de integración.
- `__tests__/components/` — Tests de componentes
- `__tests__/services/` — Tests de servicios
- `__tests__/utils/` — Tests de utilidades

### Estrategia (Blueprint §15)
- Unit Testing: Validación de lógica de XP/niveles
- Manual QA: Pruebas de usabilidad con adolescentes

## Próximos Pasos de Desarrollo

### Fase 1: Setup & Onboarding (US-001, US-006, US-007, US-008)
1. Configurar Supabase (crear proyecto, tablas)
2. Implementar autenticación del tutor
3. Implementar autenticación del adolescente (Alias + PIN)
4. Crear flujo de onboarding completo

### Fase 2: Core Features (US-002, US-003, US-004)
1. Test EFEF y Mapa de Poder
2. Dashboard principal + ejercicio del día
3. Sistema de XP/niveles/rachas
4. Muro de Victorias (metas)

### Fase 3: Dashboard Facilitador & Pulido (US-005, US-009, US-010, US-011, US-012)
1. Dashboard del facilitador con privacidad
2. Avatar evolutivo
3. Notificaciones
4. Sincronización offline

---

**Relacionado:**
- [Blueprint](../docs/blueprint.md)
- [UX Specification](../docs/ux-specification.md)
- [Wireframes](../docs/wireframes/)
- [ADRs](../docs/decisions/)
