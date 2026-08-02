// src/atoms/Textarea/Textarea.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { Textarea } from './Textarea'

it('accepts typed text', async () => {
  render(<Textarea aria-label="Mensaje" />)
  await userEvent.type(screen.getByLabelText('Mensaje'), 'Nina')
  expect(screen.getByLabelText('Mensaje')).toHaveValue('Nina')
})

it('marks itself invalid for assistive tech', () => {
  render(<Textarea aria-label="Mensaje" invalid />)
  expect(screen.getByLabelText('Mensaje')).toHaveAttribute('aria-invalid', 'true')
})

it('is not aria-invalid by default', () => {
  render(<Textarea aria-label="Mensaje" />)
  expect(screen.getByLabelText('Mensaje')).not.toHaveAttribute('aria-invalid')
})

it('forwards the ref so forms can focus it', () => {
  const ref = createRef<HTMLTextAreaElement>()
  render(<Textarea aria-label="Mensaje" ref={ref} />)
  expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
})
