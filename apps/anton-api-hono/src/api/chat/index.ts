import { env } from 'hono/adapter'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { Hono } from 'hono'
import {AntonSDK  } from '@mrck-labs/anton-sdk'

const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string()
    })
  )
})

const chatSchemaValidator= zValidator('json', chatSchema)

export const chat = new Hono()

chat.get('/', (c) => {
    
    return c.json({message: 'Hello from chat get Hono!'})
})

chat.post('/', chatSchemaValidator, async (c) => {
    const {ANTHROPIC_API_KEY} = env<{ ANTHROPIC_API_KEY: string }>(c)
    const anton = AntonSDK.create({type:"anthropic", apiKey: ANTHROPIC_API_KEY })

    const validated = c.req.valid('json')

    const response = await anton.chat({messages: validated.messages})

    return c.json({response, validatedRequest: validated})
})