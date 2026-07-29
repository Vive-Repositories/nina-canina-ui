// tools/extract-tokens.test.mjs
import { extractTokens } from './extract-tokens.mjs'

const sources = [
  { name: 'web', text: '<i style="color:#E8468D;border-radius:14px"></i><b style="color:#e8468d"></b>' },
  { name: 'admin', text: '<i style="color:#FFF;border-radius:999px"></i>' },
]

it('counts colors case-insensitively and per file', () => {
  const { colors } = extractTokens(sources)
  const pink = colors.find((c) => c.value === '#e8468d')
  expect(pink).toEqual({ value: '#e8468d', count: 2, perFile: { web: 2, admin: 0 } })
})

it('expands shorthand hex so #fff and #ffffff are one token', () => {
  const { colors } = extractTokens(sources)
  expect(colors.find((c) => c.value === '#ffffff').count).toBe(1)
})

it('sorts each group by descending frequency', () => {
  const { radius } = extractTokens(sources)
  expect(radius.map((r) => r.value)).toEqual(['14px', '999px'])
})
