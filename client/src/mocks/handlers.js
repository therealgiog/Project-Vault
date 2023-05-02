// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
  // Handles a POST /login request
  rest.post('http://localhost:3001/login', async (req, res, ctx) => {
    const { email, password } = await req.json()
    if (email === 'test' && password === '1234') {
      return res(
        ctx.status(200),
        ctx.json({ email, password })
      )
    } else {
      return res(
        ctx.status(401),
        ctx.json({ message: 'Incorrect email or password' })
      )
    }
  })
  // Handles a GET /user request
  // rest.get('/user', null),
]
