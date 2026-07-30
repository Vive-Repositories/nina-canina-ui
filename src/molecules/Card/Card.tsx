// src/molecules/Card/Card.tsx
import s from './Card.module.scss'

export type CardRadius = 'md' | 'lg' | 'xl' | '2xl'
export type CardElevation = 'site' | 'admin' | 'bordered' | 'none' | 'strong'
export type CardPadding = 22 | 24 | 26 | 28

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  radius?: CardRadius
  elevation?: CardElevation
  /**
   * Covers the uniform padding scale measured from the prototype (22/24/26/28
   * on all sides). Sections that need a non-uniform padding (e.g. the home's
   * service cards, `24px 22px`) are a one-off layout concern for that
   * section, not a design-system variant — override via `className`/`style`
   * instead of adding a new prop shape here. Multiplying props for every
   * padding combination that shows up is how a component stops being
   * manageable.
   */
  padding?: CardPadding
  /** Cards for services and testimonials are semantic content, not decorative wrappers. */
  as?: 'div' | 'article' | 'section'
}

// CSS class selectors cannot start with a digit (stylelint's
// selector-class-pattern enforces this), so radii and paddings map to
// letter-led class names instead of being indexed directly by prop value.
const RADIUS_CLASS: Record<CardRadius, string> = {
  md: 'radiusMd',
  lg: 'radiusLg',
  xl: 'radiusXl',
  '2xl': 'radius2xl',
}

const PADDING_CLASS: Record<CardPadding, string> = {
  22: 'padding22',
  24: 'padding24',
  26: 'padding26',
  28: 'padding28',
}

export function Card({
  radius = 'xl',
  elevation = 'site',
  padding = 26,
  as: Component = 'div',
  className,
  children,
  ...rest
}: CardProps) {
  const classes = [s.card, s[RADIUS_CLASS[radius]], s[elevation], s[PADDING_CLASS[padding]], className]
    .filter(Boolean)
    .join(' ')

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  )
}
