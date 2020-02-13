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
      <section className="is-fullheight-with-navbar">
        <section className="section">
          <div className="columns">

            <div className="column is-one-quarter">
              <div className="container">
                <div className="has-text-centered">
                  <img className="profile-img" src={user.profileImage} />
                </div>
                <div className="has-text-centered add-margin">
                  {this.isOwner() && <Link className="button" to={'/myportfolio/edit'}>Edit Portfolio</Link>}
                </div>
              </div>
            </div>

            <div className="column">
              <div className="columns">
                <div className="column is-three-quarters">
                  <div className="subtitle-hero">
                    <h1>{user.name}</h1>
                  </div>
                  <ul className="profession-parent">{user.professions.map(profession => <li className="user-profession profession-grey-box" key={profession}>{profession}</li>)}</ul>
                </div>
                <div className="column">
                  <div className="rounded-box">
                    <p className="has-text-centered">{user.location}</p>
                  </div>
                  <div className="rounded-box">
                    <p className="has-text-centered">{user.level}</p>
                  </div>
                </div>
              </div>

              {/* <hr className="seperater-line" /> */}

              <div className="">
                <p className="bio-paragraph">{user.bio}</p>
              </div>
              <hr className="seperater-line" />
              <div className="container">

                <div className="skills-header">
                  <h4 className="header-small">skills &amp; endorsements</h4>
                </div>

                <div className="columns margin-reset is-multiline">{user.skills.map(skill => (
                  <>
                  <div className="column is-one-quarter rounded-border-box"
                    name={skill._id}
                    onClick={this.handleLike}
                    key={skill['skill']}
                    style={{ cursor: 'pointer' }}
                  >{skill['skill']}:</div>
                <div className="has-text-centered">
                  <div className="skill-circle">{skill.likes.length}</div>
                </div>
                  </>
                ))}</div>

              </div>
            </div>
          </div>
        </section>

        <section>
          {/* <h4>Owned Projects</h4>
          {user.createdProjects.map(project => (
            <ProjectCard key={project._id} {...project} />
          ))} */}
          {/* <ul>{collaboratedProjects.map(project => <li key={project}>{project}</li>)}</ul> */}
          <div className="columns is-mobile is-multiline">
            {user.collaboratedProjects.map(project => (
              <ProjectCard className="" key={project._id} {...project} />
            ))}
          </div>
        </section>
      </section>
    )
  }
}

export default UserShow