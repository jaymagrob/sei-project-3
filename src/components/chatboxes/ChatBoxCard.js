import React from 'react'
import { Link } from 'react-router-dom'
// import Auth from '../../lib/auth'

const ChatBoxCard = ({ _id, owner, updatedAt, messages }) => (
  <div key={_id}>
    {messages.length > 0 ? <Link to={`users/${owner}/chatboxes/${_id}`}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Human-emblem-mail-yellow-128.png/120px-Human-emblem-mail-yellow-128.png" alt="message" />
      <p>{Date(updatedAt).slice(4, 10)}</p>
    </Link> : '' }
    {/* <Link to={`users/${owner}/chatboxes/${_id}`}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Human-emblem-mail-yellow-128.png/120px-Human-emblem-mail-yellow-128.png" alt="message" />
      <p>{Date(updatedAt).slice(4, 10)}</p>
    </Link> */}
  </div>
)

export default ChatBoxCard