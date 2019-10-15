import React, { Component } from "react";
import API from "../utils/API";
import Fade from "react-reveal/Fade";
import Loader from '../components/Loader';
import styled from "styled-components";
import { Carousel, Accordion, Card, Button, Container, Row, Col } from 'react-bootstrap';

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
      <Container>
        <Card>
          <Card.Header>
            <h3>Yacht: <i>{this.state.boat.boatName}</i></h3>
          </Card.Header>
          <Card.Body>
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Images
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Carousel style={{width: "540px"}}>
                      {this.renderImages(this.state.boat.imgs)}
                    </Carousel>  
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="2">
                    Specification
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <Row>
                      <Col xs={3}>Price Per Week</Col>
                      <Col>{`$${Number(this.state.boat.pricePerWeek).toLocaleString()}`}</Col>
                    </Row>
                    <Row>
                      <Col xs={3}>Max Passengers</Col>
                      <Col>{this.state.boat.maxPassengers}</Col>
                    </Row>
                    <Row>
                      <Col xs={3}>Year</Col>
                      <Col>{this.state.boat.year}</Col>
                    </Row>
                    <Row>
                      <Col xs={3}>Manufacture</Col>
                      <Col>{this.state.boat.manufacture}</Col>
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Crew Biography
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>{this.state.boat.crewBio}</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>            
           
          </Card.Body>
        </Card>
      </Container>
    ) : (
      <Loader/>
    );
  };

  render() {
    return <div>{this.showBoat()}</div>;
  }
}

export default BoatDetail;
