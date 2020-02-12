import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'
import ProjectCard from '../projects/ProjectCard'

class UserShow extends React.Component {
  state = {
    user: {}
  }

  getUser = async () => {
    const currentUsername = this.props.match.params.username
    try {
      const res = await axios.get(`/api/users/${currentUsername}`)
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  async componentDidMount() {
    this.getUser()
  }

  async componentDidUpdate() {
    if (this.props.match.params.username !== this.state.user.username) {
      this.getUser()
    }
  }

  isOwner = () => Auth.getPayload().sub === this.state.user._id

  handleLike = async (e) => {
    console.log(this.state)
    try {
      const res = await axios.get(`/api/users/${this.props.match.params.username}/skills/${e.target.getAttribute('name')}/like`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { user } = this.state
    if (!user._id) return null

    return (
      <>
        <section className="section">
          <div className="columns">
            <div className="column is-one-third">
              <img className="profile-img" src={user.profileImage} />
              {this.isOwner() && <Link className="button" to={'/myportfolio/edit'}>Edit Portfolio</Link>}
            </div>
            <div className="column">
              <div className="columns">
                <div className="column">
                  <h1>{user.name}</h1>
                  <ul>{user.professions.map(profession => <li key={profession}>{profession}</li>)}</ul>
                </div>
                <div className="column">
                  <p>{user.location}</p>
                  <p>{user.level}</p>
                </div>
              </div>

              <p>{user.bio}</p>

              <section>
                <h4>Skills</h4>
                <ul>{user.skills.map(skill => (
                  <li
                    name={skill._id}
                    onClick={this.handleLike}
                    key={skill['skill']}
                    style={{ cursor: 'pointer' }}
                  >{skill['skill']}: {skill.likes.length}</li>
                ))}</ul>
              </section>
            </div>
          </div>
        </section>

        <section>
          {/* <h4>Owned Projects</h4>
          {user.createdProjects.map(project => (
            <ProjectCard key={project._id} {...project} />
          ))} */}
          <h4>Projects</h4>
          {/* <ul>{collaboratedProjects.map(project => <li key={project}>{project}</li>)}</ul> */}
          <section className="columns is-4">
            {user.collaboratedProjects.map(project => (
              <ProjectCard key={project._id} {...project} />
            ))}
          </section>
        </section>
      </>
    )
  }
}

export default UserShow