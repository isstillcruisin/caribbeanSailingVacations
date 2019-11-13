import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import styled from 'styled-components'
import PropTypes from 'prop-types'

class EBrochureYacht extends Component {
  renderImages = images => {
    return images.map((image, i) => {
      const imageParts = image.split('/upload/'),
        imgUrl = `${imageParts[0]}/upload/c_fill,w_500,h_300/${imageParts[1]}`
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
        <div className='boat-container'>
          <Carousel>
            {this.renderImages(this.props.yacht.imgs)}
          </Carousel>
          <div className='boat-info'>{this.props.yacht.boatName}</div>
          <div className='boat-info'>Max Passengers: {this.props.yacht.maxPassengers}</div>
          <div className='boat-info'>{`Price Per Week: $${Number(this.props.yacht.pricePerWeek).toLocaleString()}`}</div>
          <Button style={{margin: 'auto'}} variant='outline-success' onClick={this.props.onCharterYacht} >Book Now</Button>
        </div>
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

