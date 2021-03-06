import React, { Component } from 'react'
import API from '../utils/API'
import { Form, Col, Button, Container} from 'react-bootstrap'

class ForgotPassword extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      showError: false,
      messageFromServer: ''
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  };

  sendEmail = e => {
    e.preventDefault()
    if (this.state.email === '') {
      this.setState({
        showError: false,
        messageFromServer: '',
      })
    } else {
      API.resetPasswordEmail(this.state.email)
        .then(response => {
          if (response.data === 'email not in db') {
            this.setState({
              showError: true,
              messageFromServer: '',
            })
          } else if (response.data === 'recovery email sent') {
            this.setState({
              showError: false,
              messageFromServer: 'recovery email sent'
            })
          }
        })
        .catch(error => {
          console.error(error.data)
        })
    }
  }

  render() {
    const { messageFromServer, showNullError, showError } = this.state
    
    return (
      <Container>
        <Form>
          <Form.Row controlid='formEmail'>
            <Form.Label column xs={3}>
              Email
            </Form.Label>
            <Col xs={9}>
              <Form.Control type='email' placeholder='Email Address' name='email' onChange={this.handleInputChange}  />
            </Col>
          </Form.Row>
          <Button
            style={{marginTop: '5px'}}
            onClick={this.sendEmail}
            type="submit"
            className="btn btn-lg"
          >Send Password Reset Email</Button>
        </Form>
        {showNullError && (
          <div>
            <p>The email address cannot be empty.</p>
          </div>
        )}
        {showError && (
          <div>
            <p>
              That email address is invalid or not recognized. Please try again or register for a new account.
            </p>
          </div>
        )}
        {messageFromServer === 'recovery email sent' && (
          <div>
            <i>Password Reset Email Successfully Sent</i>
          </div>
        )}
      </Container>
    )
  }


}

export default ForgotPassword