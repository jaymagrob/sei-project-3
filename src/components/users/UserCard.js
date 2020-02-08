import React from 'react'
import { Link } from 'react-router-dom'
const UserCard = ({ name, profileImage, location, _id }) => (
  <div key={_id}>
    <Link to={`/users/${_id}`}>
      <div>
        <figure>
          <img src={profileImage} alt={name} />
        </figure>
      </div>
      <div>
        <div>
          <h4>{name}</h4>
        </div>
        <div>
          <h5>{location}</h5>
        </div>
      </div>
    </Link>
  </div>
)
export default UserCard