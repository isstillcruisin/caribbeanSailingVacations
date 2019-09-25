import React, {Component} from "react";
import { Table, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

class ConfigureWhiteLabelForm extends Component {
  render() {
    return <div style={{color: 'black', padding: '10px'}}>
      <Card>
        <Card.Header>Contact Information</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>Phone number</Form.Label>
              <Form.Control 
                placeholder="Phone number"
                name='phoneNumber' 
                onChange={this.props.handleInputChange}
                value={this.props.whiteLabel.phoneNumber} 
              />
            </Form.Group>
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
            <Row>
              <Form.Group as={Col} controlId="formGridCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control 
                  placeholder="Country" 
                  name='country'
                  onChange={this.props.handleInputChange}
                  value={this.props.whiteLabel.country}
                />
              </Form.Group>
            </Row>
            <Row>
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
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>E-Brochures</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>View</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {this.renderAllEBrochureRows(this.props.whiteLabel)}   
            </tbody>
          </Table>

          <LinkContainer
            to={`/white-label/${this.props.whiteLabel.name}/new-e-brochure`}
            className="add-e-brochure-link"
          >
            <Button>Add New E-Brochure</Button>
          </LinkContainer>
        </Card.Body>
      </Card>
    </div>
  }

  renderAllEBrochureRows = (whiteLabel) => {
    return whiteLabel.ebrochures.map((eBrochure, i) => {
      return <tr key={`ebrochure-${i}`}>
        <td>{eBrochure.name}</td>
        <td>
          <LinkContainer
            to={`/e-brochure/${eBrochure._id}`}
            className="e-brochure-link"
          >
            <Button>View E-Brochure</Button>
          </LinkContainer>
        </td> 
        <td>
          <LinkContainer
            to={`/e-brochure/${eBrochure._id}/edit`}
            className="edit-e-brochure-link"
          >
            <Button>Edit E-Brochure</Button>
          </LinkContainer>
        </td> 
        
      </tr>
    });
  }
}

export default ConfigureWhiteLabelForm;
