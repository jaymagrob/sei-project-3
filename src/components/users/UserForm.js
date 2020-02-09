import React from 'react'
const UserForm = ({  data, handleChange, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Name</h2>
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
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
export default UserForm