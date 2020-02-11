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
      <section
        style={{ 
          position: 'fixed',
          bottom: '20px',
          right: '75px',
          maxHeight: '100px',
          width: '200px',
          background: 'gray'
        }}>
        {this.state.open && this.state.user &&
          <div>
            {this.state.user.pendingProjects.map(project => {
              return (
                <div key={project._id}>
                  <h1 style={{ display: 'inline-block' }}>{project.project.name}</h1>
                  <div style={{ display: 'inline-block', float: 'right' }}>
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
        <div
          onClick={this.handleOpen}
        >
          ---
        </div>

      </section>
    )
  }
}

export default PendingRequests