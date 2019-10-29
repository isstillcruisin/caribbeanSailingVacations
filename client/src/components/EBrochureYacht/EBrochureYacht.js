import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const BoatContainer = styled.div`
  display: grid;
  overflow: hidden;
  position: relative;
  transition: all 1s ease-out;
  height: 470px;
  width: 500px;
  background-color: ${props => props.theme.white};
  margin: 0 80px 0 80px
`

const BoatInfo = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  text-align: center;  
`

class EBrochureYacht extends Component {
  renderImages = images => {
    return images.map((image, i) => {
      const imageParts = image.split('/upload/'),
        imgUrl = `${imageParts[0]}/upload/w_500,h_300,c_fill/${imageParts[1]}`
      return (
        <Carousel.Item key={`${i+1}`}>
          <img src={imgUrl} alt=""/>
        </Carousel.Item>
      )
    })
  }

  render() {
    return (
      <Container>
        <BoatContainer>
          <Carousel>
            {this.renderImages(this.props.yacht.imgs)}
          </Carousel>
          <BoatInfo>{this.props.yacht.boatName}</BoatInfo>
          <BoatInfo>Max Passengers: {this.props.yacht.maxPassengers}</BoatInfo>
          <BoatInfo>{`Price Per Week: $${Number(this.props.yacht.pricePerWeek).toLocaleString()}`}</BoatInfo>
          <Button style={{margin: 'auto'}} variant='outline-success' onClick={this.props.onCharterYacht} >Book Now</Button>
        </BoatContainer>
      </Container>
    )
  }
}

EBrochureYacht.propTypes = {
  yacht: PropTypes.shape({
    imgs: PropTypes.arrayOf(PropTypes.string),
    boatName: PropTypes.string,
    maxPassengers: PropTypes.number,
    pricePerWeek: PropTypes.number,
  }),
  onCharterYacht: PropTypes.func,
}

export default EBrochureYacht

