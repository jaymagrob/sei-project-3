import React from 'react'
import Select from 'react-select'

const UserForm = ({ data, handleChange, handleSubmit, professionOptions, skillsOptions, levelOptions }) => {
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
              onChange={handleChange}
              // value={data.professions}
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