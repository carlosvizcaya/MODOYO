# SDLC (Software Development Life Cycle) - Project Initialization Guide

This document outlines the standardized process for initiating and managing software projects using **The-Architect** methodology within the **Abacus.AI** environment.

## 1. Blueprint Creation (The-Architect Methodology)

Before writing any code, a comprehensive blueprint must be created. This blueprint serves as the single source of truth for the project.

### The 20 Sections of the Blueprint
The `blueprint.md` file must contain the following sections:

1.  **Project Name & Tagline**: A concise name and a one-sentence description.
2.  **Elevator Pitch**: A 30-second explanation of the project's value.
3.  **Core Features (MVP)**: The minimum set of features required for launch.
4.  **User Personas**: Detailed descriptions of the primary users.
5.  **User Stories**: Functional requirements formatted as "As a [persona], I want [action] so that [benefit]".
6.  **Non-Functional Requirements**: Performance, security, and scalability constraints.
7.  **Tech Stack**: Specific technologies, frameworks, and libraries to be used.
8.  **Data Schema**: Database structure, including tables, fields, and relationships.
9.  **API Endpoints**: A list of all required API routes and their expected inputs/outputs.
10. **UI/UX Guidelines**: Design principles, color palettes, and component libraries.
11. **App Flow**: A step-by-step walkthrough of the primary user journey.
12. **State Management**: How application state will be handled (e.g., Redux, Context API).
13. **Authentication & Authorization**: User login, registration, and permission logic.
14. **Third-Party Integrations**: External services (e.g., Stripe, SendGrid, AWS).
15. **Testing Strategy**: Unit, integration, and end-to-end testing plans.
16. **Deployment Strategy**: CI/CD pipelines and hosting environments.
17. **Project Structure**: A high-level overview of the file and folder organization.
18. **Known Risks & Mitigations**: Potential technical or business challenges.
19. **Future Roadmap**: Features planned for post-MVP releases.
20. **Glossary**: Definitions of domain-specific terms.

### Process
-   **Interview Phase**: The AI agent will ask targeted questions to fill these sections.
-   **Validation Phase**: The user must review and approve the blueprint before coding begins.
-   **Versioning**: The blueprint should be versioned (e.g., `v1.0`, `v1.1`) in GitHub.

## 2. GitHub Integration (Source of Truth)

The blueprint and all project specifications must be stored in a GitHub repository to ensure persistence across Abacus sessions.

### Steps
1.  **Initialize Repository**: Create a new GitHub repo for the project.
2.  **Upload Blueprint**: Save the finalized `blueprint.md` in the root of the repository.
3.  **Context File**: Include a `CLAUDE.md` or `CONTEXT.md` file that summarizes the project for AI agents.
4.  **Commit Strategy**: Use clear commit messages referencing User Story IDs (e.g., `feat: implement US-001 login flow`).

## 3. Abacus Project Configuration

To maintain context within Abacus.AI, the project must be configured to reference the GitHub repository.

### Configuration Instructions
1.  **Project Name**: `[Nombre de Proyecto]`
2.  **GitHub Connection**: Link the project to the GitHub repository containing the `blueprint.md`.
3.  **System Instruction**: Add the following instruction to the project's "Custom Instructions" or "System Prompt":
    > "Siempre que inicie un nuevo chat, lee el archivo `blueprint.md` de mi repositorio para recuperar el contexto del proyecto. Usa este archivo como la fuente primaria de verdad para todas las decisiones técnicas y de producto."

## 4. Tracking & User Stories

All functional requirements must be tracked using unique IDs to facilitate clear communication and progress tracking.

### ID Format
-   **User Stories**: `US-XXX` (e.g., `US-001`, `US-002`)
-   **Tasks**: `T-XXX` (e.g., `T-001`, `T-002`)
-   **Bugs**: `B-XXX` (e.g., `B-001`, `B-002`)
-   **Architectural Decision Records**: `ADR-XXX` (e.g., `ADR-001`, `ADR-002`)

