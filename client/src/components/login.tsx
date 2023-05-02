import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { Form } from '../interfaces/formInterface'
import '../styles/login.css'

const initialState: Form = {
  email: '',
  password: ''
}

const serverURL = process.env.REACT_APP_SERVER ?? 'http://localhost:3001'

function Login () {
  const { setUser } = useContext(UserContext)
  const [state, setState] = useState<Form>(initialState)
  const navigate = useNavigate()

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setState((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { email, password } = state
    const user = { email, password }
    // Could be combined to...
    // cost user = { ...state }

    try {
      const response = await fetch(`${serverURL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })

      if (response.status === 401) {
        // alert('Wrong email or password')
        navigate('/register')
        return
      }
      const currentUser = await response.json()
      localStorage.setItem('is-authenticated', 'true')
      setUser(currentUser)
      navigate('/home')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='loginContainer'>
      <div className='anotherContainer'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className='loginForm' data-testid='login-form'>
          <label htmlFor='name'>Email:</label>
          <input
            type='text'
            id='name'
            value={state.email}
            name='email'
            data-testid='email-input'
            onChange={handleChange}></input>

          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={state.password}
            name='password'
            data-testid='password-input'
            onChange={handleChange}></input>

          <button
            type='submit' className='loginButton' data-testid="login-button">Log In</button>
        </form>
        <span>Dont have an account?</span>
        <Link to={'/register'}> Sign Up</Link>
      </div>
    </div>
  )
}

export default Login
