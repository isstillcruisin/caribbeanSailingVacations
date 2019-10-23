import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

const EBrochureHeader = () => (
  <Container>
    <Row className='e-brochure-header'>
      <Nav className="m-auto">
        <Nav.Item>
          <Nav.Link eventKey="home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="about">About</Nav.Link>
        </Nav.Item>
         <Nav.Item>
          <Nav.Link eventKey="yachts">Our Fleet</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="destinations">Destinations</Nav.Link>
        </Nav.Item> 
        <Nav.Item>
          <Nav.Link eventKey="contact">Contact</Nav.Link>
        </Nav.Item>
      </Nav>
      <Nav pullright={1}>
        <Nav.Item>
          <Nav.Link eventKey="yachts">Our Fleet</Nav.Link>
        </Nav.Item>
      </Nav>      
    </Row>
  </Container>
)

export default EBrochureHeader;
