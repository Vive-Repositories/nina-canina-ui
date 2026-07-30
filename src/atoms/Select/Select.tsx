// src/atoms/Select/Select.tsx
import { forwardRef } from 'react'
import s from './Select.module.scss'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean
  /** Variant for selects on the navy quick-booking card. */
  onNavy?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { invalid, onNavy, className, ...rest },
  ref,
) {
  const classes = [s.select, invalid && s.invalid, onNavy && s.onNavy, className]
    .filter(Boolean)
    .join(' ')

  return <select ref={ref} className={classes} aria-invalid={invalid || undefined} {...rest} />
})
