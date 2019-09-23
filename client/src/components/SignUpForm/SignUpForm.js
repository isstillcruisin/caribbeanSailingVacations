import React from "react";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const SignUpForm = props => (
   <Card style={{color: 'black'}}>
    <Form>
      <Form.Row>
        <Form.Label column xs={3}>
          Name
        </Form.Label>
        <Col>
          <Form.Control placeholder="First name" name='firstName' onChange={props.handleInputChange} />
        </Col>
        <Col>
          <Form.Control placeholder="Last name" name='lastName' onChange={props.handleInputChange} />
        </Col>
      </Form.Row>
      <Form.Row controlid="formEmail">
        <Form.Label column xs={3}>
          Email
        </Form.Label>
        <Col xs={9}>
          <Form.Control type="email" name='email' placeholder="Email Address" value={props.email} onChange={props.handleInputChange} />
        </Col>
      </Form.Row>
      <Form.Row controlid="formPassword">
        <Form.Label column xs={3}>
          Password
        </Form.Label>
        <Col xs={9}>
          <Form.Control type="password" name='password' placeholder="Choose a password" value={props.password} onChange={props.handleInputChange} />
        </Col>
      </Form.Row>
      <Form.Row controlid="formSubmit">
        <Col>
          <Button
            onClick={props.handleSignUp}
            type="submit"
            className="btn btn-lg"
          >
            Submit
          </Button>
        </Col>
      </Form.Row>
    </Form>
  </Card>
);

export default SignUpForm;
