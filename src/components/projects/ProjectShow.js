import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'
import ProjectComment from './ProjectComment'
import ProjectMessage from './ProjectMessage'
// import { borderRadius } from 'react-select/src/theme'

class ProjectShow extends React.Component {
  state = {
    project: {},
    users: null,
    searchedUsers: null,
    text: '',
    showMessages: false,
    editingComment: '',
    editedCommentText: ''
    // userSearch: ''
  }

  async componentDidMount() {
    const projectId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/projects/${projectId}`)
      this.setState({ project: res.data })
      console.log('project =', this.state.project)
    } catch (err) {
      console.log(err)
    }
  }

  // this is handling the change in the first checkbox form (looking for creatives/users)
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
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
        project: this.state.project._id,
        owner: false,
        user: true,
        ownerId: this.state.project.owner._id,
        userId: Auth.getPayload().sub
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
        project: this.state.project._id,
        owner: true,
        user: false,
        ownerId: this.state.project.owner._id,
        userId: e.target.getAttribute('name')
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

  handleCommentRequest = async (e) => {
    e.preventDefault()
    const projectId = this.props.match.params.id
    try {
      const res = await axios.post(`/api/projects/${projectId}/comments`, { text: this.state.text }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ project: res.data })
    } catch (err) {
      console.log(err)
    }
    this.setState({ text: '' })
  }

  handleMessageRequest = async (e) => {
    e.preventDefault()
    const projectId = this.props.match.params.id
    try {
      const res = await axios.post(`/api/projects/${projectId}/messages`, { text: this.state.text }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ project: res.data })
    } catch (err) {
      console.log(err)
    }
    this.setState({ text: '' })
  }

  handleLike = async () => {
    const projectId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/projects/${projectId}/like`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ project: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  toggleMessageBoard = async (e) => {
    this.setState({ showMessages: !this.state.showMessages })
    // console.log('show messages =', this.state.showMessages)
    console.log(e.target.value)
  }

  handleEditSelected = (commentId, commentText) => {
    this.setState({ editingComment: commentId, editedCommentText: commentText })
  }

  handleEditComment = async (commentId) => {
    const projectId = this.props.match.params.id
    try {
      const res = await axios.put(`/api/projects/${projectId}/comments/${commentId}`, { text: this.state.editedCommentText }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ project: res.data, editingComment: '', editedCommentText: '' })
    } catch (err) {
      console.log(err)
    }
  }

  resetEditComment = () => {
    this.setState({ editedCommentText: '', editingComment: '' })
  }

