import React from 'react'

class ProjectNew extends React.Component {

  // state = {
  //   data: {
  //     name: '',
  //     owner: '',
  //     collaborators: [],
  //     description: '',
  //     location: '',
  //     images: [],
  //     completed: false,
  //     recuiting: false,
  //     skillsInvolved: [],
  //     lookingFor: []
  //   }
  // }

  // handleChange = (e) => {
  //   this.setState({ [e.target.name]: e.target.value })
  // }

  render() {
    console.log('this is now rendering')
    return (
      <section>
        gfdsafgnhmfdseadwefsdgfh
        <h1>New Project</h1>
        <form>
          <div>
            <label>Name</label>
            <input 
              name="name"
            />
          </div>
        </form>
      </section>
    )
  }
}

export default ProjectNew