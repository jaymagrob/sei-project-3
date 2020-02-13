import React from 'react'
import axios from 'axios'

import Auth from '../../lib/auth'

class PendingRequests extends React.Component{

  state = {
    open: false,
    user: null
  }

  getUser = async () => {
    try {
      const res = await axios.get('/api/myportfolio', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  async componentDidMount() {
    this.getUser()
  }

  handleOpen = () => {
    this.setState({ open: !this.state.open })
  }

  acceptCollabRequest = async (e) => {
    try {
      await axios.get(`/api/users/${this.state.user._id}/collaborate/${e.target.name}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.getUser()
    } catch (err) {
      console.log(err)
    }
  }

  rejectCollabRequest = async (e) => {
    console.log(this.state.user._id, e.target.name)
    try {
      await axios.delete(`/api/users/${this.state.user._id}/collaborate/${e.target.name}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.getUser()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="request_outer_container navbar-item navbar-item-font">
        <div
          className=""
        >
          <button
            className="button"
            onClick={this.handleOpen}
          >
            {/* style={{ 
          position: 'fixed',
          bottom: '20px',
          right: '75px',
          maxHeight: '100px',
          width: '200px',
          background: 'gray'
        }}> */}
        Requests
          </button>
        </div>
        {this.state.open && this.state.user &&
          <div
            className="request_list"
          >
            {this.state.user.pendingProjects.map(project => {
              return (
                <div 
                  key={project._id}
                  className="single_request"
                >
                  <h1 style={{ display: 'inline-block' }}>{project.project.name}</h1>
                  <div 
                    style={{ float: 'right' }}
                    className="single_request_button"
                  >
                    <button 
                      name={project.project._id}
                      onClick={this.acceptCollabRequest}
                    >Accept</button>
                    <button 
                      name={project.project._id}
                      onClick={this.rejectCollabRequest}
                    >Reject</button>
                  </div>
                </div>
              )
            })}
          </div>
        }
      </div>
    )
  }
}

export default PendingRequests