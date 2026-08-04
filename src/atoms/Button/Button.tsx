// src/atoms/Button/Button.tsx
import { Icon } from '../Icon/Icon'
import type { IconName } from '../Icon/icons'
import s from './Button.module.scss'

/**
 * `advance` is the admin's "move to the next state" pill (Citas/Pedidos
 * tables) — measured from the prototype's own `advanceBtn()` (Nina Canina
 * Admin.dc.html:1059-1071), not a reapplication of an existing variant:
 * none of the other 5 reproduce its dark-navy/white pill that turns a flat
 * light gray when the flow is closed. It also doesn't fit any existing
 * `size` exactly (closest is `sm`: same 9px vertical padding and 12.5px
 * font, but 13px horizontal padding vs `sm`'s 15px, and 10px radius vs
 * `sm`'s 11px) — a real, if small, distinct measurement, not force-fit
 * into `sm` per this package's own "don't round a measured value into a
 * neighbor" rule (see docs/token-audit.md's font-size section). See
 * Button.module.scss's `.advance` for why it carries its own box
 * regardless of the `size` passed.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'whatsapp' | 'teal' | 'advance'
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
