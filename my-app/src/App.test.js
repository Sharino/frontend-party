import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import App from './App'
import { store } from './_helpers'
import { CustomInput } from './_components'

test('Snackbar works', async () => {
  const { getByText, findByText } = render(<Provider store={store}>
      <App />
  </Provider>)
  fireEvent.click(getByText('Sign In'))
  const snackbar = await findByText('Unauthorized')
  expect(snackbar).toBeDefined()
})

test('Validation works', async () => {
  const { getByText, getByDisplayValue } = render(<Provider store={store}>
      <App />
  </Provider>)

  const usernameInput = getByDisplayValue('Username')
  const passwordInput = getByDisplayValue('Password')

  fireEvent.change(usernameInput, { target: { value: null } })
  fireEvent.change(passwordInput, { target: { value: null } })

  expect(usernameInput.value).toEqual('')
  expect(passwordInput.value).toEqual('')

  fireEvent.click(getByText('Sign In'))

  expect(getByText('Username is required')).toBeDefined()
  expect(getByText('Password is required')).toBeDefined()
})