-- =============================================================================
-- MODO YO · Migración 0002 · Row Level Security (RLS)
-- Implementa la "Privacidad Radical" del producto (ADR-002, US-004, US-005).
--
-- Modelo de acceso:
--   * El TUTOR se autentica con Supabase Auth (auth.uid() = tutors.id).
--   * El tutor gestiona (crea/edita) los perfiles de sus adolescentes vinculados.
--   * El CONTENIDO PRIVADO del adolescente (user_goals, executive_functions_scores)
--     NUNCA es accesible por el rol del tutor. Solo se accede mediante el rol de
--     servicio (service_role) desde el backend en la sesión del adolescente
--     (Alias + PIN), o vía la vista agregada facilitator_dashboard.
-- =============================================================================

-- Habilitar RLS en todas las tablas
alter table public.tutors                       enable row level security;
alter table public.users                        enable row level security;
alter table public.executive_functions_scores   enable row level security;
alter table public.exercises                     enable row level security;
alter table public.daily_logs                    enable row level security;
alter table public.user_goals                     enable row level security;

-- -----------------------------------------------------------------------------
-- tutors: cada tutor solo ve/edita su propia fila (US-006)
-- -----------------------------------------------------------------------------
drop policy if exists tutors_select_own on public.tutors;
create policy tutors_select_own on public.tutors
  for select using (auth.uid() = id);

drop policy if exists tutors_insert_own on public.tutors;
create policy tutors_insert_own on public.tutors
  for insert with check (auth.uid() = id);

drop policy if exists tutors_update_own on public.tutors;
create policy tutors_update_own on public.tutors
  for update using (auth.uid() = id);

-- -----------------------------------------------------------------------------
-- users: el tutor gestiona los perfiles adolescentes que le pertenecen
-- (US-001, US-013). Puede ver métricas de constancia (level/xp/streak) porque
-- son datos de esfuerzo, NO contenido privado.
-- -----------------------------------------------------------------------------
drop policy if exists users_tutor_select on public.users;
create policy users_tutor_select on public.users
  for select using (auth.uid() = tutor_id);

drop policy if exists users_tutor_insert on public.users;
create policy users_tutor_insert on public.users
  for insert with check (auth.uid() = tutor_id);

drop policy if exists users_tutor_update on public.users;
create policy users_tutor_update on public.users
  for update using (auth.uid() = tutor_id);

-- -----------------------------------------------------------------------------
-- exercises: catálogo público, solo lectura para usuarios autenticados
-- -----------------------------------------------------------------------------
drop policy if exists exercises_read_all on public.exercises;
create policy exercises_read_all on public.exercises
  for select using (auth.role() = 'authenticated');

-- -----------------------------------------------------------------------------
-- daily_logs: el tutor puede LEER los logs de sus adolescentes (agregados de
-- esfuerzo, US-005), pero la escritura ocurre en la sesión del adolescente.
-- -----------------------------------------------------------------------------
drop policy if exists daily_logs_tutor_select on public.daily_logs;
create policy daily_logs_tutor_select on public.daily_logs
  for select using (
    exists (
      select 1 from public.users u
      where u.id = daily_logs.user_id and u.tutor_id = auth.uid()
    )
  );

-- -----------------------------------------------------------------------------
-- executive_functions_scores: CONTENIDO PRIVADO (US-002).
-- Sin políticas para el rol del tutor => RLS bloquea todo acceso.
-- Solo accesible vía service_role (backend en sesión del adolescente).
-- -----------------------------------------------------------------------------
-- (intencionalmente SIN políticas para authenticated: acceso denegado por RLS)

-- -----------------------------------------------------------------------------
-- user_goals: CONTENIDO 100% PRIVADO (US-004).
-- El tutor NUNCA puede leer las metas. Sin políticas para authenticated.
-- Solo accesible vía service_role en la sesión del adolescente.
-- -----------------------------------------------------------------------------
-- (intencionalmente SIN políticas para authenticated: acceso denegado por RLS)

-- -----------------------------------------------------------------------------
-- Nota de seguridad:
--   La vista facilitator_dashboard corre con los privilegios del creador y solo
--   expone columnas de esfuerzo. Aun así, el tutor accede a ella filtrando por
--   su tutor_id. El contenido de user_goals y executive_functions_scores no está
--   incluido en la vista, garantizando la barrera de privacidad.
-- =============================================================================
