import React, { Component } from 'react'
import API from '../utils/API'
import Container from 'react-bootstrap/Container'
import Loader from '../components/Loader'
import ConfigureCurrentUserForm from '../components/ConfigureCurrentUserForm'
import Alert from '../components/Alert'

class ConfigureCurrentUser extends Component {
  state = {}

  componentDidMount() {
    API.getCurrentUser().then(res => {
      this.setState({ currentUser: res.data, saved: true})
    })
  }

  handleSave = async event => {
    event.preventDefault()
    let currentUser = Object.assign({}, this.state.currentUser)
    if (currentUser.password === '') {
      delete currentUser.password
      delete currentUser.confirmPassword
    } 
    if (currentUser.password  && currentUser.password !== currentUser.confirmPassword) {
      this.setState({
        alert: 'Try again, passwords must match.',
      })
    } else {
      API.updateUser(currentUser)
        .then(res => {
          this.setState({ currentUser: res.data, saved: true})
        })
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target
    const currentUser = Object.assign({}, this.state.currentUser, { [name]: value})
    this.setState({currentUser: currentUser, saved: false, alert: ''})
  }

  render() {

    if (this.state.currentUser) {
      return (
        <Container>
          <h1>Update Contact Information and Password:</h1>
          <Alert alert={this.state.alert} />
          <ConfigureCurrentUserForm currentUser={this.state.currentUser} handleInputChange={this.handleInputChange} handleSave={this.handleSave} saved={this.state.saved} />
        </Container>
      )
    } else {
      return <Loader />
    }
  }
}

export default ConfigureCurrentUser
