import React from 'react'
import axios from 'axios'
import UserCard from '../users/UserCard'
import ProjectCard from '../projects/ProjectCard'

class Home extends React.Component {
  state = {
    projects: [],
    users: []
  }
  async componentDidMount() {
    try {
      const res = await axios.get('/api/users')
      const res2 = await axios.get('/api/projects')
      this.setState({
        users: res.data,
        projects: res2.data
      })
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <>
        <section className="hero is-fullheight">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title-hero">
                beehive
              </h1>
              <h2 className="subtitle subtitle-hero">
                for creative busy bees
              </h2>
              <div>
                <button className="button">register</button>
                <button className="button">discover</button>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h1>Discovery</h1>
          <div>
            <h2>Users</h2>
            <div>
              {this.state.users.map(user => (
                <UserCard key={user._id} {...user} />
              ))}
            </div>
          </div>
          <div>
            <h2>Projects</h2>
            <div>
              {this.state.projects.map(project => (
                <ProjectCard key={project._id} {...project} />
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default Home