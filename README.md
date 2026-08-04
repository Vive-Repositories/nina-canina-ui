# @nina/ui

Design system de Niña Canina. Consumido por `nina-canina-web` y `nina-canina-admin`.

## Instalación

```bash
npm i github:Vive-Repositories/nina-canina-ui#v0.1.0
```

El script `prepare` compila el paquete (`vite build`) al instalarlo. No hace
falta publicar en un registry: npm clona el repo, corre `prepare` y deja
`dist/` listo dentro de `node_modules/@nina/ui`.

### Por qué este repo es público

Los otros tres repos del proyecto son privados; este no, a propósito.

Siendo dependencia de las dos webs, cada `npm install` tendría que autenticarse
contra GitHub desde dentro del contenedor de build, que no hereda el acceso del
anfitrión. Eso exige un token en CI y en Coolify, con caducidad que gestionar.

Y no compraría nada: los tokens y el CSS de este paquete viajan en
`nina-ui.css` al navegador de cada visitante en cuanto el sitio sale a
producción. Aquí no hay datos del negocio ni credenciales — eso vive en los
repos privados.

## Uso

La importación del CSS es **obligatoria y explícita**, una sola vez en el layout raíz:

```tsx
import '@nina/ui/styles.css'
```

**Esto no es opcional y no pasa solo.** Vite en modo librería extrae todo el
CSS a `dist/nina-ui.css` y **no** lo referencia desde `dist/nina-ui.js` —
verificado directamente en el bundle generado, que no menciona el CSS en
ningún `import` ni `link`. Sin esa línea, `import { Button } from '@nina/ui'`
renderiza igual, pero sin ningún estilo aplicado: no hay excepción, no hay
warning en consola, el componente simplemente aparece desnudo. Es el error
más caro de este paquete porque falla en silencio.

```tsx
// app/layout.tsx
import '@nina/ui/styles.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
```

### Fuentes

El paquete **no carga fuentes**. Declara `--nc-font-display` y
`--nc-font-body` con un fallback de sistema, pero las apps son responsables
de inyectar las familias reales con `next/font` en el layout raíz:

```tsx
import { Baloo_2, Nunito_Sans } from 'next/font/google'

const display = Baloo_2({ subsets: ['latin'], weight: ['400', '600', '700', '800'] })
const body = Nunito_Sans({ subsets: ['latin'], weight: ['400', '600', '700', '800', '900'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      style={{
        '--nc-font-display': display.style.fontFamily,
        '--nc-font-body': body.style.fontFamily,
      } as React.CSSProperties}
    >
      <body>{children}</body>
    </html>
  )
}
```

Si no se inyectan, los componentes caen al fallback (`system-ui, sans-serif`)
declarado en los tokens — el layout no se rompe, pero la tipografía no
coincide con el prototipo.

## Tokens

Los tokens (`--nc-*`) se generan a partir del markup de los prototipos
`.dc.html`, nunca de la tabla del README del handoff — donde discrepan, gana
el markup.

Para regenerar el reporte de frecuencias tras una revisión de diseño:

```bash
node tools/extract-tokens.mjs \
  "<ruta>/Nina Canina.dc.html" \
  "<ruta>/Nina Canina Admin.dc.html"
```

Esto imprime, por grupo (`colors`, `rgba`, `radius`, `shadow`, `fontSize`,
`fontWeight`, `letterSpacing`, `gap`), cada valor distinto con su conteo total
y su desglose por archivo. Un valor con 3 o más usos se tokeniza; los que
quedan por debajo del umbral se auditan uno por uno.

Las decisiones sobre esos valores de baja frecuencia — tokenizar igual,
ajustar al token más cercano, o dejar documentada la excepción — están
registradas en [`docs/token-audit.md`](./docs/token-audit.md), junto con su
motivo. Ninguna consolidación de color pasa sin quedar anotada ahí.

## Componentes disponibles

`Button`, `Badge`, `Card`, `Field`, `Icon`, `Input`, `Modal`, `ProgressBar`,
`Select`, `StatusChip`, `Textarea`. El resto del inventario (Checkbox,
Toggle, Pill, Avatar, Price, StatCard, Tabs, Chip, SearchInput,
QuantityStepper, EmptyState, Drawer, DataTable, Stepper) llega en un plan
siguiente.

## Desarrollo

```bash
npm ci
npm test            # vitest
npm run typecheck    # tsc --noEmit
npm run lint:css     # stylelint sobre src/**/*.scss
npm run build         # vite build -> dist/
npm run sink          # kitchen-sink de desarrollo con todos los átomos
```
