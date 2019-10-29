import React, { Component } from 'react'
import API from '../utils/API'
import { Form, Col, Button, Container, Card} from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import Alert from '../components/Alert'
import PropTypes from 'prop-types'

class ResetPassword extends Component {
  constructor() {
    super()

    this.state = {
      password: '',
      confirmPassword: '',
      showError: false,
      messageFromServer: '',
      alert: ''
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  };

  resetPassword = e => {
    e.preventDefault()
    if (this.state.password === '') {
      this.setState({
        showError: false,
        messageFromServer: '',
      })
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        showError: false,
        alert: 'Try again, passwords must match.',
        messageFromServer: '',
      })
    } else {
      this.setState({
        alert: ''
      })
      API.setNewPassword(this.state.password, this.props.match.params.token)
        .then(response => {
          if (response.data === 'invalid token') {
            this.setState({
              showError: true,
              messageFromServer: 'That password reset token has already been used or is not valid.',
            })
          } else {
            this.setState({
              showError: false,
              messageFromServer: response.data,
            })
          }
        })
        .catch(error => {
          console.error(error.data)
        })
    }
  }

  render() {
    const { showError, messageFromServer} = this.state
    if (showError) {
      return (<Redirect 
        to={{ 
          pathname: '/',
          state: { alert: `Error resetting password: ${messageFromServer}` } 
        }} 
      />)
    } else if (messageFromServer === 'password updated') {
      return (<Redirect 
        to={{ 
          pathname: '/sign-in',
          state: { alert: 'Successful password reset.' } 
        }} 
      />)
    } else {
      return (
        <Container>
          <Alert alert={this.state.alert}/>
          <Card>
            <Card.Header>
              Password Reset
            </Card.Header>
            <Card.Body>
              <Form>
                Please choose a new password and confirm it:
                <Form.Row controlid='password'>
                  <Form.Label column xs={3}>
                    Password
                  </Form.Label>
                  <Col xs={9}>
                    <Form.Control type='password' placeholder='Password' name='password' onChange={this.handleInputChange}  />
                  </Col>
                </Form.Row>
                <Form.Row controlid='confirm-password'>
                  <Form.Label column xs={3}>
                    Confirm Password
                  </Form.Label>
                  <Col xs={9}>
                    <Form.Control type='password' placeholder='Enter Password Again' name='confirmPassword' onChange={this.handleInputChange}  />
                  </Col>
                </Form.Row>
                <Button
                  style={{marginTop: '5px'}}
                  onClick={this.resetPassword}
                  type="submit"
                  className="btn btn-lg"
                >Reset Password</Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      )
    }
  }
}

ResetPassword.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }),
  }),
}

export default ResetPassword