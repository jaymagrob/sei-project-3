import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import UserForm from './UserForm'
// import { professions, skills, levels } from '../../../config/environment'
// import Select from 'react-select'
class UserEdit extends React.Component {
  state = {
    data: {
      name: '',
      bio: '',
      location: '',
      profileImage: '',
      professions: [],
      level: [],
      skills: []
    },
    usernameMain: ''
  }

  // async componentDidMount() {
  //   try {
  //     const res = await axios.get('/api/myportfolio', {
  //       headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //     })
  //     this.setState({ data: res.data })
  //     // this.setState({ data: res.data })
  //     console.log('new state =', this.state.data)
  //   } catch (err) {
  //     console.log('err =', err)
  //   }
  // }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/myportfolio', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({
        data: res.data,
        usernameMain: res.data.username
      })
    } catch (err) {
      console.log(err)
    }
  }

  // handleChange = ({ target: { name, value } }) => {
  //   const data = { ...this.state.data, [name]: value }
  //   this.setState({ data })
  //   console.log('state =', this.state.data)
  // }

  handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : event.target.value
    const data = { ...this.state.data, [e.target.name]: value }
    this.setState({ data })
  }

  // handleMultiChange = (selected) => {
  //   const lookingFor = selected ? selected.map(item => item.value) : []
  //   const multiSelectData = { ...this.state.multiSelectData, lookingFor }
  //   this.setState({ multiSelectData })
  // }


  // handleSubmit = async e => {
  //   e.preventDefault()
  //   // const username = this.props.match.params.username
  //   const username = this.state.data.username
  //   console.log('username =', username)
  //   console.log('data =', this.state.data)
  //   try {
  //     const { data } = await axios.put(`/api/users/${username}`, this.state.data, {
  //       headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //     })
  //     this.props.history.push('/myportfolio')
  //   } catch (err) {
  //     console.log(err.response.data.errors)
  //   }
  // }



  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // const res = await axios.put(`/api/users/${this.props.match.params.id}`, { ...this.state.data }, {
      const res = await axios.put(`/api/users/${this.state.username}`, { ...this.state.data }, {
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
    return (
      <UserForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        data={this.state.data}
        handleMultiChange={this.handleMultiChange}
      />
    )
    // <section className="section">
    //   <div className="container">
    //     <h1>Edit Portfolio</h1>
    // {/* <UserForm
    //         data={this.state.data}
    //         handleChange={this.handleChange}
    //         handleSubmit={this.handleSubmit}
    //         professionOptions
    //         skillsOptions
    //         levelOptions
    //       /> */}
    //     <div>
    //       <form onSubmit={this.handleSubmit}>
    //         <div>
    //           <label>Name</label>
    //           <div>
    //             <input
    //               className="input"
    //               placeholder="Name"
    //               name="name"
    //               onChange={this.handleChange}
    //               value={data.name}
    //             />
    //           </div>
    //         </div>
    //         <div>
    //           <label>Profile Image URL</label>
    //           <div>
    //             <input
    //               className="input"
    //               placeholder="Profile Image URL"
    //               name="profileImage"
    //               onChange={this.handleChange}
    //               value={data.profileImage}
    //             />
    //           </div>
    //         </div>
    //         <div>
    //           <label>Location</label>
    //           <div>
    //             <input
    //               className="input"
    //               placeholder="Location"
    //               name="location"
    //               onChange={this.handleChange}
    //               value={data.location}
    //             />
    //           </div>
    //         </div>
    //         <div></div>
    //         <div>
    //           <label>Bio</label>
    //           <div>
    //             <input
    //               className="input"
    //               placeholder="Bio"
    //               name="bio"
    //               onChange={this.handleChange}
    //               value={data.bio}
    //             />
    //           </div>
    //         </div>
    //         <div>
    //           <label>Profession/Industry</label>
    //           <div>
    //             <Select
    //               options={this.professionOptions}
    //               isMulti
    //               onChange={this.handleChange}
    //             // value={data.professions}
    //             />
    //           </div>
    //         </div>
    //         <div>
    //           <button type="submit">Submit</button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </section>
    // )
  }
}
export default UserEdit