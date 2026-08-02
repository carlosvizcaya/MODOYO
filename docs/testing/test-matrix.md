# Matriz de Trazabilidad de Tests — MODO YO

Mapa completo **Historia de Usuario → Criterio de Aceptación → Caso de Prueba (`T-XXX`) → Nivel → Estado**, según el enfoque TDD de [`docs/SDLC.md` §6](../SDLC.md).

**Leyenda de nivel:** `U` = Unit · `I` = Integración · `E` = End-to-End / Componente.
**Estado:** 🔴 Pendiente (test por escribir) · 🟡 Escrito (Red, falla) · 🟢 Verde (implementado y pasa).

> Al iniciar cada historia, escribir primero los tests marcados aquí (🔴 → 🟡), luego implementar hasta ponerlos en 🟢.

---

## US-001 — Perfil y Avatar Personalizado
| ID | Caso de prueba | Nivel | Estado |
|------|----------------|-------|--------|
| T-001 | Permite introducir un alias sin requerir nombre real | U | 🔴 |
| T-002 | Permite seleccionar un avatar base entre las opciones disponibles | U | 🔴 |
| T-003 | Alias y `avatar_state` se guardan/leen en la tabla `users` | I | 🔴 |
| T-004 | El perfil es editable desde la pestaña Perfil | E | 🔴 |
| T-005 | No se solicita ninguna información personal identificable | U | 🔴 |
| T-006 | Los cambios persisten en Zustand y sincronizan con Supabase | I | 🔴 |

## US-002 — Diagnóstico EFEF y Mapa de Poder
| ID | Caso de prueba | Nivel | Estado |
|------|----------------|-------|--------|
| T-007 | El diagnóstico evalúa las 5 Funciones Ejecutivas | U | 🔴 |
| T-008 | La evaluación se completa en menos de 5 minutos | E | 🔴 |
| T-009 | Los resultados se muestran como "Mapa de Poder" visual (radar) | E | 🔴 |
| T-010 | El lenguaje enfatiza talentos, nunca déficits | U | 🔴 |
| T-011 | Los puntajes se guardan en `executive_functions_scores` | I | 🔴 |
| T-012 | El mapa es re-consultable desde el perfil | E | 🔴 |
| T-013 | El cálculo de puntajes EFEF a partir de respuestas es correcto | U | 🔴 |

## US-003 — Entrenamiento Interactivo y XP
| ID | Caso de prueba | Nivel | Estado |
|------|----------------|-------|--------|
| T-014 | El dashboard muestra el "Ejercicio del día" como acción principal | E | 🔴 |
| T-015 | El ejercicio sugerido se selecciona según el perfil FE (`GET /exercises/daily`) | I | 🔴 |
| T-016 | Cada ejercicio se completa en menos de 5 minutos | E | 🔴 |
| T-017 | Al finalizar se registra en `daily_logs` (`POST /progress/complete`) | I | 🔴 |
| T-018 | Se asigna el XP correcto al completar un ejercicio | U | 🟢 |
| T-019 | El nivel sube automáticamente al alcanzar el umbral de XP | U | 🟢 |
| T-020 | Se muestra la animación de éxito (Lottie) al completar | E | 🔴 |
| T-021 | El MVP incluye 15 ejercicios interactivos (3 por FE) | U | 🔴 |

## US-004 — Muro de Victorias (Mis Metas)
| ID | Caso de prueba | Nivel | Estado |
|------|----------------|-------|--------|
| T-022 | Permite crear metas personales con título libre | U | 🔴 |
| T-023 | Cada meta tiene estado `pending` o `achieved` | U | 🔴 |
| T-024 | Permite marcar una meta como lograda y verla en el muro | E | 🔴 |
| T-025 | Las metas se guardan en `user_goals` | I | 🔴 |
| T-026 | Al lograr una meta se muestra refuerzo positivo visual | E | 🔴 |
| T-027 | Las metas NO son visibles para el facilitador (RLS) | I | 🔴 |

## US-005 — Dashboard del Facilitador
| ID | Caso de prueba | Nivel | Estado |
|------|----------------|-------|--------|
| T-028 | Muestra métricas de constancia (racha, ejercicios, nivel) | E | 🔴 |
| T-029 | NUNCA expone contenido privado (metas, respuestas, detalle EFEF) | I | 🔴 |
| T-030 | Los datos se muestran agregados (esfuerzo, no rendimiento clínico) | U | 🔴 |
| T-031 | El acceso requiere autenticación del tutor | I | 🔴 |
| T-032 | El tono refuerza rol de "arquitecto del contexto", no "vigilante" | E | 🔴 |

## US-006 — Registro y Autenticación del Tutor
| ID | Caso de prueba | Nivel | Estado |
|------|----------------|-------|--------|
| T-033 | El tutor puede registrarse con email y contraseña | I | 🔴 |
| T-034 | Se valida el formato del email | U | 🟢 |
| T-035 | La contraseña debe tener al menos 8 caracteres | U | 🟢 |
| T-036 | Se muestra mensaje de éxito al completar el registro | E | 🔴 |
| T-037 | La autenticación usa Supabase Auth | I | 🔴 |
| T-038 | Tras el registro puede iniciar el onboarding (US-013) | E | 🔴 |

