const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  verbose: true,
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  projects: [
    {
      displayName: "test"
    }
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src/"
  }),
  coverageDirectory: "coverage",
  coverageReporters: ["text", "html"],
  globalSetup: "./tests/setup.js",
  globalTeardown: "./tests/teardown.js",
  testEnvironment: "./tests/mongo-environment.js",
  watchPathIgnorePatterns: ["<rootDir>/node_modules/"]
  // resetModules: true,
};
