import React, { Component } from "react";
import API from "../utils/API";
import Fade from "react-reveal/Fade";
import Loader from '../components/Loader';
import styled from "styled-components";
import { LinkContainer } from 'react-router-bootstrap'
import Slide from "react-reveal/Slide";
import Carousel from 'react-bootstrap/Carousel';
import Zoom from "react-reveal/Zoom";
import Button from 'react-bootstrap/Button';

const BoatContainer = styled.div`
  display: grid;
  overflow: hidden;
  border: 1px solid ${props => props.theme.transparentGrey};
  position: relative;
  width: 100%;
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
        <Carousel.Item>
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
          <Carousel key={`${this.state.boat._id}`} style={{width: "500px"}}>
            {this.renderImages(this.state.boat.imgs)}
          </Carousel>
          <BoatName key={`${this.state.boat._id}`}>{this.state.boat.boatName}</BoatName>
          <BoatPrice>45 min | $20,000</BoatPrice>
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
