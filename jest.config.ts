export default {
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/styleMock.js',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testEnvironment: 'jsdom',
};
