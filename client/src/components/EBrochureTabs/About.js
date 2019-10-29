import React from 'react'
import Container from 'react-bootstrap/Container'
import PropTypes from 'prop-types'

const About = props => (
  <Container>
    <h1 className='text-center'>About Us</h1>
    <pre>{props.eBrochure._whiteLabel.aboutText}</pre>
  </Container>
)

About.propTypes = {
  eBrochure: PropTypes.shape({
    _whiteLabel: PropTypes.shape({
      aboutText: PropTypes.string,
    }),
  }),
}

export default About
