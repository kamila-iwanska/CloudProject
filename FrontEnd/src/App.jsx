import { useState } from 'react'
import { Login } from "./Login"
import { SignUp } from "./SignUp"
import { Chat } from "./Chat"

export function App() {
  const [page, setPage] = useState('login')

  return (
    <>
      {page === "login" ? <Login setPage={setPage} /> : null} 
      {page === "sign-up" ? <SignUp setPage={setPage} /> : null}
      {page === "chat" ? <Chat /> : null}
    </>
  )
}
