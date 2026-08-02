# Supabase — MODO YO

Backend del proyecto (ADR-001): **Auth + PostgreSQL + Storage + Edge Functions**. Esta carpeta contiene el esquema, las políticas de seguridad (RLS) y los datos semilla, versionados como código.

## Estructura
```
supabase/
├── config.toml                      ← Configuración del proyecto (Supabase CLI)
├── migrations/
│   ├── 0001_initial_schema.sql      ← Tablas, índices, vista del facilitador (Blueprint §8)
│   └── 0002_rls_policies.sql        ← Row Level Security (Privacidad Radical, ADR-002)
└── seed.sql                          ← Catálogo de 15 ejercicios (US-003)
```

## Modelo de datos (Blueprint §8)
| Tabla | Descripción | Privacidad |
|-------|-------------|------------|
| `tutors` | Facilitador, 1:1 con `auth.users` (US-006) | Propia |
| `users` | Perfil adolescente, N por tutor (US-001, US-013) | Métricas de esfuerzo visibles al tutor |
| `executive_functions_scores` | Mapa de Poder / EFEF (US-002) | 🔒 Privado (nunca al tutor) |
| `exercises` | Catálogo de ejercicios (US-003) | Público (lectura) |
| `daily_logs` | Actividad completada (US-003, US-009) | Agregado al tutor |
| `user_goals` | Muro de Victorias (US-004) | 🔒 100% privado |
| `facilitator_dashboard` (vista) | Métricas de constancia (US-005) | Solo esfuerzo agregado |

La barrera de privacidad se implementa con RLS: las tablas de contenido privado (`user_goals`, `executive_functions_scores`) **no tienen políticas para el rol `authenticated`**, por lo que el tutor no puede leerlas. El dashboard del facilitador consume la vista `facilitator_dashboard`, que excluye ese contenido.

## Opción A — Supabase CLI (recomendada para desarrollo y self-hosting simple)
Requiere Docker.
```bash
# 1. Instalar la CLI (si no está)
npm install -g supabase        # o: brew install supabase/tap/supabase

# 2. Arrancar el stack local (Postgres, Auth, Studio, API)
supabase start

# 3. Aplicar migraciones + seed
supabase db reset              # aplica migrations/ y ejecuta seed.sql

# URLs por defecto (ver config.toml):
#   API:    http://127.0.0.1:54321
#   Studio: http://127.0.0.1:54323
#   DB:     postgresql://postgres:postgres@127.0.0.1:54322/postgres
```
Al finalizar, `supabase status` muestra el `anon key` y `service_role key` para conectar la app.

## Opción B — Self-hosted con Docker Compose (producción persistente)
Para un despliegue permanente (p. ej. en el SuperComputer) se usa el stack oficial self-hosted:
```bash
git clone --depth 1 https://github.com/supabase/supabase
cd supabase/docker
cp .env.example .env           # editar POSTGRES_PASSWORD, JWT_SECRET, ANON_KEY, SERVICE_ROLE_KEY
docker compose up -d

# Aplicar el esquema de MODO YO contra la base levantada:
psql "$DATABASE_URL" -f /ruta/a/MODOYO/supabase/migrations/0001_initial_schema.sql
psql "$DATABASE_URL" -f /ruta/a/MODOYO/supabase/migrations/0002_rls_policies.sql
psql "$DATABASE_URL" -f /ruta/a/MODOYO/supabase/seed.sql
```
Ver `DEPLOYMENT.md` (raíz del repo) para el flujo completo de despliegue persistente.

## Conectar la app
Copia las claves generadas a un archivo `.env` en la raíz (ver `.env.example`):
```
EXPO_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=<anon key>
```
El cliente está en `src/config/supabase.ts`.
