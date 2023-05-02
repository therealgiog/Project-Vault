import React from 'react'
import Login from '../components/login'
import UserContext from '../context/UserContext'
import {Router, Routes, Route} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import ReactDOM from 'react-dom'
import { render, screen, fireEvent, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'

describe('Login Tests', () => {
  let user
  let setUser
  let browserHistory
  beforeEach(() => {
     user = {}
     setUser = jest.fn()
     browserHistory = createBrowserHistory()
  })

  //unnecessary
  // it('Should render without crashing', () => {
  //   const div = document.createElement("div")
  //   ReactDOM.render(
  //     <UserContext.Provider value={{ setUser }}>
  //       <Router location={browserHistory.location} navigator={browserHistory}>
  //         <Login/>
  //       </Router>
  //     </UserContext.Provider>,
  //     div
  //   )
  // })

  it('should render Login page correctly', () => {
    render(
      <UserContext.Provider value={{ user, setUser }}>
        <Router location={browserHistory.location} navigator={browserHistory}>
          <Login/>
        </Router>
      </UserContext.Provider>
    )
    const formDiv = screen.getByTestId('login-form')
    const emailLabel = screen.getByLabelText('Email:')
    const emailInput = screen.getByRole('textbox', {name: 'Email:'})
    const passwordLabel = screen.getByLabelText('Password:')
    const passwordInput = screen.getByTestId('password-input')
    const submitButton = screen.getByRole('button')
    expect(formDiv).toBeInTheDocument()
    expect(emailLabel).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordLabel).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toHaveAttribute('type', 'submit')
  })

  it('should submit form with valid email password', async () => {
    render(
      <UserContext.Provider value={{ user, setUser }}>
        <Router location={browserHistory.location} navigator={browserHistory}>
          <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/home' element={<div>Home</div>}/>
          </Routes>
        </Router>
      </UserContext.Provider>
    )
    const emailInput = screen.getByTestId('email-input')
    const passwordInput = screen.getByTestId('password-input')
    const submitButton = screen.getByTestId('login-button')
    userEvent.type(emailInput, 'test')
    userEvent.type(passwordInput, '1234')
    userEvent.click(submitButton);
    await waitFor(() => {
       //expect(localStorage.getItem('is-authenticated')).toBe('true')
       expect(browserHistory.location.pathname).toBe('/home')
    })
  })

  // it('should send error with invalid email or password', async () => {
  //   render(
  //     <UserContext.Provider value={{ user, setUser }}>
  //       <Router location={browserHistory.location} navigator={browserHistory}>
  //         <Routes>
  //           <Route path='/' element={<Login />}/>
  //           <Route path='home' element={<div>Home</div>}/>
  //         </Routes>
  //       </Router>
  //     </UserContext.Provider>
  //   )
  //   const emailLabel = screen.getByLabelText('Email:')
  //   const passwordLabel = screen.getByLabelText('Password:')
  //   const submitButton = screen.getByRole('button');
  //   userEvent.type(emailLabel, '');
  //   userEvent.type(passwordLabel, '');
  //   fireEvent.click(submitButton);
  //   await waitFor(() => {
  //     expect(screen.getByText('Wrong email or password')).toBeInTheDocument()
  //   })
  // })
})
