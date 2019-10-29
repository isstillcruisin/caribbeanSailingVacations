import React, { Component } from 'react'
import AddWhiteLabelForm from '../components/AddWhiteLabelForm'
import API from '../utils/API'
import { Redirect } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

class AddWhiteLabel extends Component {
  state = {
    whiteLabelName: ''
  }

  handleFormSubmit = event => {
    event.preventDefault()
    try {
      this.saveWhiteLabel()
    } catch (err) {
      console.log('error in save White Label (╯°□°)╯︵ ┻━┻ ', err)
    }
  }

  saveWhiteLabel = () => {
    API.createWhiteLabel({
      name: this.state.whiteLabelName,      
    })
      .then(res =>
        this.setState({
          saved: true
        })
      )
      .catch(err => console.log('saving white label error', err))
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  render() {
    return this.state.saved === true ? (
      <Redirect 
        to={{ 
          pathname: `/white-label/${this.state.whiteLabelName}/edit`,
          state: { alert: `Your white-label: ${this.state.whiteLabelName} is reserved, but needs approval.` } 
        }} 
      />
    ) : (
      <Card style={{color: 'black'}}>
        <Card.Header>
          Add New White Label
        </Card.Header>
        <Card.Body>
          <AddWhiteLabelForm
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
            whiteLabelName={this.state.whiteLabelName}
          />
        </Card.Body>
      </Card>
    )
  }
}

export default AddWhiteLabel
