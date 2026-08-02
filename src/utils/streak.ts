/**
 * Lógica de rachas diarias (US-009)
 * Funciones puras para Unit Testing (TDD, SDLC §6).
 */

/** Diferencia en días calendario (UTC) entre dos fechas ISO. */
export function daysBetween(fromIso: string, toIso: string): number {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const from = Date.UTC(
    new Date(fromIso).getUTCFullYear(),
    new Date(fromIso).getUTCMonth(),
    new Date(fromIso).getUTCDate()
  );
  const to = Date.UTC(
    new Date(toIso).getUTCFullYear(),
    new Date(toIso).getUTCMonth(),
    new Date(toIso).getUTCDate()
  );
  return Math.round((to - from) / MS_PER_DAY);
}

/**
 * Calcula la nueva racha al registrar actividad.
 * - Mismo día: la racha no cambia (ya contó hoy).
 * - Día consecutivo (+1): la racha aumenta.
 * - Salto de 2+ días: la racha se reinicia a 1.
 * - Sin actividad previa: la racha empieza en 1.
 *
 * @param currentStreak Racha actual.
 * @param lastActivityIso Fecha ISO de la última actividad (o null si nunca).
 * @param nowIso Fecha ISO del registro actual.
 */
export function updateStreak(
  currentStreak: number,
  lastActivityIso: string | null,
  nowIso: string
): number {
  if (!lastActivityIso) return 1;
  const diff = daysBetween(lastActivityIso, nowIso);
  if (diff <= 0) return currentStreak; // mismo día (o registro fuera de orden)
  if (diff === 1) return currentStreak + 1; // día consecutivo
  return 1; // se rompió la racha
}

/** Mensaje motivador (nunca punitivo) al romperse la racha (US-009). */
export function streakBrokenMessage(previousStreak: number): string {
  return `¡${previousStreak} días fue genial! Hoy empiezas una nueva racha 💪`;
}
