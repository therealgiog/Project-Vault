import React from 'react'
import { render, screen, test } from '@testing-library/react'
import Login from '../components/login'
import UserContext from '../context/UserContext'
import {Router, Routes, Route, Navigate} from 'react-router-dom';
import { BrowserHistory, createBrowserHistory } from 'history';
import '@testing-library/jest-dom';


describe('Login Tests', () => {
  let user
  let setUser
  let history
  beforeEach(() => {
    user = {}
    setUser = jest.fn()
    history = createBrowserHistory();
    render(
      <UserContext.Provider value={{ user, setUser }}>
        <Router location={history.location} navigator={history}>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          <Route path='/' element={<Login />}>
          </Route>
        </Routes>
      </Router>
      </UserContext.Provider>
    )
  })

  it('should do...', () => {
    expect(screen.getByTestId('name-label').textContent).toBe('Email:')
    //expect(setUser).toHaveBeenCalled()
  })
})
