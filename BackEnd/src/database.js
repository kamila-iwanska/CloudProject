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

export async function getUsersFromDB() {
  const result = await client.query('SELECT * FROM myusers')
  console.log(result.rows)
  return result.rows
}

export async function addUserToDB(sub, username) {
  await client.query('INSERT INTO myusers (sub, username) VALUES ($1, $2) ON CONFLICT DO NOTHING', [sub, username])
  console.log(`Added user ${username} with sub ${sub}`)
}

export async function addMessageToDB(message, sender, receiver) {
  const result = await client.query('INSERT INTO mymessages (message, sender, receiver) VALUES ($1, $2, $3) RETURNING *', [message, sender, receiver])
  console.log(`Added message from ${sender} to ${receiver}: ${message}`)
  return result.rows[0]
}

export async function getMessagesFromDB(user, other) {
  const result = await client.query('SELECT * FROM mymessages WHERE (sender = $1 AND receiver = $2) OR (sender = $2 AND receiver = $1) ORDER BY date', [user, other])
  return result.rows
}