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
      output: {
        assetFileNames: 'nina-ui.[ext]',
        // Rollup's single-bundle output doesn't preserve per-source-file
        // directives like `Modal.tsx`'s own `'use client'` (confirmed:
        // without this, `dist/nina-ui.js` has no trace of it at all) — a
        // Next.js Server Component importing this package directly, with
        // no client boundary in between, would fail to use Modal's hooks.
        // Every real consumer today already wraps its own usage in a
        // `'use client'` file (AppointmentDetailModal.tsx,
        // ProductImageUploadModal.tsx), so this isn't a correctness bug
        // for current usage — but the whole package is presentational/
        // interactive with no server-only code, so banner-stamping the
        // entire bundle is both correct and the standard fix (no new
        // dependency needed; a directive-preserving Rollup plugin would be
        // one more thing to justify for a single line).
        banner: "'use client'",
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
})
