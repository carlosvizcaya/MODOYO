/**
 * Validaciones de autenticación (US-006 tutor, US-007 adolescente)
 * Funciones puras para Unit Testing (TDD, SDLC §6).
 */

/** Valida el formato de un email (US-006). */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

/** La contraseña del tutor debe tener al menos 8 caracteres (US-006). */
export function isValidPassword(password: string): boolean {
  return typeof password === 'string' && password.length >= 8;
}

/** El PIN del adolescente debe ser exactamente 4 dígitos numéricos (US-007). */
export function isValidPin(pin: string): boolean {
  return /^\d{4}$/.test(pin);
}
