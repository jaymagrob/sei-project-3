import React from 'react'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
// import Auth from '../../lib/auth'

class UserShow extends React.Component {
  state = {
    user: {}
  }

  async componentDidMount() {
    // const userId = this.props.match.params.id ---- will need to work out how to get the user id of the person who is logged in and save this to userId
    // try {
    //   const res = await axios.get(`localhost:4000/users/${userId}`)
    //   this.setState({ user: res.data })
    // } catch (err) {
    //   console.log(err)
    // }
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