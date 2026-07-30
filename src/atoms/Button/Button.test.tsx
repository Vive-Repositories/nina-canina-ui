// src/atoms/Button/Button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'
import s from './Button.module.scss'

it('renders its label', () => {
  render(<Button>Agendar cita</Button>)
  expect(screen.getByRole('button', { name: 'Agendar cita' })).toBeInTheDocument()
})

it('calls onClick when pressed', async () => {
  const onClick = vi.fn()
  render(<Button onClick={onClick}>Continuar</Button>)
  await userEvent.click(screen.getByRole('button'))
  expect(onClick).toHaveBeenCalledOnce()
})

it('does not call onClick when disabled', async () => {
  const onClick = vi.fn()
  render(<Button disabled onClick={onClick}>Continuar</Button>)
  await userEvent.click(screen.getByRole('button'))
  expect(onClick).not.toHaveBeenCalled()
})

it('defaults to type=button so it never submits a form by accident', () => {
  render(<Button>Continuar</Button>)
  expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
})

it('honours an explicit type', () => {
  render(<Button type="submit">Pagar</Button>)
  expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
})

it('renders decorative icons hidden from assistive tech', () => {
  const { container } = render(<Button iconLeft="cart">Agregar</Button>)
  expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
})

it('applies the variant class', () => {
  render(<Button variant="secondary">Continuar</Button>)
  // Non-null assertion: noUncheckedIndexedAccess widens the CSS-module
  // index signature to `string | undefined`, but this key is always present.
  expect(screen.getByRole('button')).toHaveClass(s.secondary!)
})

it('applies the teal variant class (hotel area brand color)', () => {
  render(<Button variant="teal">Reservar hotel</Button>)
  expect(screen.getByRole('button')).toHaveClass(s.teal!)
})

it('applies the size class', () => {
  render(<Button size="lg">Continuar</Button>)
  expect(screen.getByRole('button')).toHaveClass(s.lg!)
})

describe('as="a"', () => {
  it('renders a real <a> with its href, not a <button>', () => {
    render(
      <Button as="a" href="https://wa.me/528340000000">
        WhatsApp
      </Button>,
    )
    expect(screen.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute(
      'href',
      'https://wa.me/528340000000',
    )
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('still applies the variant and size classes', () => {
    render(
      <Button as="a" href="https://wa.me/528340000000" variant="whatsapp" size="lg">
        WhatsApp
      </Button>,
    )
    const link = screen.getByRole('link')
    expect(link).toHaveClass(s.whatsapp!)
    expect(link).toHaveClass(s.lg!)
  })

  it('forwards anchor-only attributes like target and rel', () => {
    render(
      <Button as="a" href="https://wa.me/528340000000" target="_blank" rel="noopener noreferrer">
        WhatsApp
      </Button>,
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('does not add a type attribute (buttons default to type="button"; links never have one)', () => {
    render(
      <Button as="a" href="https://wa.me/528340000000">
        WhatsApp
      </Button>,
    )
    expect(screen.getByRole('link')).not.toHaveAttribute('type')
  })
})
