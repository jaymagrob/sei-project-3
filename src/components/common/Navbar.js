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
    // const { navbarOpen } = this.state
    console.log(Auth.getPayload().sub)
    return (
      <nav>
        <div className="flex">
          {/* <div> */}
          <div className="mr-6">
            <Link className="text-blue-500 hover:text-blue-800" to="/">Home</Link>
          </div>
          {/* <a className={`navbar-burger ${navbarOpen ? 'is-active' : ''}`} onClick={this.toggleNavbar}>
            <span></span>
            <span></span>
            <span></span>
          </a> */}
          {/* </div> */}
          {/* <div className={`navbar-menu ${navbarOpen ? 'is-active' : ''}`}>
            <div> */}
          <div className="mr-6">
            {!Auth.isAuthenticated() && <Link className="text-blue-500 hover:text-blue-800" to="/register">Register</Link>}
          </div>
          <div className="mr-6">
            {!Auth.isAuthenticated() && <Link className="text-blue-500 hover:text-blue-800" to="/login">Login</Link>}
          </div>
          <div className="mr-6">
            {Auth.isAuthenticated() && <Link className="text-blue-500 hover:text-blue-800" to="/myportfolio">My Portfolio</Link>}
          </div>
          <div className="mr-6">
            <Link className="text-blue-500 hover:text-blue-800" to="/discovery">Discover</Link>
          </div>
          <div className="mr-6">
            <Link className="text-blue-500 hover:text-blue-800" to="/search">Start Your Journey</Link>
          </div>
          <div className="mr-6">
            <Link className="text-blue-500 hover:text-blue-800" to="/projects/new">New Project</Link>
          </div>
          <div className="mr-6">
            {Auth.isAuthenticated() && <Link className="text-blue-500 hover:text-blue-800" onClick={this.handleLogout}>Logout {this.state.username}</Link>}
          </div>
          {/* </div>
          </div> */}
        </div>
      </nav>
    )
  }
}
export default withRouter(Navbar)