import { Hono } from 'hono'

export const api = new Hono()

api.get('/hello', (c) => {
  return c.json({message: 'Hello from api Hono!'})
})