import React from 'react'
import { Link } from 'react-router-dom'

const ProjectCard = ({ name, images, _id, description, owner }) => (
  <div key={_id}>
    <Link to={`/projects/${_id}`}>
      <div>
        <div>
          <img src={images[0]} alt={name} />
        </div>
        <div>
          <h3>{name}</h3>
        </div>
        <div>
          <h5>{description}</h5>
        </div>
        <div>
          <h4>{owner.location}</h4>
        </div>
      </div>
    </Link>
  </div>
)

export default ProjectCard