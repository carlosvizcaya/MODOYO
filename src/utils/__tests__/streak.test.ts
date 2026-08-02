import { updateStreak, daysBetween, streakBrokenMessage } from '../streak';

// Trazabilidad: US-009 · Rachas Diarias (Streaks)
describe('US-009 · Lógica de rachas', () => {
  // T-049: La racha aumenta al completar actividad en días consecutivos
  it('T-049: aumenta la racha en un día consecutivo', () => {
    expect(updateStreak(12, '2026-08-01T10:00:00Z', '2026-08-02T09:00:00Z')).toBe(13);
  });

  it('T-049: empieza en 1 si no hay actividad previa', () => {
    expect(updateStreak(0, null, '2026-08-02T09:00:00Z')).toBe(1);
  });

  it('no cambia la racha si la actividad es el mismo día', () => {
    expect(updateStreak(12, '2026-08-02T08:00:00Z', '2026-08-02T20:00:00Z')).toBe(12);
  });

  // T-050: La racha se reinicia al saltarse un día
  it('T-050: reinicia la racha a 1 tras saltarse uno o más días', () => {
    expect(updateStreak(12, '2026-08-01T10:00:00Z', '2026-08-03T09:00:00Z')).toBe(1);
  });

  // T-052: Al romperse la racha el mensaje es motivador, no punitivo
  it('T-052: el mensaje de racha rota es motivador (no punitivo)', () => {
    const msg = streakBrokenMessage(12);
    expect(msg).toContain('12');
    expect(msg.toLowerCase()).not.toMatch(/perdiste|fallaste|mal/);
  });

  it('daysBetween calcula correctamente la diferencia en días', () => {
    expect(daysBetween('2026-08-01T23:00:00Z', '2026-08-02T01:00:00Z')).toBe(1);
  });
});
