# =============================================================================
# MODO YO · Dockerfile — Demo web (Expo Web export servido con nginx)
# Multi-stage: build del bundle estático + imagen final ligera con nginx.
# =============================================================================

# --- Stage 1: build ----------------------------------------------------------
FROM node:20-alpine AS build
WORKDIR /app

# Instala dependencias (usa el lockfile para builds reproducibles)
COPY package.json package-lock.json ./
RUN npm ci

# Copia el código y exporta la web estática a /app/dist
COPY . .
# Las variables públicas de Supabase se inyectan en build (Expo las requiere en build-time)
ARG EXPO_PUBLIC_SUPABASE_URL
ARG EXPO_PUBLIC_SUPABASE_ANON_KEY
ENV EXPO_PUBLIC_SUPABASE_URL=${EXPO_PUBLIC_SUPABASE_URL}
ENV EXPO_PUBLIC_SUPABASE_ANON_KEY=${EXPO_PUBLIC_SUPABASE_ANON_KEY}
RUN npx expo export --platform web --output-dir dist

# --- Stage 2: serve ----------------------------------------------------------
FROM nginx:1.27-alpine AS serve
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -q --spider http://localhost/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
