// src/atoms/Badge/Badge.tsx
import s from './Badge.module.scss'

export type BadgeTone = 'pink' | 'teal' | 'amber' | 'green' | 'violet' | 'navy'
// 'count' is the small numeric bubble used for the cart counter (grid +
// place-items, not a text pill) — same brand-pill family, different shape.
export type BadgeVariant = 'soft' | 'solid' | 'count'

// navy exists only as `solid` in the prototype and has no tinted background
// token to fall back on. Expressing that in the type makes the invalid pair a
// compile error instead of a badge that renders almost invisible.
export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  (
    | { tone?: Exclude<BadgeTone, 'navy'>; variant?: BadgeVariant }
    | { tone: 'navy'; variant: 'solid' }
  )

export function Badge({ tone = 'pink', variant = 'soft', className, children, ...rest }: BadgeProps) {
  // The public type is a discriminated union so `navy` + `soft` cannot be
  // constructed by callers; internally it collapses back to the plain
  // `tone`/`variant` pair the class-composition logic below expects.
  const resolvedTone = tone as BadgeTone
  const resolvedVariant = variant as BadgeVariant
  const classes = [s.badge, s[resolvedTone], s[resolvedVariant], className].filter(Boolean).join(' ')

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  )
}
