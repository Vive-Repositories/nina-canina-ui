// @vitest-environment node
// src/tokens/tokens.test.ts
import { compile } from 'sass'
import { fileURLToPath } from 'node:url'

const css = compile(fileURLToPath(new URL('./tokens.scss', import.meta.url))).css

// Values are taken verbatim from the prototype markup, never from the README table.
const EXPECTED = {
  '--nc-navy': '#1c2a49',
  '--nc-navy-deep': '#16223d',
  '--nc-navy-mid': '#24365f',
  '--nc-pink': '#e8468d',
  '--nc-pink-dark': '#c42c6e',
  '--nc-pink-bg': '#fdeaf3',
  '--nc-teal': '#11b6c7',
  '--nc-amber': '#f7a610',
  '--nc-green': '#199d3c',
  '--nc-violet': '#6d4ad6',
  '--nc-fg': '#152238',
  '--nc-fg-secondary': '#667085',
  '--nc-fg-muted': '#9aa4b5',
  '--nc-border': '#e6eaf2',
  '--nc-bg': '#f7f8fb',
}

it.each(Object.entries(EXPECTED))('defines %s as %s', (name, value) => {
  expect(css).toMatch(new RegExp(`${name}:\\s*${value}`, 'i'))
})

it('uses the web card shadow from the markup (.08), not the README table (.10)', () => {
  expect(css).toMatch(/--nc-shadow-card:\s*0 12px 32px rgba\(28, ?42, ?73, ?\.08\)/)
})

it('keeps the admin card shadow separate from the web one', () => {
  expect(css).toMatch(/--nc-shadow-card-admin:\s*0 10px 28px rgba\(28, ?42, ?73, ?\.07\)/)
})

it('preserves the half-pixel type scale from the prototype', () => {
  expect(css).toMatch(/--nc-text-sm:\s*13\.5px/)   // 104 usages, most common size
  expect(css).toMatch(/--nc-text-base:\s*14\.5px/) // 47
  expect(css).toMatch(/--nc-text-md:\s*15\.5px/)   // 13
})

it('declares font families as overridable custom properties', () => {
  // apps inject the real families via next/font; the package must not load them
  expect(css).toMatch(/--nc-font-display:.*Baloo 2/)
  expect(css).toMatch(/--nc-font-body:.*Nunito Sans/)
})

it('defines the pill radius', () => {
  expect(css).toMatch(/--nc-radius-pill:\s*999px/)
})

it('tokenizes font sizes with 3+ uses instead of folding them into a nearby size', () => {
  // 3+ uses is a token, full stop — no consolidating into a close neighbor
  // for looking "imperceptible." See docs/token-audit.md.
  expect(css).toMatch(/--nc-text-dense:\s*14px/) // 61 usages
  expect(css).toMatch(/--nc-text-cta:\s*15px/)   // 46
})
