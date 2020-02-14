import React from 'react'
import { Link } from 'react-router-dom'
// import Auth from '../../lib/auth'

const ChatBoxCard = ({ _id, owner, updatedAt }) => (
  <div key={_id}>
    <Link to={`users/${owner}/chatboxes/${_id}`}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Human-emblem-mail-yellow-128.png/120px-Human-emblem-mail-yellow-128.png" alt="message" />
      {/* <h1>Message</h1> */}
      {/* <h1>{members[0]} and {members[1]}</h1>
      <p>Owner: {owner}</p> */}
      <p>{Date(updatedAt).slice(4, 10)}</p>
    </Link>
  </div>
)

export default ChatBoxCard