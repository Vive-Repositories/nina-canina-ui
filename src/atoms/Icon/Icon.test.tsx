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

it('renders a compound icon as more than one shape', () => {
  render(<Icon name="camera" data-testid="i" />)
  const svg = screen.getByTestId('i')
  // rect + circle + path
  expect(svg.children.length).toBeGreaterThan(1)
})

it('keeps its fill on a shape that needs to be filled', () => {
  render(<Icon name="whatsapp" data-testid="i" />)
  const path = screen.getByTestId('i').querySelector('path')
  expect(path).toHaveAttribute('fill', 'currentColor')
})

it('renders the gap-fill icons added for Header/Footer/Hero/HotelStore/Testimonials', () => {
  render(<Icon name="account" data-testid="i" />)
  const svg = screen.getByTestId('i')
  // circle (head) + path (shoulders)
  expect(svg.children.length).toBeGreaterThan(1)
})

it('keeps a brand glyph filled with currentColor, not a literal', () => {
  render(<Icon name="facebook" data-testid="i" />)
  const path = screen.getByTestId('i').querySelector('path')
  expect(path).toHaveAttribute('fill', 'currentColor')
})

it('uses the --nc-white token, not a literal, for check-circle\'s contrasting stroke', () => {
  render(<Icon name="check-circle" data-testid="i" />)
  const path = screen.getByTestId('i').querySelector('path')
  expect(path).toHaveAttribute('stroke', 'var(--nc-white)')
})
