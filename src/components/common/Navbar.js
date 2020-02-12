import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'
import axios from 'axios'

class Navbar extends React.Component {
  state = { navbarOpen: false, name: null, username: null }
  toggleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }
  handleLogout = () => {
    Auth.logout()
    this.props.history.push('/')
  }

  async componentDidMount() {
    if (Auth.isAuthenticated()) {
      try {
        const res = await axios.get('/api/myportfolio', {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        this.setState({ name: res.data.name, username: res.data.username })
      } catch (err) {
        console.log(err)
      }
    }
  }


  async componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navbarOpen: false })
      if (Auth.isAuthenticated()) {
        try {
          const res = await axios.get('/api/myportfolio', {
            headers: { Authorization: `Bearer ${Auth.getToken()}` }
          })
          this.setState({ name: res.data.name, username: res.data.username })
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
  render() {
    // const { navbarOpen } = this.state
    console.log(this.state.username)
    return (
      <nav>
        <div className="navbar is-transparent">
          {/* <div> */}
          <div className="navbar-brand">
            <Link to="/">Beehive 🐝</Link>
          </div>
          {/* <a className={`navbar-burger ${navbarOpen ? 'is-active' : ''}`} onClick={this.toggleNavbar}>
            <span></span>
            <span></span>
            <span></span>
          </a> */}
          {/* </div> */}
          {/* <div className={`navbar-menu ${navbarOpen ? 'is-active' : ''}`}>
            <div> */}
          <div className="navbar-item">
            {Auth.isAuthenticated() && <Link to={`/users/${this.state.username}`}>My Portfolio</Link>}
          </div>
          <div className="navbar-item">
            <Link to="/search">Start Your Journey</Link>
          </div>
          <div className="navbar-item">
            {Auth.isAuthenticated() && <Link to="/projects/new">New Project</Link>}
          </div>
          <div className="navbar-item">
            {!Auth.isAuthenticated() && <Link to="/register" className="button">Register</Link>}
          </div>
          <div className="navbar-item">
            {!Auth.isAuthenticated() && <Link to="/login" className="button">Login</Link>}
          </div>
          <div className="navbar-item">
            {Auth.isAuthenticated() && <button onClick={this.handleLogout} className="button">Logout</button>}
          </div>
          {/* </div>
          </div> */}
        </div>
      </nav>
    )
  }
}
export default withRouter(Navbar)