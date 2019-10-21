import React, { Component } from "react"
import API from "../utils/API"
import AllBoats from "./AllBoats"
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import StreetAddress from '../components/StreetAddress'
import EBrochureHeader from '../components/EBrochureHeader'
class EBrochure extends Component {
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

  showEBrochure = () => {
    if (this.state.eBrochure){
      return (
        <>
          <Card className='bg-lightgreen'>
            <Card.Header className='text-center bg-lightgreen'>
              <img src={this.state.eBrochure._whiteLabel.logoUrl} alt='White Label Logo' />
              <h3 className='mt-3'>{this.state.eBrochure._whiteLabel.title}</h3>
              <EBrochureHeader ebrochure={this.state.eBrochure}/>
            </Card.Header>
            <Card.Body>
              <h3>Set Sail</h3>
              <h3>With Confidence</h3>
​              <p>We have hand selected yachts out of many different management operations in the Caribbean to bring you the best possible vacation for your budget. We have met with crews and in many cases eaten the foods of the fantastic chefs on board. We own our vacation and are sure that you will love your time aboard.</p>
              <p>It is our hope to bring our love of sailing and the beautiful Caribbean to as many people as possible. We want to make the process of selecting the perfect boat and crew for you as simple as possible.</p>
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
      {this.showEBrochure()}
    </div>
  }
}

export default EBrochure
