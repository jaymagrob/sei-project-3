import React from 'react'
import Select from 'react-select'
import ImageUpload from '../common/ImageUpload'
import colorStyles from '../../lib/colourStyles'

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
    <section className="is-fullheight-with-navbar hero">
      <div className="border1 hero-body columns is-fullwidth">
        <div className="column is-quarter-desktop"></div>
        <div className='column is-three-quarters-mobile is-half-tablet is-one-third-desktop box'>        
          <form onSubmit={handleSubmit}>
            <div className="title-underLine">
              <h2 className="title is-4 padding-v-10">Project</h2>
            </div> 

            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input      
                  className="input"            
                  onChange={handleChange}
                  required
                  name="name"
                  placeholder="name"
                  value={data.name}
                />
              </div>

              <div className="field">
                <label className="label">Upload Project Image</label>
                <div className="control">
                  <ImageUpload
                    labelText="Upload an image to show off your project!"
                    onChange={handleChange}
                    required
                    name="images"
                    handleChangeImage={handleChangeImage}
                    fieldName="images"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <input
                    className="input"   
                    onChange={handleChange}
                    required
                    name="description"
                    value={data.description}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Location</label>
                <div className="control">
                  <input
                    className="input"   
                    onChange={handleChange}
                    name="location"
                    value={data.location}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Completed?</label>
                <div className="control">
                  <input
                    className="input"   
                    type="checkbox"
                    onChange={handleChange}
                    name="completed"
                    checked={data.completed}
                  />
                </div>
              </div>

              {!data.completed &&
              <div className="field">
                <label className="label">Looking for help?</label>
                <div className="control">
                  <input
                    className="input"   
                    type="checkbox"
                    onChange={handleChange}
                    name="recruiting"
                    checked={data.recruiting}
                  />
                </div>
              </div>}

              {data.recruiting && !data.completed &&
                <div className="field">
                  <div className="label">Looking for...</div>
                  <div className="control">  
                    <Select
                      options={professionOptions}
                      isMulti
                      name="lookingFor"
                      styles={colorStyles}  
                      value={professionOptions.filter(skill => data.lookingFor.includes(skill.value))}
                      onChange={handleMultiChange}
                    />
                  </div>
                </div>}

              <div className="field">
                <div className="label">Skills</div>
                <div className="control">  
                  <Select
                    options={skillsOptions}
                    isMulti
                    name="skillsInvolved"
                    value={skillsOptions.filter(skill => data.skillsInvolved.includes(skill.value))}
                    onChange={handleMultiChange}
                    styles={colorStyles} 
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button className="button is-primary has-text-white is-fullwidth" type="submit">Save Project</button>            
                </div>
              </div>              
            </div>
          </form>
        </div>
        <div className="column is-quarter-desktop"></div>        
      </div>
    </section>

  )
}

export default ProjectForm