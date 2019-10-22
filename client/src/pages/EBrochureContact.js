import React, { Component } from "react"
import API from "../utils/API"
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import EBrochureHeader from '../components/EBrochureHeader'
import EBrochureContactForm from '../components/EBrochureContactForm'

class EBrochureAbout extends Component {
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

  componentDidMount() {
    let { id } = this.props.match.params
    API.getEBrochure(id).then(res => {
      this.setState({
        eBrochure: res.data
      })
    })
  }

  handleInputChange = event => {
    const { name, value } = event.target
    let contact = Object.assign({}, this.state.contact, {[name]: value})

    this.setState({
      contact: contact,
    })
  }
  
  handleSubmitContact = () => {
    API.sendContact(
      this.state.eBrochure,
      this.state.contact
    ).then((res) => {
       this.setState(Object.assign({}, this.state, { alert: 'Message sent to travel agent.'} ))
    });
  }

  showEBrochureContact = () => {
    if (this.state.eBrochure){
      return (
        <>
          <Card className='bg-lightgreen e-brochure'>
            <Card.Header className='text-center bg-lightgreen'>
              <img src={this.state.eBrochure._whiteLabel.logoUrl} alt='White Label Logo' />
              <h3 className='mt-3'>{this.state.eBrochure._whiteLabel.title}</h3>
              <EBrochureHeader ebrochure={this.state.eBrochure}/>
            </Card.Header>
            <Card.Body>
              <Container>
                <Alert alert={this.state.alert} />
                <h1 className='text-center'>Contact Us</h1>
                <p>For detailed information on selecting the perfect yacht for your sailing vacation & information on the crew(s) please send us an email and we will get back to you as soon as possible.</p>
                <Row>
                  <Col xs={3}>
                    <h2>{this.state.eBrochure._whiteLabel.companyName}</h2>
                    <br/><i>{this.state.eBrochure._whiteLabel.streetAddress}</i>
                    <br/><i>{this.state.eBrochure._whiteLabel.city}, {this.state.eBrochure._whiteLabel.state}, {this.state.eBrochure._whiteLabel.country}, {this.state.eBrochure._whiteLabel.zipCode}</i>
                    <br/><i>Tel: {this.state.eBrochure._whiteLabel._travelAgent.phoneNumber}</i>
                  </Col>
                  <Col xs={9}>
                    <EBrochureContactForm handleInputChange={this.handleInputChange} handleSubmitContact={this.handleSubmitContact} contact={this.state.contact}/>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </>
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

export default EBrochureAbout
