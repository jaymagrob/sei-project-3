import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
// import { notify } from 'react-notify-toast'

class Login extends React.Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    error: ''
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data, error: '' })
  }
  handleSubmit = async e => {
    e.preventDefault()
    
    try {
      const res = await axios.post('/api/login', this.state.data)
      console.log(res.data)
      Auth.setToken(res.data.token), console.log('token =', res.data.token)
      console.log(res.data.firstLogin)
      if (res.data.firstLogin) {
        this.props.history.push('/getstarted')
      } else {
        this.props.history.push('/discovery')
      }
    } catch (err) {
      this.setState({ error: 'Invalid Credentials' })
    }
  }
  
  render() {
    return (
      <section className="container">
        
        <div className="row">
          <form onSubmit={this.handleSubmit}>
            <h2>Login</h2>
            <div>
              <label>Email</label>
              <div>
                <input
                  className={`input ${this.state.error ? 'display' : ''}`}
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div>
              <label>Password</label>
              <div>
                <input
                  className={`input ${this.state.error ? 'display' : ''}`}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.error && <small>{this.state.error}</small>}
            </div>
            <button className="is-primary" type="submit">Login</button>
          </form>
        </div>
        <button className="button is-primary" type="submit">Login</button>
        <button className="button is-link" type="submit">Login</button>
        <button className="button is-info" type="submit">Login</button>
        <button className="button is-success" type="submit">Login</button>        
        <button className="button is-warning" type="submit">Login</button>
        <button className="button is-danger" type="submit">Login</button>
        <button className="button is-dark" type="submit">Login</button>
        <button className="button is-text" type="submit">Login</button>

      </section>
    )
  }
}
export default Login