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

  isOwner = () => Auth.getPayload().sub === this.state.project.owner._id

  render() {
    
    const { project } = this.state
    if (!project._id) return null
    console.log('Project =', project)
    console.log('Owner =', project.owner.username)

    return (
      <section>
        <div>
          {this.isOwner() &&
          <img alt="star indicating project ownership" src="./../../assets/star.png" />
          }
          <h1>Project Name: {project.name}</h1>
          <p>Location: {project.location}</p>
          <p>{project.completed ? 'This project is completed' : `Recruitment Status: ${project.recruiting ? 'Recruiting' : 'Not currently recruiting'}`}</p>
          <p>{project.recruiting ? project.lookingFor.length > 0 ? `Looking for: ${project.lookingFor.map(prof => prof)}` : 'Looking for: Nothing listed yet' : ''}</p>
          {/* <p>{project.recruiting ? `Looking for: ${project.lookingFor.map(prof => prof)}` : ''}</p>
          <p>{project.lookingFor.length > 0 ? `Looking for: ${project.lookingFor.map(prof => prof)}` : 'Nothing listed yet'}</p> */}
          <h2>Skills Involved</h2>
          <p>{project.skillsInvolved.length < 1 ? 'No skills listed yet' :
            <ul>{project.skillsInvolved.map(skill => <li key={skill}>{skill}</li>)}</ul>
          }</p>
          
          <p>Likes: {project.likes.length}</p>
        </div>
        <div>
          <h2><img src={project.images[0]}/></h2>
        </div>
        <div>Collaborators</div>
        <div style={{ display: 'flex' }}>
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
                overflow: 'hidden',
                cursor: 'pointer'
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
                style={{ cursor: 'pointer' }}
              >
                <div style={{ background: `url(${user.profileImage})`, pointerEvents: 'none' }}></div>
                <h2 style={{ pointerEvents: 'none' }}>{user.name}</h2>
              </div>
            )
          })
          }
        </div>
        <p>Project Description: {project.description}</p>
        {project.images.length > 0 ? '' :
          <div>
            <h2>Gallery</h2>
            {project.images.map((image, index) => index === 0 ? '' : <img key={image} src={image}/>)}
          </div>}
        

        {this.isOwner() &&
        <Link to={`/projects/${this.props.match.params.id}/edit`}>Edit Project</Link>
        }
        
      </section>
    )
  }
}

export default ProjectShow