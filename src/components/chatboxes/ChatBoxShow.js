import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'
import ChatBoxMessage from './ChatBoxMessage'

class ChatBoxShow extends React.Component {
  state = {
    chatBox: {},
    users: null,
    text: '',
    showMessages: false
  }

  async componentDidMount() {
    const chatBoxId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/chatboxes/${chatBoxId}`)
      this.setState({ chatBox: res.data })
      console.log('chatBox =', this.state.chatBox)
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
    const chatBoxId = this.props.match.params.id
    try {
      const res = await axios.post(`/api/chatboxes/${chatBoxId}/messages`, { text: this.state.text }, {
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
    // console.log('show messages =', this.state.showMessages)
  }


  isMember = () => {
    const arr = this.state.chatBox.members.map(memb => memb._id === Auth.getPayload().sub)
    return arr.includes(true)
  }

  

  render() {

    const { chatBox } = this.state
    if (!chatBox._id) return null
    return (
      <section style={{
        position: this.state.showMessages ? 'fixed' : 'absolute',
        overflow: this.state.showMessages ? 'hidden' : 'auto'
      }}>
        <div>
          <h1>ChatBox</h1>
          {this.isCollab() &&
            <button onClick={this.toggleMessageBoard}>Enter Collaborator Message Board</button>
          }
        </div>


        <ChatBoxMessage
          messages={this.state.chatBox.messages}
          text={this.state.text}
          handleChange={this.handleChange}
          handleMessageRequest={this.handleMessageRequest}
          toggleMessageBoard={this.toggleMessageBoard}
          showMessages={this.state.showMessages}
        />
      </section>
    )
  }
}

export default ChatBoxShow