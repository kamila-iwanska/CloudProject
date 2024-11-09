import { useState } from 'react'

export function Login({ setPage }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        console.log({username, password})
        setPage('chat')
      }}>
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Log in</button>
      </form>
      <button onClick={() => setPage('sign-up')}>Sign up instead</button>
    </div>
    
  )
}