## US-007 — Acceso Rápido del Adolescente (Alias + PIN)
| ID | Caso de prueba | Nivel | Estado |
|------|----------------|-------|--------|
| T-039 | El adolescente accede con Alias + PIN de 4 dígitos | I | 🔴 |
| T-040 | El PIN se configura durante el onboarding | E | 🔴 |
| T-041 | El PIN se almacena de forma segura (hash, nunca texto plano) | U | 🔴 |
| T-042 | El espacio del adolescente está separado del acceso del tutor | I | 🔴 |
| T-043 | Valida que el PIN tenga exactamente 4 dígitos | U | 🟢 |

## US-008 — Flujo de Onboarding y Creación de Avatar
| ID | Caso de prueba | Nivel | Estado |
|------|----------------|-------|--------|
| T-044 | El flujo sigue el orden Bienvenida → Test → Avatar → Tutorial → Dashboard | E | 🔴 |
| T-045 | El tutorial es breve y con tono lúdico | E | 🔴 |
| T-046 | Al terminar se llega al Dashboard con el "Ejercicio del día" visible | E | 🔴 |
| T-047 | El onboarding se completa en menos de 10 minutos sin fricción | E | 🔴 |
| T-048 | No se usa lenguaje clínico ni de "tarea escolar" | U | 🔴 |

## US-009 — Rachas Diarias (Streaks)
| ID | Caso de prueba | Nivel | Estado |
|------|----------------|-------|--------|
| T-049 | La racha aumenta al completar actividad en días consecutivos | U | 🟢 |
| T-050 | La racha se reinicia correctamente al saltarse un día | U | 🟢 |
| T-051 | La racha se muestra visible y motivadora en el dashboard | E | 🔴 |
| T-052 | Al romperse la racha el mensaje es motivador, no punitivo | U | 🟢 |
| T-053 | La racha alimenta la métrica de constancia del facilitador | I | 🔴 |

## US-010 — Evolución Visual del Avatar
| ID | Caso de prueba | Nivel | Estado |
|------|----------------|-------|--------|
| T-054 | El avatar cambia de pose/accesorios al subir de nivel | U | 🔴 |
| T-055 | El estado del avatar se guarda en `users.avatar_state` | I | 🔴 |
| T-056 | Los cambios de avatar se muestran con animación/celebración | E | 🔴 |
| T-057 | La evolución es coherente con la ganancia de XP | U | 🔴 |

## US-011 — Notificaciones Respetuosas y Configurables
| ID | Caso de prueba | Nivel | Estado |
|------|----------------|-------|--------|
| T-058 | Las notificaciones tienen frecuencia baja por defecto | U | 🔴 |
| T-059 | El tono es motivador, nunca culpabilizador | U | 🔴 |
| T-060 | El usuario puede configurar o desactivar las notificaciones | E | 🔴 |
| T-061 | Se implementan vía Expo Notifications | I | 🔴 |
| T-062 | No se envían notificaciones que revelen contenido privado | U | 🔴 |

## US-012 — Modo Offline y Sincronización
| ID | Caso de prueba | Nivel | Estado |
|------|----------------|-------|--------|
| T-063 | El progreso diario se guarda localmente (Zustand persisted) | I | 🔴 |
| T-064 | Al detectar conexión, los datos sincronizan con Supabase | I | 🔴 |
| T-065 | No se pierden registros de `daily_logs` ni XP sin conexión | I | 🔴 |
| T-066 | La sincronización resuelve conflictos de forma segura | U | 🔴 |
| T-067 | El tiempo de carga se mantiene < 2 segundos | E | 🔴 |

## US-013 — Vinculación del Perfil Adolescente al Tutor
| ID | Caso de prueba | Nivel | Estado |
|------|----------------|-------|--------|
| T-068 | Tras registrarse, el tutor puede crear el perfil adolescente | I | 🔴 |
| T-069 | El perfil adolescente queda vinculado a la cuenta del tutor (`tutor_id`) | I | 🔴 |
| T-070 | El tutor configura el acceso inicial (Alias + PIN) | E | 🔴 |
| T-071 | El tutor NO obtiene acceso al contenido privado tras la vinculación | I | 🔴 |
| T-072 | Se soporta la relación 1 tutor → 1+ perfiles adolescentes | I | 🔴 |

---

## Resumen de cobertura por historia
| Historia | Criterios | Casos de prueba | Rango de IDs | Estado |
|----------|-----------|-----------------|--------------|--------|
| US-001 | 6 | 6 | T-001–T-006 | 🔴 Pendiente |
| US-002 | 6 | 7 | T-007–T-013 | 🔴 Pendiente |
| US-003 | 7 | 8 | T-014–T-021 | 🟡 En progreso (2/8) |
| US-004 | 6 | 6 | T-022–T-027 | 🔴 Pendiente |
| US-005 | 5 | 5 | T-028–T-032 | 🔴 Pendiente |
| US-006 | 6 | 6 | T-033–T-038 | 🟡 En progreso (2/6) |
| US-007 | 5 | 5 | T-039–T-043 | 🟡 En progreso (1/5) |
| US-008 | 5 | 5 | T-044–T-048 | 🔴 Pendiente |
| US-009 | 5 | 5 | T-049–T-053 | 🟡 En progreso (3/5) |
| US-010 | 5 | 4 | T-054–T-057 | 🔴 Pendiente |
| US-011 | 5 | 5 | T-058–T-062 | 🔴 Pendiente |
| US-012 | 5 | 5 | T-063–T-067 | 🔴 Pendiente |
| US-013 | 5 | 5 | T-068–T-072 | 🔴 Pendiente |
| **Total** | **71** | **72** | **T-001–T-072** | **8/72 verde (11%)** |

> A medida que se implementen los tests, actualizar el estado (🔴 → 🟡 → 🟢) en cada tabla y en este resumen.
