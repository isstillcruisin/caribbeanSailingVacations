import React from "react";

import {Row, Container} from 'react-bootstrap';

const StreetAddress = props => {
  console.log("****", props);
  return (
    <Container>
      <Row className='footer-address'>
        <i>{props.address.name}</i>
        <i>{props.address.companyName}</i>
        <i>{props.address.streetAddress}</i>
        <i>{props.address.city} {props.address.state} {props.address.country} {props.address.zipCode}</i>
      </Row>
    </Container>
  )
};

export default StreetAddress;
