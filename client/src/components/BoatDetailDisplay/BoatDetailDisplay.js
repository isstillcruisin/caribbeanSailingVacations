import React, {Component} from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'
import PropTypes from 'prop-types'

class BoatDetailDisplay extends Component {
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
  };

  render() {
    return (
      <Card className='bg-lightgreen' style={{width: '600px'}}>
        <Card.Header>
          <h3>Yacht: <i>{this.props.boat.boatName}</i></h3>
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
                  <Carousel style={{width: '540px'}}>
                    {this.renderImages(this.props.boat.imgs)}
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
                    <Col>{`$${Number(this.props.boat.pricePerWeek).toLocaleString()}`}</Col>
                  </Row>
                  <Row>
                    <Col xs={3}>Max Passengers</Col>
                    <Col>{this.props.boat.maxPassengers}</Col>
                  </Row>
                  <Row>
                    <Col xs={3}>Year</Col>
                    <Col>{this.props.boat.year}</Col>
                  </Row>
                  <Row>
                    <Col xs={3}>Manufacture</Col>
                    <Col>{this.props.boat.manufacture}</Col>
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
                <Card.Body className='multiline-text'>{this.props.boat.crewBio}</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>            
         
        </Card.Body>
      </Card>
    )
  }
}

BoatDetailDisplay.propTypes = {
  boat: PropTypes.shape({
    boatName: PropTypes.string,
    imgs: PropTypes.arrayOf(PropTypes.string),
    pricePerWeek: PropTypes.number,
    maxPassengers: PropTypes.number,
    year: PropTypes.number,
    manufacture: PropTypes.string,
    crewBio: PropTypes.string,
  })
}

export default BoatDetailDisplay
