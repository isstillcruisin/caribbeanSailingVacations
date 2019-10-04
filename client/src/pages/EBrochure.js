import React, { Component } from "react";
import API from "../utils/API";
import AllBoats from "./AllBoats";
import Alert from '../components/Alert';
import Loader from '../components/Loader';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import StreetAddress from '../components/StreetAddress';

class EBrochure extends Component {
  state = {};

  componentDidMount() {
    let { id } = this.props.match.params;
    API.getEBrochure(id).then(res => {
      this.setState({
        eBrochure: res.data
      });
    });
  }

  travelAgentName = () => `${this.state.eBrochure._whiteLabel._travelAgent.firstName} ${this.state.eBrochure._whiteLabel._travelAgent.lastName}`

  showEBrochure = () => {
    if (this.state.eBrochure) {
      return (
        <Container>
          <Row>
            <img src={this.state.eBrochure._whiteLabel.logoUrl} alt='White Label Logo' />
          </Row>
          <Row>
            <h5 style={{'marginLeft': '15px'}}>Welcome. Please choose a yacht to request further information about chartering:</h5>
          </Row>
          <Row style={{'marginBottom': '20px'}}>
            <AllBoats eBrochure={this.state.eBrochure}/>
          </Row>
          <Row className='footer-address'>
            <i>These yachts were specifically chosen for you by your Travel Agent, and all communication will be with them, on your behalf.</i>
          </Row>
          <StreetAddress address={Object.assign({}, this.state.eBrochure._whiteLabel, {name: this.travelAgentName()})}/>
        </Container>
      )
    } else {
      return <Loader />;
    }
  };

  render() {
    return <div>
      <Alert {...this.props}/>
      {this.showEBrochure()}
    </div>;
  }
}

export default EBrochure;
