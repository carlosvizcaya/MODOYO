# Testing — MODO YO

Estrategia de pruebas del proyecto MODO YO bajo enfoque **Test-Driven Development (TDD)**, según se define en [`docs/SDLC.md` §6](../SDLC.md).

## Principio TDD
> **Los tests se escriben ANTES que el código.** Cada Criterio de Aceptación de una historia de usuario (`US-XXX`) debe estar cubierto por al menos un caso de prueba automatizado (`T-XXX`).

Ciclo obligatorio por funcionalidad: **🔴 Red → 🟢 Green → 🔵 Refactor**.

## Documentos
- **[`test-matrix.md`](./test-matrix.md)** — Matriz de trazabilidad: `US-XXX` → Criterios de Aceptación → casos de prueba `T-XXX` → nivel → estado. Es la fuente de verdad del alcance de testing.

## Pirámide de Testing
| Nivel | Proporción | Herramienta | Qué prueba |
|-------|-----------|-------------|------------|
| **Unit** | ~70% | Jest + ts-jest | Lógica pura: XP/niveles, rachas, cálculo EFEF, stores Zustand, utils |
| **Integración** | ~20% | Jest + RNTL + Supabase local | Stores + persistencia, cliente Supabase + RLS, sincronización offline |
| **Componente / E2E** | ~10% | RNTL / Maestro / Detox | Flujos completos: onboarding, completar ejercicio, marcar meta |

## Convenciones
- **Ubicación:** `src/**/__tests__/*.test.ts(x)` (unit/integración/componente) y `e2e/` (end-to-end).
- **Nomenclatura:** cada `describe` inicia con el ID de la historia; cada `it` corresponde a un Criterio de Aceptación.
  ```ts
  describe('US-003 · Entrenamiento y XP', () => {
    it('asigna 50 XP al completar el ejercicio del día', () => { /* ... */ });
    it('sube de nivel al alcanzar el umbral de XP', () => { /* ... */ });
  });
  ```
- **IDs de test:** `T-XXX` (correlativo). Se registran en `test-matrix.md`.
- **Fixtures deterministas:** sin datos reales de producción; usar factories.

## Cobertura y Gates
- Umbral mínimo: **80%** (`statements`, `branches`, `functions`, `lines`) para lógica de negocio (`src/services`, `src/store`, `src/utils`).
- CI (GitHub Actions) ejecuta `npm test -- --coverage` y bloquea el merge si falla algún test o cae la cobertura.

## Comandos (una vez configurado Jest)
```bash
npm test                 # ejecutar toda la suite
npm test -- --watch      # modo watch (desarrollo TDD)
npm test -- --coverage   # con reporte de cobertura
npm run test:e2e         # flujos end-to-end
```

## Definición de "Hecho" (DoD)
Una historia de usuario está **Completada** solo si:
1. Todos sus tests (`T-XXX`) pasan en verde.
2. Se cumple el umbral de cobertura.
3. Se actualiza el estado en `test-matrix.md` y en la ficha `US-XXX.md`.
