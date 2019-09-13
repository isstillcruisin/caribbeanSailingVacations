import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const YachtInquiryForm = props => (
  <Container>
    <Row>
      <Col>YACHT NAME:</Col>
      <Col xs={10}>{props.boat.boatName}</Col>
    </Row>
    <p>To inquire about chartering this yacht, please fill out the following form and an email will be sent to {props.whiteLabel._travelAgent.email}: </p>
    <i>All fields are required unless otherwise stated.</i>

    <Form>
      <Form.Row>
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

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    <h3>A WhiteLabel Page For Yacht Charter Inquiry</h3>
    <div>NAME: {props.whiteLabel.name}</div>
    <div>RECIPIENT EMAIL: {props.whiteLabel._travelAgent.email}</div>
  </Container>
);

export default YachtInquiryForm;
