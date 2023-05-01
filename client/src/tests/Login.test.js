import React from 'react'
import Login from '../components/login'
import UserContext from '../context/UserContext'
import {Router, Routes, Route} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import ReactDOM from 'react-dom'
import { render, screen, fireEvent, waitFor} from '@testing-library/react'
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

  it('Should render without crashing', () => {
    const div = document.createElement("div")
    ReactDOM.render(
      <UserContext.Provider value={{ setUser }}>
        <Router location={browserHistory.location} navigator={browserHistory}>
          <Login/>
        </Router>
      </UserContext.Provider>,
      div
    )
  })

  it('Renders Login page correctly', () => {
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

  //should submit the form correct and navigate to /home
  //should display an error for invalid login

})
