import { fireEvent, render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'

import Login from './Login'

it('should render the login fields', () => {
  render(<Login />, { wrapper: BrowserRouter })
  expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()

  expect(
    screen.getByRole('textbox', { name: /branch id/i })
  ).toBeInTheDocument()

  expect(
    screen.getByRole('textbox', { name: /user name/i })
  ).toBeInTheDocument()

  expect(screen.getByRole('textbox', { name: /password/i })).toBeInTheDocument()

  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
})

it('should validate form fields', async () => {
  render(<Login />, { wrapper: BrowserRouter })
  user.setup()
  await user.click(screen.getByRole('button', { name: /login/i }))

  expect(await screen.findByText('Branch ID is required')).toBeInTheDocument()
  expect(await screen.findByText('User Name is required')).toBeInTheDocument()
  expect(await screen.findByText('Password is required')).toBeInTheDocument()
})

it('should validate Branch ID fields only number', async () => {
  render(<Login />, { wrapper: BrowserRouter })
  user.setup()

  const branchIdFIeld = screen.getByRole('textbox', { name: /branch id/i })
  await user.type(branchIdFIeld, 'no number value')

  await user.click(screen.getByRole('button', { name: /login/i }))

  expect(await screen.findByText('Please enter a number')).toBeInTheDocument()
  fireEvent.change(branchIdFIeld, { target: { value: 1000001 } })

  expect(
    await screen.findByText('Please enter a number')
  ).not.toBeInTheDocument()
})
