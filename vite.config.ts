/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { playwright } from '@vitest/browser-playwright'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    setupFiles: './src/test/setup.browser.ts',
    testTimeout: 2000, // Set test timeout to 2000 ms (2 seconds)
    browser: {
      provider: playwright(),
      enabled: true,
      headless: true,
      screenshotFailures: false,
      instances: [
        {
          browser: 'chromium',
        },
      ],
    },
  },
})
