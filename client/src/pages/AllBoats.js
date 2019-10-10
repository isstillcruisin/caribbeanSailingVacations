import React, { Component } from "react";
import API from "../utils/API";
import styled from "styled-components";
import { LinkContainer } from 'react-router-bootstrap'
import Zoom from "react-reveal/Zoom";
import Button from 'react-bootstrap/Button';
import Loader from '../components/Loader';
import Row from 'react-bootstrap/Row';
import EBrochureYacht from '../components/EBrochureYacht'

const BoatsDisplay = styled.div`
  display: grid;
  grid-template: 50% 50% / 50% 50%;
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
            <div style={{display: 'flex', flexDirection: 'column', height: '500px'}}>
              <EBrochureYacht yacht={boat} />
              <Row className='button-row'> 
                {this.editLink(boat)}
                {link}                
                {this.deleteLink(boat)}
              </Row>
            </div>
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
