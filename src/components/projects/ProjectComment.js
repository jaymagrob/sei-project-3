import React from 'react'
// import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

const ProjectComment = ({ comments, text, handleChange, handleCommentRequest, handleEditSelected, handleEditComment, handleDeleteComment, projectId, editingComment, editedCommentText, resetEditComment }) => {

  const isOwner = (commentOwnerId) => {
    return Auth.getPayload().sub.toString() === commentOwnerId.toString()
  }


  return (
    <>
    <h1>Comments</h1>
    {comments.map(comment => {
      return (
        <div key={comment._id}> 
          { editingComment !== comment._id &&
          <>
          <h2>Name: {comment.user.name}</h2>
          <h2>Added: {Date(comment.createdAt).slice(0,15)}</h2>
          <img src={comment.user.profileImage} />
          <p>{comment.text}</p>
          { isOwner(comment.user._id) &&
            <div>
              <button onClick={() => handleDeleteComment(projectId, comment._id)}>Delete</button>
              <button onClick={() => handleEditSelected(comment._id, comment.text)}>Edit</button>
            </div>
          }
          </>
          }
          { editingComment === comment._id &&
          <>
            <h2>Name: {comment.user.name}</h2>
            <h2>Added: {Date(comment.createdAt).slice(0,15)}</h2>
            <img src={comment.user.profileImage} />
            <textarea
              name='editedCommentText'
              onChange={handleChange}
              value={editedCommentText}
            ></textarea>
            <button onClick={() => handleEditComment(comment._id)}>Edit Comment</button>
            <button onClick={resetEditComment}>Cancel</button>
          </>
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