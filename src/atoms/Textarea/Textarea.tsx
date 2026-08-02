// src/atoms/Textarea/Textarea.tsx
import { forwardRef } from 'react'
import s from './Textarea.module.scss'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
  /** Variant for textareas on the navy booking card. Same pattern as Input/Select's own `onNavy`. */
  onNavy?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, onNavy, className, ...rest },
  ref,
) {
  const classes = [s.textarea, invalid && s.invalid, onNavy && s.onNavy, className]
    .filter(Boolean)
    .join(' ')

  return <textarea ref={ref} className={classes} aria-invalid={invalid || undefined} {...rest} />
})
