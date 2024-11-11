import { useState } from 'react'
import { Login } from "./Login"
import { SignUp } from "./SignUp"
import { Chat } from "./Chat"

export function App() {
  const [page, setPage] = useState('login')
  const [accessToken, setAccessToken] = useState(null)

  return (
    <>
      {page === "login" ? <Login setPage={setPage} setAccessToken={setAccessToken} /> : null} 
      {page === "sign-up" ? <SignUp setPage={setPage} /> : null}
      {page === "chat" ? <Chat /> : null}
    </>
  )
}
