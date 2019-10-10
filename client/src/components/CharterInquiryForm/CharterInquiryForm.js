import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import DatePickerWithBlackoutDates from '../DatePickerWithBlackoutDates';
import formatPrice from '../../utils/formatPrice';
import { LinkContainer } from 'react-router-bootstrap'

class CharterInquiryForm extends Component {
  renderEstimatedPrice=() => {
    if (this.props.estimatedPrice) {
      return <h4>{formatPrice(this.props.estimatedPrice)}</h4>
    } else {
      return <i>Choose dates first.</i>
    }
  }

  renderPricePerWeek=() => {
    return <h4>{formatPrice(this.props.boat.pricePerWeek)}</h4>
  }

  renderSubmitButton=() => {
    if (this.props.disableSubmit) {
      return (<Button
        onClick={this.props.handleSubmitInquiry}
        type="submit"
        className="btn btn-lg"
        disabled
      >
        {this.props.submitText}
      </Button>)
    } else {
      return (<Button
        onClick={this.props.handleSubmitInquiry}
        type="submit"
        className="btn btn-lg">
        Submit Inquiry
      </Button>)
    }
  }

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
    const blackoutDates = [
      { from: new Date("October 12, 2019"), to: new Date("October 25, 2019")},
      { from: new Date("December 24, 2019"), to: new Date("January 2, 2020")}
    ]
    return (
      <Container style={{marginTop: '20px'}} >
        <Row>
          <Col>            
            <img src={this.props.whiteLabel.logoUrl} alt='White Label Logo' />
          </Col>
          <Col>
            <h2>Yacht Charter: {this.props.boat.boatName}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Carousel>
              {this.renderImages(this.props.boat.imgs)}
            </Carousel>
          </Col>
          <Col>
            <p>To inquire about chartering this yacht, please fill out the following form and an email will be sent to your Travel Agent, 
            &nbsp; {this.props.whiteLabel._travelAgent.firstName} {this.props.whiteLabel._travelAgent.lastName}: </p>
            <Card style={{color: 'black'}}>
              <Card.Body>
                <Form>
                  <Form.Row>
                    <Form.Label column xs={3}>
                      Name
                    </Form.Label>
                    <Col>
                      <Form.Control placeholder='First name' name='firstName' onChange={this.props.handleInputChange} />
                    </Col>
                    <Col>
                      <Form.Control placeholder='Last name' name='lastName' onChange={this.props.handleInputChange} />
                    </Col>
                  </Form.Row>
                  <Form.Row controlid='formEmail'>
                    <Form.Label column xs={3}>
                      Email
                    </Form.Label>
                    <Col xs={9}>
                      <Form.Control type='email' placeholder='Email Address' name='email' onChange={this.props.handleInputChange}  />
                    </Col>
                  </Form.Row>
                  <Form.Row controlid='numberOfPassengers'>
                    <Form.Label column xs={3}>
                      Number of Passengers (max: {this.props.boat.maxPassengers})
                    </Form.Label>
                    <Col xs={9}>
                      <Form.Control type='number' placeholder={`Number of Passengers (max: ${this.props.boat.maxPassengers})`} name='numberOfPassengers' onChange={this.props.handleInputChange}  />
                    </Col>
                  </Form.Row>
                  <Form.Row controlid='dates'>
                    <Form.Label column xs={3}>
                      Desired Dates<br/><i>(availability TBD)</i>
                    </Form.Label>
                    <Col xs={9}>
                      <DatePickerWithBlackoutDates 
                        blackoutDates={blackoutDates} 
                        handleSelectedRange={this.props.handleDateRangeChange} 
                        month={this.props.month}
                      />
                    </Col>     
                    <Col>
                      <i>All fields are required unless otherwise stated.</i>
                    </Col>
                  </Form.Row>
                   <Form.Row>
                    <Form.Label column xs={3}>
                      <b>Price Per Week</b>
                    </Form.Label>
                    <Col xs={9}>
                     {this.renderPricePerWeek()}
                    </Col>
                  </Form.Row>   
                  <Form.Row>
                    <Form.Label column xs={3}>
                      <b>Estimated Price</b>
                    </Form.Label>
                    <Col xs={9}>
                     {this.renderEstimatedPrice()}
                    </Col>
                  </Form.Row>
                  {this.renderSubmitButton()}
                  <LinkContainer to={this.props.eBrochurePath} pullright>
                    <Button className="btn btn-lg">Back</Button>
                  </LinkContainer>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default CharterInquiryForm;
