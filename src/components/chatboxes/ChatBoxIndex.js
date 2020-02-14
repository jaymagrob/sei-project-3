import React from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'
import ChatBoxCard from '../chatboxes/ChatBoxCard'

class ChatBoxIndex extends React.Component {
  state = {
    you: []
  }

  getSelf = async () => {
    try {
      const res = await axios.get('/api/myportfolio', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ you: res.data })
      console.log('you=', this.state.you)

    } catch (err) {
      console.log(err)
    }
  }

  async componentDidMount() {
    this.getSelf()
  }


  // isOwner = () => Auth.getPayload().sub === this.state.user._id



  // handleMessage = async (e) => {
  //   const theirId = this.state.user._id
  //   const yourId = this.state.you._id
  //   const yourChats = this.state.you.chats
  //   const arr2 = yourChats.filter(chat => chat.members.includes(theirId))

  //   if (arr2[0]) {
  //     this.props.history.push(`/users/${arr2[0].owner}/chatboxes/${arr2[0]._id}`)
  //   } else {
  //     try {
  //       console.log('trying to creat a chat')
  //       const res = await axios.post(`/api/users/${theirId}/chatboxes`, { }, {
  //         headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //       })
  //       this.props.history.push(`/users/${yourId}/chatboxes/${res.data._id}`)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  // }




  render() {
    const { you } = this.state
    if (!you._id) return null
    console.log('you =', you)
    const { chats } = this.state.you
    if (chats.length) return null
    return (
      <section className="is-fullheight-with-navbar section_padding">
        <h1>Your Messages</h1>
        <div>
          {chats.length ? chats.map(chat => (
            <ChatBoxCard key={chat._id} {...chat} />
          )) : 'You have no messages'}
        </div>



      </section>
    )
  }
}

export default ChatBoxIndex