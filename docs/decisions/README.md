# Architectural Decision Records (ADRs) — MODO YO

Registro de decisiones de arquitectura del proyecto MODO YO. Cada ADR documenta una decisión técnica significativa, sus alternativas y consecuencias, siguiendo el formato definido en `docs/SDLC.md` (basado en el estándar MADR).

## Índice

| ID | Decisión | Estado | Prioridad |
|----|----------|--------|-----------|
| [ADR-001](./ADR-001.md) | Supabase como Backend-as-a-Service | Aceptado | Alta |
| [ADR-002](./ADR-002.md) | Arquitectura de Privacidad Dual (Tutor/Adolescente) | Aceptado | Alta |
| [ADR-003](./ADR-003.md) | Autenticación Asimétrica (Email+Password vs Alias+PIN) | Aceptado | Alta |
| [ADR-004](./ADR-004.md) | Zustand como Gestor de Estado | Aceptado | Alta |
| [ADR-005](./ADR-005.md) | React Native + Expo como Framework | Aceptado | Alta |
| [ADR-006](./ADR-006.md) | Sincronización Offline (Eventual Consistency) | Aceptado | Media |
| [ADR-007](./ADR-007.md) | Sistema de Gamificación (XP/Niveles/Avatar) | Aceptado | Media |
| [ADR-008](./ADR-008.md) | NativeWind como Sistema de Estilos | Aceptado | Media |
| [ADR-009](./ADR-009.md) | IA Generativa para Personalización (Fase 3) | Propuesto | Futuro |

## Estados posibles
- **Propuesto** — en discusión, aún no adoptado.
- **Aceptado** — decisión vigente y en aplicación.
- **Rechazado** — evaluado y descartado.
- **Obsoleto** — reemplazado por una decisión posterior (indicar cuál).

## Convención
- Un ADR es **inmutable** una vez aceptado: si la decisión cambia, se crea un ADR nuevo que reemplaza al anterior y se marca el viejo como *Obsoleto*.
- Los ADRs se referencian en los commits cuando aplican (ej. `feat: implement US-001 (ADR-002 privacy)`).