  handleDeleteComment = async (projectId, commentId) => {
    try {
      const res = await axios.delete(`/api/projects/${projectId}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ project: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  isOwner = () => Auth.getPayload().sub === this.state.project.owner._id

  isCollab = () => {
    const arr = this.state.project.collaborators.map(collab => collab._id === Auth.getPayload().sub)
    return arr.includes(true)
  }



  render() {

    const { project } = this.state
    if (!project._id) return null
    // console.log('collabs included? =', this.state.project.collaborators.map(collab => collab._id === Auth.getPayload().sub))
    return (
      <section className="" style={{
        position: this.state.showMessages ? 'fixed' : 'absolute',
        overflow: this.state.showMessages ? 'hidden' : 'auto'
      }}>

        <section className="section is-fullheight-with-navbar test-border">

          <div className="container has-text-centered">

            {/* NAME */}
            <div className="">
              <h1 className="subtitle-hero">{project.name}</h1>
            </div>

            {/* LIKES */}
            <div className="">
              <div onClick={this.handleLike}><span>{project.likes.length}</span> likes</div>
            </div>

            {/* COLLABORATORS */}
            <div className="column is-half is-offset-one-quarter">
              <div className="add-margin">collaborators:</div>
              <div className="collaborator-circles" style={{ display: 'flex' }}>
                {project.collaborators.map(collaborator => {
                  return (
                    <div key={collaborator._id}>
                      <div className="add-margin" style={{
                        background: `url(${collaborator.profileImage})`,
                        height: '80px',
                        width: '80px',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '50%',
                        overflow: 'hidden'
                      }}>
                        <Link to={`/users/${collaborator.username}`} style={{
                          display: 'block',
                          height: '100%',
                          width: '100%'
                        }}>

                        </Link>
                      </div>
                      <p>{collaborator._id === this.state.project.owner._id ? 'owner' : ''}</p>
                    </div>
                  )
                })}

                {/* ADD COLLABORATOR */}
                {Auth.isAuthenticated() &&
                  <div className="add-margin"
                    onClick={this.handleAddCollaborator}
                    style={{
                      background: 'url(https://i.ya-webdesign.com/images/a-plus-png-2.png)',
                      height: '80px',
                      width: '80px',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '50%',
                      border: '1px solid #E2E2E0',
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}>
                  </div>
                }
                {/* COLLAB SEARCH */}
                {this.state.users &&
                  <input
                    placeholder="search"
                    // name="userSearch"
                    onChange={this.handleSearchChange}
                  />
                }
                {/* COLLAB SEARCH RESULTS */}
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
            </div>
          </div>

          {/* PROJECT DESCRIPTION */}
          <p className="project-paragraph has-text-centered">{project.description}</p>

          <hr className="seperater-line" />

          <section className="section">
            <div className="columns">

              {/* IMAGE */}
              <div className="column">
                <img src={project.images[0]} />
              </div>

              <div className="column">
                {/* LOCATION */}
                <p>location: {project.location}</p>

                {/* SKILLS */}
                <h2>skills:</h2>
                <p>{project.skillsInvolved.length < 1 ? 'no skills listed yet' :
                  <ul>{project.skillsInvolved.map(skill => <li key={skill}>{skill}</li>)}</ul>
                }</p>

                {/* PROJECT RECRUITING */}
                <p>{project.recruiting ? project.lookingFor.length > 0 ? `looking for: ${project.lookingFor.map(prof => ` ${prof}`)}` : 'looking for: nothing listed yet' : ''}</p>
                {/* <p>{project.recruiting ? `Looking for: ${project.lookingFor.map(prof => prof)}` : ''}</p>
          <p>{project.lookingFor.length > 0 ? `Looking for: ${project.lookingFor.map(prof => prof)}` : 'Nothing listed yet'}</p> */}

              </div>
            </div>
          </section>


          {/* MESSAGES */}
          {this.isCollab() &&
            <button className="button" onClick={this.toggleMessageBoard}>Request to Collaborate!</button>
          }

          {/* PROJECT COMPLETED */}
          <p>{project.completed ? 'this project is completed' : `looking for creatives?: ${project.recruiting ? 'yes' : 'not currently looking'}`}</p>


          {/* EXTRA IMAGE GALLERY */}
          {project.images.length > 0 ? '' :
            <div>
              <h2>Gallery</h2>
              {project.images.map((image, index) => index === 0 ? '' : <img key={image} src={image} />)}
            </div>}

          {/* EDIT BUTTON IF OWNER OF PROJECT */}
          {this.isOwner() &&
            <Link className="button" to={`/projects/${this.props.match.params.id}/edit`}>Edit Project</Link>
          }

          {/* ADD PROJECT COMMENT */}
          <ProjectComment
            comments={this.state.project.comments}
            text={this.state.text}
            handleChange={this.handleChange}
            handleCommentRequest={this.handleCommentRequest}
            handleEditSelected={this.handleEditSelected}
            handleEditComment={this.handleEditComment}
            handleDeleteComment={this.handleDeleteComment}
            projectId={this.state.project._id}
            editingComment={this.state.editingComment}
            editedCommentText={this.state.editedCommentText}
            resetEditComment={this.resetEditComment}
          />
          {/* PROJECT COMMENT DISPLAY */}
          <ProjectMessage
            messages={this.state.project.messages}
            text={this.state.text}
            handleChange={this.handleChange}
            handleMessageRequest={this.handleMessageRequest}
            toggleMessageBoard={this.toggleMessageBoard}
            showMessages={this.state.showMessages}
          />

          {/* OWNER STAR */}
          {this.isOwner() &&
            <img alt="star indicating project ownership" src="./../../assets/star.png" />
          }

        </section>

      </section>

    )
  }
}

export default ProjectShow