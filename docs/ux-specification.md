# UX/UI Specification — MODO YO

**Versión:** 1.0  
**Fecha:** 2026-08-02  
**Relacionado:** Blueprint §10, §11 | ADR-008 (NativeWind)

---

## 1. Principios de Diseño

### Identidad Visual
- **Look & Feel:** "Videojuego de productividad" — energético, moderno, gamificado
- **Paleta:** Oscuro-dinámico con acentos vibrantes (morado/cyan para XP, verde para victorias)
- **Tipografía:** Alta legibilidad, amigable para adolescentes (sans-serif moderna)
- **Tono:** Empoderador, lúdico, **nunca clínico ni de "tarea escolar"**

### Valores de UX
- **Privacidad Radical:** El adolescente controla su espacio; sin exposición al tutor
- **Cero Fricción:** Acceso rápido (Alias + PIN), flujos <5 min
- **Refuerzo Intrínseco:** Progreso visual (avatar, XP), sin comparaciones externas
- **Respeto:** Notificaciones opcionales, tono motivador (nunca punitivo)

---

## 2. Arquitectura de Navegación

### Barra Inferior (Tab Navigation)
Visible en el espacio del adolescente tras onboarding:

| Icono | Pantalla | Función |
|-------|----------|---------|
| 🏠 Home | Dashboard Principal | Ejercicio del día, XP, Racha |
| 📚 Biblioteca | Catálogo de Ejercicios | 50 ejercicios (15 interactivos MVP) |
| 🎯 Metas | Muro de Victorias | Mis metas (crear, marcar logradas) |
| 👤 Perfil | Avatar + Configuración | Mapa de Poder, alias, PIN, notificaciones |

---

## 3. Flujos de Usuario

### 3.1. Flujo de Onboarding — Tutor

```
[Landing Screen]
    ↓
[Registro: Email + Password]
    ↓
[Vinculación: Crear perfil adolescente]
    ↓ (entrega dispositivo al adolescente)
[Dashboard del Facilitador]
```

**Pantallas:**
1. **Landing:** CTA principal "Comenzar" + beneficios breves
2. **Registro Tutor:** Email, contraseña (≥8 chars), validación
3. **Vinculación:** "Ahora crea el espacio de [nombre del adolescente]" → introduce alias del adolescente
4. **Entrega:** Instrucción de entregar el dispositivo

---

### 3.2. Flujo de Onboarding — Adolescente

```
[Bienvenida]
    ↓
[Test EFEF: Diagnóstico de Funciones Ejecutivas]
    ↓
[Mapa de Poder: Resultados visuales]
    ↓
[Creación de Avatar: Alias + Avatar visual]
    ↓
[Configuración de PIN (4 dígitos)]
    ↓
[Tutorial Rápido: 3 pasos interactivos]
    ↓
[Dashboard Principal]
```

**Pantallas:**
1. **Bienvenida:** "Este es TU espacio" — tono empoderador, sin mención de "terapia"
2. **Test EFEF:** 5-7 preguntas lúdicas, <5 min, progreso visible
3. **Mapa de Poder:** Visualización tipo radar de las 5 FE con lenguaje de "talentos"
4. **Avatar:** Selector de avatar base (6-8 opciones ilustradas) + campo de alias
5. **PIN:** Teclado numérico, 4 dígitos, confirmación
6. **Tutorial:** Tooltips interactivos (Ejercicio del día → Cómo ganar XP → Cómo crear metas)

---

### 3.3. Flujo Principal — Adolescente

```
[Login: Alias + PIN]
    ↓
[Dashboard: Home]
    ├─→ [Ejercicio del Día] → [Completar] → [Animación XP] → [Dashboard actualizado]
    ├─→ [Biblioteca] → [Seleccionar ejercicio] → [Completar]
    ├─→ [Metas] → [Crear meta] | [Marcar lograda] → [Celebración]
    └─→ [Perfil] → [Ver Mapa de Poder] | [Editar alias/avatar] | [Configuración]
```

---

### 3.4. Flujo del Facilitador (Padre)

```
[Login: Email + Password]
    ↓
[Dashboard del Facilitador]
    ├─ Ver racha diaria
    ├─ Ver nivel/XP (agregado)
    ├─ Ver constancia (últimos 7 días)
    └─ SIN acceso a metas privadas ni respuestas
```

---

## 4. Especificación de Pantallas

### 4.1. Dashboard Principal (Home — Adolescente)

**Layout:**
```
┌─────────────────────────────────────┐
│  [Avatar]  Hola, [Alias]        🔔 │ ← Header
│  Nivel [X] │ [Barra XP] │ 🔥 [Racha]│
├─────────────────────────────────────┤
│                                     │
│   ╔═══════════════════════════════╗│
│   ║  EJERCICIO DEL DÍA           ║│ ← Hero Card
│   ║  [Ilustración]               ║│
│   ║  "Control de Impulsos"       ║│
│   ║  +50 XP  │  ⏱ 3 min          ║│
│   ║  [COMENZAR]                  ║│
│   ╚═══════════════════════════════╝│
│                                     │
│  📊 Tu Progreso Esta Semana         │
│  [Mini-gráfico de racha]            │
│                                     │
└─────────────────────────────────────┘
│ 🏠 Home │ 📚 Biblioteca │ 🎯 Metas │ 👤│ ← Tab Bar
```

