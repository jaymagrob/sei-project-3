import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import UserForm from './UserForm'
class UserEdit extends React.Component {
  state = {
    data: {
      name: ''
    }
  }
  async componentDidMount() {
    const username = this.props.match.params.username
    try {
      const res = await axios.get(`/api/users/${username}`)
      this.setState({ data: res.data })
    } catch (err) {
      console.log(err)
    }
  }
  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }
  handleSubmit = async e => {
    e.preventDefault()
    const username = this.props.match.params.username
    console.log('username =', username)
    try {
      const { data } = await axios.put(`/api/users/${username}`, this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/users/${username}`)
    } catch (err) {
      console.log(err.response.data.errors)
    }
  }
  render() {
    console.log('reached user edits!')
    return (
      <section className="section">
        <div className="container">
          <h1>Edit Portfolio</h1>
          <UserForm
            data={this.state.data}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </section>
    )
  }
}
export default UserEdit