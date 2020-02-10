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
    projectForm: {
      lookingFor: [''],
      skillsInvolved: [''],
      location: '',
      recruiting: false,
      name: ''
    },
    userForm: {
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
  handleChange = ({ target: { name, value, checked, type } },stateType) => {
    const newValue = type === 'checkbox' ? checked : value
    const newData = { ...this.state[stateType], [name]: newValue }
    this.setState({ [stateType]: newData })
  }

  // this is handling the multichange in the first form select 
  handleMultiChange = (selected,formType,formName) => {
    const lookingFor = selected ? selected.map(item => item.value) : []
    const newData = { ...this.state[formType], [formName]: lookingFor }
    this.setState({ [formType]: newData  })
  }

  

  render() {
    const { formData, projectForm, userForm } = this.state
    console.log(this.state.users)
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
              onChange={(e) => this.handleChange(e,'formData')}
              checked={formData.searchingFor === 'projects'}
            />
            <h4>Creatives</h4>
            <input
              name="searchingFor"
              type="radio"
              value="users"
              onChange={(e) => this.handleChange(e,'formData')}
              checked={formData.searchingFor === 'users'}
            />
          </div>
        </section>

        {/* this section (projectForm in state) will appear only if you select that you're looking for projects */}
        
        {this.state.formData.searchingFor === 'projects' && 
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
            onChange={(e) => this.handleMultiChange(e,'projectForm','lookingFor')}
          />

          <div>
            <h3>Skills Involved</h3>
          </div>
          <Select
            options={this.skillsOptions}
            isMulti
            onChange={(e) => this.handleMultiChange(e,'projectForm','skillsInvolved')}
          />

          <div>
            <h3>Location</h3>
          </div>
          <input
            className="input"
            name="location"
            value={projectForm.location}
            onChange={(e) => this.handleChange(e,'projectForm')}
          />

          <div>
            <h3>Recruiting?</h3>
          </div>
          <input
            name="recruiting"
            type="checkbox"
            onChange={(e) => this.handleChange(e,'projectForm')}
            checked={projectForm.recruiting}
          />

          <div>
            <h3>Project Name</h3>
          </div>
          <input
            className="input"
            name="name"
            value={projectForm.name}
            onChange={(e) => this.handleChange(e,'projectForm')}
          />
        </section>
        }

        {/* this section (userForm in state) will appear only if you select that you're looking for creatives */}
        
        {this.state.formData.searchingFor === 'users' && 
        
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
            onChange={(e) => this.handleChange(e,'userForm')}
          />

          <div>
            <h3>Creative Username</h3>
          </div>
          <input
            className="input"
            name="username"
            value={userForm.username}
            onChange={(e) => this.handleChange(e,'userForm')}
          />

          <div>
            <h3>Location</h3>
          </div>
          <input
            className="input"
            name="location"
            value={userForm.location}
            onChange={(e) => this.handleChange(e,'userForm')}
          />

          <div>
            <h3>Level</h3>
          </div>
          <Select
            options={this.levelOptions}
            isMulti
            onChange={(e) => this.handleMultiChange(e,'userForm','level')}
          />

          <div>
            <h3>Profession/Industry</h3>
          </div>
          <Select
            options={this.professionOptions}
            isMulti
            onChange={(e) => this.handleMultiChange(e,'userForm','professions')}
          />

          <div>
            <h3>Skills Needed</h3>
          </div>
          <Select
            options={this.skillsOptions}
            isMulti
            onChange={(e) => this.handleMultiChange(e,'userForm','skills')}
          />
        </section>

        }

        {/* this section is for the results */}
        <section>
          <h1>SEARCH RESULTS</h1>
          
          {/* This is the project card. It only shows if project is selected or nothing is selected*/}
          { (!this.state.formData.searchingFor || this.state.formData.searchingFor === 'projects') &&
          <div>           
            <>
            <h2>Projects</h2>
            {this.state.projects.filter(i => {
              return (
                new RegExp(this.state.projectForm.name,'i').test(i.name) &&
                new RegExp(this.state.projectForm.location,'i').test(i.location) &&
                (!this.state.projectForm.recruiting || (this.state.projectForm.recruiting === true && i.recruiting === true)) &&
                (!this.state.projectForm.lookingFor[0] || this.state.projectForm.lookingFor.some(item => i.lookingFor.indexOf(item) >= 0)) &&
                (!this.state.projectForm.skillsInvolved[0] || this.state.projectForm.skillsInvolved.some(item => i.skillsInvolved.indexOf(item) >= 0))
              )
            })                        
              .map((i,ind) => {
                return (
                  <div key={i.name + ind}>
                    <h3 >{i.name}a</h3>
                    <img src={i.images[0]} alt={`${i.name} cover image`} />
                    <h4>{i.owner.name}</h4>
                    <p>{i.description}</p>
                    <h4>Skills Involved</h4>
                    <ul>
                      {i.skillsInvolved.map(i => '<li>' + i + '</li>')}
                    </ul>

                  </div>
                )
              })}

            </>
          </div>
          }


          {/* This is the user card. It only shows if user is selected or nothing is selected*/}
          { (!this.state.formData.searchingFor || this.state.formData.searchingFor === 'users') &&
          <div>           
            <>
            <h2>Users</h2>
            {this.state.users.filter(i => {
              const skillArray = i.skills.map(item => item.skill)
              console.log(skillArray)
              return (                
                new RegExp(this.state.userForm.name,'i').test(i.name) &&
                new RegExp(this.state.userForm.location,'i').test(i.location) &&
                new RegExp(this.state.userForm.username,'i').test(i.username) &&
                (!this.state.userForm.level[0] || this.state.userForm.level.some(item => i.level.indexOf(item) >= 0)) &&
                (!this.state.userForm.professions[0] || this.state.userForm.professions.some(item => i.professions.indexOf(item) >= 0)) &&
                (!this.state.userForm.skills[0] || this.state.userForm.skills.some(item => skillArray.indexOf(item) >= 0))
              )
            })
              .map(i => {
                return (
                  
                  <div key={i.username}>
                    <h3 >{i.name}a</h3>
                    <img src={i.profileImage} alt={`${i.name} cover image`} />
                    <h4>{i.location}</h4>
                    <h4>{i.level}</h4>
                    <h4>Skills Involved</h4>
                    <ul>
                      {i.skills.map(i => {
                        return <li key={i._id}>{i.skill}</li>
                      })}
                    </ul>

                  </div>
                )
              })}

            </>
          </div>
          }
        </section>
      </>
    )
  }

}

export default Search