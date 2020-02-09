import React from 'react'
const UserForm = ({ data, handleChange, handleSubmit }) => {
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
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
export default UserForm