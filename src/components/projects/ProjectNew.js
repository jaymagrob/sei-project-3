import React from 'react'

import ProjectForm from './ProjectForm'

class ProjectNew extends React.Component{

  state = {
    name: '',
    owner: '',
    collaborators: [],
    description: '',
    location: '',
    images: [],
    completed: false,
    recuiting: false,
    skillsInvolved: [],
    lookingFor: []
  }

  handleChange = () => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    console.log(this.state)
    return (
      <ProjectForm
        handleChange={this.handleChange}
      />
    )
  }
}

export default ProjectNew