### Example User Story
**ID**: `US-001`
**Title**: User Registration
**Description**: As a new user, I want to register with my email and password so that I can access the platform.
**Acceptance Criteria**:
-   Email validation is performed.
-   Password must be at least 8 characters.
-   Success message is displayed upon registration.

## 5. Architectural Decision Records (ADRs)

Toda decisión de arquitectura significativa (elección de tecnología, patrón, o trade-off relevante) debe documentarse como un **ADR** en `docs/decisions/`. Los ADRs preservan el *porqué* de las decisiones para que agentes y desarrolladores futuros no las reabran sin contexto.

### Principios
-   **Un ADR por decisión**, con ID único `ADR-XXX`.
-   **Inmutabilidad**: una vez *Aceptado*, un ADR no se edita. Si la decisión cambia, se crea un ADR nuevo que lo reemplaza y el anterior se marca como *Obsoleto* (indicando cuál lo sustituye).
-   **Trazabilidad**: los ADRs se referencian en User Stories y commits cuando aplican (ej. `feat: implement US-001 (ADR-002 privacy)`).

### Estados
-   **Propuesto** — en discusión, aún no adoptado.
-   **Aceptado** — decisión vigente y en aplicación.
-   **Rechazado** — evaluado y descartado.
-   **Obsoleto** — reemplazado por una decisión posterior.

### ADR Template
```markdown
# ADR-XXX: [Título de la Decisión]

**Estado:** Propuesto | Aceptado | Rechazado | Obsoleto
**Fecha:** YYYY-MM-DD
**Autores:** [Nombre/Equipo]
**User Stories relacionadas:** [US-XXX, US-XXX]

## Contexto y Problema
[¿Qué problema resuelve esta decisión? ¿Qué fuerzas/restricciones aplican?]

## Alternativas Consideradas
1. **Opción A** — Pros / Contras
2. **Opción B (elegida)** — Pros / Contras
3. **Opción C** — Pros / Contras

## Decisión
[Qué se eligió y por qué.]

## Consecuencias
- **Positivas:** [...]
- **Negativas/Riesgos:** [...]
- **Mitigaciones:** [...]

## Notas Técnicas
- [Detalles de implementación, dependencias, configuración.]
```

### Ejemplo de ADR
**ID**: `ADR-001`
**Título**: Uso de Supabase como Backend-as-a-Service
**Estado**: Aceptado
**Decisión**: Se adopta Supabase (Auth + PostgreSQL + Storage + Edge Functions) por su base relacional nativa y soporte de Row Level Security para la privacidad dual del producto.

> El registro completo de ADRs vive en `docs/decisions/` con su índice en `docs/decisions/README.md`.

## 6. Test-Driven Development (TDD) y Estrategia de Testing

En MODO YO adoptamos **Test-Driven Development (TDD)** como práctica obligatoria: **antes de escribir el código de una funcionalidad, deben existir sus tests**, derivados directamente de la historia de usuario y sus Criterios de Aceptación. Los Criterios de Aceptación de cada `US-XXX` son la fuente de verdad para definir los casos de prueba.

### 6.1 Principio Fundamental
> **Ninguna historia de usuario se considera "En progreso" hasta que sus tests estén escritos, y no se considera "Completada" hasta que todos sus tests pasen (verde).**

Cada Criterio de Aceptación de una historia de usuario **debe** tener al menos un test automatizado que lo verifique. La trazabilidad es bidireccional: del criterio al test y del test al criterio.

### 6.2 Ciclo Red-Green-Refactor
Para cada historia de usuario se sigue el ciclo TDD clásico:

1.  **🔴 Red** — Escribir un test que describa el comportamiento esperado (derivado de un Criterio de Aceptación). El test **debe fallar** inicialmente porque el código aún no existe.
2.  **🟢 Green** — Escribir el código mínimo necesario para que el test pase.
3.  **🔵 Refactor** — Mejorar el código manteniendo todos los tests en verde.

### 6.3 Pirámide de Testing
La cobertura se organiza en tres niveles, priorizando la base de la pirámide:

