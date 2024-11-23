import { useState, useEffect } from 'react'
import { APIget, APIpost } from './API.js'
import "./chat-style.css"

export function Chat({ setPage, accessToken }) {
  const [users, setUsers] = useState([]);
  const [selectedUserSub, setSelectedUserSub] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => { APIget('/users', accessToken).then((data) => { setUsers(data) }) }, []);

  const listUsers = users.map(user =>
    <p className= "user-panel" key={user.sub} onClick={() => setSelectedUserSub(user.sub)} style={user.sub == selectedUserSub ? { backgroundColor: 'pink' } : null}>
      {user.username}
    </p>
  );

  useEffect(() => {
    if (selectedUserSub != null) {
      APIget('/messages/' + selectedUserSub, accessToken).then((data) => { setMessages(data) })
    }
  }, [selectedUserSub]);

  const listMessages = messages.map(message =>
    <p className = {message.receiver!=selectedUserSub ? "sender-message" : "receiver-message" } key={message.id}>
      {message.message}
    </p>
  )

  return (
    <>
      <div className="chat-page">

        <div className="users-section">
          <h2>Users</h2>
          {listUsers}
        </div>

        <div className="chat-section">
          <h2>Chat</h2>
          <div className="messages-section">
          {listMessages}
          </div>
          <div className='input-section'>
            <input type="text" placeholder='Message' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            <button disabled={selectedUserSub == null} onClick={() => {
              APIpost('/messages', accessToken, { receiver: selectedUserSub, message: newMessage }).then((result) => {
                setMessages([...messages, result]);
                setNewMessage('');
              }
              )
            }}>Send</button>
          </div>
        </div>

        <div className="logout-btn">
          <button onClick={() => setPage('login')}>Log out</button>
        </div>
      </div>
    </>
  )
}