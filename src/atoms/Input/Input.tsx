// src/atoms/Input/Input.tsx
import { forwardRef } from 'react'
import s from './Input.module.scss'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
  /** Variant for inputs on the navy booking card. */
  onNavy?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid, onNavy, className, ...rest },
  ref,
) {
  const classes = [s.input, invalid && s.invalid, onNavy && s.onNavy, className]
    .filter(Boolean)
    .join(' ')

  return <input ref={ref} className={classes} aria-invalid={invalid || undefined} {...rest} />
})
