# Blueprint: MODO YO (v1.0)
**Tagline:** Tu centro de mando. De adentro hacia afuera.

## 1. Project Name & Tagline
**MODO YO**: Una herramienta de conquista personal para adolescentes.

## 2. Elevator Pitch
MODO YO es una app mobile-first para adolescentes (12-18 años) que fortalece las Funciones Ejecutivas (FE). Basada en neurociencia y la teoría de la autodeterminación, transforma el desarrollo del control inhibitorio, la autorregulación y la planificación en un proceso de identidad y poder propio, evitando la percepción de "terapia" o "vigilancia".

## 3. Core Features (MVP)
- **Diagnóstico EFEF Inicial:** Evaluación rápida para mapear el estado de las 5 FE.
- **Avatar Dinámico:** Representación visual que evoluciona con el progreso del usuario.
- **Catálogo de 50 Ejercicios (15 Interactivos Iniciales):** Basados en el currículo de Alice Kassotaki (3 por cada FE en el MVP).
- **Muro de Victorias (Mis Metas):** Sistema de registro de metas personales y logros.
- **Dashboard para el Facilitador (Padre):** Visualización de métricas de constancia y esfuerzo sin acceso a contenido privado.

## 4. User Personas
- **Santi (13 años):** Protagonista. Valora su privacidad, busca autonomía y reacciona negativamente a la imposición. Necesita sentir que la herramienta es "suya".
- **Padre/Tutor (Facilitador):** "Arquitecto del contexto". Provee la herramienta y el entorno, recibe feedback del proceso pero no interviene en el contenido.

## 5. User Stories
- **US-001 (Perfil):** Como adolescente, quiero elegir mi alias y configurar mi avatar para sentir que el espacio es privado y personalizado.
- **US-002 (Diagnóstico):** Como adolescente, quiero ver mi "Mapa de Poder" (FE) para identificar mis talentos naturales.
- **US-003 (Entrenamiento):** Como adolescente, quiero realizar un ejercicio interactivo de <5 min para ganar XP y subir de nivel.
- **US-004 (Metas):** Como adolescente, quiero definir metas propias (ej. "llegar a la hora") para sentir satisfacción al cumplirlas.
- **US-005 (Métricas de Esfuerzo):** Como padre, quiero ver si mi hijo completó su racha diaria para validar su compromiso sin invadir su privacidad.

## 6. Non-Functional Requirements
- **Privacidad Radical:** Encriptación local de respuestas personales.
- **Rendimiento:** Tiempo de carga < 2 segundos.
- **Accesibilidad:** Diseño visual de alta legibilidad para adolescentes.
- **Notificaciones Respetuosas:** Frecuencia baja, tono motivador, configurables por el usuario.

## 7. Tech Stack
- **Framework:** React Native + Expo.
- **UI:** NativeWind (Tailwind CSS).
- **Backend:** Supabase (Auth, DB, Storage).
- **Gestión de Estado:** Zustand (ligero y rápido).
- **IA (Fase Futura):** Abacus.AI para personalización de ejercicios.

## 8. Data Schema
- `users`: id, alias, avatar_state, level, xp, streak_count.
- `executive_functions_scores`: user_id, fc_inhibit, fc_auto, fc_workmem, fc_flex, fc_plan.
- `daily_logs`: id, user_id, exercise_id, completed (bool), timestamp.
- `user_goals`: id, user_id, title, status (pending/achieved).

## 9. API Endpoints (Supabase/Edge Functions)
- `POST /auth/register_tutor`: Registro inicial del padre.
- `POST /user/onboarding`: Creación del perfil adolescente ligado.
- `GET /exercises/daily`: Obtiene el reto sugerido según el perfil FE.
- `POST /progress/complete`: Registra finalización y asigna XP.

## 10. UI/UX Guidelines
- **Look & Feel:** "Videojuego de productividad" (energético, moderno, oscuro/oscuro-dinámico).
- **Avatar:** Estilo ilustrado que cambia de pose/accesorios según el nivel de XP.
- **Navegación:** Barra inferior simple: Home, Biblioteca, Metas, Perfil.

## 11. App Flow
Bienvenida -> Test de Inicio -> Creación de Avatar -> Tutorial Rápido -> Dashboard Principal (Muestra el "Ejercicio del día" como acción heroica).

## 12. State Management
Uso de persisted storage con Zustand para guardar el progreso diario offline y sincronizar con Supabase al detectar conexión.

## 13. Authentication & Authorization
- Tutor: Email/Password.
- Adolescente: Alias + PIN de 4 dígitos para acceso rápido en dispositivo móvil.

## 14. Third-Party Integrations
- Notificaciones Push vía Expo Notifications.
- LottieFiles para animaciones de éxito.

## 15. Testing Strategy
- Unit Testing: Validación de lógica de cálculo de XP y niveles.
- Manual Quality Assurance: Pruebas de usabilidad con adolescentes (Santi).

## 16. Deployment Strategy
- App Store / Google Play vía Expo EAS Build.
- CI/CD: GitHub Actions para despliegue automático a canales de test.

## 17. Project Structure
- `/src/components`: UI atomizada.
- `/src/screens`: Vistas principales.
- `/src/store`: Lógica de Zustand.
- `/src/services`: Llamadas a Supabase.
- `/assets`: Ilustraciones de avatares y ejercicios.

## 18. Known Risks & Mitigations
- **Riesgo:** Percepción de "tarea escolar". **Mitigación:** Lenguaje lúdico y 0 comparaciones externas.
- **Riesgo:** Deserción. **Mitigación:** Rachas (streaks) y evolución visual del avatar.

## 19. Future Roadmap
- **Fase 2:** Más ejercicios interactivos y "Modo Desafío Amigo".
- **Fase 3:** IA generativa para crear ejercicios basados en las metas del usuario.

## 20. Glossary
- **FE:** Funciones Ejecutivas.
- **EFEF:** Evaluación de Funciones Ejecutivas.
- **XP:** Puntos de experiencia ganados por esfuerzo.
