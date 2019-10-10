import React, { Component } from "react";
import API from "../utils/API";
import Fade from "react-reveal/Fade";
import Loader from '../components/Loader';
import styled from "styled-components";
import Carousel from 'react-bootstrap/Carousel';

const BoatContainer = styled.div`
  display: grid;
  overflow: hidden;
  position: relative;
  width: 500px;
  margin: 20px;
  transition: all 1s ease-out;
  height: 40rem;
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

const BoatImage = styled.img`
  max-height: 30rem;
  object-fit: fill;
`;

class BoatDetail extends Component {
  state = {};

  componentDidMount() {
    let { id } = this.props.match.params;
    API.getBoat(id).then(res => {
      this.setState({
        boat: res.data
      });
    });
  }

  renderImages = images => {
    return images.map((image, i) => {
      return (
        <Carousel.Item key={`${i}`}>
          <BoatImage src={image} alt=""></BoatImage>
        </Carousel.Item>
      );
    });
  };

  showBoat = () => {
    return this.state.boat ? (
      <Fade bottom cascade>
        <div>{this.state.boat.boatName}</div>
        <div>{this.state.boat.crewBio}</div>
        <BoatContainer key={this.state.boat._id} style={{width: "50%"}}>
          <Carousel style={{width: "540px"}}>
            {this.renderImages(this.state.boat.imgs)}
          </Carousel>
        <BoatName>{this.props.yacht.boatName}</BoatName>
        <BoatPrice>{`Week | $${Number(this.props.yacht.pricePerWeek).toLocaleString()}`}</BoatPrice>
       </BoatContainer>
      </Fade>
    ) : (
      <Loader/>
    );
  };

  render() {
    return <div>{this.showBoat()}</div>;
  }
}

export default BoatDetail;
