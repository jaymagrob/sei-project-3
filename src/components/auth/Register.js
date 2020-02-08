import React from 'react'
import axios from 'axios'
class Register extends React.Component {
  state = {
    data: { 
      username: '',
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    errors: {}
  }
  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
    console.log('const data =', data)
    console.log('state =', this.state.data)
  }
  handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('localhost:4000/register, this.state.data')
      this.props.history.push('/login')
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
    }
  }
  render() {
    console.log('errors=', this.state.errors)
    return (
      <section>
        <div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <h2>Register</h2>
              <div>
                <label>Name</label>
                <div>
                  <input 
                    className={`input ${this.state.errors.name ? 'display' : ''}`}
                    placeholder="Name"
                    name="name"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.username && <small>{this.state.errors.username}</small>}
              </div>
              <div>
                <label>Username</label>
                <div>
                  <input 
                    className={`input ${this.state.errors.username ? 'display' : ''}`}
                    placeholder="Username"
                    name="username"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.username && <small>{this.state.errors.username}</small>}
              </div>
              <div>
                <label>Email</label>
                <div>
                  <input 
                    className={`input ${this.state.errors.email ? 'display' : ''}`}
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.email && <small>{this.state.errors.email}</small>}
              </div>
              <div>
                <label>Password</label>
                <div>
                  <input 
                    className={`input ${this.state.errors.password ? 'display' : ''}`}
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.password && <small>{this.state.errors.password}</small>}
              </div>
              <div>
                <label>Password Confirmation</label>
                <div>
                  <input 
                    className={`input ${this.state.errors.passwordConfirmation ? 'display' : ''}`}
                    type="password"
                    placeholder="Password Confirmation"
                    name="passwordConfirmation"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.errors.passwordConfirmation && <small>{this.state.errors.passwordConfirmation}</small>}
              </div>
              <div>
                <button type="submit">Register Me</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}
export default Register