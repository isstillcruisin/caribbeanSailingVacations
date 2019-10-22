import React, { Component } from "react"
import API from "../utils/API"
import AllBoats from "./AllBoats"
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'
import StreetAddress from '../components/StreetAddress'
import EBrochureHeader from '../components/EBrochureHeader'
class EBrochure extends Component {
  state = {}

  componentDidMount() {
    let { id } = this.props.match.params
    API.getEBrochure(id).then(res => {
      this.setState({
        eBrochure: res.data
      })
    })
  }
  
  travelAgentName = () => `${this.state.eBrochure._whiteLabel._travelAgent.firstName} ${this.state.eBrochure._whiteLabel._travelAgent.lastName}`
  travelAgentPhoneNumber = () => this.state.eBrochure._whiteLabel._travelAgent.phoneNumber

  showEBrochure = () => {
    if (this.state.eBrochure){
      return (
        <>
          <Card className='bg-lightgreen e-brochure'>
            <Card.Header className='text-center bg-lightgreen'>
              <img src={this.state.eBrochure._whiteLabel.logoUrl} alt='White Label Logo' />
              <h3 className='mt-3'>{this.state.eBrochure._whiteLabel.title}</h3>
              <EBrochureHeader ebrochure={this.state.eBrochure}/>
            </Card.Header>
            <Card.Body class='text-center'>
              <Container>
                <h3 className='section-header'>Set Sail</h3>
                <h3 className='section-header'>With Confidence</h3>
                <hr />
  ​              <p className='pretty-italic'>We have hand selected yachts out of many different management operations in the Caribbean to bring you the best possible vacation for your budget. We have met with crews and in many cases eaten the foods of the fantastic chefs on board. We own our vacation and are sure that you will love your time aboard.</p>
                <p className='pretty-italic'>It is our hope to bring our love of sailing and the beautiful Caribbean to as many people as possible. We want to make the process of selecting the perfect boat and crew for you as simple as possible.</p>
                <Row style={{ height: '250px'}} >
                  <Col style={{backgroundColor: 'white', marginRight: '5px'}}>
                    <Container>
                      <h2>Our Fleet</h2>
                      <i>From 40ft to 70ft our fleet has something for everyone. Whether its a romantic honeymoon for two, or a whole family get-together our catamarans have all the amenities to make your vacation unforgettable.</i>
                      <hr />
                    </Container>
                  </Col>
                  <Col style={{backgroundColor: 'white'}}>
                    <Container>
                      <h2>Destinations</h2>
                      <i>From Puerto Rico to Grenada the entirety of the Caribbean is your playground. These islands are the stuff that dreams are made of.</i>
                      <hr />
                    </Container>
                  </Col>
                </Row>
                <Row>
                  <Col style={{backgroundColor: 'white', marginRight: '5px'}}>
                    <Container>
                      <LinkContainer to={`/e-brochure/${this.state.eBrochure._id}/yachts`}>
                        <Button variant='link'>Read More</Button>
                      </LinkContainer>
                    </Container>
                  </Col>
                  <Col style={{backgroundColor: 'white'}}>
                    <Container>
                      <LinkContainer to={`/e-brochure/${this.state.eBrochure._id}/destinations`}>
                        <Button variant='link'>Read More</Button>
                      </LinkContainer>
                    </Container>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
          <StreetAddress address={Object.assign({}, this.state.eBrochure._whiteLabel, {name: this.travelAgentName(), phoneNumber: this.travelAgentPhoneNumber()})}/>
        </>
      )
    } else {
      return <Loader />
    }
  }

  render() {
    return <div>
      <Alert {...this.props}/>
      {this.showEBrochure()}
    </div>
  }
}

export default EBrochure
