import { useState } from "react"
import { cognitoSignUp } from "./cognito"

export function SignUp({ setPage }) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
      <div>
        <h1>SignUp</h1>
        <form onSubmit={(e) => {e.preventDefault();
        console.log({ email, username, password });
        cognitoSignUp(email, username, password)
          .then((result) => {
            console.log(result);
            window.alert("Sign up successful, please confirm your email address.");
          })
          .catch((error) => {
            window.alert(error.message);
          });
        setPage('login')
        }}>
          <label htmlFor ="username">Username</label><br />
          <input type="text" placeholder="Username" value = {username} onChange = {(e)=> setUsername(e.target.value)}/><br />
          <label htmlFor ="email">E-mail</label><br />
          <input type="email" placeholder="E-mail" value = {email} onChange={(e)=> setEmail(e.target.value)}/><br />
          <label htmlFor="password">Password</label><br />
          <input type="password" placeholder="Password" value = {password} onChange={(e) => setPassword(e.target.value)}/><br />
          <button type="submit">SignUp</button>
        </form>
        <button onClick={() => setPage('login')}>Login instead</button>
      </div>
    )
  }
  