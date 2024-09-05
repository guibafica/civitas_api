import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./src/tests/jest.setup.ts"],
  testMatch: ["**/tests/**/*.test.ts"],
};

export default config;
