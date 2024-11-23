import { useState } from 'react'
import { cognitoLogin } from "./cognito"
import './login-style.css'

export function Login({ setPage, setAccessToken }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className ="login-page">
      <div className ="login-form-container">
        <h1>Login</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log({ username, password });
          cognitoLogin(username, password)
            .then((result) => {
              console.log(result);
              setAccessToken(result.AuthenticationResult.AccessToken);
              setPage('chat');
            })
            .catch((error) => {
              window.alert(error.message);
            });
        }}>
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
          <button type="submit">Log in</button>
        </form>
        <button className='sign-up-btn' onClick={() => setPage('sign-up')}>Sign up instead</button>
      </div>
    </div>
  )
}

