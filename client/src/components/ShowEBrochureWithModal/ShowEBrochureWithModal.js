import React, { Component } from "react";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import API from "../../utils/API";

class ShowEBrochureWithModal extends Component {
  defaultState = {
    show: false,
    firstName: null,
    lastName: null,
    email: null,
    subject: 'Charter A Luxury Yacht',
    message: "I've setup this e-brochure just for you.  Please take a look at it and then call me with any questions."
  }
  state = this.defaultState

  handleClose = () => this.setState({show: false})
  handleShow = () => this.setState({show: true})

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value})
  }

  handleSendBrochure = () => {
    API.sendEBrochure(this.props.eBrochure, this.state).then(res => {
      this.setState(this.defaultState);
    });
  }

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Show E-Brochure
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Show E-Brochure to Prospective Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>Send this E-Brochure: '{this.props.eBrochure.name}' to a prospective client: 
            <Form>
              <Form.Row>
                <Form.Label column xs={3}>
                  Name
                </Form.Label>
                <Col>
                  <Form.Control placeholder='First name' name='firstName' value={this.state.firstName} onChange={this.handleInputChange} />
                </Col>
                <Col>
                  <Form.Control placeholder='Last name' name='lastName' value={this.state.lastName} onChange={this.handleInputChange} />
                </Col>
              </Form.Row>
              <Form.Row controlid='formEmail'>
                <Form.Label column xs={3}>
                  Email
                </Form.Label>
                <Col xs={9}>
                  <Form.Control type='email' placeholder='Email Address' name='email' value={this.state.email} onChange={this.handleInputChange}  />
                </Col>
              </Form.Row>
              <Form.Row controlid='formEmail'>
                <Form.Label column xs={3}>
                  Subject
                </Form.Label>
                <Col xs={9}>
                  <Form.Control placeholder='E-Mail Subject' name='subject' value={this.state.subject} onChange={this.handleInputChange}  />
                </Col>
              </Form.Row>
              <Form.Row controlid='formEmail'>
                <Form.Label column xs={3}>
                  Message
                </Form.Label>
                <Col xs={9}>
                  <Form.Control as='textarea' placeholder='Your Message' name='message' value={this.state.message} onChange={this.handleInputChange}  />
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSendBrochure}>
              Send
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default ShowEBrochureWithModal