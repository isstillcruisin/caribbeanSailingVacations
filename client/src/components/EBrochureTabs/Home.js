import React from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel';
import AvailableYachtSearchForm from '../AvailableYachtSearchForm'

const Home = props => (
  <div className='e-brochure-home'>
    <AvailableYachtSearchForm 
      eBrochure={props.eBrochure} 
      onSearch={props.handleSearch} 
      filters={props.filters}
    />
    <Carousel className='w-100 mb-5' >
      <Carousel.Item key='carousel-1'>
        <img src='https://res.cloudinary.com/dui3yyhou/image/upload/w_1200,h_600,c_fill/v1563737195/luke-bender-h_YjxPtkRHA-unsplash' alt="" className='d-block w-100' />
        <Carousel.Caption>
          <h1>Boutique Sailing Adventures</h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item key='carousel-2'>
        <img src='https://res.cloudinary.com/dui3yyhou/image/upload/w_1200,h_600,c_fill/v1563737195/jeremy-bishop-LZykn1xi4ek-unsplash' alt="" className='d-block w-100' />
        <Carousel.Caption>
          <h1>Conscientous Cruising</h1>
          <h4>Dedicated to leaving no trace on our beautiful islands, a portion of our proceeds go to cleaning up our oceans</h4>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item key='carousel-3'>
        <img src='https://res.cloudinary.com/dui3yyhou/image/upload/w_1200,h_600,c_fill/v1563737195/thomas-lefebvre-V63oM8OPJSo-unsplash'alt="" className='d-block w-100' />
        <Carousel.Caption>
          <h1>Paradise... Found</h1>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <Container>
      <h3 className='section-header'>Set Sail</h3>
      <h3 className='section-header'>With Confidence</h3>
      <div className='section-separator' data-border-width="3px"></div>
  ​    <p className='pretty-italic'>We have hand selected yachts out of many different management operations in the Caribbean to bring you the best possible vacation for your budget. We have met with crews and in many cases eaten the foods of the fantastic chefs on board. We own our vacation and are sure that you will love your time aboard.</p>
      <p className='pretty-italic'>It is our hope to bring our love of sailing and the beautiful Caribbean to as many people as possible. We want to make the process of selecting the perfect boat and crew for you as simple as possible.</p>
      <Row style={{ height: '250px'}} >
        <Col style={{backgroundColor: 'white', marginRight: '5px'}}>
          <Container className='pa-2'>
            <h2>Our Fleet</h2>
            <i className='ma3'>From 40ft to 70ft our fleet has something for everyone. Whether its a romantic honeymoon for two, or a whole family get-together our catamarans have all the amenities to make your vacation unforgettable.</i>
            <div className='section-separator green'/>
          </Container>
        </Col>
        <Col style={{backgroundColor: 'white'}}>
          <Container>
            <h2>Destinations</h2>
            <i>From Puerto Rico to Grenada the entirety of the Caribbean is your playground. These islands are the stuff that dreams are made of.</i>
            <div className='section-separator green'/>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col style={{backgroundColor: 'white', marginRight: '5px'}}>
          <Container>
            <Button variant='link' onClick={props.onShowYachts}>Read More</Button>
          </Container>
        </Col>
        <Col style={{backgroundColor: 'white'}}>
          <Container>
            <Button variant='link' onClick={props.onShowDestinations}>Read More</Button>
          </Container>
        </Col>
      </Row>
    </Container>
  </div>
)
export default Home
