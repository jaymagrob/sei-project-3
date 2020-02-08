import React from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
// import Auth from '../../lib/auth'

class UserShow extends React.Component {
  state = {
    user: {}
  }

  async componentDidMount() {
    const currentUsername = this.props.match.params.username
    console.log(this.props.match.params.username)
    try {
      const res = await axios.get(`/api/users/${currentUsername}`)
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { user } = this.state
    if (!user._id) return null

    return (
      <section>
        <div>
          <h1>Name: {user.name}</h1>
        </div>
      </section>
    )
  }
}

export default UserShow