// src/atoms/Icon/Icon.test.tsx
import { render, screen } from '@testing-library/react'
import { Icon } from './Icon'

it('renders an svg with the requested size', () => {
  render(<Icon name="cart" size={24} data-testid="i" />)
  const svg = screen.getByTestId('i')
  expect(svg).toHaveAttribute('width', '24')
  expect(svg).toHaveAttribute('height', '24')
})

it('defaults to the site stroke width of 2', () => {
  render(<Icon name="cart" data-testid="i" />)
  expect(screen.getByTestId('i')).toHaveAttribute('stroke-width', '2')
})

it('accepts the admin stroke width of 1.7', () => {
  render(<Icon name="cart" strokeWidth={1.7} data-testid="i" />)
  expect(screen.getByTestId('i')).toHaveAttribute('stroke-width', '1.7')
})

it('inherits color so it can be recolored by the parent', () => {
  render(<Icon name="cart" data-testid="i" />)
  expect(screen.getByTestId('i')).toHaveAttribute('stroke', 'currentColor')
})

it('is hidden from assistive tech unless given a title', () => {
  render(<Icon name="cart" data-testid="i" />)
  expect(screen.getByTestId('i')).toHaveAttribute('aria-hidden', 'true')
})

it('is exposed to assistive tech when given a title', () => {
  render(<Icon name="cart" title="Carrito" data-testid="i" />)
  const svg = screen.getByTestId('i')
  expect(svg).toHaveAttribute('role', 'img')
  expect(svg).not.toHaveAttribute('aria-hidden')
  expect(svg.querySelector('title')).toHaveTextContent('Carrito')
})
