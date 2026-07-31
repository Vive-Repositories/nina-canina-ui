// src/atoms/Icon/Icon.tsx
import type React from 'react'
import { ICON_VIEWBOX, ICONS, type IconName } from './icons'

const DEFAULT_VIEWBOX = '0 0 24 24'

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  /**
   * Width in pixels. Height is derived from the icon's own viewBox aspect
   * ratio, not set equal to `size` — for the 24×24 default that's the same
   * number either way, but a non-square icon (see `ICON_VIEWBOX` in
   * `icons.tsx`) would get stretched into a square box if height just
   * copied size.
   */
  size?: number
  /** 2 on the public site, 1.7 in the admin panel — required by the handoff. */
  strokeWidth?: number
  /** Provide only when the icon carries meaning on its own. */
  title?: string
}

export function Icon({ name, size = 20, strokeWidth = 2, title, ...rest }: IconProps) {
  const viewBox = ICON_VIEWBOX[name] ?? DEFAULT_VIEWBOX
  // Fallback to the square default's own dimensions if a viewBox string
  // were ever malformed — noUncheckedIndexedAccess flags these as possibly
  // undefined, not because they realistically are.
  const [, , vbWidth = 24, vbHeight = 24] = viewBox.split(' ').map(Number)
  // Round to avoid noisy floats in the DOM (e.g. size=20 on a 24x14 icon)
  // without losing meaningful precision.
  const height = Math.round(((size * vbHeight) / vbWidth) * 100) / 100

  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {title && <title>{title}</title>}
      {ICONS[name]}
    </svg>
  )
}