**Componentes:**
- **Header:** Avatar circular (mini), saludo personalizado, icono notificaciones
- **Barra de Progreso:** Nivel actual, XP visual (barra de progreso), icono de racha con contador
- **Hero Card:** El ejercicio del día es la acción principal, diseño de "misión"
- **Progreso Semanal:** Mini-visualización de constancia

---

### 4.2. Biblioteca de Ejercicios

**Layout:**
```
┌─────────────────────────────────────┐
│  Biblioteca de Ejercicios      [🔍] │
│                                     │
│  Filtros: [Todos] [Control] [Memoria]│
│                                     │
│  ┌─────────────┐  ┌─────────────┐  │
│  │ Ejercicio 1 │  │ Ejercicio 2 │  │
│  │ [Icono FE]  │  │ [Icono FE]  │  │
│  │ +30 XP      │  │ +40 XP      │  │
│  │ ⏱ 2 min     │  │ ⏱ 4 min     │  │
│  └─────────────┘  └─────────────┘  │
│  [Grid de tarjetas...]              │
│                                     │
└─────────────────────────────────────┘
│ 🏠 │ 📚 Biblioteca │ 🎯 │ 👤        │
```

**Componentes:**
- **Buscador:** Opcional (fase post-MVP si catálogo crece)
- **Filtros:** Por función ejecutiva (Control, Memoria, Flexibilidad, etc.)
- **Tarjetas de Ejercicio:** Ilustración, nombre, XP, duración estimada, función ejecutiva
- **Estado:** Indica si ya se completó hoy (checkmark)

---

### 4.3. Muro de Victorias (Metas)

**Layout:**
```
┌─────────────────────────────────────┐
│  Mis Metas                    [+ ]  │
│                                     │
│  🎯 Activas                         │
│  ┌───────────────────────────────┐ │
│  │ ☐ Llegar a la hora toda la   │ │
│  │    semana                     │ │
│  │    [Marcar lograda]           │ │
│  └───────────────────────────────┘ │
│                                     │
│  ✅ Logradas                        │
│  ┌───────────────────────────────┐ │
│  │ ✅ Completar 5 días seguidos  │ │
│  │    [hace 3 días]              │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
│ 🏠 │ 📚 │ 🎯 Metas │ 👤            │
```

**Componentes:**
- **Botón [+]:** Crear nueva meta (modal con campo de texto libre)
- **Metas Activas:** Checkbox interactivo, botón de marcar lograda
- **Metas Logradas:** Con timestamp, celebración visual (confetti al marcar)
- **Privacidad:** NUNCA visibles para el tutor

---

### 4.4. Perfil

**Layout:**
```
┌─────────────────────────────────────┐
│         [Avatar Grande]             │
│            [Alias]                  │
│       Nivel [X]  │  🔥 [Racha]      │
│                                     │
│  ═══════════════════════════════    │
│  📊 Tu Mapa de Poder                │
│  [Radar Chart: 5 FE]                │
│  ═══════════════════════════════    │
│                                     │
│  ⚙️ Configuración                   │
│  → Editar Alias                     │
│  → Cambiar Avatar                   │
│  → Cambiar PIN                      │
│  → Notificaciones [Toggle]          │
│                                     │
└─────────────────────────────────────┘
│ 🏠 │ 📚 │ 🎯 │ 👤 Perfil            │
```

**Componentes:**
- **Header de Perfil:** Avatar grande, alias, nivel, racha
- **Mapa de Poder:** Gráfico radar interactivo (tap para tooltip con descripción de cada FE)
- **Configuración:** Edición de datos personales, preferencias de notificaciones

---

### 4.5. Pantalla de Ejercicio Interactivo

**Layout:**
```
┌─────────────────────────────────────┐
│  [← Volver]        [Progreso: 2/5]  │
│                                     │
│  ╔═══════════════════════════════╗ │
│  ║  [Ilustración del ejercicio]  ║ │
│  ╚═══════════════════════════════╝ │
│                                     │
│  Instrucción clara y breve:         │
│  "Arrastra la imagen al lugar       │
│   correcto antes del timer"         │
│                                     │
│  [Área interactiva]                 │
│  [Elemento arrastrable]             │
│                                     │
│  ⏱ 00:45                            │
│                                     │
│            [SIGUIENTE]               │
└─────────────────────────────────────┘
```

**Componentes:**
- **Header:** Botón volver, indicador de progreso (paso X de Y)
- **Área de Ejercicio:** Varía según el tipo (drag-and-drop, tap, secuencia, etc.)
- **Timer:** Opcional según ejercicio, tono de desafío (no estrés)
- **Botón de Acción:** Siguiente, Validar, Completar

---

### 4.6. Animación de Éxito (Post-Ejercicio)

**Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│        [Animación Lottie]           │
│          🎉 ¡GENIAL! 🎉             │
│                                     │
│       +50 XP ganados                │
│                                     │
│  [Barra de XP animada llenándose]  │
│                                     │
│     🔥 ¡Racha de 7 días!            │
│                                     │
│          [CONTINUAR]                 │
│                                     │
└─────────────────────────────────────┘
```

**Componentes:**
- **Animación:** LottieFiles con celebración (confetti, estrellas)
- **Feedback Positivo:** Mensaje empoderador, nunca evaluativo
- **Progreso Visual:** Barra de XP llenándose, mención de racha si aplica
- **CTA:** Botón para volver al dashboard

---

### 4.7. Dashboard del Facilitador (Padre)

**Layout:**
```
┌─────────────────────────────────────┐
│  Dashboard de [Alias del adolescente]│
│                                     │
│  🔥 Racha actual: 12 días           │
│  📊 Nivel: 5  │  XP: 850            │
│                                     │
│  Últimos 7 días:                    │
│  [Gráfico de barras de constancia] │
│  Lun Mar Mié Jue Vie Sáb Dom        │
│   ✅  ✅  ✅  ❌  ✅  ✅  ✅         │
│                                     │
│  Ejercicios completados: 23         │
│                                     │
│  ────────────────────────────────   │
│  🔒 El contenido de las metas y     │
│     respuestas es privado           │
│  ────────────────────────────────   │
│                                     │
└─────────────────────────────────────┘
```

**Componentes:**
- **Métricas de Constancia:** Racha, nivel, XP, actividad semanal
- **Gráfico de Actividad:** Calendario simple, check/cruz por día
- **Mensaje de Privacidad:** Refuerza que no hay acceso a contenido privado
- **Tono:** "Arquitecto del contexto", no vigilante

---

## 5. Sistema de Componentes (Design System)

### Componentes Reutilizables (NativeWind)

#### Botones
```
[Primario] → Fondo sólido vibrante (cyan/morado), texto blanco, bordes redondeados
[Secundario] → Outline, texto del color primario
[Terciario] → Solo texto, sin fondo
```

#### Cards
```
[Hero Card] → Elevación alta, gradiente sutil, sombra profunda
[Standard Card] → Fondo oscuro, borde sutil, padding generoso
[Mini Card] → Compacta, para grids
```

#### Inputs
```
[Text Input] → Fondo semi-transparente, borde inferior, placeholder amigable
[PIN Input] → 4 círculos, cada dígito en un círculo
```

#### Feedback
```
[Success] → Verde brillante + animación
[Progress Bar] → Gradiente animado de XP
[Racha Badge] → Icono de fuego + contador
```

---

## 6. Estados y Animaciones

### Micro-interacciones
- **Tap en botón:** Escala 0.95 + haptic feedback ligero
- **Completar ejercicio:** Confetti + sonido de éxito (opcional/desactivable)
- **Subir de nivel:** Avatar cambia de pose + badge de "¡Nivel [X]!"
- **Racha alcanzada:** Animación de llama creciendo

### Transiciones
- **Entre pantallas:** Slide horizontal (tab navigation), fade (modales)
- **Carga de ejercicio:** Skeleton screens, no spinners genéricos

---

## 7. Accesibilidad

- **Contraste:** WCAG AA mínimo (texto blanco en fondos oscuros)
- **Tamaños táctiles:** Mínimo 44x44 puntos para botones principales
- **Feedback visual:** Todos los estados interactivos tienen feedback claro
- **Textos alternativos:** Para iconos e ilustraciones (screen readers)

---

## 8. Responsive & Orientación

- **Orientación:** Vertical (portrait) por defecto; bloquear landscape en ejercicios si es crítico
- **Tamaños de pantalla:** Optimizar para iPhone SE (small) hasta iPhone Pro Max / tablets pequeños
- **Tipografía:** Escalado relativo (rem/em en NativeWind)

---

## 9. Assets Necesarios

### Ilustraciones
- Avatar base (6-8 opciones ilustradas, género-neutro)
- Evoluciones de avatar (3 niveles: básico, medio, avanzado)
- Iconos de Funciones Ejecutivas (5 iconos únicos)
- Ilustraciones de ejercicios (15 para MVP)

### Animaciones (Lottie)
- Celebración de éxito
- Confetti para metas logradas
- Subida de nivel

### Iconografía
- Tab bar (Home, Biblioteca, Metas, Perfil)
- Acciones (añadir, editar, notificaciones, configuración)

---

## 10. Decisiones de UX vinculadas a ADRs

- **ADR-002 (Privacidad):** Dashboard del facilitador NO muestra contenido de metas
- **ADR-003 (Auth):** Login rápido con PIN de 4 dígitos para adolescente
- **ADR-007 (Gamificación):** XP visible, avatar evolutivo, rachas prominentes
- **ADR-008 (NativeWind):** Todos los componentes usan utilidades de Tailwind

---

**Próximos pasos:**
1. Generar wireframes de alta fidelidad
2. Validar flujos con usuario (Santi)
3. Crear prototipo interactivo (Figma/prototipo en Expo)
