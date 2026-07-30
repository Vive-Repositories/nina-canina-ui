// src/atoms/Button/Button.tsx
import { Icon } from '../Icon/Icon'
import type { IconName } from '../Icon/icons'
import s from './Button.module.scss'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'whatsapp' | 'teal'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonSharedProps {
  variant?: ButtonVariant
  size?: ButtonSize
  iconLeft?: IconName
  iconRight?: IconName
  fullWidth?: boolean
}

export interface ButtonAsButtonProps extends ButtonSharedProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button'
}

// A link styled like a button must still behave like a link — new tab,
// copied URL, right-click "open in new tab", announced by screen readers as
// navigation rather than an action. `href` is required rather than optional:
// an `as="a"` button with no destination is a bug, not a valid state.
export interface ButtonAsAnchorProps extends ButtonSharedProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  as: 'a'
  href: string
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps

const ICON_SIZE: Record<ButtonSize, number> = { sm: 15, md: 17, lg: 19 }

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', iconLeft, iconRight, fullWidth, className, children, as, ...domProps } = props

  const classes = [s.button, s[variant], s[size], fullWidth && s.fullWidth, className]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} size={ICON_SIZE[size]} />}
      {children}
      {iconRight && <Icon name={iconRight} size={ICON_SIZE[size]} />}
    </>
  )

  if (as === 'a') {
    return (
      <a className={classes} {...(domProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    )
  }

  const { type = 'button', ...buttonDomProps } = domProps as React.ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type={type} className={classes} {...buttonDomProps}>
      {content}
    </button>
  )
}
