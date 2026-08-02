import { addXp, getXpThreshold, BASE_XP_THRESHOLD } from '../xp';

// Trazabilidad: US-003 · Entrenamiento Interactivo y XP
describe('US-003 · Lógica de XP y niveles', () => {
  // T-018: Se asigna el XP correcto al completar un ejercicio
  it('T-018: suma XP sin subir de nivel cuando no alcanza el umbral', () => {
    const r = addXp(340, 5, 50);
    expect(r.xp).toBe(390);
    expect(r.level).toBe(5);
    expect(r.leveledUp).toBe(false);
  });

  // T-019: El nivel sube automáticamente al alcanzar el umbral de XP
  it('T-019: sube de nivel al alcanzar el umbral y arrastra el excedente', () => {
    const threshold = getXpThreshold(1); // 500
    const r = addXp(threshold - 10, 1, 30); // 490 + 30 = 520 >= 500
    expect(r.leveledUp).toBe(true);
    expect(r.level).toBe(2);
    expect(r.xp).toBe(20); // excedente arrastrado
  });

  it('T-019: soporta subir varios niveles de una sola ganancia grande', () => {
    const r = addXp(0, 1, 5000);
    expect(r.level).toBeGreaterThan(2);
    expect(r.leveledUp).toBe(true);
  });

  it('el umbral base es 500 y crece por nivel', () => {
    expect(getXpThreshold(1)).toBe(BASE_XP_THRESHOLD);
    expect(getXpThreshold(2)).toBeGreaterThan(getXpThreshold(1));
  });

  it('rechaza cantidades de XP negativas', () => {
    expect(() => addXp(0, 1, -5)).toThrow();
  });
});
