import React, { Component } from "react"
import API from "../utils/API"
import AllBoats from "./AllBoats"
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import StreetAddress from '../components/StreetAddress'
import EBrochureHeader from '../components/EBrochureHeader'
class EBrochureAbout extends Component {
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

  showEBrochureAbout = () => {
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
                <h1 class='text-center'>About Us</h1>
                <pre>{this.state.eBrochure._whiteLabel.aboutText}</pre>
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
      {this.showEBrochureAbout()}
    </div>
  }
}

export default EBrochureAbout
