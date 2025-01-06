module.exports = {
  preset: "jest-preset-angular",
  testEnvironment: "jsdom",
  globalSetup: "jest-preset-angular/global-setup",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  moduleDirectories: ["node_modules"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/+(*.)+(spec).+(ts)"],
  transform: {
    "^.+\\.(ts|mjs|js|html)$": "jest-preset-angular",
    "^.+\\.js$": "babel-jest",
  },
  collectCoverage: true,
  coverageReporters: ["html"],
  coverageDirectory: "coverage",
  prettierPath: null,
};
