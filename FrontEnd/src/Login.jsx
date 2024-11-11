import { useState } from 'react'
import { cognitoLogin } from "./cognito"

export function Login({ setPage, setAccessToken }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        console.log({ username, password });
        cognitoLogin(username, password)
          .then((result) => {
            console.log(result);
            setAccessToken(result.AuthenticationResult.AccessToken);
          })
          .catch((error) => {
            window.alert(error.message);
          });
        setPage('chat');
      }}>
        <label htmlFor="username">Username</label><br />
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
        <label htmlFor="password">Password</label><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <button type="submit">Log in</button>
      </form>
      <button onClick={() => setPage('sign-up')}>Sign up instead</button>
    </div>
    
  )
}

