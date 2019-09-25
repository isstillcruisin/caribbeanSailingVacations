import React from "react";

import {Row, Container} from 'react-bootstrap';

const StreetAddress = props => {
  return (
    <Container>
      <Row className='footer-address'>
        <i>{props.address.name}</i>
        <i>{props.address.companyName}</i>
        <i>{props.address.phoneNumber}</i>
        <i>{props.address.streetAddress}</i>
        <i>{props.address.city}, {props.address.state}</i>
        <i>{props.address.zipCode} {props.address.country}</i>
      </Row>
    </Container>
  )
};

export default StreetAddress;
