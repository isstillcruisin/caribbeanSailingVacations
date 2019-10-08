import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import styled from "styled-components";

const BoatContainer = styled.div`
  display: grid;
  overflow: hidden;
  position: relative;
  width: 100%;
  transition: all 1s ease-out;
  height: 450px;
  background-color: rgba(200, 200, 200, 0.6);
`;

const BoatName = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  text-align: center;  
`;

const BoatPrice = styled.div`
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
          <img src={imgUrl} alt="" className='d-block w-100' />
        </Carousel.Item>
      );
    });
  }

  render() {
    return (<BoatContainer>
      <Carousel>
        {this.renderImages(this.props.yacht.imgs)}
      </Carousel>
      <BoatName>{this.props.yacht.boatName}</BoatName>
      <BoatPrice>{`Week | $${Number(this.props.yacht.pricePerWeek).toLocaleString()}`}</BoatPrice>
    </BoatContainer>
    )
  }
}

export default EBrochureYacht;

