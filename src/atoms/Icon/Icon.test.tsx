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

it('renders the reusable single-use glyphs added for Aseo/Tienda/checkout', () => {
  render(<Icon name="lock" data-testid="i" />)
  const svg = screen.getByTestId('i')
  // rect (body) + path (shackle)
  expect(svg.children.length).toBeGreaterThan(1)
})

it('uses its own viewBox for a non-square icon instead of the 24x24 default', () => {
  render(<Icon name="arrow-right-long" size={24} data-testid="i" />)
  const svg = screen.getByTestId('i')
  expect(svg).toHaveAttribute('viewBox', '0 0 24 14')
  expect(svg.querySelector('path')).toHaveAttribute('d', 'M2 7h18m0 0l-5-5m5 5l-5 5')
})

it("derives height from the icon's own aspect ratio instead of forcing it square", () => {
  render(<Icon name="arrow-right-long" size={24} data-testid="i" />)
  const svg = screen.getByTestId('i')
  expect(svg).toHaveAttribute('width', '24')
  expect(svg).toHaveAttribute('height', '14') // 24 * (14/24), not 24
})

it("scales a non-square icon's height proportionally at other sizes, not just its viewBox size", () => {
  render(<Icon name="arrow-right-long" size={48} data-testid="i" />)
  const svg = screen.getByTestId('i')
  expect(svg).toHaveAttribute('width', '48')
  expect(svg).toHaveAttribute('height', '28') // 48 * (14/24)
})

it('keeps a square icon using size for both width and height, unaffected by ICON_VIEWBOX', () => {
  render(<Icon name="cart" size={20} data-testid="i" />)
  const svg = screen.getByTestId('i')
  expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
  expect(svg).toHaveAttribute('width', '20')
  expect(svg).toHaveAttribute('height', '20')
})

it('renders the admin sidebar gap-fill icons added for the DS consolidation round', () => {
  render(<Icon name="grid" data-testid="i" />)
  const svg = screen.getByTestId('i')
  // 4 rounded squares
  expect(svg.children.length).toBe(4)
})

it('reuses bed for Hotel instead of a duplicate icon (not in the sidebar gap-fill round)', () => {
  render(<Icon name="bed" data-testid="i" />)
  expect(screen.getByTestId('i').querySelector('path')).toHaveAttribute(
    'd',
    'M3 18v-5a3 3 0 013-3h12a3 3 0 013 3v5M3 14h18M3 18v2m18-2v2M7 10V8a2 2 0 012-2h2',
  )
})

it("keeps the tag icon's punch-hole filled without inheriting the wrapper's stroke", () => {
  render(<Icon name="tag" data-testid="i" />)
  const circle = screen.getByTestId('i').querySelector('circle')
  expect(circle).toHaveAttribute('fill', 'currentColor')
  expect(circle).toHaveAttribute('stroke', 'none')
})

it('renders team and people as two distinct icons, not one shared "two-person" glyph', () => {
  render(<Icon name="team" data-testid="team" />)
  render(<Icon name="people" data-testid="people" />)
  const team = screen.getByTestId('team').innerHTML
  const people = screen.getByTestId('people').innerHTML
  expect(team).not.toBe(people)
})
