// src/molecules/Card/Card.test.tsx
import { render, screen } from '@testing-library/react'
import { Card } from './Card'

it('renders its children', () => {
  render(<Card>Contenido</Card>)
  expect(screen.getByText('Contenido')).toBeInTheDocument()
})

it('defaults to the site elevation, not the admin one', () => {
  const { container } = render(<Card>x</Card>)
  expect(container.firstElementChild?.className).toMatch(/site/)
})

it('supports the admin elevation, which the prototype keeps distinct', () => {
  const { container } = render(<Card elevation="admin">x</Card>)
  expect(container.firstElementChild?.className).toMatch(/admin/)
})

it('supports the bordered variant that carries no shadow', () => {
  const { container } = render(<Card elevation="bordered">x</Card>)
  expect(container.firstElementChild?.className).toMatch(/bordered/)
})

it('supports the strong elevation used by the home service cards', () => {
  const { container } = render(<Card elevation="strong">x</Card>)
  expect(container.firstElementChild?.className).toMatch(/strong/)
})

it('renders as the requested element for semantics', () => {
  const { container } = render(<Card as="article">x</Card>)
  expect(container.firstElementChild?.tagName).toBe('ARTICLE')
})

it('keeps caller classes alongside its own', () => {
  const { container } = render(<Card className="mine">x</Card>)
  expect(container.firstElementChild?.className).toMatch(/mine/)
})
