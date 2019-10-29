import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Destinations = props => (
  <Container>
    <h1 className='text-center'>Destinations</h1>
    <i>Whether you are looking for a relaxing vacation spent on the beautiful white sand beaches of the BVI or an adventure vacation spent diving and hiking the Caribbean Islands, we have just the thing for you. We offer trips in the USVI and BVI, as well as seasonal trips to St. Maarten, St. Barths, Antigua Puerto Rico St. Vincent & The Grenadines.</i> 
    <Row>
      <Col xs={4} className='destination'>
        <img 
          src='https://res.cloudinary.com/dui3yyhou/image/upload/w_400,h_300,c_fill/v1563737195/diogo-tavares-PFZTiiJnjag-unsplash'
          alt='biking near ocean'
        />
      </Col>
      <Col xs={4} className='destination'>
        <img 
          src='https://res.cloudinary.com/dui3yyhou/image/upload/w_400,h_300,c_fill/v1563737195/eunice-c-QstAba7N2ZY-unsplash'
          alt='swimming pool near ocean'
        />
      </Col>
      <Col xs={4} className='destination'>
        <img 
          src='https://res.cloudinary.com/dui3yyhou/image/upload/w_400,h_300,c_fill/v1563737195/alice-donovan-rouse-9MzCd76xLGk-unsplash' 
          alt='delicious picnic'
        />
      </Col>
    </Row>
    <Row>  
      <Col xs={4} className='destination'>
        <img 
          src='https://res.cloudinary.com/dui3yyhou/image/upload/w_400,h_300,c_fill/v1563737195/todd-desantis-tszmwrc8sJI-unsplash' 
          alt='boardwalk to beach'
        />
      </Col>
      <Col xs={4} className='destination'>
        <img 
          src='https://res.cloudinary.com/dui3yyhou/image/upload/w_400,h_300,c_fill/v1563737195/blake-cheek-tsNNCycr5MA-unsplash' 
          alt='beach silhoutte'
        />
      </Col>
      <Col xs={4} className='destination'>
        <img 
          src='https://res.cloudinary.com/dui3yyhou/image/upload/w_400,h_300,c_fill/v1563737195/khadeeja-yasser-0E3BW7mF4Rg-unsplash' 
          alt='walking on beach'
        />
      </Col>
    </Row>  
  </Container>
)
export default Destinations