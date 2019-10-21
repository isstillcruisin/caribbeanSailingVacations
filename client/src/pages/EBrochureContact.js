import React, { Component } from "react"
import API from "../utils/API"
import AllBoats from "./AllBoats"
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


import StreetAddress from '../components/StreetAddress'
import EBrochureHeader from '../components/EBrochureHeader'
class EBrochureAbout extends Component {
  state = {}

  componentDidMount() {
    let { id } = this.props.match.params
    API.getEBrochure(id).then(res => {
      this.setState({
        eBrochure: res.data
      })
    })
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
                    <Form>
                      <Form.Row>
                        <Form.Label column xs={3}>
                          Name
                        </Form.Label>
                        <Col>
                          <Form.Control placeholder='First name' name='firstName' onChange={this.props.handleInputChange} />
                        </Col>
                        <Col>
                          <Form.Control placeholder='Last name' name='lastName' onChange={this.props.handleInputChange} />
                        </Col>
                      </Form.Row>
                      <Form.Row controlid='formEmail'>
                        <Form.Label column xs={3}>
                          Email
                        </Form.Label>
                        <Col xs={9}>
                          <Form.Control type='email' placeholder='Email Address' name='email' onChange={this.props.handleInputChange}  />
                        </Col>
                      </Form.Row>
                      <Form.Row controlid='formEmail'>
                        <Form.Label column xs={3}>
                          Subject
                        </Form.Label>
                        <Col xs={9}>
                          <Form.Control placeholder='Subject' name='subject' onChange={this.props.handleInputChange}  />
                        </Col>
                      </Form.Row>
                      <Form.Row controlid='formEmail'>
                        <Form.Label column xs={3}>
                          Message
                        </Form.Label>
                        <Col xs={9}>
                          <Form.Control as='textarea' cols={3} placeholder='Message' name='message' onChange={this.props.handleInputChange}  />
                        </Col>
                      </Form.Row>
                      <Form.Row>
                        <Col xs={12} className='d-flex flex-row-reverse'>
                          <Button>Send</Button>
                        </Col>
                      </Form.Row>
                    </Form>
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
