// This search page is for finding users to work on your project and/or projects to get involved with
// The left side will show a search form and the right side will display the appropriate results as the user searches 
// The user will then be able to navigate to the project pages and user pages that are displayed by clicking on them 

import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import { professions, skills, levels } from '../../../config/environment'

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

  // maping through the professions and skills array and creating objects of each one to use in select form
  professionOptions =
    professions.map(item => {
      return (
        { value: item, label: item }
      )
    })

  skillsOptions =
    skills.map(item => {
      return (
        { value: item, label: item }
      )
    })

  levelOptions =
    levels.map(item => {
      return (
        { value: item, label: item }
      )
    })

  async componentDidMount() {
    try {
      const res = await axios.get('/api/users')
      const res2 = await axios.get('/api/projects')
      this.setState({ users: res.data, projects: res2.data })
    } catch (err) {
      console.log(err)
    }
  }

  // this is handling the change in the first checkbox form (looking for creatives/users)
  handleChange = ({ target: { name, value, checked, type } }) => {
    const newValue = type === 'checkbox' ? checked : value
    const formData = { ...this.state.formData, [name]: newValue }
    this.setState({ formData })
  }

  // this is handling the change in the second forms checkbox (recruiting/not recruiting)
  handleChangeFirstForm = ({ target: { name, value, checked, type } }) => {
    const newValue = type === 'checkbox' ? checked : value
    const firstFormData = { ...this.state.firstFormData, [name]: newValue }
    this.setState({ firstFormData })
  }

  // this is handling the change in the third form checkbox
  handleChangeSecondForm = ({ target: { name, value, checked, type } }) => {
    const newValue = type === 'checkbox' ? checked : value
    const secondFormData = { ...this.state.firstFormData, [name]: newValue }
    this.setState({ secondFormData })
  }

  // this is handling the multichange in the first form select 
  handleMultiChange = (selected) => {
    const lookingFor = selected ? selected.map(item => item.value) : []
    const firstFormData = { ...this.state.firstFormData, lookingFor }
    this.setState({ firstFormData })
  }

  // this is handling the multichange in the second form select
  handleMultiChangeSecondForm = (selected) => {
    const level = selected ? selected.map(item => item.value) : []
    const secondFormData = { ...this.state.secondFormData, level }
    this.setState({ secondFormData })
  }

  render() {
    const { formData, firstFormData, secondFormData } = this.state
    console.log(this.state)
    return (
      <>
        {/* this section is for the search form */}
        {/* this section (formData in state) will show first to check if you're looking for projects or creatives */}
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

        {/* this section (firstFormData in state) will appear only if you select that you're looking for projects */}
        <section>
          <div>
            <h2>PROJECT SEARCH</h2>
          </div>

          <div>
            <h3>Profession/Industry</h3>
          </div>
          <Select
            options={this.professionOptions}
            isMulti
            onChange={this.handleMultiChange}
          />

          <div>
            <h3>Skills Involved</h3>
          </div>
          <Select
            options={this.skillsOptions}
            isMulti
            onChange={this.handleMultiChange}
          />

          <div>
            <h3>Location</h3>
          </div>
          <input
            className="input"
            name="location"
            value={firstFormData.location}
            onChange={this.handleChangeFirstForm}
          />

          <div>
            <h3>Recruiting?</h3>
          </div>
          <input
            name="recruiting"
            type="checkbox"
            onChange={this.handleChangeFirstForm}
            checked={firstFormData.recruiting}
          />

          <div>
            <h3>Project Name</h3>
          </div>
          <input
            className="input"
            name="name"
            value={firstFormData.name}
            onChange={this.handleChangeFirstForm}
          />
        </section>

        {/* this section (secondFormData in state) will appear only if you select that you're looking for creatives */}
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
            value={secondFormData.name}
            onChange={this.handleChangeSecondForm}
          />

          <div>
            <h3>Creative Username</h3>
          </div>
          <input
            className="input"
            name="username"
            value={secondFormData.username}
            onChange={this.handleChangeSecondForm}
          />

          <div>
            <h3>Location</h3>
          </div>
          <input
            className="input"
            name="location"
            value={secondFormData.location}
            onChange={this.handleChangeSecondForm}
          />

          <div>
            <h3>Level</h3>
          </div>
          <Select
            options={this.levelOptions}
            isMulti
            onChange={this.handleMultiChangeSecondForm}
          />

          <div>
            <h3>Profession/Industry</h3>
          </div>
          <Select
            options={this.professionOptions}
            isMulti
            onChange={this.handleMultiChangeSecondForm}
          />

          <div>
            <h3>Skills Needed</h3>
          </div>
          <Select
            options={this.skillsOptions}
            isMulti
            onChange={this.handleMultiChangeSecondForm}
          />
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