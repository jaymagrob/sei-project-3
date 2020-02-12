import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

const ProjectCard = ({ name, images, _id, description, owner }) => {
  console.log(name)
  return (
    <div key={_id}>
      <Link to={`/projects/${_id}`}>
        <div>
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
}

export default ProjectCard