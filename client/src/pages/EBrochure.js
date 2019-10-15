import React, { Component } from "react"
import API from "../utils/API"
import AllBoats from "./AllBoats"
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import StreetAddress from '../components/StreetAddress'
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
          <Card>
            <Card.Header>
              <Row>
                <Col>
                  <img src={this.state.eBrochure._whiteLabel.logoUrl} alt='White Label Logo' />
                </Col>
                <Col style={{flexGrow: '2'}}>
                  <h1 style={{marginTop: '30px', float: 'right'}}>{this.state.eBrochure._whiteLabel.companyName}</h1>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Row>
                <h4 style={{'margin': '20px'}}>Please choose a yacht to request further information:</h4>
              </Row>
              <Row style={{'marginBottom': '20px'}}>
                <AllBoats eBrochure={this.state.eBrochure}/>
              </Row>
              <Row className='footer-address'>
                <i>These yachts were specifically chosen for you by your Travel Agent, and all communication will be with them, on your behalf.</i>
              </Row>
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
