/**
 * Lógica de XP y niveles (US-003)
 * Funciones puras y deterministas para facilitar Unit Testing (TDD, SDLC §6).
 */

/** Umbral base de XP para pasar del nivel 1 al 2. */
export const BASE_XP_THRESHOLD = 500;

/** Factor de crecimiento del umbral por nivel. */
export const XP_GROWTH_FACTOR = 1.2;

/** Umbral de XP necesario para superar un nivel dado. */
export function getXpThreshold(level: number): number {
  if (level < 1) throw new Error('level debe ser >= 1');
  let threshold = BASE_XP_THRESHOLD;
  for (let i = 1; i < level; i++) {
    threshold = Math.round(threshold * XP_GROWTH_FACTOR);
  }
  return threshold;
}

export interface XpResult {
  xp: number;
  level: number;
  xpToNextLevel: number;
  leveledUp: boolean;
}

/**
 * Suma XP y calcula el nuevo nivel, arrastrando el excedente.
 * @param currentXp XP actual dentro del nivel.
 * @param currentLevel Nivel actual (>= 1).
 * @param amount XP ganada (>= 0).
 */
export function addXp(currentXp: number, currentLevel: number, amount: number): XpResult {
  if (amount < 0) throw new Error('amount no puede ser negativo');
  let xp = currentXp + amount;
  let level = currentLevel;
  let leveledUp = false;
  let threshold = getXpThreshold(level);

  while (xp >= threshold) {
    xp -= threshold;
    level += 1;
    leveledUp = true;
    threshold = getXpThreshold(level);
  }

  return { xp, level, xpToNextLevel: threshold, leveledUp };
}
