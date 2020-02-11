import React from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
// import Auth from '../../lib/auth'
import ProjectCard from '../projects/ProjectCard'

class UserShow extends React.Component {
  state = {
    user: {}
  }

  async componentDidMount() {
    const currentUsername = this.props.match.params.username
    // console.log(this.props.match.params.username)
    try {
      const res = await axios.get(`/api/users/${currentUsername}`)
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { user } = this.state
    if (!user._id) return null

    return (
      <section>
        <div>
          <h1>Name: {user.name}</h1>
        </div>
        <div>
          <h1>Profile Image:
            <img src={user.profileImage} />
          </h1>
          <p>Username: {user.username}</p>
          <h3>Other Info</h3>
          <h4>Location</h4>
          <p>{user.location}</p>
          <h4>Bio</h4>
          <p>{user.bio}</p>
          <h4>Professions</h4>
          <ul>{user.professions.map(profession => <li key={profession}>{profession}</li>)}</ul>
          <h4>Level</h4>
          <p>{user.level}</p>
          <h4>Skills</h4>
          <ul>{user.skills.map(skill => <li key={skill['skill']}>{skill['skill']}</li>)}</ul>
          <h4>Owned Projects</h4>
          {user.createdProjects.map(project => (
            <ProjectCard key={project._id} {...project} />
          ))}
          <h4>Collaborated Projects</h4>
          {/* <ul>{collaboratedProjects.map(project => <li key={project}>{project}</li>)}</ul> */}
          {user.collaboratedProjects.map(project => (
            <ProjectCard key={project._id} {...project} />
          ))}
        </div>
      </section>
    )
  }
}

export default UserShow