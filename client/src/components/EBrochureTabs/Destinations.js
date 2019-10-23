import React, { Component } from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const Destinations = props => (
  <Container>
    <h1 className='text-center'>Destinations</h1>
    <i>Whether you are looking for a relaxing vacation spent on the beautiful white sand beaches of the BVI or an adventure vacation spent diving and hiking the Caribbean Islands, we have just the ting' for you. We offer trips in the USVI and BVI, as well as seasonal trips to St. Maarten, St. Barths, Antigua Puerto Rico St. Vincent & The Grenadines.</i> 
    <Row>
      <Col xs={4} className='destination'>
        <img src='https://res.cloudinary.com/dui3yyhou/image/upload/w_400,h_300,c_fill/v1563737195/DROCK_1.jpg' />
      </Col>
      <Col xs={4} className='destination'>
        <img src='https://res.cloudinary.com/dui3yyhou/image/upload/w_400,h_300,c_fill/v1563737195/DROCK_1.jpg' />
      </Col>
      <Col xs={4} className='destination'>
        <img src='https://res.cloudinary.com/dui3yyhou/image/upload/w_400,h_300,c_fill/v1563737195/DROCK_1.jpg' />
      </Col>
    </Row>
    <Row>  
      <Col xs={4} className='destination'>
        <img src='https://res.cloudinary.com/dui3yyhou/image/upload/w_400,h_300,c_fill/v1563737195/DROCK_1.jpg' />
      </Col>
      <Col xs={4} className='destination'>
        <img src='https://res.cloudinary.com/dui3yyhou/image/upload/w_400,h_300,c_fill/v1563737195/DROCK_1.jpg' />
      </Col>
      <Col xs={4} className='destination'>
        <img src='https://res.cloudinary.com/dui3yyhou/image/upload/w_400,h_300,c_fill/v1563737195/DROCK_1.jpg' />
      </Col>
    </Row>  
  </Container>
)
export default Destinations