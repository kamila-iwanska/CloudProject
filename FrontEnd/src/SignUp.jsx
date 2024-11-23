import { useState } from "react"
import { cognitoSignUp } from "./cognito"
import "./signup-style.css"

export function SignUp({ setPage }) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
      <div className = "signup-page">
        <div className = "signup-form-container">
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
            <label htmlFor ="username">Username</label>
            <input type="text" placeholder="Username" value = {username} onChange = {(e)=> setUsername(e.target.value)}/><br />
            <label htmlFor ="email">E-mail</label>
            <input type="email" placeholder="E-mail" value = {email} onChange={(e)=> setEmail(e.target.value)}/><br />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" value = {password} onChange={(e) => setPassword(e.target.value)}/><br />
            <button type="submit">SignUp</button>
          </form>
          <button className = "login-btn" onClick={() => setPage('login')}>Login instead</button>
        </div>
      </div>
    )
  }
  