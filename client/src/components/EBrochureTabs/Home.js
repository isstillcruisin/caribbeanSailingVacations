import React, { Component } from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'

const Home = props => (
  <Container>
    <h3 className='section-header'>Set Sail</h3>
    <h3 className='section-header'>With Confidence</h3>
    <hr />
​    <p className='pretty-italic'>We have hand selected yachts out of many different management operations in the Caribbean to bring you the best possible vacation for your budget. We have met with crews and in many cases eaten the foods of the fantastic chefs on board. We own our vacation and are sure that you will love your time aboard.</p>
    <p className='pretty-italic'>It is our hope to bring our love of sailing and the beautiful Caribbean to as many people as possible. We want to make the process of selecting the perfect boat and crew for you as simple as possible.</p>
    <Row style={{ height: '120px'}} >
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
          <Button variant='link' onClick={props.showYachts}>Read More</Button>
        </Container>
      </Col>
      <Col style={{backgroundColor: 'white'}}>
        <Container>
          <Button variant='link' onClick={props.showDestinations}>Read More</Button>
        </Container>
      </Col>
    </Row>
  </Container>
)
export default Home
