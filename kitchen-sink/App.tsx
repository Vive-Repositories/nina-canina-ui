import {
  Badge,
  Button,
  Card,
  Field,
  Icon,
  Input,
  Select,
  Textarea,
  type BadgeTone,
  type ButtonVariant,
  type CardElevation,
  type CardRadius,
  type IconName,
} from '../src'
import { ICONS } from '../src/atoms/Icon/icons'

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'whatsapp', 'teal']
// navy is excluded: it only exists as `solid` (see Badge.tsx), rendered
// separately in the "solid" section below alongside pink.
const BADGE_SOFT_TONES: Exclude<BadgeTone, 'navy'>[] = ['pink', 'teal', 'amber', 'green', 'violet']
const CARD_RADII: CardRadius[] = ['md', 'lg', 'xl', '2xl']
const CARD_ELEVATIONS: CardElevation[] = ['site', 'admin', 'strong', 'bordered', 'none']

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

      <Section title="Button — como enlace (as=&quot;a&quot;)">
        {/* Same look as a Button, but a real <a>: opens in a new tab, the URL
            can be copied, and screen readers announce it as navigation, not
            an action. Header/Footer's WhatsApp CTAs need exactly this. */}
        <Button as="a" href="https://wa.me/528340000000" target="_blank" rel="noopener noreferrer" variant="whatsapp" iconLeft="whatsapp">
          WhatsApp
        </Button>
        <Button as="a" href="/aseo" variant="secondary">
          Ver servicios
        </Button>
      </Section>

      <Section title="Icon — sitio (stroke 2) vs admin (stroke 1.7)">
        {(Object.keys(ICONS) as IconName[]).map((n) => (
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

      <Section title="Field y Textarea">
        <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 360 }}>
          <Field label="Mensaje" htmlFor="msg" hint="Cuéntanos qué necesitas">
            <Textarea id="msg" rows={5} placeholder="Hola, quisiera saber…" />
          </Field>
          <Field label="Mensaje" htmlFor="msg-invalid" error="Escribe un mensaje">
            <Textarea id="msg-invalid" invalid rows={3} />
          </Field>
          <Field label="Nota" htmlFor="msg-disabled">
            <Textarea id="msg-disabled" disabled rows={3} placeholder="Deshabilitado" />
          </Field>
        </div>
      </Section>

      <Section title="Textarea sobre navy">
        <div style={{ background: 'var(--nc-navy-deep)', padding: 24, borderRadius: 'var(--nc-radius-card-xl)', width: '100%' }}>
          <Textarea onNavy rows={4} placeholder="Escribe aquí…" />
        </div>
      </Section>

      <Section title="Blanco translúcido sobre navy — tokens nuevos (0c-ds-lote)">
        <div style={{ background: 'var(--nc-navy-deep)', padding: 24, borderRadius: 'var(--nc-radius-card-xl)', width: '100%', display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {[
            { name: '--nc-border-on-navy-soft', role: 'border' as const, note: '.1 · 8 usos' },
            { name: '--nc-surface-on-navy-strong', role: 'surface' as const, note: '.18 · 3 usos' },
            { name: '--nc-border-on-navy-strongest', role: 'border' as const, note: '.28 · 3 usos' },
          ].map((t) => (
            <div key={t.name} style={{ display: 'grid', gap: 8, justifyItems: 'center', width: 160 }}>
              <div
                style={{
                  width: 96,
                  height: 56,
                  borderRadius: 12,
                  background: t.role === 'surface' ? `var(${t.name})` : 'transparent',
                  border: t.role === 'border' ? `2px solid var(${t.name})` : '1px solid transparent',
                }}
              />
              <small style={{ color: 'var(--nc-on-navy)', fontSize: 'var(--nc-text-meta)', textAlign: 'center' }}>
                {t.name}<br />{t.note}
              </small>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Badge — soft, los cinco tonos con tenue">
        {BADGE_SOFT_TONES.map((tone) => (
          <Badge key={tone} tone={tone}>{tone}</Badge>
        ))}
      </Section>

      <Section title="Badge — solid (pink y navy, medidos del prototipo)">
        <Badge variant="solid" tone="pink">pink</Badge>
        <Badge variant="solid" tone="navy">navy</Badge>
      </Section>

      <Section title="Badge — count (burbuja de carrito: circular en 1 dígito, píldora en 2)">
        <Badge variant="count">3</Badge>
        <Badge variant="count">12</Badge>
      </Section>

      <Section title="Card — radios">
        {CARD_RADII.map((radius) => (
          <Card key={radius} radius={radius} elevation="bordered" style={{ width: 160, height: 90 }}>
            {radius}
          </Card>
        ))}
      </Section>

      <Section title="Card — elevaciones (sitio .08 vs admin .07 vs strong .10)">
        {CARD_ELEVATIONS.map((elevation) => (
          <Card key={elevation} elevation={elevation} style={{ width: 160, height: 90 }}>
            {elevation}
          </Card>
        ))}
      </Section>

      <Section title="Select — con Field, normal / inválido / deshabilitado">
        <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 360 }}>
          <Field label="Servicio" htmlFor="svc">
            <Select id="svc">
              <option value="">Selecciona un servicio</option>
              <option value="bano">Baño básico</option>
              <option value="corte">Baño y corte</option>
            </Select>
          </Field>
          <Field label="Servicio" htmlFor="svc-invalid" error="Elige un servicio">
            <Select id="svc-invalid" invalid>
              <option value="">Selecciona un servicio</option>
              <option value="bano">Baño básico</option>
            </Select>
          </Field>
          <Field label="Servicio" htmlFor="svc-disabled">
            <Select id="svc-disabled" disabled>
              <option value="">Selecciona un servicio</option>
            </Select>
          </Field>
        </div>
      </Section>

      <Section title="Select — onNavy">
        <div style={{ background: 'var(--nc-navy-deep)', padding: 24, borderRadius: 'var(--nc-radius-card-xl)', width: '100%' }}>
          <Select onNavy defaultValue="">
            <option value="" style={{ color: 'var(--nc-navy)' }}>Selecciona un servicio</option>
            <option value="aseo" style={{ color: 'var(--nc-navy)' }}>Aseo canino</option>
            <option value="hotel" style={{ color: 'var(--nc-navy)' }}>Hotel para perritos</option>
          </Select>
        </div>
      </Section>

      <Section title="Field — onNavy (tarjeta de reserva rápida del Hero)">
        <div style={{ background: 'var(--nc-navy-deep)', padding: 24, borderRadius: 'var(--nc-radius-card-xl)', width: '100%', display: 'grid', gap: 16 }}>
          <Field label="Servicio" htmlFor="hero-svc" onNavy>
            <Select id="hero-svc" onNavy defaultValue="">
              <option value="" style={{ color: 'var(--nc-navy)' }}>Selecciona un servicio</option>
              <option value="aseo" style={{ color: 'var(--nc-navy)' }}>Aseo canino</option>
            </Select>
          </Field>
          <Field label="Fecha" htmlFor="hero-date" onNavy>
            <Input id="hero-date" type="date" onNavy />
          </Field>
        </div>
      </Section>
    </main>
  )
}
