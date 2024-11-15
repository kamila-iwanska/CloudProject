import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { CognitoJwtVerifier } from "aws-jwt-verify";
import pg from 'pg'

const { Client } = pg
const client = new Client({connectionString: process.env.CONNECTION_STRING})
await client.connect()

await client.query(`
  CREATE TABLE IF NOT EXISTS myusers (
    sub UUID PRIMARY KEY NOT NULL,
    username TEXT NOT NULL
  )`)

await client.query(
  `CREATE TABLE IF NOT EXISTS mymessages (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    message TEXT NOT NULL,
    sender UUID NOT NULL REFERENCES myusers(sub),
    receiver UUID NOT NULL REFERENCES myusers(sub),
    date TIMESTAMP NOT NULL DEFAULT NOW()
  )`
)


const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_POOL_ID,
  tokenUse: "access",
  clientId: process.env.COGNITO_CLIENT_ID,
});
//eyJraWQiOiJTRjRNbnp5VDFucUpFS0FKK25OUWQ5aXhqUmdzWHl1WSt4REFaKzBpVzk0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzNDk4YjQ0OC1hMGYxLTcwYzktOWMxNS0yNDk0OGZmNTU4ZTUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9pa3BBa3RZdmkiLCJjbGllbnRfaWQiOiJtcWxjbTk1ZzRzdGZ0ZXQycWZraTl0bWt1Iiwib3JpZ2luX2p0aSI6IjQzNWVmZDRiLTAxNzYtNDliOC05YzJiLTE0NDVmNzgyYTA2NiIsImV2ZW50X2lkIjoiY2NmZGU1ZGMtYTQ3Yi00ZmE5LTg3NTktYzhiYzMyMWZlZjc4IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTczMTcwMzE1NywiZXhwIjoxNzMxNzA2NzU3LCJpYXQiOjE3MzE3MDMxNTcsImp0aSI6ImZlNjliOGFlLWYyZGYtNDI5MS04MjIxLTQ3ZjBhNjZlYTI5YyIsInVzZXJuYW1lIjoia2FtaWxhIn0.N2Wk_Gfei6XjWbMfATmtzRdUqasgu6Uiyw2gNiwKGw1BXd4kUsBX3_yBG-B9WfAkxld0R31U0iCD5gZek4ZFmlqaTDQ94zkB4CCZXJcaarBd46RsnYqII9024WYBi17wYw47XZz9guKA8jP1Ux2Bb-Iq33zMQRFljqyipaYoZvxgqHqEW_7GNywsQnlCauriaBMzr0sV7etrYgC4iajl0Di1OY0x6GuT740zTzIJO9l8zDz2FPXCv4FgrgWxlgJUt_dgGv3cnDTNjQN2OviZ1Nh3PnmUtIOWaTixfFYHtBgtl5mLPoeGQUvUN3L_M0tOaxDeAKUqAuEzNogwxQGe3Q
async function extractUser(c){
  const authorization = c.req.header('Authorization')
  if (!authorization) {
    console.log("No token provided");
    return null
  }
  const token = authorization.replace('Bearer ', '')

  try {
    const payload = await verifier.verify(token);
    console.log("Token is valid. Payload:",{sub: payload.sub, username: payload.username});
    return { sub: payload.sub, username: payload.username }
  } catch {
    console.log("Token is invalid");
    return null
  }
}

const app = new Hono()
app.use(logger())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/health', (c) => {
  return c.json({ status: 'ok' })
})

app.get('/user', async (c) => {
  const user = await extractUser(c)
  if (!user) {
    return c.status(401).json({ error: 'Unauthorized' })
  }
  return c.json([])
})

app.get('/myuser', async (c) => {
  const user = await extractUser(c)
  if (!user) {
    return c.status(401).json({ error: 'Unauthorized' })
  }
  return c.json(user)
})
const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
