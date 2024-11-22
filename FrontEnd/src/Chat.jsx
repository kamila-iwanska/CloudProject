import { useState, useEffect } from 'react'
import { APIget } from './API.js'

export function Chat({ setPage, accessToken}) {
  // const user1 = { sub: '1', username: 'alice1'}
  // const user2 = { sub: '2', username: 'alice2'}
  // const user3 = { sub: '3', username: 'alice3'}
  //const users = [user1, user2, user3]
  const [users, setUsers] = useState([]);
  useEffect(() => {APIget('/users', accessToken).then((data) => {setUsers(data)})}, []); 
  // const messages = [
  //   { message: 'Hello!', sender: user1.sub, receiver: user2.sub },
  //   { message: 'Hi!', sender: user2.sub, receiver: user1.sub },
  //   { message: 'How are you?', sender: user1.sub, receiver: user2.sub },
  //   { message: 'Good, you?', sender: user2.sub, receiver: user1.sub },
  //   { message: 'I am fine!', sender: user1.sub, receiver: user2.sub },
  //   { message: 'Great!', sender: user2.sub, receiver: user1.sub },
  // ]
  const listUsers = users.map(user =>
    <li key={user.sub}>
      {user.username}
    </li>
  );
  return(
    <>
      <div>
        <h1>Users</h1>
        <ul>{listUsers}</ul>
      </div>
      <div>
        <h1>Chat</h1>
        <p>Welcome to the chat!</p>
      </div>
      <button onClick={() => setPage('login')}>Log out</button>
    </>
)
}