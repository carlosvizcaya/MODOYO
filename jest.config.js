/**
 * Configuración de Jest — MODO YO (TDD, SDLC §6)
 *
 * Preset ts-jest para la lógica de negocio pura (src/utils, src/store, src/services).
 * Los tests de componentes/RN (jest-expo) se añadirán en su propia configuración
 * a medida que se implementen las pantallas con RN Testing Library.
 */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(test).ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // Cobertura sobre la lógica de negocio ya implementada bajo TDD.
  // A medida que se implementen store/services con sus tests, se añaden aquí.
  collectCoverageFrom: ['src/utils/**/*.ts'],
  coverageThreshold: {
    global: { statements: 80, branches: 80, functions: 80, lines: 80 },
  },
};
