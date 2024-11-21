import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { extractUser } from './cognito.js'
import {addMessageToDB, getUsersFromDB, getMessagesFromDB} from './database.js'

const app = new Hono()
app.use(logger())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/health', (c) => {
  return c.json({ status: 'ok' })
})

app.get('/users', async (c) => {
  const user = await extractUser(c)
  if (!user) {
    return c.status(401).json({ error: 'Unauthorized' })
  }
  return c.json(await getUsersFromDB())
})

app.get('/myuser', async (c) => {
  const user = await extractUser(c)
  if (!user) {
    return c.status(401).json({ error: 'Unauthorized' })
  }
  return c.json(user)
})

app.post('/messages', async (c) => {
  const user = await extractUser(c)
  if (!user) {
    return c.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const body = await c.req.json()
    const { message, receiver } = body
    await addMessageToDB(message, user.sub, receiver)
    return c.json({ status: 'ok' })
  }
  catch {
    return c.status(400).json({ error: 'Invalid JSON' })
  }
})

app.get('/messages/:other', async (c) => {
  const user = await extractUser(c)
  if (!user) {
    return c.status(401).json({ error: 'Unauthorized' })
  }
  return c.json(await getMessagesFromDB(user.sub, c.req.param('other')))
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
