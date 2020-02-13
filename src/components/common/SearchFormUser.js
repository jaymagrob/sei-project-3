import React from 'react'
import Select from 'react-select'
import colorStyles from '../../lib/colourStyles'


const SearchCardUser = ({ userForm, handleChange, handleMultiChange, professionOptions, skillsOptions, levelOptions }) => {

  return (
  
    <section>
      <div className="title-underLine">
        <h2 className="subtitle is-4">User Search</h2>
      </div>

      <div className="field">
        <div className="label">Name</div>
        <div className="control">        
          <input
            className="input"
            name="name"
            value={userForm.name}
            onChange={(e) => handleChange(e,'userForm')}
          />
        </div>
      </div>   

      <div className="field">
        <div className="label">Username</div>
        <div className="control">        
          <input
            className="input"
            name="username"
            value={userForm.username}
            onChange={(e) => handleChange(e,'userForm')}
          />
        </div>
      </div>    

      <div className="field">
        <div className="label">Location</div>
        <div className="control">        
          <input
            className="input"
            name="location"
            value={userForm.location}
            onChange={(e) => handleChange(e,'userForm')}
          />
        </div>
      </div>   

      <div className="field">
        <div className="label">Levels</div>
        <div className="control">        
          <Select                  
            options={levelOptions}
            isMulti
            onChange={(e) => handleMultiChange(e,'userForm','level')}
            styles={colorStyles}  
          />
        </div>
      </div>

      <div className="field">
        <div className="label">Profession/Industry</div>
        <div className="control">        
          <Select                
            menuPlacement="top"  
            options={professionOptions}
            isMulti
            onChange={(e) => handleMultiChange(e,'userForm','professions')}
            styles={colorStyles}  
          />
        </div>
      </div>

      <div className="field">
        <div className="label">Skills Needed</div>
        <div className="control">        
          <Select 
            menuPlacement="top"
            options={skillsOptions}
            isMulti
            onChange={(e) => handleMultiChange(e,'userForm','skills')}
            styles={colorStyles}  
          />
        </div>
      </div>
    </section>

  )
}

export default SearchCardUser