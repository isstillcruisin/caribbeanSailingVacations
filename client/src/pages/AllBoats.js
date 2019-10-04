import React, { Component } from "react";
import API from "../utils/API";
import styled from "styled-components";
import { LinkContainer } from 'react-router-bootstrap'
import Carousel from 'react-bootstrap/Carousel';
import Zoom from "react-reveal/Zoom";
import Button from 'react-bootstrap/Button';
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
        <Carousel.Item style={{minHeight: '30rem'}} key={`${i+1}`}>
          <img src={imgUrl} alt="" className='d-block w-100' />
        </Carousel.Item>
      );
    });
  }

  deleteLink = (boat) => {
    if (!this.props.eBrochure) {
      return <Button variant="danger" style={{marginLeft: '100px', }} onClick={() => this.handleDeleteBoat(boat)}>Delete</Button>
    }
  }

  editLink = (boat) => {
    if (!this.props.eBrochure) {
      return <LinkContainer to={`/boat/${boat._id}/edit`}  style={{marginRight: '100px'}}>
          <Button>Modify</Button>
        </LinkContainer>
    }
  }

  handleDeleteBoat = (boat) => {
    if (window.confirm(`Are you sure you want to delete the yacht named ${boat.boatName}.`)) {
      API.deleteBoat(boat._id).then(response => {
        if (response) {
          let boats = this.state.boats.filter( b => b._id !== boat._id)
          this.setState({boats: boats})
        }
      })
    } 
  }

  showBoats = () => {
    if (this.state.boats) {
      return this.state.boats.map((boat, i) => {
        let link = 
          (<LinkContainer
            key={`${boat._id}${i + 5}`}
            to={`/boat/${boat._id}`}
            className="boat-detail-link"
          ><Button>See Details</Button></LinkContainer>)
        if (this.props.eBrochure) {
          link = 
            (<LinkContainer
              key={`${boat._id}${i + 5}`}
              to={`/charter-a-yacht/${this.props.eBrochure._id}/inquiry/${boat._id}`}
              className="book-it-link"
            ><Button>Request Information</Button></LinkContainer>)          
        }
        return (
          <Zoom bottom key={boat._id}>
            <BoatContainer>
              <Carousel style={{width: '100%'}}>
                {this.renderImages(boat.imgs)}
              </Carousel>
              <BoatName key={`${boat._id}${i + 1}`}>{boat.boatName}</BoatName>
              <BoatPrice>{`Week | $${Number(boat.pricePerWeek).toLocaleString()}`}</BoatPrice>
              <Row className='button-row'> 
                {this.editLink(boat)}
                {link}                
                {this.deleteLink(boat)}
              </Row>
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
