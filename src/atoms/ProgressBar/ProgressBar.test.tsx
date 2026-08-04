// src/atoms/ProgressBar/ProgressBar.test.tsx
import { render, screen } from '@testing-library/react'
import { ProgressBar } from './ProgressBar'

it('exposes the current value to assistive tech', () => {
  render(<ProgressBar value={42} label="Subiendo foto" />)
  const bar = screen.getByRole('progressbar', { name: 'Subiendo foto' })
  expect(bar).toHaveAttribute('aria-valuenow', '42')
  expect(bar).toHaveAttribute('aria-valuemin', '0')
  expect(bar).toHaveAttribute('aria-valuemax', '100')
})

it('renders the fill width proportional to value', () => {
  const { container } = render(<ProgressBar value={30} />)
  const fill = container.querySelector('[class*="fill"]') as HTMLElement
  expect(fill.style.width).toBe('30%')
})

it('clamps a value above 100', () => {
  render(<ProgressBar value={150} />)
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
})

it('clamps a negative value to 0', () => {
  render(<ProgressBar value={-10} />)
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
})

it('defaults to the 8px height that the real upload consumer already ships', () => {
  const { container } = render(<ProgressBar value={0} />)
  expect(container.firstElementChild?.className).toMatch(/height8/)
})

it('supports the other measured height (7px, the weekly-stats bar)', () => {
  const { container } = render(<ProgressBar value={0} height={7} />)
  expect(container.firstElementChild?.className).toMatch(/height7/)
})

it('keeps caller classes alongside its own', () => {
  const { container } = render(<ProgressBar value={0} className="mine" />)
  expect(container.firstElementChild?.className).toMatch(/mine/)
})
