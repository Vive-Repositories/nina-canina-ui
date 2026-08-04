// src/atoms/StatusChip/StatusChip.tsx
import s from './StatusChip.module.scss'

export type StatusChipTone = 'amber' | 'teal' | 'violet' | 'green' | 'pink' | 'neutral'

export interface StatusChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone: StatusChipTone
}

/**
 * Status pill — ported from the admin's own `StateChip.tsx`
 * (nina-canina-admin), which measured it from the prototype's own `chip()`
 * helper (Nina Canina Admin.dc.html:1048-1057). Generalized from
 * `AppointmentState` to a plain `tone` prop: `chip()` isn't citas-specific
 * in the prototype — the same function's color map also drives Pedidos
 * (Nuevo/Preparando/En camino) and Hotel (En curso/Entró hoy/Confirmada/
 * Anticipo pendiente) state pills, all resolving to the same 6 colors.
 *
 * NOT a `Badge` variant, despite the visual overlap — measured and
 * confirmed distinct, not assumed:
 * - `Badge`'s `soft` variant is calibrated to a different prototype pattern
 *   (marketing pills like "Hotel para perritos", Nina Canina.dc.html:273:
 *   font-size 12px / --nc-text-caption, padding 6px 13px). `chip()` is
 *   11.5px / --nc-text-eyebrow, padding 6px 12px — 0.5px and 1px off,
 *   respectively, a real distinct measured pattern, not drift (same
 *   "don't round because it's close" rule token-audit.md applies to font
 *   sizes elsewhere in this package).
 * - `Badge` has no neutral/gray tone (`chip()`'s "No asistió" fallback:
 *   bg #F2F4F8/text #667085 — --nc-border-softer/--nc-fg-secondary here).
 * - `Badge`'s `pink`+`soft` text is `--nc-pink`; `chip()`'s pink states
 *   ("Cancelada"/"Nuevo") use the darker `--nc-pink-dark`.
 * Reusing `Badge` here would mean either changing its already-shipped
 * `soft` sizing (regressing every public-site consumer of it — Aseo,
 * Header, Footer, Hotel, HotelStore, Promos, Testimonials, Tienda,
 * Ubicacion, Contacto all use it today) or bolting a second size/text
 * dimension onto a component whose whole API is `tone` + `variant`. A
 * small, separate atom is the smaller, lower-risk change.
 */
export function StatusChip({ tone, className, children, ...rest }: StatusChipProps) {
  const classes = [s.chip, s[tone], className].filter(Boolean).join(' ')

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  )
}
