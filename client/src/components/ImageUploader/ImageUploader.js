import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = "ecaxfmj9";
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dui3yyhou/upload";

class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFileCloudinaryUrl: "",
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        let url = response.body.secure_url;
        if (this.props.width && this.props.height) {
          const parts = url.split('/upload/')
          url = `${parts[0]}/upload/w_200,h_100,c_fit/${parts[1]}`
        }
        this.setState({
          uploadedFileCloudinaryUrl: url
        });
      }
      this.props.setUrls(this.state.uploadedFileCloudinaryUrl);
    });
  }

  renderImages = () => {
    if (this.state.uploadedFileCloudinaryUrl === '') {
      return <div>
        {this.props.images && this.props.images.map((image, index) => <img key={index + 1} src={image} alt=""/>)}
      </div>
    } else {
      return <div>
        <p>{this.state.uploadedFile.name}</p>
        <img src={this.state.uploadedFileCloudinaryUrl} alt="" />
      </div>  
    } 
  }

  render() {
    return (
      <>
        <Dropzone
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
            );
          }}
        </Dropzone>

        <div>
          <div>
            {this.renderImages()}
          </div>
        </div>
      </>
    );
  }
}

export default ImageUploader;