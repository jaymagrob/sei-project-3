import React from 'react'
import Select from 'react-select'
import { skills, professions, levels } from '../../../config/environment'

const UserForm = ({ data, handleChange, handleSubmit, handleMultiChange }) => {

  const professionOptions =
    professions.map(item => {
      return (
        { value: item, label: item }
      )
    })

  const skillsOptions =
    skills.map(item => {
      return (
        { value: item, label: item }
      )
    })

  const levelOptions =
    levels.map(item => {
      return (
        { value: item, label: item }
      )
    })
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <div>
            <input
              className="input"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={data.name}
            />
          </div>
        </div>
        <div>
          <label>Profile Image URL</label>
          <div>
            <input
              className="input"
              placeholder="Profile Image URL"
              name="profileImage"
              onChange={handleChange}
              value={data.profileImage}
            />
          </div>
        </div>
        <div>
          <label>Location</label>
          <div>
            <input
              className="input"
              placeholder="Location"
              name="location"
              onChange={handleChange}
              value={data.location}
            />
          </div>
        </div>
        <div></div>
        <div>
          <label>Bio</label>
          <div>
            <input
              className="input"
              placeholder="Bio"
              name="bio"
              onChange={handleChange}
              value={data.bio}
            />
          </div>
        </div>
        <div>
          <label>Profession/Industry</label>
          <div>
            <Select
              options={professionOptions}
              isMulti
              onChange={handleMultiChange}
            />
          </div>
        </div>
        <div>
          <label>Level</label>
          <div>
            <Select
              options={levelOptions}
              isMulti
              onChange={handleMultiChange}
            />
          </div>
        </div>
        <div>
          <label>Skills</label>
          <div>
            <Select
              options={skillsOptions}
              isMulti
              onChange={handleMultiChange}
            />
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
export default UserForm