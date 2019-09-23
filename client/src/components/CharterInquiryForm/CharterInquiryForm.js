import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import DatePickerWithBlackoutDates from '../DatePickerWithBlackoutDates';
class CharterInquiryForm extends Component {
  state = {};  

  handleDateRangeChange = ({ from, to }) => {
    this.props.handleDateRangeChange({from, to}); 
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h2>Yacht Charter: {this.props.boat.boatName}</h2>
          </Col>
        </Row>
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
              <Form.Row controlid='formEmail'>
                <Form.Label column xs={3}>
                  Desired Dates<br/><i>(availability TBD)</i>
                </Form.Label>
                <Col xs={9}>
                  <DatePickerWithBlackoutDates blackoutDates={[
                    { from: new Date("October 12, 2019"), to: new Date("October 25, 2019")},
                    { from: new Date("December 24, 2019"), to: new Date("January 2, 2020")},
                  ]} handleSelectedRange={this.handleDateRangeChange} />
                </Col>     
                <Col>
                  <i>All fields are required unless otherwise stated.</i>
                </Col>
              </Form.Row>
             
              <Button
                onClick={this.props.handleSubmitInquiry}
                type="submit"
                className="btn btn-lg"
              > 
                Submit Inquiry
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
export default CharterInquiryForm;
