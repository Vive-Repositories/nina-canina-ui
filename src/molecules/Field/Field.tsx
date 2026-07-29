// src/molecules/Field/Field.tsx
import { Children, cloneElement, isValidElement } from 'react'
import s from './Field.module.scss'

export interface FieldProps {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  children: React.ReactNode
}

export function Field({ label, htmlFor, error, hint, children }: FieldProps) {
  const messageId = error ? `${htmlFor}-error` : hint ? `${htmlFor}-hint` : undefined

  // Wire aria-describedby onto the control so callers cannot forget it.
  const control = Children.map(children, (child) =>
    isValidElement<{ 'aria-describedby'?: string }>(child) && messageId
      ? cloneElement(child, { 'aria-describedby': messageId })
      : child,
  )

  return (
    <div className={s.field}>
      <label className={s.label} htmlFor={htmlFor}>{label}</label>
      {control}
      {error ? (
        <span id={messageId} role="alert" className={s.error}>{error}</span>
      ) : hint ? (
        <span id={messageId} className={s.hint}>{hint}</span>
      ) : null}
    </div>
  )
}
