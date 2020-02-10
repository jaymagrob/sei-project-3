
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'
import axios from 'axios'
class Navbar extends React.Component {
  state = { navbarOpen: false, username: null }
  toggleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }
  handleLogout = () => {
    Auth.logout()
    this.props.history.push('/')
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/myportfolio', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ username: res.data.username })
    } catch (err) {
      console.log(err)
    }
  }


  async componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navbarOpen: false })
      try {
        const res = await axios.get('/api/myportfolio', {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        this.setState({ username: res.data.username })
      } catch (err) {
        console.log(err)
      }
    }
  }
  render() {
    const { navbarOpen } = this.state
    console.log(Auth.getPayload().sub)
    return (
      <nav>
        <div>
          {/* <div> */}
          <Link to="/">Home</Link>
          {/* <a className={`navbar-burger ${navbarOpen ? 'is-active' : ''}`} onClick={this.toggleNavbar}>
            <span></span>
            <span></span>
            <span></span>
          </a> */}
          {/* </div> */}
          {/* <div className={`navbar-menu ${navbarOpen ? 'is-active' : ''}`}>
            <div> */}
          {!Auth.isAuthenticated() && <Link to="/register">Register</Link>}
          {!Auth.isAuthenticated() && <Link to="/login">Login</Link>}
          {Auth.isAuthenticated() && <Link to="/myportfolio">My Portfolio</Link>}
          <Link to="/discovery">Discover</Link>
          <Link to="/search">Start Your Journey</Link>
          {Auth.isAuthenticated() && <Link onClick={this.handleLogout}>Logout {this.state.username}</Link>}
          {/* </div>
          </div> */}
        </div>
      </nav>
    )
  }
}
export default withRouter(Navbar)