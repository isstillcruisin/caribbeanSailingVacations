import React, { Component } from "react"
import API from "../utils/API"
import AllBoats from "./AllBoats"
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { LinkContainer } from 'react-router-bootstrap'
import StreetAddress from '../components/StreetAddress'
import EBrochureHeader from '../components/EBrochureHeader'
import { About, Home, Contact, Destinations, Yachts, CharterInquiry } from '../components/EBrochureTabs'
import Nav from 'react-bootstrap/Nav'
class EBrochure extends Component {
  state = { key: 'home' }

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

  handleCharterYacht = (yachtId) => {
    this.setState({key: `charter-inquiry-${yachtId}`})
  }

  showEBrochure = () => {
    if (this.state.eBrochure){
      return (
        <>
          <Tab.Container id='test' activeKey={this.state.key} onSelect={key => this.setState({ key })}>              
            <Card className='bg-lightgreen e-brochure'>
              <Card.Header className='text-center bg-lightgreen'>
                <img src={this.state.eBrochure._whiteLabel.logoUrl} alt='White Label Logo' />
                <h3 className='mt-3'>{this.state.eBrochure._whiteLabel.title}</h3>
                <EBrochureHeader />
              </Card.Header>
              <Card.Body className='text-center bg-lightgreen'> 
                <Tab.Content>
                  <Tab.Pane eventKey="home">
                    <Home eBrochure={this.state.eBrochure} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="about">
                    <About eBrochure={this.state.eBrochure} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="yachts">
                    <Yachts eBrochure={this.state.eBrochure} onCharterYacht={this.handleCharterYacht} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="destinations">
                    <Destinations />
                  </Tab.Pane>
                  <Tab.Pane eventKey="contact">
                    <Contact eBrochure={this.state.eBrochure} />
                  </Tab.Pane>
                  {this.state.eBrochure.yachts.map(yacht => (
                    <Tab.Pane eventKey={`charter-inquiry-${yacht._id}`}>
                      <CharterInquiry eBrochure={this.state.eBrochure} yacht={yacht}/>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Card.Body>
            </Card>
          </Tab.Container>
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
