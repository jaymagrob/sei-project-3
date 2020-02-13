import React from 'react'

const SearchCardUser = ({ formData, handleChange }) => {
  return (
  
    <section>
      <form>
        {/* <div className="title-underLine">
          <div className="title is-4 padding-v-10">What are you searching for?</div>
        </div> */}
        <div className="radio_container">
          <div className="search_radios">
            <label className="custom_radio">
          Projects
            </label>
            <input
              className="custom_radio_button"
              name="searchingFor"
              type="radio"
              value="projects"
              onChange={(e) => handleChange(e,'formData')}
              checked={formData.searchingFor === 'projects'}
            />
          </div>
          <div className="search_radios">
            <label className="custom_radio">
          Creatives
            </label>
            <input 
              className="custom_radio_button"
              name="searchingFor"
              type="radio"
              value="users"
              onChange={(e) => handleChange(e,'formData')}
              checked={formData.searchingFor === 'users'}
            />
          </div>
        </div>        
      </form>     
    </section>
  )
}

export default SearchCardUser