import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'

const ConfigureCurrentUserForm = props => (
  <Card style={{color: 'black'}}>
    <Form>
      <Form.Row>
        <Form.Label column xs={3}>
          Name
        </Form.Label>
        <Col>
          <Form.Control placeholder="First name" name='firstName' onChange={props.handleInputChange} value={props.currentUser.firstName} />
        </Col>
        <Col>
          <Form.Control placeholder="Last name" name='lastName' onChange={props.handleInputChange}value={props.currentUser.lastName} />
        </Col>
      </Form.Row>
      <Form.Row controlid="formEmail">
        <Form.Label column xs={3}>
          Email
        </Form.Label>
        <Col xs={9}>
          <Form.Control type="email" name='email' placeholder="Email Address" value={props.currentUser.email} disabled />
        </Col>
      </Form.Row>
      <Form.Row>
        <Form.Label column xs={3}>
          Phone number
        </Form.Label>
        <Col xs={9}>
          <Form.Control type='tel' name='phoneNumber' placeholder="Phone number" value={props.currentUser.phoneNumber} onChange={props.handleInputChange} />
        </Col>
      </Form.Row>
      <Form.Row controlid="formPassword">
        <Form.Label column xs={3}>
          Password
        </Form.Label>
        <Col xs={9}>
          <Form.Control type="password" name='password' placeholder="Choose a password" value={props.currentUser.password} onChange={props.handleInputChange} />
        </Col>
      </Form.Row>
      <Form.Row controlid='confirm-password'>
        <Form.Label column xs={3}>
          Confirm Password
        </Form.Label>
        <Col xs={9}>
          <Form.Control type='password' placeholder='Enter Password Again' name='confirmPassword' value={props.currentUser.confirmPassword} onChange={props.handleInputChange}  />
        </Col>
      </Form.Row>
      <Form.Row controlid="formSubmit">
        <Col>
          { props.saved ? 
            <Button
              type="submit"
              className="btn btn-lg"
              disabled
            >
              Saved
            </Button> :

            <Button
              onClick={props.handleSave}
              type="submit"
              className="btn btn-lg"
            >
              Save
            </Button>
          }
        </Col>
      </Form.Row>
    </Form>
  </Card>
)

ConfigureCurrentUserForm.propTypes = {
  currentUser: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
  }),
  saved: PropTypes.boolean,
  handleInputChange: PropTypes.func,
  handleSave: PropTypes.func,
}

export default ConfigureCurrentUserForm

