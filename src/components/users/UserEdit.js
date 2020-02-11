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
      skills: [{ skill: '' }]
    },
    usernameMain: ''
  }


  async componentDidMount() {
    // const currentUsername = this.props.match.params.username
    // console.log(this.state.data)
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
      // const res = await axios.put(`/api/users/${this.props.match.params.id}`, { ...this.state.data }, {
      const res = await axios.put('/api/myportfolio/edit', { ...this.state.data }, {
        // const res = await axios.put('/api/myportfolio', { ...this.state.data }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      console.log(res.data)
      this.props.history.push('/myportfolio')
    } catch (err) {
      console.log(err)
    }
  }

  // skillsOptions =
  // skills.map(item => {
  //   return (
  //     { value: item, label: item }
  //   )
  // })

  handleMultiChange = (selected, metaAction) => {
    const dropSelected = selected ? selected.map(item => item.value) : []
    let skillSelected = [metaAction.option.value]
    console.log(metaAction)
    // if e.target.name === skills then map through the value of each skill and turn it into an object like skills in state above
    if (metaAction.name === 'skills') {
      skillSelected =
        skillSelected.map(item => {
          return (
            { skill: item }
          )
        })
    }
    // need to get all the selected skills set to state (atm only the last one is) 
    const data = { ...this.state.data, [metaAction.name]: dropSelected, ['skills']: skillSelected }
    this.setState({ data })
  }

  handleChangeImage = ({ target: { name, value } }) => {
    const newValue = value
    const data = { ...this.state.data, [name]: newValue }
    this.setState({ data })
  }


  render() {

    return (
      <UserForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        data={this.state.data}
        handleMultiChange={this.handleMultiChange}
        handleChangeImage={this.handleChangeImage}
      />
    )

  }
}
export default UserEdit