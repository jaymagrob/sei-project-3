import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import UserForm from './UserForm'
class UserEdit extends React.Component {
  state = {
    data: {
      name: '',
      bio: '',
      location: '',
      profileImage: '',
      professions: [],
      level: '',
      skills: [{}]
    },
    usernameMain: ''
  }


  async componentDidMount() {
    try {
      const res = await axios.get('/api/myportfolio', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      // const res = await axios.get(`/api/projects/${this.props.match.params.id}`)
      this.setState({
        data: res.data,
        usernameMain: res.data.username
      })
    } catch (err) {
      console.log(err)
    }
  }


  handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : event.target.value
    const data = { ...this.state.data, [e.target.name]: value }
    this.setState({ data })
  }



  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log('username main =', this.state.usernameMain)
      // const res = await axios.put(`/api/users/${this.props.match.params.id}`, { ...this.state.data }, {
      const res = await axios.put(`/api/users/${this.state.usernameMain}`, { ...this.state.data }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      console.log('submitted data', res.data)
      console.log('submitted state', this.state.data)
      this.props.history.push('/myportfolio')
    } catch (err) {
      console.log(err)
    }
  }

  handleMultiChange = (selected, metaAction) => {
    const dropSelected = selected ? selected.map(item => item.value) : []
    const data = { ...this.state.data, [metaAction.name]: dropSelected }
    this.setState({ data })
    console.log('updated state', this.state.data)
  }


  render() {
    console.log('skills =', this.state.data.skills)
    return (
      <UserForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        data={this.state.data}
        handleMultiChange={this.handleMultiChange}
      />
    )
    
  }
}
export default UserEdit