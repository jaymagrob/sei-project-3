import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'
// import ChatBoxMessage from './ChatBoxMessage'

class ChatBoxShow extends React.Component {
  state = {
    chatBox: {},
    users: null,
    userId: null,
    chatBoxId: null,
    text: ''
  }

  async componentDidMount() {
    const userId = this.props.match.params.userid
    const chatBoxId = this.props.match.params.id

    try {
      const res = await axios.get(`/api/users/${userId}/chatboxes/${chatBoxId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ chatBox: res.data, userId: res.data.owner, chatBoxId: res.data._id })
    } catch (err) {
      console.log(err)
    }
  }

  // this is handling the change in the first checkbox form (looking for creatives/users)
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }


  handleMessageRequest = async (e) => {
    e.preventDefault()
    const userId = this.props.match.params.userid
    const chatBoxId = this.props.match.params.id
    try {
      const res = await axios.post(`/api/users/${userId}/chatboxes/${chatBoxId}/messages`, { text: this.state.text }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ chatBox: res.data })
    } catch (err) {
      console.log(err)
    }
    this.setState({ text: '' })
  }


  toggleMessageBoard = async (e) => {
    this.setState({ showMessages: !this.state.showMessages })
  }


  isMember = () => {
    const arr = this.state.chatBox.members.map(memb => memb._id === Auth.getPayload().sub)
    return arr.includes(true)
  }



  render() {

    const { chatBox } = this.state
    if (!chatBox._id) return null
    return (
      <section>
        <h1>Chat between {chatBox.members[0].name} and {chatBox.members[1].name ? chatBox.members[1].name : 'her/himself'}</h1>
        {chatBox.messages.map(message => {
          return (
            <div key={message._id}>
              <h2>Name: {message.user.name}</h2>
              <h2>Added: {Date(message.createdAt).slice(0, 15)}</h2>
              <img src={message.user.profileImage} />
              <p>{message.text}</p>
            </div>
          )
        })}
        <div>
          <form
            onSubmit={this.handleMessageRequest}
          >
            <textarea
              name='text'
              value={this.state.text}
              onChange={this.handleChange}
            >
            </textarea>
            <button type='submit'>Submit</button>
          </form>
        </div>
        {/* <ChatBoxMessage
          messages={this.state.chatBox.messages}
          text={this.state.text}
          handleChange={this.handleChange}
          handleMessageRequest={this.handleMessageRequest}
          // toggleMessageBoard={this.toggleMessageBoard}
          // showMessages={this.state.showMessages}
          members={this.state.chatBox.members}
        /> */}
      </section>
    )
  }
}

export default ChatBoxShow

