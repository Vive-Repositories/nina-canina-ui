// src/atoms/Icon/Icon.tsx
import type React from 'react'
import { ICONS, type IconName } from './icons'

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  size?: number
  /** 2 on the public site, 1.7 in the admin panel — required by the handoff. */
  strokeWidth?: number
  /** Provide only when the icon carries meaning on its own. */
  title?: string
}

export function Icon({ name, size = 20, strokeWidth = 2, title, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
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
