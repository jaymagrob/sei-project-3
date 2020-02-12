import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Auth from '../../lib/auth'

class FirstLogin extends React.Component{

  state = {
    name: null
  }

  async componentDidMount() {
    try {
      const res = await axios('/api/myportfolio', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      console.log(res.data.firstLogin)
      // if (!res.data.firstLogin) this.props.history.push('/discovery')
      this.setState({ name: res.data.name, username: res.data.username })
    } catch (err) {
      console.log(err)
    }
  }
 
  render() {
    if (!this.state.name) return null
    return (
      <section className="section">
        <div className="container">
          <div className="if-half">
          <h1>Welcome to the Hive {this.state.name}</h1>
          <h2>Start Your Journey With:</h2>
          <Link to={`/users/${this.state.username}`}>Build your Profile</Link>
          <Link to="/search">Find New Projects and People</Link>
          <Link to="/projects/new">Create a new Project</Link>
          </div>
        </div>
      </section>
    )
  }
}

export default FirstLogin