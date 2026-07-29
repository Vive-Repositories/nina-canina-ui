// tools/extract-tokens.mjs
// Extracts design token candidates from the .dc.html prototypes by frequency.
// The prototype markup is the visual source of truth, not the README table.
import { readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

const PATTERNS = {
  colors: { re: /#[0-9A-Fa-f]{3}\b|#[0-9A-Fa-f]{6}\b/g, norm: expandHex },
  rgba: { re: /rgba?\([^)]*\)/g, norm: (m) => m.replace(/\s+/g, '') },
  radius: { re: /border-radius:\s*([0-9]+(?:\.[0-9]+)?px)/g },
  shadow: { re: /box-shadow:\s*([^;"'`]+)/g, norm: (m) => m.trim().replace(/\s+/g, ' ') },
  fontSize: { re: /font-size:\s*([0-9]+(?:\.[0-9]+)?px)/g },
  fontWeight: { re: /font-weight:\s*([0-9]{3})/g },
  letterSpacing: { re: /letter-spacing:\s*(-?[0-9.]+em)/g },
  gap: { re: /(?:^|[;\s"'])gap:\s*([0-9]+px)/g },
}

// #abc and #aabbcc are the same color; collapse them so counts are honest.
function expandHex(raw) {
  const v = raw.toLowerCase()
  return /^#[0-9a-f]{3}$/.test(v) ? '#' + [...v.slice(1)].map((c) => c + c).join('') : v
}

export function extractTokens(sources) {
  const out = {}
  for (const [group, { re, norm = (m) => m }] of Object.entries(PATTERNS)) {
    const totals = new Map()
    for (const { name, text } of sources) {
      for (const match of text.matchAll(new RegExp(re.source, re.flags))) {
        const value = norm(match[1] ?? match[0])
        if (!value) continue
        const entry = totals.get(value) ?? { value, count: 0, perFile: {} }
        entry.count += 1
        entry.perFile[name] = (entry.perFile[name] ?? 0) + 1
        totals.set(value, entry)
      }
    }
    // every source gets an explicit 0 so web/admin split is always readable
    for (const entry of totals.values()) {
      for (const { name } of sources) entry.perFile[name] ??= 0
    }
    out[group] = [...totals.values()].sort((a, b) => b.count - a.count)
  }
  return out
}

// pathToFileURL, not string interpolation: on Windows process.argv[1] is a
// backslash path (D:\...) while import.meta.url is file:///D:/... — they can
// never be string-equal, and the report block would silently never run.
// import.meta.main would be cleaner but does not exist before Node 24.
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const sources = process.argv.slice(2).map((f) => ({ name: f, text: readFileSync(f, 'utf8') }))
  const report = extractTokens(sources)
  for (const [group, rows] of Object.entries(report)) {
    console.log(`\n### ${group} — ${rows.length} distinct`)
    for (const r of rows) {
      const split = Object.entries(r.perFile).map(([n, c]) => `${n}:${c}`).join(' ')
      console.log(`  ${String(r.count).padStart(4)}  ${split}  ${r.value}`)
    }
  }
}
