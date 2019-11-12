import React, { Component } from 'react'
import API from '../utils/API'
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Tab from 'react-bootstrap/Tab'
import EBrochureHeader from '../components/EBrochureHeader'
import { About, Home, Contact, Destinations, Yachts, CharterInquiry } from '../components/EBrochureTabs'
import PropTypes from 'prop-types'
import qs from 'qs'

class EBrochure extends Component {
  state = { key: 'home', filters: {} }

  componentDidMount() {
    let { id } = this.props.match.params
    API.getEBrochure(id).then(res => {
      const name = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true
      }).yacht
      this.setState({
        eBrochure: res.data,
        yachts: res.data.yachts,
        key: (name ? `charter-inquiry-${name}` : 'home') 
      })
    })
  }
  
  travelAgentName = () => `${this.state.eBrochure._whiteLabel._travelAgent.firstName} ${this.state.eBrochure._whiteLabel._travelAgent.lastName}`
  travelAgentPhoneNumber = () => this.state.eBrochure._whiteLabel._travelAgent.phoneNumber

  handleCharterYacht = (yachtId) => this.setState({key: `charter-inquiry-${yachtId}`})

  handleShowYachts =  () => this.setState({key: 'yachts'})
  handleShowDestinations =  () => this.setState({key: 'destinations'})

  handleFilterAndShowYachts = (filterParams) => {
    API.findAvailableYachts(this.state.eBrochure, filterParams)
      .then(dbYachts => {
        this.setState({
          filters: filterParams,
          key: 'yachts',
          yachts: dbYachts.data.yachts,
        })
      })
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
                    <Home 
                      eBrochure={this.state.eBrochure} 
                      onShowYachts={this.handleShowYachts} 
                      onShowDestinations={this.handleShowDestinations} 
                      filters={this.state.filters}
                      handleSearch={this.handleFilterAndShowYachts}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="about">
                    <About eBrochure={this.state.eBrochure} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="yachts">
                    <Yachts 
                      eBrochure={this.state.eBrochure} 
                      onCharterYacht={this.handleCharterYacht} 
                      filters={this.state.filters}
                      handleSearch={this.handleFilterAndShowYachts}
                      yachts={this.state.yachts}                   
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="destinations">
                    <Destinations />
                  </Tab.Pane>
                  <Tab.Pane eventKey="contact">
                    <Contact eBrochure={this.state.eBrochure} />
                  </Tab.Pane>
                  {this.state.eBrochure.yachts.map(yacht => (
                    <Tab.Pane eventKey={`charter-inquiry-${yacht._id}`} key={`charter-inquiry-${yacht._id}`}>
                      <CharterInquiry eBrochure={this.state.eBrochure} yacht={yacht} filters={this.state.filters}/>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Card.Body>
            </Card>
          </Tab.Container>
          <Container>
            <div className='section-separator green left'/>
            <h3>Call us now to book</h3>
            <h2>{this.state.eBrochure._whiteLabel._travelAgent.phoneNumber}</h2>
          </Container>
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

EBrochure.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
}

export default EBrochure
