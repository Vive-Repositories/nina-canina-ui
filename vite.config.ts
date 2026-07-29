import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  // exclude keeps test declarations out of the published package.
  // rollupTypes is deliberately absent: it is a no-op on unplugin-dts + the TS7
  // shim, and a config option that silently does nothing is worse than none.
  plugins: [react(), dts({ include: ['src'], exclude: ['**/*.test.*'] })],
  css: {
    modules: { generateScopedName: 'nc-[local]-[hash:base64:5]' },
  },
  build: {
    cssCodeSplit: false,
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: () => 'nina-ui.js' },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: { assetFileNames: 'nina-ui.[ext]' },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
})
