// @vitest-environment node
// src/styles/base.test.ts
import { compile } from 'sass'
import { fileURLToPath } from 'node:url'

const css = compile(fileURLToPath(new URL('./index.scss', import.meta.url))).css

it('bundles the tokens into the stylesheet entry point', () => {
  expect(css).toMatch(/--nc-pink:\s*#e8468d/i)
})

it('sets body typography from the tokens', () => {
  expect(css).toMatch(/font-family:\s*var\(--nc-font-body\)/)
  expect(css).toMatch(/color:\s*var\(--nc-fg\)/)
})

it('applies border-box sizing globally', () => {
  expect(css).toMatch(/box-sizing:\s*border-box/)
})
