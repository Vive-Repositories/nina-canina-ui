// src/atoms/ProgressBar/ProgressBar.tsx
import s from './ProgressBar.module.scss'

/**
 * Track height in px. Both values are measured from the prototype's own
 * linear-progress pattern (Nina Canina Admin.dc.html:244, "Servicios de la
 * semana" widget = 7px; :659, an employee's "Carga de hoy" = 8px) — 1px
 * apart, 1 use each, under the 3-use token threshold (see
 * docs/token-audit.md's rule), so neither is rounded into the other.
 */
export type ProgressBarHeight = 7 | 8

const HEIGHT_CLASS: Record<ProgressBarHeight, string> = { 7: 'height7', 8: 'height8' }

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0-100. Values outside that range are clamped. */
  value: number
  /** Defaults to 8 — also what the one real consumer today (product photo upload) already ships. */
  height?: ProgressBarHeight
  /** Accessible label for the operation this bar tracks (e.g. "Subiendo foto"). */
  label?: string
}

/**
 * Ported from `ProductImageUploadModal.module.scss`'s own `.progressTrack`/
 * `.progressFill` (nina-canina-admin) — 2 plain divs, no prototype markup
 * to measure for the upload flow itself (the prototype's "+ Nuevo
 * producto" is wired to nothing), but the track/fill *shape* (pill track,
 * pill fill, --nc-border-softer/--nc-pink) reuses the prototype's own
 * progress-bar visual language from `weekStats`/`e.loadLabel` (see
 * `ProgressBarHeight` above) rather than inventing a new look. Fill color
 * is fixed to `--nc-pink`, matching the only real consumer (upload
 * progress is always a brand-pink "in progress" signal here) — the
 * prototype's other 2 bar instances use a dynamic per-row color, but nothing
 * in this round's scope (task 4, "para la subida de imágenes") calls for
 * that, so it isn't added speculatively.
 */
export function ProgressBar({ value, height = 8, label, className, ...rest }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  const classes = [s.track, s[HEIGHT_CLASS[height]], className].filter(Boolean).join(' ')

  return (
    <div
      className={classes}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      {...rest}
    >
      <div className={s.fill} style={{ width: `${clamped}%` }} />
    </div>
  )
}
