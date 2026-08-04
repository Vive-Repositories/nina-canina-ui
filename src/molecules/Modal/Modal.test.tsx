// src/molecules/Modal/Modal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { Modal } from './Modal'

function Harness({ label = 'Detalle' }: { label?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button onClick={() => setOpen(true)}>Abrir</button>
      <Modal open={open} onClose={() => setOpen(false)} label={label}>
        <button>Dentro</button>
        <button>Segundo</button>
      </Modal>
    </div>
  )
}

it('renders nothing when closed', () => {
  render(
    <Modal open={false} onClose={() => {}} label="x">
      contenido
    </Modal>,
  )
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

it('exposes an accessible dialog with the given label when open', () => {
  render(
    <Modal open onClose={() => {}} label="Detalle de cobro">
      contenido
    </Modal>,
  )
  const dialog = screen.getByRole('dialog', { name: 'Detalle de cobro' })
  expect(dialog).toHaveAttribute('aria-modal', 'true')
})

it('renders its children', () => {
  render(
    <Modal open onClose={() => {}} label="x">
      <p>Contenido real</p>
    </Modal>,
  )
  expect(screen.getByText('Contenido real')).toBeInTheDocument()
})

it('closes on Escape', () => {
  const onClose = vi.fn()
  render(
    <Modal open onClose={onClose} label="x">
      contenido
    </Modal>,
  )
  fireEvent.keyDown(document, { key: 'Escape' })
  expect(onClose).toHaveBeenCalledTimes(1)
})

it('closes on a backdrop click', () => {
  const onClose = vi.fn()
  render(
    <Modal open onClose={onClose} label="x">
      contenido
    </Modal>,
  )
  const backdrop = document.body.querySelector('[class*="backdrop"]')
  expect(backdrop).not.toBeNull()
  fireEvent.click(backdrop as Element)
  expect(onClose).toHaveBeenCalledTimes(1)
})

it('does not close when clicking inside the panel', () => {
  const onClose = vi.fn()
  render(
    <Modal open onClose={onClose} label="x">
      <button>Dentro</button>
    </Modal>,
  )
  fireEvent.click(screen.getByRole('button', { name: 'Dentro' }))
  expect(onClose).not.toHaveBeenCalled()
})

it('traps Tab: from the last focusable, it wraps to the first', () => {
  render(
    <Modal open onClose={() => {}} label="x">
      <button>Primero</button>
      <button>Ultimo</button>
    </Modal>,
  )
  const first = screen.getByRole('button', { name: 'Primero' })
  const last = screen.getByRole('button', { name: 'Ultimo' })
  last.focus()
  fireEvent.keyDown(document, { key: 'Tab' })
  expect(first).toHaveFocus()
})

it('traps Shift+Tab: from the first focusable, it wraps to the last', () => {
  render(
    <Modal open onClose={() => {}} label="x">
      <button>Primero</button>
      <button>Ultimo</button>
    </Modal>,
  )
  const first = screen.getByRole('button', { name: 'Primero' })
  const last = screen.getByRole('button', { name: 'Ultimo' })
  first.focus()
  fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
  expect(last).toHaveFocus()
})

it('focuses the panel itself when it opens', () => {
  render(
    <Modal open onClose={() => {}} label="x">
      <button>Dentro</button>
    </Modal>,
  )
  expect(screen.getByRole('dialog')).toHaveFocus()
})

it('returns focus to the element that opened it, once closed', async () => {
  const user = userEvent.setup()
  render(<Harness />)
  const opener = screen.getByRole('button', { name: 'Abrir' })
  await user.click(opener)
  expect(screen.getByRole('dialog')).toBeInTheDocument()

  await user.keyboard('{Escape}')
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  expect(opener).toHaveFocus()
})

it('defaults to the 480px width measured for the appointment detail modal', () => {
  render(
    <Modal open onClose={() => {}} label="x">
      c
    </Modal>,
  )
  expect(screen.getByRole('dialog').className).toMatch(/width480/)
})

it('supports the other 2 measured widths (450 Invitar empleado, 470 Nueva cita)', () => {
  const { rerender } = render(
    <Modal open onClose={() => {}} label="x" width={450}>
      c
    </Modal>,
  )
  expect(screen.getByRole('dialog').className).toMatch(/width450/)

  rerender(
    <Modal open onClose={() => {}} label="x" width={470}>
      c
    </Modal>,
  )
  expect(screen.getByRole('dialog').className).toMatch(/width470/)
})

it('keeps caller classes alongside its own', () => {
  render(
    <Modal open onClose={() => {}} label="x" className="mine">
      c
    </Modal>,
  )
  expect(screen.getByRole('dialog').className).toMatch(/mine/)
})
