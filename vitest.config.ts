import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    env: {
      BINANCE_API_KEY:
        "",
      BINANCE_SECRET:
        "",
    },
    globals: true,
    environment: "node",
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    coverage: {
      reporter: ["text", "json", "html"],
    },
    // 如果需要设置超时时间
    testTimeout: 10000,
  },
});
