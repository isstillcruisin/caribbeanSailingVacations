import React, { Component } from 'react'
import AddEBrochureForm from '../components/AddEBrochureForm'
import API from '../utils/API'
import { Redirect } from 'react-router-dom'
import Loader from '../components/Loader'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

class AddEBrochure extends Component {
  componentDidMount() {
    let { name } = this.props.match.params

    API.getWhiteLabel(name).then(res => {
      API.getCurrentUser().then(res2 => {
        if (res2 && res2.data._id !== res.data._travelAgent._id) {
          this.setState({ unauthorized: true})
        } else {
          API.getBoats({}).then(res3 => {
            this.setState({
              whiteLabel: res.data,
              boats: res3.data,
            })
          })
        }
      })
    })
  }

  state = {
    name: '',
  };

  handleFormSubmit = event => {
    event.preventDefault()
    try {
      this.saveEBrochure()
    } catch (err) {
      console.error('error in save boats (╯°□°)╯︵ ┻━┻ ', err)
    }
  };

  saveEBrochure = () => {
    API.saveEBrochure(
      this.state.whiteLabel, 
      {
        name: this.state.name
      }
    ).then((res) => {
      this.setState(Object.assign({}, this.state, {eBrochure: res.data, saved: true}))
    })
  };

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  };

  render() {
    if (this.state.saved === true) {
      return <Redirect 
        to={{ 
          pathname: `/e-brochure/${this.state.eBrochure._id}/edit`
        }} 
      />
    } else if (this.state.unauthorized) {
      return (<Redirect 
        to={{ 
          pathname: '/',
          state: { alert: 'You are not authorized to perform this action.' } 
        }} 
      />)
    } else if (this.state.whiteLabel && this.state.boats) {
      return (<Container>
        <Card>
          <Card.Header>
            Setup Your E-Brochure
          </Card.Header>
          <Card.Body>
            <AddEBrochureForm
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
              name={this.state.name}
            />
          </Card.Body>
        </Card>
      </Container>
      )
    } else {
      return <Loader />
    }  
  }
}

export default AddEBrochure
