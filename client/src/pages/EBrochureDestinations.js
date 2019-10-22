import React, { Component } from "react"
import API from "../utils/API"
import AllBoats from "./AllBoats"
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import StreetAddress from '../components/StreetAddress'
import EBrochureHeader from '../components/EBrochureHeader'
class EBrochureDestinations extends Component {
  state = {}

  componentDidMount() {
    let { id } = this.props.match.params
    API.getEBrochure(id).then(res => {
      this.setState({
        eBrochure: res.data
      })
    })
  }
  
  travelAgentName = () => `${this.state.eBrochure._whiteLabel._travelAgent.firstName} ${this.state.eBrochure._whiteLabel._travelAgent.lastName}`
  travelAgentPhoneNumber = () => this.state.eBrochure._whiteLabel._travelAgent.phoneNumber

  showEBrochureDestinations = () => {
    if (this.state.eBrochure){
      return (
        <>
          <Card className='bg-lightgreen e-brochure'>
            <Card.Header className='text-center bg-lightgreen'>
              <img src={this.state.eBrochure._whiteLabel.logoUrl} alt='White Label Logo' />
              <h3 className='mt-3'>{this.state.eBrochure._whiteLabel.title}</h3>
              <EBrochureHeader ebrochure={this.state.eBrochure}/>
            </Card.Header>
            <Card.Body>
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
            </Card.Body>
          </Card>
          <StreetAddress address={Object.assign({}, this.state.eBrochure._whiteLabel, {name: this.travelAgentName(), phoneNumber: this.travelAgentPhoneNumber()})}/>
        </>
      )
    } else {
      return <Loader />
    }
  }

  render() {
    return <div>
      <Alert {...this.props}/>
      {this.showEBrochureDestinations()}
    </div>
  }
}

export default EBrochureDestinations
