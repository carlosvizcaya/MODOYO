-- =============================================================================
-- MODO YO · Seed · Datos iniciales
-- Catálogo de 15 ejercicios interactivos del MVP (3 por cada Función Ejecutiva).
-- US-003: "El MVP incluye 15 ejercicios interactivos (3 por cada FE)."
-- Idempotente: usa títulos únicos con ON CONFLICT no aplicable => se limpia antes.
-- =============================================================================

truncate table public.exercises restart identity cascade;

insert into public.exercises (title, description, function_type, xp_reward, duration_minutes, is_interactive) values
  -- Control inhibitorio (inhibit)
  ('Semáforo Mental',    'Reacciona solo a la luz verde.',                    'inhibit', 30, 2, true),
  ('No Toques el Botón', 'Inhibe la respuesta automática.',                   'inhibit', 30, 2, true),
  ('Espera tu Turno',    'Contén el impulso hasta la señal correcta.',        'inhibit', 35, 3, true),
  -- Autorregulación (auto)
  ('Respira y Elige',    'Regula tu impulso antes de decidir.',               'auto',    35, 3, true),
  ('Termómetro de Calma','Baja la intensidad antes de reaccionar.',           'auto',    35, 3, true),
  ('Pausa de 10',        'Cuenta hasta diez y reevalúa la situación.',        'auto',    40, 4, true),
  -- Memoria de trabajo (workmem)
  ('Memoria Relámpago',  'Recuerda la secuencia de símbolos.',                'workmem', 40, 4, true),
  ('Cadena de Números',  'Mantén la secuencia en tu mente.',                  'workmem', 45, 4, true),
  ('Lista Fantasma',     'Recuerda los elementos que desaparecen.',           'workmem', 45, 4, true),
  -- Flexibilidad cognitiva (flex)
  ('Cambio de Regla',    'Adapta tu respuesta cuando cambian las reglas.',    'flex',    40, 3, true),
  ('Doble Tarea',        'Alterna entre dos objetivos.',                      'flex',    45, 4, true),
  ('Gira la Perspectiva','Encuentra otra forma de resolver el reto.',         'flex',    45, 4, true),
  -- Planificación (plan)
  ('Plan Maestro',       'Ordena los pasos para lograr la meta.',             'plan',    50, 5, true),
  ('Ruta Óptima',        'Planifica el camino más eficiente.',                'plan',    50, 5, true),
  ('Agenda del Héroe',   'Prioriza tus tareas antes de empezar.',             'plan',    50, 5, true);

-- =============================================================================
-- (Opcional) Datos demo — descomenta para poblar un tutor + adolescente de prueba.
-- Requiere que el usuario auth exista; en entorno local puedes crearlo con:
--   supabase auth signup / o el panel de Studio.
-- =============================================================================
-- insert into public.tutors (id, email) values ('<AUTH_USER_UUID>', 'demo@modoyo.app');
-- insert into public.users (tutor_id, alias, avatar_state, level, xp, streak_count)
--   values ('<AUTH_USER_UUID>', 'Santi', 'avatar-3', 5, 340, 12);
