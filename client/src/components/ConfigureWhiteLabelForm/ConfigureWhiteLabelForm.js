import React, {Component} from "react";
import { Table, Button, Form, Col, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import ImageUploader from '../ImageUploader'


class ConfigureWhiteLabelForm extends Component {
  render() {
    return <div style={{color: 'black', padding: '10px'}}>
      <Card>
        <Card.Header>Contact Information</Card.Header>
        <Card.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCompanyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control 
                  placeholder="Company Name" 
                  name='companyName'
                  onChange={this.props.handleInputChange}
                  value={this.props.whiteLabel.companyName}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone number</Form.Label>
                <Form.Control 
                  placeholder="Phone number"
                  name='phoneNumber' 
                  onChange={this.props.handleInputChange}
                  value={this.props.whiteLabel.phoneNumber} 
                />
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Label>Street address</Form.Label>
              <Form.Control 
                placeholder="Business street address"
                name='streetAddress' 
                onChange={this.props.handleInputChange}
                value={this.props.whiteLabel.streetAddress} 
              />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control 
                  placeholder="City" 
                  name='city'
                  onChange={this.props.handleInputChange}
                  value={this.props.whiteLabel.city}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  placeholder="State" 
                  name='state'
                  onChange={this.props.handleInputChange}
                  value={this.props.whiteLabel.state}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  placeholder="Zip Code" 
                  name='zipCode'
                  onChange={this.props.handleInputChange}
                  value={this.props.whiteLabel.zipCode}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control 
                  placeholder="Country" 
                  name='country'
                  onChange={this.props.handleInputChange}
                  value={this.props.whiteLabel.country}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group>
                <ImageUploader
                  imgs={this.props.whiteLabel.logoUrl ? [this.props.whiteLabel.logoUrl] : []}
                  showDropZone={!this.props.whiteLabel.logoUrl}
                  onChange={this.props.handleInputChange}
                  setUrls={this.handleSetUrls}
                  placeholder='Drop a logo image here, or click to select a file to upload. The image will be scaled to fit in a rectangle of 200px wide, 100px tall.'
                  multiple={false}
                  width={200}
                  height={100}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridSubmitAddress">
                <Button
                  onClick={this.props.handleSaveWhiteLabel}
                  type="submit"
                  className="btn btn-lg"
                  disabled={this.props.saved}
                > 
                  {this.props.saved ? 'Saved' : 'Save'}
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  }

  handleSetUrls = urlArray => {
    this.props.handleInputChange({ target: { name: 'logoUrl', value: urlArray[0] }})
  };
}

export default ConfigureWhiteLabelForm;
