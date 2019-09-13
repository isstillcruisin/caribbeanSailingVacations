import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {DateRangePicker} from 'react-dates';

class YachtInquiryForm extends Component {
  state = {};  

  render() {
    return (
      <Container>
        <Row>
          <Col>YACHT NAME:</Col>
          <Col xs={9}>{this.props.boat.boatName}</Col>
        </Row>
        <p>To inquire about chartering this yacht, please fill out the following form and an email will be sent to the Travel Agent: {this.props.whiteLabel._travelAgent.email}: </p>
        <i>All fields are required unless otherwise stated.</i>
        <Card style={{color: 'black'}}>
          <Card.Body>
          <Form>
            <Form.Row>
              <Form.Label column xs={2}>
                Name
              </Form.Label>
              <Col>
                <Form.Control placeholder="First name" />
              </Col>
              <Col>
                <Form.Control placeholder="Last name" />
              </Col>
            </Form.Row>
            <Form.Row controlId="formEmail">
              <Form.Label column xs={2}>
                Email
              </Form.Label>
              <Col xs={10}>
                <Form.Control type="email" placeholder="Email Address" />
              </Col>
            </Form.Row>
            <Form.Row controlId="formEmail">
              <Form.Label column xs={2}>
                Desired Dates (availability TBD)
              </Form.Label>
              <Col xs={10}>
                <DateRangePicker
                  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                  onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                  onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />
              </Col>     
            </Form.Row>
           
            <Button variant="primary" type="submit">
              Submit Inquiry
            </Button>
          </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
export default YachtInquiryForm;
