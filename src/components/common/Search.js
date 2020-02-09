// This search page is for finding users to work on your project and/or projects to get involved with
// The left side will show a search form and the right side will display the appropriate results as the user searches 
// The user will then be able to navigate to the project pages and user pages that are displayed by clicking on them 

import React from 'react'
import axios from 'axios'

class Search extends React.Component {
  state = {
    formData: {
      searchingFor: ''
    },
    firstFormData: {
      lookingFor: [''],
      skillsInvolved: [''],
      location: '',
      recruiting: true,
      name: ''
    },
    secondFormData: {
      name: '',
      username: '',
      level: [''],
      professions: [''],
      skills: [''],
      location: ''
    },
    projects: [],
    users: []
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/users')
      const res2 = await axios.get('/api/projects')
      this.setState({ users: res.data, projects: res2.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = ({ target: { name, value, checked, type } }) => {
    console.log('clicked', name, checked, value)
    const newValue = type === 'checkbox' ? checked : value
    const formData = { ...this.state.formData, [name]: newValue }
    this.setState({ formData })
  }

  render() {
    const { formData } = this.state
    console.log(formData)
    return (
      <>
        {/* this section is for the search form */}
        {/* the first form shows if you're looking for projects or creatives */}
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
              onChange={this.handleChange}
              checked={formData.searchingFor === 'projects'}
            />
            <h4>Creatives</h4>
            <input
              name="searchingFor"
              type="radio"
              value="users"
              onChange={this.handleChange}
              checked={formData.searchingFor === 'users'}
            />
          </div>
        </section>




        {/* this section is for the results */}
        <section>
          <h1>SEARCH RESULTS</h1>
          <div>

          </div>
        </section>
      </>
    )
  }

}

export default Search