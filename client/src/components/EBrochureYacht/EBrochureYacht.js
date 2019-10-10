import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import styled from "styled-components";

const BoatContainer = styled.div`
  display: grid;
  overflow: hidden;
  position: relative;
  transition: all 1s ease-out;
  height: 450px;
  width: 500px;
  background-color: rgba(200, 200, 200, 0.6);
  margin: 0 20px 0 20px
`;

const BoatInfo = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  text-align: center;  
`;

class EBrochureYacht extends Component {
  renderImages = images => {
    return images.map((image, i) => {
      const imageParts = image.split('/upload/'),
        imgUrl = `${imageParts[0]}/upload/w_500,h_300,c_fill/${imageParts[1]}`
      return (
        <Carousel.Item key={`${i+1}`}>
          <img src={imgUrl} alt=""/>
        </Carousel.Item>
      );
    });
  }

  render() {
    return (<BoatContainer>
      <Carousel>
        {this.renderImages(this.props.yacht.imgs)}
      </Carousel>
      <BoatInfo>{this.props.yacht.boatName}</BoatInfo>
      <BoatInfo>Max Passengers: {this.props.yacht.maxPassengers}</BoatInfo>
      <BoatInfo>{`Price Per Week: $${Number(this.props.yacht.pricePerWeek).toLocaleString()}`}</BoatInfo>
    </BoatContainer>
    )
  }
}

export default EBrochureYacht;

