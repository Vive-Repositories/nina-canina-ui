// src/atoms/Select/Select.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { Select } from './Select'

const options = (
  <>
    <option value="">Selecciona</option>
    <option value="bano">Baño básico</option>
    <option value="corte">Baño y corte</option>
  </>
)

it('lets the user pick an option', async () => {
  render(<Select aria-label="Servicio">{options}</Select>)
  await userEvent.selectOptions(screen.getByLabelText('Servicio'), 'corte')
  expect(screen.getByLabelText('Servicio')).toHaveValue('corte')
})

it('marks itself invalid for assistive tech', () => {
  render(<Select aria-label="Servicio" invalid>{options}</Select>)
  expect(screen.getByLabelText('Servicio')).toHaveAttribute('aria-invalid', 'true')
})

it('is not aria-invalid by default', () => {
  render(<Select aria-label="Servicio">{options}</Select>)
  expect(screen.getByLabelText('Servicio')).not.toHaveAttribute('aria-invalid')
})

it('forwards the ref so forms can focus it', () => {
  const ref = createRef<HTMLSelectElement>()
  render(<Select aria-label="Servicio" ref={ref}>{options}</Select>)
  expect(ref.current).toBeInstanceOf(HTMLSelectElement)
})

it('respects disabled', () => {
  render(<Select aria-label="Servicio" disabled>{options}</Select>)
  expect(screen.getByLabelText('Servicio')).toBeDisabled()
})
