import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'
// import { borderRadius } from 'react-select/src/theme'

class ProjectShow extends React.Component {
  state = {
    project: {},
    users: null,
    searchedUsers: null
    // userSearch: ''
  }

  async componentDidMount() {
    const projectId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/projects/${projectId}`)
      this.setState({ project: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  userSearch = async () => {
    try {
      const res = await axios.get('/api/users')
      this.setState({ users: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleSearchChange = (e) => {
    const searchedUsers = this.state.users.filter(user => user.name.toLowerCase().includes(e.target.value.toLowerCase()))
    if (searchedUsers.length === this.state.users.length) {
      this.setState({ searchedUsers: null })
    } else {
      this.setState({ searchedUsers })
    }
  }

  handleAddCollaborator = async () => {
    if (this.state.project.owner._id !== Auth.getPayload().sub) {
      const collabObject = {
        project: {
          project: this.state.project._id,
          owner: false,
          user: true
        },
        owner: this.state.project.owner._id,
        user: Auth.getPayload().sub
      }
      try {
        const res = await axios.post('/api/users/collaborate', collabObject, {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    } else {
      this.userSearch()
    }
  }

  handleAddCollaboratorTwo = async (e) => {
    if (this.state.project.owner._id === Auth.getPayload().sub) {
      const collabObject = {
        project: {
          project: this.state.project._id,
          owner: true,
          user: false
        },
        owner: this.state.project.owner._id,
        user: e.target.getAttribute('name')
      }
      try {
        const res = await axios.post('/api/users/collaborate', collabObject, {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
    this.setState({ users: null, searchedUsers: null })
  }

  render() {
    const { project } = this.state
    if (!project._id) return null

    return (
      <section>
        <div>
          <h1>Name: {project.name}</h1>
        </div>
        <div>
          <h2>Image: {project.image}</h2>
        </div>
        <div>
          {project.collaborators.map(collaborator => {
            return (
              <div key={collaborator._id}>
                <div style={{
                  background: `url(${collaborator.profileImage})`,
                  height: '80px',
                  width: '80px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '50%',
                  overflow: 'hidden'
                }}><Link to={`/users/${collaborator.username}`} style={{
                    display: 'block',
                    height: '100%',
                    width: '100%'
                  }}></Link>
                </div>
              </div>
            )
          })}
          {Auth.isAuthenticated() &&
            <div 
              onClick={this.handleAddCollaborator}
              style={{
                background: 'url(https://i.ya-webdesign.com/images/a-plus-png-2.png)',
                height: '80px',
                width: '80px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '50%',
                overflow: 'hidden'
              }}>
            </div>
          }
          {this.state.users && 
          <input 
            placeholder="search"
            // name="userSearch"
            onChange={this.handleSearchChange}
          />
          }
          {this.state.searchedUsers && 
          this.state.searchedUsers.map(user => {
            return (
              <div 
                onClick={this.handleAddCollaboratorTwo}
                key={user._id}
                name={user._id}
              >
                <div style={{ background: `url(${user.profileImage})`, pointerEvents: 'none' }}></div>
                <h2 style={{ pointerEvents: 'none' }}>{user.name}</h2>
              </div>
            )
          })
          }
        </div>
        {Auth.isAuthenticated() && <Link to={`/projects/${this.props.match.params.id}/edit`}>Edit</Link>}
      </section>
    )
  }
}

export default ProjectShow