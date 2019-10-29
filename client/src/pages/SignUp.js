import React, { Component } from 'react'
import SignUpForm from '../components/SignUpForm'
import { Redirect } from 'react-router-dom'
import API from '../utils/API'
import _ from 'lodash'
import validateEmails from '../utils/validateEmails'
import Container from 'react-bootstrap/Container'

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    isAdmin: false,
    done: false
  };

  handleSignUp = async event => {
    event.preventDefault()
    console.log('event (╯°□°)╯︵ ┻━┻ ', event.data)
    try {
      let newUser = await this.saveUser()
      if (newUser) {
        this.setState({done: true})
      }
    } catch (error) {
      console.log('error (╯°□°)╯︵ ┻━┻ ', error.message)
    }
  };

  saveUser = () => {
    return API.userCreate({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      isAdmin: false
    })
  };

  validate(value) {
    const errors = {}

    errors.recipients = validateEmails(value.recipients || '')

    _.each(value, ({ name }) => {
      if (!value[name]) {
        errors[name] = 'Value is required'
      }
    })

    return errors
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  };

  render() {
    return this.state.done === true ? (
      <Redirect 
        to={{ 
          pathname: '/sign-in',
          state: { alert: 'Please check your email account for an email to verify your address.' } 
        }} 
      />
    ) : (
      <Container>
        <h1>Register With Your Email Address And Setup Your Own Yacht Charter Site!</h1>
        <SignUpForm
          handleInputChange={this.handleInputChange}
          handleSignUp={this.handleSignUp}
          userName={this.state.email}
          password={this.state.password}
        />
      </Container>
    )
  }
}

export default SignUp
