# MODO YO

> **Tu centro de mando. De adentro hacia afuera.**
> 
> Aplicación móvil de bienestar para adolescentes que fortalece las Funciones Ejecutivas a través de gamificación con privacidad radical.

[![Blueprint](https://img.shields.io/badge/Blueprint-v1.0-blue)](docs/blueprint.md)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🎯 Descripción

MODO YO es una app mobile-first para adolescentes (12-18 años) que transforma el desarrollo de control inhibitorio, autorregulación y planificación en un proceso de identidad y poder propio. Basada en neurociencia y la teoría de la autodeterminación.

### Principios Clave
- 🔒 **Privacidad Radical**: El contenido del adolescente nunca es accesible por el tutor
- 🎮 **Gamificación**: XP, niveles, avatar evolutivo, sin comparaciones externas
- ⚡ **Cero Fricción**: Acceso rápido (Alias + PIN), ejercicios <5 min
- 📊 **Arquitecto del Contexto**: El facilitador ve constancia, no contenido

---

## 📁 Estructura del Proyecto

### Documentación
- [`docs/blueprint.md`](docs/blueprint.md) — Blueprint completo del proyecto (20 secciones)
- [`docs/SDLC.md`](docs/SDLC.md) — Marco de trabajo de desarrollo
- [`docs/ux-specification.md`](docs/ux-specification.md) — Especificación completa de UX/UI
- [`docs/user-stories/`](docs/user-stories/) — Historias de usuario (US-001 a US-013)
- [`docs/decisions/`](docs/decisions/) — Registro de decisiones de arquitectura (ADR-001 a ADR-009)
- [`docs/wireframes/`](docs/wireframes/) — Maquetas y flujos visuales del MVP

### Código
- [`src/`](src/) — Código fuente de la aplicación
  - `components/` — Componentes UI atomizados
  - `screens/` — Vistas principales
  - `store/` — Gestión de estado (Zustand)
  - `services/` — Lógica de backend (Supabase)
  - `navigation/` — Configuración de navegación
  - `types/` — Definiciones TypeScript

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | ADR |
|------|-----------|-----|
| **Framework** | React Native + Expo | [ADR-005](docs/decisions/ADR-005.md) |
| **UI/Styles** | NativeWind (Tailwind CSS) | [ADR-008](docs/decisions/ADR-008.md) |
| **Estado** | Zustand + AsyncStorage | [ADR-004](docs/decisions/ADR-004.md) |
| **Backend** | Supabase (Auth + PostgreSQL) | [ADR-001](docs/decisions/ADR-001.md) |
| **Navegación** | React Navigation | — |
| **Animaciones** | Lottie + Reanimated | — |
| **Notificaciones** | Expo Notifications | — |

---

## 🚀 Getting Started

### Prerequisitos
- Node.js 18+
- Expo CLI
- Cuenta de Supabase (para backend)

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/carlosvizcaya/MODOYO.git
   cd MODOYO
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar .env con tus credenciales de Supabase
   ```

4. **Iniciar el proyecto**
   ```bash
   npm start
   ```

### Scripts Disponibles
```bash
npm start          # Iniciar Expo Dev Server
npm run android    # Ejecutar en Android
npm run ios        # Ejecutar en iOS
npm run web        # Ejecutar en navegador
npm test           # Ejecutar tests
npm run lint       # Lint del código
```

---

## 📋 User Stories del MVP

| ID | Título | Prioridad |
|----|--------|-----------|
| [US-001](docs/user-stories/US-001.md) | Perfil y Avatar Personalizado | Alta |
| [US-002](docs/user-stories/US-002.md) | Diagnóstico EFEF y Mapa de Poder | Alta |
| [US-003](docs/user-stories/US-003.md) | Entrenamiento Interactivo y XP | Alta |
| [US-004](docs/user-stories/US-004.md) | Muro de Victorias (Mis Metas) | Alta |
| [US-005](docs/user-stories/US-005.md) | Dashboard del Facilitador | Alta |
| [US-006](docs/user-stories/US-006.md) | Registro y Autenticación del Tutor | Alta |
| [US-007](docs/user-stories/US-007.md) | Acceso Rápido del Adolescente | Alta |
| [US-008](docs/user-stories/US-008.md) | Flujo de Onboarding | Alta |

Ver todas las historias en [`docs/user-stories/`](docs/user-stories/)

---

## 🏗️ Roadmap de Desarrollo

### ✅ Fase 0: Setup & Documentación (Completado)
- Blueprint completo (20 secciones)
- 13 User Stories documentadas
- 9 ADRs de decisiones arquitectónicas
- Wireframes y especificación UX/UI
- Estructura inicial de código

### 🚧 Fase 1: MVP Core (En progreso)
- [ ] Configuración de Supabase (tablas, RLS, auth)
- [ ] Autenticación dual (Tutor + Adolescente)
- [ ] Flujo de onboarding completo
- [ ] Dashboard principal con ejercicio del día
- [ ] Sistema de XP/niveles/rachas

### 📅 Fase 2: Features Completos
- [ ] 15 ejercicios interactivos (3 por FE)
- [ ] Muro de Victorias (metas)
- [ ] Dashboard del facilitador
- [ ] Avatar evolutivo
- [ ] Sincronización offline

### 🔮 Fase 3: Futuro
- Más ejercicios interactivos
- Modo Desafío Amigo
- IA generativa para personalización ([ADR-009](docs/decisions/ADR-009.md))

---

## 🧪 Testing

Estrategia de testing según [Blueprint §15](docs/blueprint.md):
- **Unit Testing**: Validación de lógica de XP/niveles
- **Manual QA**: Pruebas de usabilidad con adolescentes

```bash
npm test
```

---

## 📚 Instrucción para Agentes AI

> **Siempre que inicies un nuevo chat sobre este proyecto, lee el archivo [`docs/blueprint.md`](docs/blueprint.md) para recuperar el contexto completo del proyecto MODO YO.**

Este repositorio sigue la metodología **The-Architect** con:
- Blueprint de 20 secciones como fuente de verdad
- ADRs para decisiones de arquitectura
- User Stories con IDs únicos (US-XXX)
- Trazabilidad en commits

---

## 👥 Personas

- **Santi (13 años)**: Protagonista. Valora privacidad, busca autonomía.
- **Padre/Tutor**: "Arquitecto del contexto". Provee herramienta, recibe feedback de constancia (no de contenido).

---

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE)

---

## 🙏 Contribuciones

Este proyecto sigue un proceso de desarrollo estructurado. Antes de contribuir:
1. Lee el [Blueprint](docs/blueprint.md) completo
2. Revisa los [ADRs](docs/decisions/) relevantes
3. Sigue el formato de [User Stories](docs/user-stories/)
4. Usa IDs en commits (ej. `feat: implement US-001 profile setup`)

---

**Última actualización**: 2026-08-02  
**Versión del Blueprint**: v1.0  
**Estado**: 🚧 MVP en desarrollo
