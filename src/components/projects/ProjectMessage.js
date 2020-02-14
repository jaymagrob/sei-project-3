import React from 'react'
import { Link } from 'react-router-dom'

const ProjectMessage = ({ messages, text, handleChange, handleMessageRequest, toggleMessageBoard, showMessages }) => {
  // console.log(messages)
  return (
    <>
      <div style={{
        position: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        display: showMessages ? 'block' : 'none'
      }}
      className="messageBoard"
      >

        <div style={{
          backgroundColor: '#E2E2E0',
          height: '80%',
          width: '80%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'fixed',
          padding: '0',
          margin: '0',
          top: '10%',
          left: '10%',
          overflow: 'auto'
          // display: 'none'
          // zIndex: '1'
          // borderRadius: '95%',
          // overflow: 'hidden'                  
        }}
        >

          {/* <div key={message._id}>
                <h2>Name: {message.user.name}</h2>
                <h2>Added: {Date(message.createdAt).slice(0, 15)}</h2>
                <img className="comment-image" src={message.user.profileImage} />
                <p>{message.text}</p>
              </div>  */}

          <h1>Collaborator Message Board</h1>
          <button className="button is-small" onClick={toggleMessageBoard}>Close Message Board</button>
          {messages.map(message => {
            return (
              <div key={message._id}>
                <div className="columns">
                  <div className="column is-three-quarters">
                    <div className="columns">
                      <div className="column is-2 has-text-centered is-vertical-center remove-padding">
                        <img className="comment-image" src={message.user.profileImage} />
                      </div>
                      <div className="column">
                        <div className="columns">
                          <h2 className="column is-3 comment-info-text">{message.user.name}</h2>
                          <h2 className="column comment-info-text">{Date(message.createdAt).slice(0, 15)}</h2>
                        </div>
                        <div className="columns">
                          <p className="column profession-grey-box padding-reset is-two-thirds">{message.text}</p>
                          <div className="column">

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          <div>
            <form
              onSubmit={handleMessageRequest}
            >
              {/* <label>Add a message</label> */}
              <textarea
                name='text'
                value={text}
                onChange={handleChange}
              >
              </textarea>
              <button className="button" type='submit'>Submit</button>
            </form>
          </div>
          {/* <button className="button is-small" onClick={toggleMessageBoard}>Close Message Board</button> */}


        </div>
      </div>
    </>
  )
}


export default ProjectMessage