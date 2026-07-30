// src/molecules/Field/Field.test.tsx
import { render, screen } from '@testing-library/react'
import { Field } from './Field'
import { Input } from '../../atoms/Input/Input'
import { Select } from '../../atoms/Select/Select'
import s from './Field.module.scss'

it('associates the label with the control', () => {
  render(<Field label="Teléfono" htmlFor="tel"><Input id="tel" /></Field>)
  expect(screen.getByLabelText('Teléfono')).toBeInTheDocument()
})

it('announces the error via aria-describedby', () => {
  render(
    <Field label="Correo" htmlFor="mail" error="Correo inválido">
      <Input id="mail" />
    </Field>,
  )
  const input = screen.getByLabelText('Correo')
  const described = input.getAttribute('aria-describedby')
  expect(described).toBeTruthy()
  expect(document.getElementById(described!)).toHaveTextContent('Correo inválido')
})

it('gives the error role=alert so it is announced when it appears', () => {
  render(<Field label="Correo" htmlFor="m" error="Requerido"><Input id="m" /></Field>)
  expect(screen.getByRole('alert')).toHaveTextContent('Requerido')
})

it('hides the hint once an error replaces it', () => {
  render(
    <Field label="Correo" htmlFor="m" hint="Te enviaremos la confirmación" error="Requerido">
      <Input id="m" />
    </Field>,
  )
  expect(screen.queryByText('Te enviaremos la confirmación')).not.toBeInTheDocument()
})

it('wires aria-describedby onto a Select too, not just an Input', () => {
  render(
    <Field label="Servicio" htmlFor="svc" error="Elige un servicio">
      <Select id="svc"><option value="">Selecciona</option></Select>
    </Field>,
  )
  const select = screen.getByLabelText('Servicio')
  const described = select.getAttribute('aria-describedby')
  expect(described).toBeTruthy()
  expect(document.getElementById(described!)).toHaveTextContent('Elige un servicio')
})

it('is not onNavy by default', () => {
  const { container } = render(<Field label="Servicio" htmlFor="svc"><Input id="svc" /></Field>)
  expect(container.firstChild).not.toHaveClass(s.onNavy!)
})

it('applies the onNavy modifier to the wrapping field when set', () => {
  const { container } = render(
    <Field label="Servicio" htmlFor="svc" onNavy>
      <Input id="svc" />
    </Field>,
  )
  expect(container.firstChild).toHaveClass(s.onNavy!)
})
