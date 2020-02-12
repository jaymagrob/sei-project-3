import React from 'react'

class Gallery extends React.Component{

  state = {
    transform: 0,
    containerClass: {
      width: '900px',
      height: '250px',
      background: 'blue',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    },
    innerContainerClass: {
      height: '80%',
      width: '100%',
      background: 'orange',
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    },
    projectClass: {
      width: '175px',
      height: '100%',
      background: 'red',
      transform: 'translateX(0)',
      display: 'inline-block',
      margin: '0 30px',
      transition: 'all 0.2s linear'
    },
    arrows: {
      background: 'red',
      height: '50px',
      width: '50px',
      zIndex: 1
    }
  }


  mouseEnter = (e) => {
    console.log(e.target.getAttribute('name'))
    if (e.target.getAttribute('name') === 'right') {
      const transform = this.state.transform - 400
      const projectClass = { ...this.state.projectClass, transform: `translateX(${transform}px)` }
      this.setState({ transform, projectClass })
    } else {
      let transform = this.state.transform + 400
      if (transform > 0) transform = 0
      const projectClass = { ...this.state.projectClass, transform: `translateX(${transform}px)` }
      this.setState({ transform, projectClass })
    }
  }

  render() {
    return (
      <>
      <div 
        className="gallery_container" 
        style={this.state.containerClass} 
      >
        <div style={this.state.arrows} name="left" onClick={this.mouseEnter}></div>
        <div style={this.state.innerContainerClass}>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
          <div style={this.state.projectClass}></div>
        </div>
        <div style={this.state.arrows} name="right" onClick={this.mouseEnter}></div>
      </div>
      </>
    )
  }
}

export default Gallery