| Nivel | Alcance | Herramienta | Ejemplos en MODO YO |
|-------|---------|-------------|---------------------|
| **Unit** (base) | Lógica pura y aislada | Jest + ts-jest | Cálculo de XP y niveles, lógica de rachas, cálculo del Mapa de Poder (EFEF), reducers de Zustand |
| **Integration** (medio) | Interacción entre módulos | Jest + React Native Testing Library + Supabase local | Stores + persistencia AsyncStorage, cliente Supabase + políticas RLS, sincronización offline |
| **Component / E2E** (cima) | Flujos de usuario completos | React Native Testing Library / Maestro / Detox | Onboarding completo, completar ejercicio y ganar XP, marcar meta lograda |

**Regla de proporción:** ~70% unit, ~20% integración, ~10% E2E.

### 6.4 Convenciones de Testing
-   **Ubicación:** Tests unitarios y de componente junto al código en `__tests__/` o con sufijo `*.test.ts(x)`. Tests E2E en `e2e/`.
-   **Nomenclatura:** El nombre del test referencia la historia y el criterio. Ejemplo:
    ```ts
    // US-003 · Criterio 2: al completar un ejercicio se asigna el XP correspondiente
    describe('US-003 · Entrenamiento y XP', () => {
      it('asigna 50 XP al completar el ejercicio del día', () => { /* ... */ });
      it('sube de nivel cuando el XP alcanza el umbral', () => { /* ... */ });
    });
    ```
-   **Trazabilidad:** Cada bloque `describe` empieza con el ID de la historia (`US-XXX`). Cada `it` corresponde a un Criterio de Aceptación.
-   **Datos de prueba:** Usar factories/fixtures deterministas; nunca depender de datos reales de producción.

### 6.5 Cobertura y Gates de Calidad
-   **Umbral mínimo de cobertura:** 80% en `statements`, `branches`, `functions` y `lines` para la lógica de negocio (`src/services`, `src/store`, `src/utils`).
-   **Gate de CI:** El pipeline de CI/CD (GitHub Actions) ejecuta `npm test` y bloquea el merge si algún test falla o la cobertura cae por debajo del umbral.
-   **Definición de "Hecho" (DoD):** Una historia está *Completada* solo si: (1) todos sus tests pasan, (2) se cumple el umbral de cobertura, y (3) el estado se actualiza en `docs/user-stories/`.

### 6.6 Creación de Tests Basados en Historias de Usuario
Este es el **entregable de testing obligatorio del proyecto**: existe una suite de tests que cubre **todas** las historias de usuario del MVP (`US-001` a `US-013`). El mapeo historia → tests se documenta y mantiene en **`docs/testing/`**:

-   `docs/testing/README.md` — Estrategia de testing y guía TDD.
-   `docs/testing/test-matrix.md` — Matriz de trazabilidad: cada `US-XXX` → sus Criterios de Aceptación → casos de prueba (con ID `T-XXX`) → nivel (unit/integración/E2E) → estado.

**Flujo para cada historia de usuario:**
1.  Leer la ficha `US-XXX.md` y sus Criterios de Aceptación.
2.  Registrar los casos de prueba correspondientes en `docs/testing/test-matrix.md`.
3.  Escribir los tests (🔴 Red) antes del código de la funcionalidad.
4.  Implementar hasta que pasen (🟢 Green) y refactorizar (🔵).
5.  Actualizar el estado en la matriz y en la ficha de la historia.

### 6.7 Estructura de Testing (Project Structure)
```
MODOYO/
├── docs/testing/
│   ├── README.md              ← Estrategia y guía TDD
│   └── test-matrix.md         ← Trazabilidad US → tests
├── src/
│   ├── **/__tests__/*.test.ts ← Unit / integración / componente
│   └── ...
├── e2e/                        ← Flujos end-to-end
├── jest.config.js
└── jest.setup.ts
```

---

*This document is part of the MODO YO project context and should be updated as the SDLC process evolves.*
