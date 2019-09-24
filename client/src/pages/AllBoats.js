import React, { Component } from "react";
import API from "../utils/API";
import styled from "styled-components";
import { LinkContainer } from 'react-router-bootstrap'
import Slide from "react-reveal/Slide";
import Carousel from 'react-bootstrap/Carousel';
import Zoom from "react-reveal/Zoom";
import Button from 'react-bootstrap/Button';
import Loader from '../components/Loader';

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
const BoatInfoRow = styled.div`
  display: grid;
  grid-template-columns: 20% 20% 20% 20%;
  grid-gap: 2rem;
  height: 10rem;
  position: relative;
`;

const BoatName = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  text-align: center;  
`

const BoatInfo = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const BoatPrice = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  text-align: center;  
`

const BoatsDisplay = styled.div`
  display: grid;
  grid-template: 50% 50% / 50% 50%;
  grid-gap: 3rem;
  background: ${props => props.theme.transparentGrey};
  @media (max-width: 800px) {
    grid-template: 50% 50% / 100%;
  }
`;

const BoatImage = styled.img`
  max-height: 30rem;
  object-fit: fill;
`;

class AllBoats extends Component {
  state = {
    boats: []
  };

  componentDidMount() {
    this.getBoats();
  }

  componentDidUpdate() {
    this.showBoats();
  }

  getBoats = () => {
    API.getBoats(this.props).then(response => {
      if (response) {
        this.setState({ boats: response.data });
      } else {
        console.log("response error (╯°□°)╯︵ ┻━┻ ", response);
      }
    });
  };

  renderImages = images => {
    return images.map((image, i) => {
      return (
        <Carousel.Item>
          <BoatImage src={image} alt=""></BoatImage>
        </Carousel.Item>
      );
    });
  };

  showBoats = () => {
    if (this.state.boats) {
      return this.state.boats.map((boat, i) => {
        let link = 
          (<LinkContainer
            params={{ id: boat._id }}
            key={`${boat._id}${i + 5}`}
            to={`/boat/${boat._id}`}
            className="boat-detail-link"
          ><Button>See Details</Button></LinkContainer>)
        if (this.props.whiteLabel) {
          link = 
            (<LinkContainer
              params={{ id: boat._id }}
              key={`${boat._id}${i + 5}`}
              to={`/charter-a-yacht/${this.props.whiteLabel.name}/inquiry/${boat._id}`}
              className="book-it-link"
            ><Button>Request Information</Button></LinkContainer>)
        }
        if (this.props.eBrochure) {
          link = 
            (<LinkContainer
              params={{ id: boat._id }}
              key={`${boat._id}${i + 5}`}
              to={`/charter-a-yacht/${this.props.eBrochure._whiteLabel.name}/inquiry/${boat._id}`}
              className="book-it-link"
            ><Button>Request Information</Button></LinkContainer>)          
        }
        return (
          <Zoom bottom>
            <BoatContainer key={boat._id}>
              <Carousel key={`${boat._id}${i + 6}`} style={{width: "470px"}}>
                {this.renderImages(boat.imgs)}
              </Carousel>
              <BoatName key={`${boat._id}${i + 1}`}>{boat.boatName}</BoatName>
              <BoatPrice>45 min | $20,000</BoatPrice>
              {link}
            </BoatContainer>
          </Zoom>
        );
      });
    } else {
      return <Loader />;
    }
  };

  render() {
    return <BoatsDisplay>{this.showBoats()}</BoatsDisplay>;
  }
}

export default AllBoats;
