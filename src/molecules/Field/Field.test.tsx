// src/molecules/Field/Field.test.tsx
import { render, screen } from '@testing-library/react'
import { Field } from './Field'
import { Input } from '../../atoms/Input/Input'

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
