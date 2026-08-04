// src/atoms/StatusChip/StatusChip.test.tsx
import { render, screen } from '@testing-library/react'
import { StatusChip, type StatusChipTone } from './StatusChip'

it('renders its content', () => {
  render(<StatusChip tone="amber">Pendiente</StatusChip>)
  expect(screen.getByText('Pendiente')).toBeInTheDocument()
})

it('applies the tone class so colour comes from tokens, not inline styles', () => {
  const { container } = render(<StatusChip tone="teal">En proceso</StatusChip>)
  expect(container.firstElementChild?.className).toMatch(/teal/)
})

const TONES: StatusChipTone[] = ['amber', 'teal', 'violet', 'green', 'pink', 'neutral']

it.each(TONES)('supports the %s tone measured from the prototype chip()', (tone) => {
  const { container } = render(<StatusChip tone={tone}>x</StatusChip>)
  expect(container.firstElementChild?.className).toMatch(new RegExp(tone))
})

it('forwards extra props like aria-label', () => {
  render(<StatusChip tone="green" aria-label="estado">Entregado</StatusChip>)
  expect(screen.getByLabelText('estado')).toBeInTheDocument()
})

it('keeps caller classes alongside its own', () => {
  const { container } = render(
    <StatusChip tone="pink" className="mine">
      Cancelada
    </StatusChip>,
  )
  expect(container.firstElementChild?.className).toMatch(/mine/)
})
