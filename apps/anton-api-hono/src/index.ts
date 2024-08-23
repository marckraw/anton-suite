import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { poweredBy } from 'hono/powered-by'
import { cors } from 'hono/cors'
import { app as mainRouter } from './main'
import { api as apiRouter } from './api'
import { chat as chatRouter } from './api/chat'
import 'dotenv/config'

const app = new Hono()

// middleware
app.use(poweredBy())
app.use(logger())
app.use("/api/*", cors()) // enable * cors for all api routes


app.route('/', mainRouter)
app.route('/api', apiRouter)
app.route('/api/chat', chatRouter)

const port = 3010
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
