import React from 'react'
import Select from 'react-select'
import ImageUpload from '../common/ImageUpload'

import { skills, professions } from '../../../config/environment'

const ProjectForm = ({ handleChange, handleSubmit, data, handleMultiChange, handleChangeImage }) => {

  const skillsOptions =
    skills.map(item => {
      return (
        { value: item, label: item }
      )
    })

  const professionOptions =
    professions.map(item => {
      return (
        { value: item, label: item }
      )
    })


  return (
    <div>
      {console.log(data)}
      <section>
        <h1>Project</h1>
        <form
          onSubmit={handleSubmit}
        >
          <div>
            <label>Name</label>
            <input
              onChange={handleChange}
              required
              name="name"
              value={data.name}
            />
          </div>
          <div>
            <label>Upload Project Image</label>
            <ImageUpload
              labelText="Upload an image to show off your project!"
              onChange={handleChange}
              required
              name="images"
              handleChangeImage={handleChangeImage}
              fieldName="images"
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              onChange={handleChange}
              required
              name="description"
              value={data.description}
            />
          </div>
          <div>
            <label>Location</label>
            <input
              onChange={handleChange}
              name="location"
              value={data.location}
            />
          </div>
          <div>
            <label>Completed?</label>
            <input
              type="checkbox"
              onChange={handleChange}
              name="completed"
              value={data.completed}
            />
          </div>
          <div>
            <label>Looking for Help?</label>
            <input
              type="checkbox"
              onChange={handleChange}
              name="recuiting"
              value={data.recuiting}
            />
          </div>
          {data.recuiting &&
            <div>
              <label>Looking for...</label>
              <Select
                options={professionOptions}
                isMulti
                name="lookingFor"
                value={professionOptions.filter(skill => data.lookingFor.includes(skill.value))}
                onChange={handleMultiChange}
              />
              {/* <input 
            onChange={handleChange}
            name="lookingFor"
            value={data.lookingFor}
          /> */}
            </div>
          }
          <div>
            <label>Skills</label>
            <Select
              options={skillsOptions}
              isMulti
              name="skillsInvolved"
              value={skillsOptions.filter(skill => data.skillsInvolved.includes(skill.value))}
              onChange={handleMultiChange}
            />
          </div>
          <div>
            <button type="submit">Create a New Project</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default ProjectForm