import React from 'react'
import Select from 'react-select'


const SearchCardUser = ({ userForm, handleChange, handleMultiChange, professionOptions, skillsOptions, levelOptions }) => {

  return (
  
    <section>
      <div>
        <h2>USER SEARCH</h2>
      </div>

      <div>
        <h3>Creative Name</h3>
      </div>
      <input
        className="input"
        name="name"
        value={userForm.name}
        onChange={(e) => handleChange(e,'userForm')}
      />

      <div>
        <h3>Creative Username</h3>
      </div>
      <input
        className="input"
        name="username"
        value={userForm.username}
        onChange={(e) => handleChange(e,'userForm')}
      />

      <div>
        <h3>Location</h3>
      </div>
      <input
        className="input"
        name="location"
        value={userForm.location}
        onChange={(e) => handleChange(e,'userForm')}
      />

      <div>
        <h3>Level</h3>
      </div>
      <Select
        options={levelOptions}
        isMulti
        onChange={(e) => handleMultiChange(e,'userForm','level')}
      />

      <div>
        <h3>Profession/Industry</h3>
      </div>
      <Select
        options={professionOptions}
        isMulti
        onChange={(e) => handleMultiChange(e,'userForm','professions')}
      />

      <div>
        <h3>Skills Needed</h3>
      </div>
      <Select
        options={skillsOptions}
        isMulti
        onChange={(e) => handleMultiChange(e,'userForm','skills')}
      />
    </section>

  )
}

export default SearchCardUser