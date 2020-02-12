import React from 'react'
import axios from 'axios'
import UserCard from '../users/UserCard'
import ProjectCard from '../projects/ProjectCard'

import Gallery from './Gallery'

class Discovery extends React.Component {
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
      <section>
        <h1>Discovery</h1>
        <div>
          <div>
            <h2>Users</h2>
            <div>
              <Gallery data={this.state.users} type={'users'}/>
              {/* {this.state.users.map(user => (
              <UserCard key={user._id} {...user} />
            ))} */}
            </div>
          </div>
          <div>
            <h2>Projects</h2>
            <div>
              <Gallery data={this.state.projects} type={'projects'}/>
              {/* {this.state.projects.map(project => (
              <ProjectCard key={project._id} {...project} />
            ))} */}
            </div>
          </div>
        </div>
      </section>

    )
  }
}
export default Discovery