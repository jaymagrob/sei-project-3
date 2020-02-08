import React from 'react'
import { Link } from 'react-router-dom'

const ProjectCard = ({ name, image, _id, description }) => (
  <div className="column is-one-quarter-desktop is-one-third-tablet is-full-mobile">
    <Link to={`/projects/${_id}`}>
      <div>
        <div>
          <img src={image} alt={name} />
        </div>
        <div>
          <h3>{name}</h3>
        </div>
        <div>
          <h5>{description}</h5>
        </div>
        <div>
          <h4>{location}</h4>
        </div>
      </div>
    </Link>
  </div>
)

export default ProjectCard