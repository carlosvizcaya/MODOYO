-- =============================================================================
-- MODO YO · Migración 0001 · Esquema Inicial
-- Basado en Blueprint §8 (Data Schema) y ADR-001 (Supabase como BaaS)
-- Convención: snake_case, UUID como PK, timestamptz en UTC.
-- =============================================================================

-- Extensiones requeridas
create extension if not exists "pgcrypto";      -- gen_random_uuid(), crypt()

-- -----------------------------------------------------------------------------
-- Tabla: tutors (Facilitador / Padre)
-- El id referencia a auth.users (Supabase Auth, Email/Password) — US-006.
-- -----------------------------------------------------------------------------
create table if not exists public.tutors (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null unique,
  created_at  timestamptz not null default now()
);

comment on table public.tutors is 'Perfil del facilitador. Vinculado 1:1 con auth.users (US-006).';

-- -----------------------------------------------------------------------------
-- Tabla: users (Perfil del Adolescente) — US-001, US-007, US-013
-- Relación 1 tutor -> N adolescentes (tutor_id).
-- El PIN se guarda hasheado (pin_hash), nunca en texto plano (US-007).
-- -----------------------------------------------------------------------------
create table if not exists public.users (
  id            uuid primary key default gen_random_uuid(),
  tutor_id      uuid not null references public.tutors (id) on delete cascade,
  alias         text not null,
  avatar_state  text not null default 'avatar-1',
  level         integer not null default 1 check (level >= 1),
  xp            integer not null default 0 check (xp >= 0),
  streak_count  integer not null default 0 check (streak_count >= 0),
  pin_hash      text,                          -- bcrypt hash del PIN de 4 dígitos
  notif_enabled boolean not null default true, -- US-011
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_users_tutor_id on public.users (tutor_id);
comment on table public.users is 'Perfil del adolescente. Contenido privado protegido por RLS (privacidad radical).';

-- -----------------------------------------------------------------------------
-- Tabla: executive_functions_scores (Mapa de Poder) — US-002
-- Puntajes 0..100 de las 5 Funciones Ejecutivas.
-- -----------------------------------------------------------------------------
create table if not exists public.executive_functions_scores (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.users (id) on delete cascade,
  fc_inhibit  integer not null check (fc_inhibit between 0 and 100),  -- Control inhibitorio
  fc_auto     integer not null check (fc_auto between 0 and 100),     -- Autorregulación
  fc_workmem  integer not null check (fc_workmem between 0 and 100),  -- Memoria de trabajo
  fc_flex     integer not null check (fc_flex between 0 and 100),     -- Flexibilidad cognitiva
  fc_plan     integer not null check (fc_plan between 0 and 100),     -- Planificación
  created_at  timestamptz not null default now()
);

create index if not exists idx_efscores_user_id on public.executive_functions_scores (user_id);
comment on table public.executive_functions_scores is 'Resultado EFEF (Mapa de Poder). CONTENIDO PRIVADO: nunca visible para el tutor (US-002, US-005).';

-- -----------------------------------------------------------------------------
-- Tabla: exercises (Catálogo de ejercicios) — US-003
-- 15 ejercicios interactivos en el MVP (3 por cada FE).
-- -----------------------------------------------------------------------------
create table if not exists public.exercises (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  description      text not null,
  function_type    text not null check (function_type in ('inhibit','auto','workmem','flex','plan')),
  xp_reward        integer not null default 30 check (xp_reward > 0),
  duration_minutes integer not null default 3 check (duration_minutes > 0),
  is_interactive   boolean not null default true,
  illustration_url text,
  created_at       timestamptz not null default now()
);

comment on table public.exercises is 'Catálogo público de ejercicios de entrenamiento de FE (US-003).';

-- -----------------------------------------------------------------------------
-- Tabla: daily_logs (Registro de actividad) — US-003, US-009, US-012
-- -----------------------------------------------------------------------------
create table if not exists public.daily_logs (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.users (id) on delete cascade,
  exercise_id  uuid not null references public.exercises (id) on delete restrict,
  completed    boolean not null default false,
  xp_earned    integer not null default 0 check (xp_earned >= 0),
  created_at   timestamptz not null default now()
);

create index if not exists idx_daily_logs_user_id on public.daily_logs (user_id);
create index if not exists idx_daily_logs_created on public.daily_logs (user_id, created_at);
comment on table public.daily_logs is 'Historial de ejercicios completados. Fuente de métricas agregadas del facilitador (US-005).';

-- -----------------------------------------------------------------------------
-- Tabla: user_goals (Muro de Victorias) — US-004
-- 100% PRIVADA: el contenido nunca se expone al facilitador.
-- -----------------------------------------------------------------------------
create table if not exists public.user_goals (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.users (id) on delete cascade,
  title        text not null,
  status       text not null default 'pending' check (status in ('pending','achieved')),
  created_at   timestamptz not null default now(),
  achieved_at  timestamptz
);

create index if not exists idx_user_goals_user_id on public.user_goals (user_id);
comment on table public.user_goals is 'Metas personales del adolescente. CONTENIDO 100% PRIVADO (US-004): nunca visible para el tutor.';

-- -----------------------------------------------------------------------------
-- Trigger: mantener updated_at en users
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_users_updated_at on public.users;
create trigger trg_users_updated_at
  before update on public.users
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- Vista: facilitator_dashboard (US-005) — SOLO métricas de constancia.
-- Barrera de privacidad: expone esfuerzo/constancia, NUNCA contenido privado
-- (metas, respuestas, detalle EFEF).
-- -----------------------------------------------------------------------------
create or replace view public.facilitator_dashboard as
select
  u.id                as user_id,
  u.tutor_id,
  u.alias,
  u.level,
  u.xp,
  u.streak_count,
  count(dl.id) filter (where dl.completed) as exercises_completed
from public.users u
left join public.daily_logs dl on dl.user_id = u.id
group by u.id, u.tutor_id, u.alias, u.level, u.xp, u.streak_count;

comment on view public.facilitator_dashboard is 'US-005: métricas agregadas de esfuerzo. Excluye deliberadamente user_goals y executive_functions_scores.';
