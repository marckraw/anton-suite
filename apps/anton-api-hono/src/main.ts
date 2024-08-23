import { Hono } from "hono"

export const app = new Hono()

app.get('/', (c) => {
    return c.json({message: 'This is the main route of the Hono API server'})
})

