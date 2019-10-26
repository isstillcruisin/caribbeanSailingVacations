import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

const EBrochureContactForm = props => (
  <Form>
    <Form.Row>
      <Col>
        <Form.Control placeholder='First name' name='firstName' onChange={props.handleInputChange} value={props.contact.firstName} size="lg" />
      </Col>
      <Col>
        <Form.Control placeholder='Last name' name='lastName' onChange={props.handleInputChange} value={props.contact.lastName} size="lg" />
      </Col>
    </Form.Row>
    <Form.Row controlid='formEmail'>
      <Col>
        <Form.Control type='email' placeholder='Email Address' name='email' onChange={props.handleInputChange} value={props.contact.email} size="lg" />
      </Col>
    </Form.Row>
    <Form.Row controlid='formEmail'>
      <Col>
        <Form.Control placeholder='Subject' name='subject' onChange={props.handleInputChange} value={props.contact.subject} size="lg" />
      </Col>
    </Form.Row>
    <Form.Row controlid='formEmail'>
      <Col>
        <Form.Control as='textarea' cols={3} placeholder='Message' name='message' onChange={props.handleInputChange}  value={props.contact.message} size="lg" />
      </Col>
    </Form.Row>
    <Form.Row>
      <Col xs={12} className='d-flex flex-row-reverse'>
        <Button onClick={props.handleSubmitContact}  variant="link">Submit</Button>
      </Col>
    </Form.Row>
  </Form>
)

export default EBrochureContactForm;
