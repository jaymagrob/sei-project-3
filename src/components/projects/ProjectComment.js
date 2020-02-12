import React from 'react'
// import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

const ProjectComment = ({ comments, text, handleChange, handleCommentRequest, handleEditComment, handleDeleteComment, projectId }) => {

  const isOwner = (commentOwnerId) => {
    return Auth.getPayload().sub.toString() === commentOwnerId.toString()
  }


  console.log(comments)
  return (
    <>
    <h1>Comments</h1>
    {comments.map(comment => {
      return (
        <div key={comment._id}>
          <h2>Name: {comment.user.name}</h2>
          <h2>Added: {Date(comment.createdAt).slice(0,15)}</h2>
          <img src={comment.user.profileImage} />
          <p>{comment.text}</p>
          { isOwner(comment.user._id) &&
            <div>
              <button onClick={() => handleDeleteComment(projectId, comment._id)}>Delete</button>
              {/* <button onClick={handleEditComment}>Edit</button> */}
            </div>
          }
        </div>
      )
    })}
    {Auth.isAuthenticated() &&
      <div>
        <form
          onSubmit={handleCommentRequest}
        >
          <label>Add a comment</label>
          <textarea
            name='text'
            value={text}
            onChange={handleChange}
          >
          </textarea>
          <button type='submit'>Add Comment</button>
        </form>
      </div>
    }
    </>
  )
}

export default ProjectComment