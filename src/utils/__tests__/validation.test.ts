import { isValidEmail, isValidPassword, isValidPin } from '../validation';

// Trazabilidad: US-006 (tutor) y US-007 (adolescente)
describe('US-006 · Validación de registro del tutor', () => {
  // T-034: Se valida el formato del email
  it('T-034: acepta emails con formato válido', () => {
    expect(isValidEmail('carlos@modoyo.app')).toBe(true);
  });

  it('T-034: rechaza emails con formato inválido', () => {
    expect(isValidEmail('carlos@')).toBe(false);
    expect(isValidEmail('sin-arroba.com')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });

  // T-035: La contraseña debe tener al menos 8 caracteres
  it('T-035: exige contraseña de al menos 8 caracteres', () => {
    expect(isValidPassword('12345678')).toBe(true);
    expect(isValidPassword('corta')).toBe(false);
  });
});

describe('US-007 · Validación del PIN del adolescente', () => {
  // T-043: Valida que el PIN tenga exactamente 4 dígitos
  it('T-043: acepta un PIN de exactamente 4 dígitos', () => {
    expect(isValidPin('1234')).toBe(true);
  });

  it('T-043: rechaza PINs con longitud o caracteres inválidos', () => {
    expect(isValidPin('123')).toBe(false);
    expect(isValidPin('12345')).toBe(false);
    expect(isValidPin('12a4')).toBe(false);
  });
});
