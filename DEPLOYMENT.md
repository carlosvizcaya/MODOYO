# Despliegue — MODO YO

Guía de despliegue **persistente** del MVP: la demo web y el backend Supabase. Pensada para un entorno siempre encendido (p. ej. el **SuperComputer** o cualquier VPS con Docker).

> **Nota sobre este entorno de trabajo:** el computador temporal del agente se apaga por inactividad y no mantiene servicios vivos. Para una URL permanente y una base de datos que persista, el despliegue debe hacerse en una máquina persistente (SuperComputer / VPS).

## Arquitectura del despliegue
```
┌─────────────────────┐        ┌──────────────────────────┐
│  modoyo-web (nginx) │  HTTPS │  Supabase (self-hosted)   │
│  Expo Web export    │ <────> │  Auth · PostgreSQL · API  │
│  puerto 8080        │        │  Studio · Storage         │
└─────────────────────┘        └──────────────────────────┘
```

## 1. Backend — Supabase (self-hosted)
Ver detalle en [`supabase/README.md`](./supabase/README.md).

```bash
# Stack oficial self-hosted
git clone --depth 1 https://github.com/supabase/supabase
cd supabase/docker
cp .env.example .env      # editar POSTGRES_PASSWORD, JWT_SECRET, ANON_KEY, SERVICE_ROLE_KEY, SITE_URL
docker compose up -d

# Aplicar esquema + políticas + seed de MODO YO
export DB_URL="postgresql://postgres:<PASSWORD>@localhost:5432/postgres"
psql "$DB_URL" -f <ruta>/MODOYO/supabase/migrations/0001_initial_schema.sql
psql "$DB_URL" -f <ruta>/MODOYO/supabase/migrations/0002_rls_policies.sql
psql "$DB_URL" -f <ruta>/MODOYO/supabase/seed.sql
```
Anota el `ANON_KEY` y la URL pública de la API (p. ej. `https://api.tudominio.com`).

Alternativa rápida para desarrollo: **Supabase CLI** (`supabase start` + `supabase db reset`).

## 2. Frontend — Demo web persistente
Con Docker Compose (recomendado):
```bash
cd <ruta>/MODOYO

# Credenciales públicas de Supabase (se inyectan en build-time)
export EXPO_PUBLIC_SUPABASE_URL="https://api.tudominio.com"
export EXPO_PUBLIC_SUPABASE_ANON_KEY="<anon key>"

docker compose up -d --build
# La demo queda servida en http://<host>:8080
```

Sin Docker (build estático + cualquier servidor):
```bash
npm ci
EXPO_PUBLIC_SUPABASE_URL=... EXPO_PUBLIC_SUPABASE_ANON_KEY=... \
  npx expo export --platform web --output-dir dist
# Servir la carpeta dist/ con nginx, caddy, o `npx serve dist`
```

## 3. HTTPS y dominio
Para producción, colocar un reverse proxy (Caddy o nginx) con TLS delante de:
- `web` (8080) → `https://app.tudominio.com`
- Supabase API → `https://api.tudominio.com`

Ejemplo con Caddy (`Caddyfile`):
```
app.tudominio.com { reverse_proxy localhost:8080 }
api.tudominio.com { reverse_proxy localhost:8000 }   # Kong de Supabase
```

## 4. Variables de entorno
Copiar `.env.example` a `.env` y completar (ver también `supabase/README.md`):
```
EXPO_PUBLIC_SUPABASE_URL=https://api.tudominio.com
EXPO_PUBLIC_SUPABASE_ANON_KEY=<anon key>
```
El `service_role key` **nunca** se expone en el cliente; solo se usa en el backend.

## 5. CI/CD (siguiente paso)
GitHub Actions ejecutará en cada push (ver Blueprint §16 y SDLC §6):
1. `npm ci`
2. `npm test -- --coverage` (gate: tests verdes + cobertura ≥ 80%)
3. `docker build` y push de la imagen
4. Deploy al host persistente

## Estado actual
- ✅ Build web estático verificado (`npx expo export --platform web`, bundle ~692KB).
- ✅ Dockerfile + nginx + docker-compose listos.
- ✅ Migraciones Supabase (esquema + RLS + seed) validadas sintácticamente.
- ⏳ Ejecución en máquina persistente (SuperComputer): pendiente de la sesión de despliegue.
