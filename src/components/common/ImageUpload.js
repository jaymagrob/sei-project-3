import React from 'react'
import axios from 'axios'

class ImageUpload extends React.Component {
  state = {
    image: null
  }

  handleUpload = async ({ target: { files } }) => {
    const data = new FormData
    data.append('file', files[0])
    data.append('upload_preset', 'j7lqzji3') // this is your user key from your cloudinary account
    const res = await axios.post('https://api.cloudinary.com/v1_1/dgy8usa3w/image/upload', data)
    this.setState({ image: res.data.url }, () => {
      this.props.handleChangeImage({ target: { name: this.props.fieldName, value: res.data.url } }) 
    })
  }

  render() {
    return (
      <>
        <label>{this.props.labelText}</label>
        <input
          type="file"
          onChange={this.handleUpload}
        />
      </>
    )
  }
}

export default ImageUpload