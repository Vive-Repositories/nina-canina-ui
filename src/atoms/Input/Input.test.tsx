// src/atoms/Input/Input.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { Input } from './Input'

it('accepts typed text', async () => {
  render(<Input aria-label="Nombre" />)
  await userEvent.type(screen.getByLabelText('Nombre'), 'Nina')
  expect(screen.getByLabelText('Nombre')).toHaveValue('Nina')
})

it('marks itself invalid for assistive tech', () => {
  render(<Input aria-label="Correo" invalid />)
  expect(screen.getByLabelText('Correo')).toHaveAttribute('aria-invalid', 'true')
})

it('is not aria-invalid by default', () => {
  render(<Input aria-label="Correo" />)
  expect(screen.getByLabelText('Correo')).not.toHaveAttribute('aria-invalid')
})

it('forwards the ref so forms can focus it', () => {
  const ref = createRef<HTMLInputElement>()
  render(<Input aria-label="Tel" ref={ref} />)
  expect(ref.current).toBeInstanceOf(HTMLInputElement)
})
