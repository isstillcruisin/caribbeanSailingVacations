import React, { Component } from 'react'
import YachtForm from '../components/YachtForm'
import API from '../utils/API'
import { Redirect } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

class AddBoat extends Component {
  state = {
    boatName: '',
    imgUrls: [],
    year: 0,
    maxPassengers: 0,
    manufacture: '',
    crewBio: '',
    cyaId: '',
  };

  handleFormSubmit = event => {
    event.preventDefault()
    try {
      this.saveBoat()
    } catch (err) {
      console.error('error in save boats (╯°□°)╯︵ ┻━┻ ', err)
    }
  };

  saveBoat = () => {
    API.saveBoat({
      boatName: this.state.boatName,
      imgs: this.state.imgs,
      year: this.state.year,
      maxPassengers: this.state.maxPassengers,
      manufacture: this.state.manufacture,
      crewBio: this.state.crewBio,
      pricePerWeek: this.state.pricePerWeek,
      cyaId: this.state.cyaId,
    })
      .then(res =>
        this.setState({
          saved: true
        })
      )
      .catch(err => console.error('saving boat error', err))
  };

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  };

  handleSetUrls = urls => {
    this.setState({
      imgs: urls
    })
  };

  render() {
    if (this.state.saved) {
      return (<Redirect 
        to={{ 
          pathname: '/boats',
          state: { alert: 'Yacht creation successful!' } 
        }} 
      />)
    } else {
      return (
        <Card>
          <Card.Header>
            <h3>New Yacht: <i>{this.state.boatName}</i></h3>
          </Card.Header>
          <Card.Body>
            <YachtForm
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
              handleSetUrls={this.handleSetUrls}
              boatName={this.state.boatName}
              imgs={this.state.imgs}
              year={this.state.year}
              maxPassengers={this.state.maxPassengers}
              manufacture={this.state.manufacture}
              crewBio={this.state.crewBio}
              pricePerWeek={this.state.pricePerWeek}
              cyaId={this.state.cyaId}
              alert={this.state.alert}
            />
          </Card.Body>
        </Card>
      )
    }
  }
}

export default AddBoat
