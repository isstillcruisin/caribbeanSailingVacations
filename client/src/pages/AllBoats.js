import React, { Component } from "react";
import API from "../utils/API";
import styled from "styled-components";
import { LinkContainer } from 'react-router-bootstrap'
import Carousel from 'react-bootstrap/Carousel';
import Zoom from "react-reveal/Zoom";
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Loader from '../components/Loader';
import Row from 'react-bootstrap/Row';

const BoatContainer = styled.div`
  display: grid;
  overflow: hidden;
  border: 1px solid ${props => props.theme.white};
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

const BoatsDisplay = styled.div`
  display: grid;
  grid-template: 50% 50% / 50% 50%;
  grid-gap: 3rem;
  background: ${props => props.theme.white};
  @media (max-width: 800px) {
    grid-template: 50% 50% / 100%;
  }
`;

const BoatImage = styled.img`
  height: 30rem;
  object-fit: scale-down;

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
  }

  renderImages = images => {
    return images.map((image, i) => {
      const imageParts = image.split('/upload/'),
        imgUrl = `${imageParts[0]}/upload/w_500,h_300,c_fill/${imageParts[1]}`
      return (
        <Carousel.Item style={{'min-height': '30rem'}}>
          <img src={imgUrl} alt="" className='d-block w-100' />
        </Carousel.Item>
      );
    });
  }

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
        if (this.props.eBrochure) {
          link = 
            (<LinkContainer
              params={{ id: boat._id }}
              key={`${boat._id}${i + 5}`}
              to={`/charter-a-yacht/${this.props.eBrochure._id}/inquiry/${boat._id}`}
              className="book-it-link"
            ><Button>Request Information</Button></LinkContainer>)          
        }
        return (
          <Zoom bottom>
            <BoatContainer key={boat._id}>
              <Carousel key={`${boat._id}${i + 6}`} style={{width: '100%'}}>
                {this.renderImages(boat.imgs)}
              </Carousel>
              <BoatName key={`${boat._id}${i + 1}`}>{boat.boatName}</BoatName>
              <BoatPrice>{`Week | $${Number(boat.pricePerWeek).toLocaleString()}`}</BoatPrice>
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
