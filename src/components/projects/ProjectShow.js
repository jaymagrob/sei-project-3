import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

class ProjectShow extends React.Component {
  state = {
    project: {}
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
        {Auth.isAuthenticated() && <Link to={`/projects/${this.props.match.params.id}/edit`}>Edit</Link>}
      </section>
    )
  }
}

export default ProjectShow