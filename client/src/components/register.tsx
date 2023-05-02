import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, initialFormState } from '../interfaces/formInterface'
import '../styles/register.css'

const serverURL = process.env.REACT_APP_SERVER

function Register () {
  const [state, setState] = useState<Form>(initialFormState)
  const navigate = useNavigate()

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setState((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const { firstName, secondName, email, password } = state
    const user = { firstName, secondName, email, password }
    // Could be combined to...
    // const user = { ...state }

    fetch(`${serverURL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else if (res.status === 401) {
          alert('Email already in use')
          throw new Error('Email already in use')
        }
      })
      .then((data) => {
        navigate('/login')
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className='loginContainer'>
      <div className='anotherContainerRegister'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className='registerForm' data-testid='register-form'>

          <label htmlFor='firstName'>First Name:</label>
          <input
            type="text"
            id='firstName'
            name="firstName"
            required
            value={state.firstName}
            onChange={handleChange}
          ></input>

          <label htmlFor='secondName'>Second Name:</label>
          <input type="text"
            id='secondName'
            name="secondName"
            required
            value={state.secondName}
            onChange={handleChange}
          ></input>

          <label htmlFor='email'>Email: </label>
          <input type="text"
            id='email'
            name="email"
            required
            value={state.email}
            onChange={handleChange}
          ></input>

          <label htmlFor='password'>Password: </label>
          <input type="password"
            id='password'
            name="password"
            required
            value={state.password}
            data-testid='password-input'
            onChange={handleChange}
          ></input>

          <button type='submit' className='loginButton'>Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register
