import React from 'react'
import Register from '../components/register'
import {Router, Routes, Route} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { render, screen, fireEvent, waitFor} from '@testing-library/react'
//import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
//import { setupServer } from 'msw/node'
//import { handlers } from '../mocks/handlers'

// const server = setupServer(...handlers)

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

describe('Register Tests', () => {
  let browserHistory = createBrowserHistory()

  it('should render Register page correctly', () => {
    render(
        <Router location={browserHistory.location} navigator={browserHistory}>
          <Register/>
        </Router>
    )
    const formDiv = screen.getByTestId('register-form')
    const firstNameLabel = screen.getByLabelText('First Name:')
    const firstNameInput = screen.getByRole('textbox', {name: 'First Name:'})
    const secondNameLabel = screen.getByLabelText('Second Name:')
    const secondNameInput = screen.getByRole('textbox', {name: 'Second Name:'})
    const emailLabel = screen.getByLabelText('Email:')
    const emailInput = screen.getByRole('textbox', {name: 'Email:'})
    const passwordLabel = screen.getByLabelText('Password:')
    const passwordInput = screen.getByTestId('password-input')
    const submitButton = screen.getByRole('button')
    expect(formDiv).toBeInTheDocument()
    expect(firstNameLabel).toBeInTheDocument()
    expect(firstNameInput).toBeInTheDocument()
    expect(secondNameLabel).toBeInTheDocument()
    expect(secondNameInput).toBeInTheDocument()
    expect(emailLabel).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordLabel).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toHaveAttribute('type', 'submit')
  })

  //should submit the form correct and navigate to /login
  //should display an error for invalid registration
  // it('should submit form', async () => {
  //   render(
  //       <Router location={browserHistory.location} navigator={browserHistory}>
  //         <Routes>
  //           <Route path='/register' element={<Register/>}/>
  //         </Routes>
  //       </Router>
  //   )
  //   const firstNameLabel = screen.getByLabelText('First Name:')
  //   const secondNameLabel = screen.getByLabelText('Second Name:')
  //   const emailLabel = screen.getByLabelText('Email:')
  //   const passwordLabel = screen.getByLabelText('Password:')
  //   const submitButton = screen.getByRole('button');
  //   userEvent.type(firstNameLabel, 'Gio');
  //   userEvent.type(secondNameLabel, 'G');
  //   userEvent.type(emailLabel, 'test');
  //   userEvent.type(passwordLabel, '1234');
  //   fireEvent.click(submitButton);
  //   await waitFor(() => {
  //     expect(sessionStorage.getItem('is-authenticated')).toBe('true')
  //   })
  //   expect(browserHistory.location.pathname).toBe('/login')
  // })
})
