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
        {/* if on homepage we want to add className="is-fixed-top" to navbar*/}
        <div className="navbar has-shadow">
          {/* <div> */}
          
          <div className="navbar-item navbar-item-font navbar-logo">
            <Link to="/">beehive</Link>
          </div>
          {/* <a className={`navbar-burger ${navbarOpen ? 'is-active' : ''}`} onClick={this.toggleNavbar}>
            <span></span>
            <span></span>
            <span></span>
          </a> */}
          {/* </div> */}
          {/* <div className={`navbar-menu ${navbarOpen ? 'is-active' : ''}`}>
            <div> */}
          <div className="navbar-item navbar-item-font">
            {!Auth.isAuthenticated() && <Link to="/register">register</Link>}
          </div>
          <div className="navbar-item navbar-item-font">
            {!Auth.isAuthenticated() && <Link to="/login">login</Link>}
          </div>
          <div className="navbar-item navbar-item-font">
            {Auth.isAuthenticated() && <Link to="/projects/new">new project</Link>}
          </div>
          <div className="navbar-item navbar-end navbar-item-font">
            <Link to="/search">start your journey</Link>
          </div>
          <div className="navbar-item navbar-item-font">
            {Auth.isAuthenticated() && <Link to={`/users/${this.state.username}`}>my portfolio</Link>}
          </div>
          <div className="navbar-item navbar-item-font">
            {Auth.isAuthenticated() && <button className="button" onClick={this.handleLogout}>logout {this.state.name}</button>}
          </div>
          {/* </div>
          </div> */}
        </div>
      </nav>
    )
  }
}
export default withRouter(Navbar)