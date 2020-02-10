import React from 'react'

const SearchCardUser = ({ formData, handleChange }) => {
  console.log(formData)
  return (
  
    <section>
      <div>
        <h1>Start your search</h1>
      </div>

      <div>
        <h3>What are you searching for?</h3>
        <h4>Projects</h4>
        <input
          name="searchingFor"
          type="radio"
          value="projects"
          onChange={(e) => handleChange(e,'formData')}
          checked={formData.searchingFor === 'projects'}
        />
        <h4>Creatives</h4>
        <input
          name="searchingFor"
          type="radio"
          value="users"
          onChange={(e) => handleChange(e,'formData')}
          checked={formData.searchingFor === 'users'}
        />
      </div>
    </section>
  )
}

export default SearchCardUser