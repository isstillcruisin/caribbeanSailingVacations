import React, { Component } from "react"
import API from "../../utils/API"
import Alert from '../Alert'
import Loader from '../Loader'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import EBrochureContactForm from '../EBrochureContactForm'

class Contact extends Component {
  defaultState = {
    contact: {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
    },
    alert: ''
  }
  state = this.defaultState

  handleInputChange = event => {
    const { name, value } = event.target
    let contact = Object.assign({}, this.state.contact, {[name]: value})

    this.setState({
      contact: contact,
    })
  }
  
  handleSubmitContact = () => {
    API.sendContact(
      this.props.eBrochure,
      this.state.contact
    ).then((res) => {
       this.setState(Object.assign({}, this.defaultState, { alert: 'Message sent to travel agent.'} ))
    });
  }

  showEBrochureContact = () => {
    if (this.props.eBrochure){
      return (
        <Container>
          <Alert alert={this.state.alert} />
          <h1 className='text-center'>Contact Us</h1>
          <p>For detailed information on selecting the perfect yacht for your sailing vacation & information on the crew(s) please send us an email and we will get back to you as soon as possible.</p>
          <Row>
            <Col xs={3}>
              <h2>{this.props.eBrochure._whiteLabel.companyName}</h2>
              <br/><i>{this.props.eBrochure._whiteLabel.streetAddress}</i>
              <br/><i>{this.props.eBrochure._whiteLabel.city}, {this.props.eBrochure._whiteLabel.state}, {this.props.eBrochure._whiteLabel.country}, {this.props.eBrochure._whiteLabel.zipCode}</i>
              <br/><i>Tel: {this.props.eBrochure._whiteLabel._travelAgent.phoneNumber}</i>
            </Col>
            <Col xs={9}>
              <EBrochureContactForm handleInputChange={this.handleInputChange} handleSubmitContact={this.handleSubmitContact} contact={this.state.contact}/>
            </Col>
          </Row>
        </Container>
      )
    } else {
      return <Loader />
    }
  }

  render() {
    return <div>
      <Alert {...this.props}/>
      {this.showEBrochureContact()}
    </div>
  }
}

export default Contact
