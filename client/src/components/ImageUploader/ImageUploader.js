import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Loader from '../Loader'
import PropTypes from 'prop-types'

const CLOUDINARY_UPLOAD_PRESET = 'ecaxfmj9'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dui3yyhou/upload'

class ImageUploader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      uploadedFileCloudinaryUrl: '',
    }
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    })

    this.handleImageUpload(files[0])
  }

  handleImageUpload(file) {
    this.setState({loading: true})
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file)

    upload.end((err, response) => {
      if (response.body.secure_url !== '') {
        let url = response.body.secure_url
        if (this.props.width && this.props.height) {
          const parts = url.split('/upload/')
          url = `${parts[0]}/upload/w_${this.props.width},h_${this.props.height},c_fit/${parts[1]}`
        }
        this.setState({
          uploadedFileCloudinaryUrl: url,
          loading: false,
        })
      }
      let imgs = this.props.imgs || []
      imgs.push(this.state.uploadedFileCloudinaryUrl)
      this.props.setUrls(imgs)
    })
  }

  removeImage = (index) => {
    let imgs = this.props.imgs
    imgs.splice(index, 1)
    this.props.setUrls(imgs)
  }

  renderImages = () => {
    return <div className='image-thumbnails'>
      {this.props.imgs && this.props.imgs.map((image, index) => {
        return <div className='thumbnail-with-remove-button' key={`image-${index + 1}`}>
          <Image src={image} alt="" style={{'maxWidth': '200px'}} thumbnail />
          <Button onClick={() => this.removeImage(index)}>Delete</Button>
        </div>
      })}
    </div>   
  }

  render() {
    if (this.state.loading) {
      return <Loader />
    } else if (this.props.showDropZone) {
      return (
        <><Dropzone
          onDrop={this.onImageDrop.bind(this)}
          accept="image/*"
          multiple={this.props.multiple}
        >
          {({ getRootProps, getInputProps }) => {
            return (
              <div {...getRootProps()} className='boat-image-dropzone'>
                <input {...getInputProps()} />
                {
                  <p>
                    {this.props.placeholder}
                  </p>
                }
              </div>
            )
          }}
        </Dropzone>

          <div>
            <div>
              {this.renderImages()}
            </div>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div>
            <div>
              {this.renderImages()}
            </div>
          </div>
        </>
      )
    }
  }
}

ImageUploader.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  imgs: PropTypes.array(PropTypes.string),
  showDropZone: PropTypes.bool,
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  setUrls: PropTypes.func,
}

export default ImageUploader