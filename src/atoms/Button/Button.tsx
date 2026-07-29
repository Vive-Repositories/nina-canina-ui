// src/atoms/Button/Button.tsx
import { Icon } from '../Icon/Icon'
import type { IconName } from '../Icon/paths'
import s from './Button.module.scss'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'whatsapp'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  iconLeft?: IconName
  iconRight?: IconName
  fullWidth?: boolean
}

const ICON_SIZE: Record<ButtonSize, number> = { sm: 15, md: 17, lg: 19 }

export function Button({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth,
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [s.button, s[variant], s[size], fullWidth && s.fullWidth, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} {...rest}>
      {iconLeft && <Icon name={iconLeft} size={ICON_SIZE[size]} />}
      {children}
      {iconRight && <Icon name={iconRight} size={ICON_SIZE[size]} />}
    </button>
  )
}
