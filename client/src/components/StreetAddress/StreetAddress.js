import React from "react";

import {Row, Container} from 'react-bootstrap';

const StreetAddress = props => {
  return (
    <Row className='footer-address bg-lightgreen'>
      <i>{props.address.name}</i>
      <i>{props.address.companyName}</i>
      <i>{props.address.phoneNumber}</i>
      <i>{props.address.streetAddress}</i>
      <i>{props.address.city}, {props.address.state}</i>
      <i>{props.address.zipCode} {props.address.country}</i>
    </Row>
  )
};

export default StreetAddress;
