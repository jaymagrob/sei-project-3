import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
// import UserForm from './UserForm'
import { professions, skills, levels } from '../../../config/environment'
import Select from 'react-select'
class UserEdit extends React.Component {
  state = {
    data: {}
  }
  professionOptions =
    professions.map(item => {
      return (
        { value: item, label: item }
      )
    })

  skillsOptions =
    skills.map(item => {
      return (
        { value: item, label: item }
      )
    })

  levelOptions =
    levels.map(item => {
      return (
        { value: item, label: item }
      )
    })

  async componentDidMount() {
    try {
      const res = await axios.get('/api/myportfolio', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ data: res.data })
      // this.setState({ data: res.data })
      console.log('new state =', this.state.data)
    } catch (err) {
      console.log('err =', err)
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
    console.log('state =', this.state.data)
  }

  // handleMultiChange = (selected) => {
  //   const lookingFor = selected ? selected.map(item => item.value) : []
  //   const multiSelectData = { ...this.state.multiSelectData, lookingFor }
  //   this.setState({ multiSelectData })
  // }
  handleMultiChangeP = (selected) => {
    const professions = selected ? selected.map(item => item.value) : []
    const data = { ...this.state.data, professions }
    this.setState({ data })
  }

  handleMultiChangeS = (selected) => {
    const skills = selected ? selected.map(item => item.value) : []
    const data = { ...this.state.data, skills }
    this.setState({ data })
  }

  handleMultiChangeL = (selected) => {
    const level = selected ? selected.map(item => item.value) : []
    const data = { ...this.state.data, level }
    this.setState({ data })
  }

  handleSubmit = async e => {
    e.preventDefault()
    // const username = this.props.match.params.username
    const username = this.state.data.username
    console.log('username =', username)
    console.log('data =', this.state.data)
    try {
      const { data } = await axios.put(`/api/users/${username}`, this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push('/myportfolio')
    } catch (err) {
      console.log(err.response.data.errors)
    }
  }
  render() {
    const { data } = this.state
    console.log('reached user edits!')
    return (
      <section className="section">
        <div className="container">
          <h1>Edit Portfolio</h1>
          {/* <UserForm
            data={this.state.data}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            professionOptions
            skillsOptions
            levelOptions
          /> */}
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label>Name</label>
                <div>
                  <input
                    className="input"
                    placeholder="Name"
                    name="name"
                    onChange={this.handleChange}
                    value={data.name}
                  />
                </div>
              </div>
              <div>
                <label>Profile Image URL</label>
                <div>
                  <input
                    className="input"
                    placeholder="Profile Image URL"
                    name="profileImage"
                    onChange={this.handleChange}
                    value={data.profileImage}
                  />
                </div>
              </div>
              <div>
                <label>Location</label>
                <div>
                  <input
                    className="input"
                    placeholder="Location"
                    name="location"
                    onChange={this.handleChange}
                    value={data.location}
                  />
                </div>
              </div>
              <div></div>
              <div>
                <label>Bio</label>
                <div>
                  <input
                    className="input"
                    placeholder="Bio"
                    name="bio"
                    onChange={this.handleChange}
                    value={data.bio}
                  />
                </div>
              </div>
              <div>
                <label>Profession/Industry</label>
                <div>
                  <Select
                    options={this.professionOptions}
                    isMulti
                    onChange={this.handleChange}
                  // value={data.professions}
                  />
                </div>
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}
export default UserEdit