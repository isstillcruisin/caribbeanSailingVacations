import React, { Component } from 'react'
import AddWhiteLabelForm from '../components/AddWhiteLabelForm'
import API from '../utils/API'
import { Redirect } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Alert from '../components/Alert'

class AddWhiteLabel extends Component {
  state = {
    whiteLabelName: ''
  }

  handleFormSubmit = event => {
    event.preventDefault()
    try {
      this.saveWhiteLabel()
    } catch (err) {
      console.error('error in save White Label (╯°□°)╯︵ ┻━┻ ', err)
    }
  }

  saveWhiteLabel = () => {
    API.createWhiteLabel({
      name: this.state.whiteLabelName,      
    })
      .then(res => {
        if (res.status && res.status === 200) {
          this.setState({
            saved: true
          })
        } else {
          this.setState({
            alert: 'Invalid or Unavailable white-label name. White-Label names must be unique and consist only of lower-case characters, numbers, and "-" (example: "max-charter-1" is legal).'
          })
        }
      })
      .catch(err => console.error('saving white label error', err))
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
          pathname: `/white-label/${this.state.whiteLabelName}/edit/configure`,
          state: { alert: `Your white-label: ${this.state.whiteLabelName} is created. Configure it here:` } 
        }} 
      />
    ) : (
      <Card style={{color: 'black'}}>
        <Alert alert={this.state.alert}/>
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
