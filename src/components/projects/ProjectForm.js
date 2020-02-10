import React from 'react'

const ProjectForm = ({ handleChange }) => (
  <div>
    <section>
      <h1>New Project</h1>
      <form>
        <div>
          <label>Name</label>
          <input 
            onChange={handleChange}
            required
            name="name"
          />
        </div>
        <div>
          <label>Description</label>
          <input 
            onChange={handleChange}
            name="description"
          />
        </div>
        <div>
          <label>Location</label>
          <input 
            onChange={handleChange}
            name="location"
          />
        </div>
      </form>
    </section>
  </div>
)

export default ProjectForm