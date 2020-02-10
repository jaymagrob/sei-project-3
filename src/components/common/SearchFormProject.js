import React from 'react'
import Select from 'react-select'


const SearchCardUser = ({ projectForm, handleChange, handleMultiChange, professionOptions, skillsOptions }) => {

  return (
  
    <section>
      <div>
        <h2>PROJECT SEARCH</h2>
      </div>

      <div>
        <h3>Profession/Industry</h3>
      </div>
      <Select
        options={professionOptions}
        isMulti
        onChange={(e) => handleMultiChange(e,'projectForm','lookingFor')}
      />

      <div>
        <h3>Skills Involved</h3>
      </div>
      <Select
        options={skillsOptions}
        isMulti
        onChange={(e) => handleMultiChange(e,'projectForm','skillsInvolved')}
      />

      <div>
        <h3>Location</h3>
      </div>
      <input
        className="input"
        name="location"
        value={projectForm.location}
        onChange={(e) => handleChange(e,'projectForm')}
      />

      <div>
        <h3>Recruiting?</h3>
      </div>
      <input
        name="recruiting"
        type="checkbox"
        onChange={(e) => handleChange(e,'projectForm')}
        checked={projectForm.recruiting}
      />

      <div>
        <h3>Project Name</h3>
      </div>
      <input
        className="input"
        name="name"
        value={projectForm.name}
        onChange={(e) => handleChange(e,'projectForm')}
      />
    </section>
  )
}

export default SearchCardUser