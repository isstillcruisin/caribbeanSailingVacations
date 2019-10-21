import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import { LinkContainer } from 'react-router-bootstrap'
import { withRouter } from "react-router-dom";

const IncompleteEBrochureHeader = props => (
  <Container>
    <Navbar className='e-brochure-header'>
      <Nav className="m-auto">
        <LinkContainer to={`/e-brochure/${props.ebrochure._id}`} exact>
          <Nav.Link>Home</Nav.Link>
        </LinkContainer>
        <LinkContainer to={`/e-brochure/${props.ebrochure._id}/about`}>
          <Nav.Link>About</Nav.Link>
        </LinkContainer>
        <LinkContainer to={`/e-brochure/${props.ebrochure._id}/yachts`}>
          <Nav.Link>Our Fleet</Nav.Link>
        </LinkContainer>
        <LinkContainer to={`/e-brochure/${props.ebrochure._id}/destinations`}>
          <Nav.Link>Destinations</Nav.Link>
        </LinkContainer>
        <LinkContainer to={`/e-brochure/${props.ebrochure._id}/contact`}>
          <Nav.Link>Contact</Nav.Link>
        </LinkContainer>
      </Nav>
      <Nav pullright={1}>
        <LinkContainer to={`/e-brochure/${props.ebrochure._id}/request-charter`}>
          <Button>Book Now</Button>
        </LinkContainer>
      </Nav>      
    </Navbar>
  </Container>
)


const EBrochureHeader = withRouter(IncompleteEBrochureHeader);

export default EBrochureHeader;
