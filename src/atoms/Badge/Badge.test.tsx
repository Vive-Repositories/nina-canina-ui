// src/atoms/Badge/Badge.test.tsx
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

it('renders its content', () => {
  render(<Badge>Abierto ahora</Badge>)
  expect(screen.getByText('Abierto ahora')).toBeInTheDocument()
})

it('applies the tone class so colour comes from tokens, not inline styles', () => {
  const { container } = render(<Badge tone="teal">Hotel</Badge>)
  expect(container.firstElementChild?.className).toMatch(/teal/)
})

it('defaults to the soft variant', () => {
  const { container } = render(<Badge>x</Badge>)
  expect(container.firstElementChild?.className).toMatch(/soft/)
})

it('applies the solid variant when asked', () => {
  const { container } = render(<Badge variant="solid" tone="navy">x</Badge>)
  expect(container.firstElementChild?.className).toMatch(/solid/)
})

it('forwards extra props like aria-label', () => {
  render(<Badge aria-label="estado">Listo</Badge>)
  expect(screen.getByLabelText('estado')).toBeInTheDocument()
})

it('rejects navy in the soft variant at the type level', () => {
  // @ts-expect-error navy has no tinted background; it exists only as solid
  render(<Badge tone="navy">x</Badge>)
})

it('applies the count variant class for the cart bubble', () => {
  const { container } = render(<Badge variant="count">3</Badge>)
  expect(container.firstElementChild?.className).toMatch(/count/)
})

it('renders the numeric content of a count badge', () => {
  render(<Badge variant="count">12</Badge>)
  expect(screen.getByText('12')).toBeInTheDocument()
})
