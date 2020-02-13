import React from 'react'

const SearchCardUser = ({ formData, handleChange }) => {
  return (
  
    <section>
      <form>
        <div className="title-underLine">
          <div className="title is-4 padding-v-10">What are you searching for?</div>
        </div>
        <div className="control">
          <label className="radio">
            <input
              name="searchingFor"
              type="radio"
              value="projects"
              onChange={(e) => handleChange(e,'formData')}
              checked={formData.searchingFor === 'projects'}
            />Projects
          </label>
          <label className="radio">
            <input 
              name="searchingFor"
              type="radio"
              value="users"
              onChange={(e) => handleChange(e,'formData')}
              checked={formData.searchingFor === 'users'}
            />Creatives
          </label>
        </div>        
      </form>     
    </section>
  )
}

export default SearchCardUser