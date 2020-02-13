import React from 'react'
import Select from 'react-select'
import colorStyles from '../../lib/colourStyles'


const SearchCardUser = ({ projectForm, handleChange, handleMultiChange, professionOptions, skillsOptions }) => {

  return (
  
    <section>          
      <div className="field">
        <div className="label">Profession/Industry</div>
        <div className="control">        
          <Select
            options={professionOptions}
            isMulti
            styles={colorStyles}
            onChange={(e) => handleMultiChange(e,'projectForm','lookingFor')}
          />
        </div>
      </div>
      
      <div className="field">
        <div className="label">Skills Involved</div>
        <div className="control">        
          <Select
            options={skillsOptions}
            isMulti      
            styles={colorStyles}  
            onChange={(e) => handleMultiChange(e,'projectForm','skillsInvolved')}
          />
        </div>
      </div>

      <div className="field">
        <div className="label">Location</div>
        <div className="control">        
          <input
            className="input"
            name="location"
            value={projectForm.location}
            onChange={(e) => handleChange(e,'projectForm')}
          />
        </div>
      </div>

      <div className="field">
        <div className="label">Recruiting?</div>
        <div className="control">        
          <input
            name="recruiting"
            type="checkbox"
            onChange={(e) => handleChange(e,'projectForm')}
            checked={projectForm.recruiting}
          />
        </div>
      </div>

      <div className="field">
        <div className="label">Project Name</div>
        <div className="control">        
          <input
            className="input"
            name="name"
            value={projectForm.name}
            onChange={(e) => handleChange(e,'projectForm')}
          />
        </div>
      </div>

    </section>
  )
}

export default SearchCardUser