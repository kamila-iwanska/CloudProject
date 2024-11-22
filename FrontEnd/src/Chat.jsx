import { useState, useEffect } from 'react'
import { APIget, APIpost } from './API.js'

export function Chat({ setPage, accessToken}) {
  const [users, setUsers] = useState([]);
  const [selectedUserSub, setSelectedUserSub] = useState(null);
  const[messages, setMessages] = useState([]);
  const[newMessage, setNewMessage] = useState('');

  useEffect(() => {APIget('/users', accessToken).then((data) => {setUsers(data)})}, []); 

  const listUsers = users.map(user =>
    <li key={user.sub} onClick={() => setSelectedUserSub(user.sub)} style={user.sub==selectedUserSub ? {color: 'red'}:null}>
      {user.username}
    </li>
  );
  
  useEffect(() =>{
    if (selectedUserSub !=null){
      APIget('/messages/' + selectedUserSub, accessToken).then((data) => {setMessages(data)})
    }
  }, [selectedUserSub]);
    
  const listMessages = messages.map(message =>
    <li key={message.id}>
      {message.sender} <br/>
      {message.message}
    </li>
  )

  return(
    <>
      <div>
        <h1>Users</h1>
        <ul>{listUsers}</ul>
      </div>
      <div>
        <h1>Chat</h1>
        <ul>{listMessages}</ul>
      </div>
      <input type="text" placeholder='Message' value = {newMessage} onChange={(e)=>setNewMessage(e.target.value)}/>
      <button disabled = {selectedUserSub == null} onClick={() => {
        APIpost('/messages', accessToken, {receiver: selectedUserSub, message: newMessage}).then((result) => {
          setMessages([...messages, result]);
          setNewMessage('');
        }
      )
      }}>Send</button>< br/>
      <button onClick={() => setPage('login')}>Log out</button>
    </>
)
}