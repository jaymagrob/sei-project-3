import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

class MyPortfolio extends React.Component {
  state = {
    user: ''
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/myportfolio', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ user: res.data })
      console.log('state =', this.state.user)
      console.log('res =', this.state.user)
    } catch (err) {
      console.log('err =', err)
    }
  }
  render() {
    const { name, professions, email, username } = this.state.user
    console.log('Profile returned!')
    return (
      <section className="section">
        <h1>My Portfolio</h1>
        <h2>{name}</h2>
        {/* <h2>Professions</h2>
        <ul>{professions.map(profession => (
          <li key={profession}>{profession}</li>
        ))}</ul> */}
        <h3>Account Info</h3>
        <p>Email: {email}</p>
        <p>Username: {username}</p>
        <Link to={`/users/${username}/edit`}>Edit Portfolio</Link>
      </section>
    )
  }
}

export default MyPortfolio