import React from 'react'
import { Link } from 'react-router-dom'

const ProjectComment = ({ comments, text, handleChange, handleCommentRequest }) => {
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
        </div>
      )
    })}
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
    </>
  )
}
  

export default ProjectComment