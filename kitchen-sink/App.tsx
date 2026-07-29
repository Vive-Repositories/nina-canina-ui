import { Button, Field, Icon, Input, type ButtonVariant, type IconName } from '../src'
import { PATHS } from '../src/atoms/Icon/paths'

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'whatsapp']

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 'var(--nc-text-h3)', marginBottom: 16 }}>{title}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        {children}
      </div>
    </section>
  )
}

export function App() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: 40 }}>
      <h1 style={{ fontSize: 'var(--nc-text-h1)', marginBottom: 32 }}>Design system</h1>

      <Section title="Button — variantes">
        {VARIANTS.map((v) => <Button key={v} variant={v}>{v}</Button>)}
      </Section>

      <Section title="Button — tamaños">
        <Button size="sm">Pequeño</Button>
        <Button size="md">Mediano</Button>
        <Button size="lg">Grande</Button>
      </Section>

      <Section title="Button — con icono y deshabilitado">
        <Button iconLeft="cart">Agregar al carrito</Button>
        <Button variant="whatsapp" iconLeft="whatsapp">WhatsApp</Button>
        <Button iconRight="chevron-right">Continuar reserva</Button>
        <Button disabled>Deshabilitado</Button>
      </Section>

      <Section title="Icon — sitio (stroke 2) vs admin (stroke 1.7)">
        {(Object.keys(PATHS) as IconName[]).map((n) => (
          <span key={n} style={{ display: 'grid', gap: 6, justifyItems: 'center', width: 84 }}>
            <span style={{ display: 'flex', gap: 10 }}>
              <Icon name={n} size={22} />
              <Icon name={n} size={22} strokeWidth={1.7} />
            </span>
            <small style={{ color: 'var(--nc-fg-muted)', fontSize: 'var(--nc-text-meta)' }}>{n}</small>
          </span>
        ))}
      </Section>

      <Section title="Field e Input">
        <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 360 }}>
          <Field label="Nombre del perrito" htmlFor="pet" hint="Como le dices en casa">
            <Input id="pet" placeholder="Nina" />
          </Field>
          <Field label="Correo" htmlFor="mail" error="Correo inválido">
            <Input id="mail" invalid defaultValue="no-es-un-correo" />
          </Field>
          <Field label="Teléfono" htmlFor="tel">
            <Input id="tel" disabled placeholder="Deshabilitado" />
          </Field>
        </div>
      </Section>

      <Section title="Input sobre navy">
        <div style={{ background: 'var(--nc-navy-deep)', padding: 24, borderRadius: 'var(--nc-radius-card-xl)', width: '100%' }}>
          <Input onNavy placeholder="Servicio" />
        </div>
      </Section>
    </main>
  )
}
