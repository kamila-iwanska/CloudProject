import { useState } from "react"

export function SignUp({ setPage }) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
      <div>
        <h1>SignUp</h1>
        <form onSubmit={(e) => {e.preventDefault();
        console.log({username, email, password})
        // tutaj wysyłamy do Cognito dane
        setPage('login')
        }}>
          <label htmlFor ="username">Username</label>
          <input type="text" placeholder="Username" value = {username} onChange = {(e)=> setUsername(e.target.value)}/>
          <label htmlFor ="email">E-mail</label>
          <input type="email" placeholder="E-mail" value = {email} onChange={(e)=> setEmail(e.target.value)}/>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" value = {password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit">SignUp</button>
        </form>
        <button onClick={() => setPage('login')}>Login instead</button>
      </div>
    )
  }
  