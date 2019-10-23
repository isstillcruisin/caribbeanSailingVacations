import React, { Component } from "react"
import Container from 'react-bootstrap/Container'

const About = props => (
  <Container>
    <h1 className='text-center'>About Us</h1>
    <pre>{props.eBrochure._whiteLabel.aboutText}</pre>
  </Container>
)
export default About
