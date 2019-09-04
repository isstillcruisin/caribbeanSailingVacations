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
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
      this.props.setUrls(this.state.uploadedFileCloudinaryUrl);
    });
  }

  render() {
    return (
      <>
        <Dropzone
          onDrop={this.onImageDrop.bind(this)}
          accept="image/*"
          multiple={true}
        >
          {({ getRootProps, getInputProps }) => {
            return (
              <div {...getRootProps()} className='boat-image-dropzone'>
                <input {...getInputProps()} />
                {
                  <p>
                    Try dropping some files here, or click to select files to
                    upload.
                  </p>
                }
              </div>
            );
          }}
        </Dropzone>

        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
            <div>
              <p>{this.state.uploadedFile.name}</p>
              <img src={this.state.uploadedFileCloudinaryUrl} alt="" />
            </div>}
        </div>
      </>
    );
  }
}

export default ImageUploader;