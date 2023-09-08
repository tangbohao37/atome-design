import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    // setupFiles: './RTLVitest.setup.ts'
  },
});
