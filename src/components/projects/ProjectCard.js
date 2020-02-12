import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

const ProjectCard = ({ name, images, _id, description, owner }) => (
  <div className="column is-one-fifth-desktop is-one-third-tablet is-full-mobile" key={_id}>
    <Link to={`/projects/${_id}`}>
      <div className="card test-border2">
        {Auth.getPayload().sub === owner._id ? 
          <div>
            <img alt="star indicating project ownership" src="./../../assets/star.png" />
          </div> : ''
        }
        {Auth.getPayload().sub === owner ? 
          <div>
            <img alt="star indicating project ownership" src="./../../assets/star.png" />
          </div> : ''
        }
        <div className="card-image">
          <img className="project-img image" src={images[0]} alt={name} />
        </div>
        <div className="card-header">
          <h3>{name}</h3>
        </div>
        <div className="project-card-bio"> 
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