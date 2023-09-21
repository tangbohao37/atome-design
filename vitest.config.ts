import { defineConfig } from 'vitest/config'
// import react from '@vitejs/plugin-react-swc';
export default defineConfig({
  // plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['./components/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['html', 'json-summary'],
    },
    // setupFiles: './RTLVitest.setup.ts'
  },
})
