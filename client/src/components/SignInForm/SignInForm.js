import React from "react";
import { Form, Col, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";

const SignInForm = props => (
  <Form>
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
          <Form.Control type="password" name='password' placeholder="Password" value={props.password} onChange={props.handleInputChange} />
        </Col>
      </Form.Row>
      <Form.Row controlid="formSubmit">
        <Col xs={3}>
          <div className="pull-right">
            <button
              onClick={props.handleSignIn}
              type="submit"
              className="btn btn-lg btn-danger"
            >
              Sign In
            </button>
          </div>
        </Col>
      </Form.Row>
  </Form>
);

export default SignInForm;
