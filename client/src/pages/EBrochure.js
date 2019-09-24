import React, { Component } from "react";
import API from "../utils/API";
import Fade from "react-reveal/Fade";
import AllBoats from "./AllBoats";
import Alert from '../components/Alert';
import Loader from '../components/Loader';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
    console.log("****", this.state.eBrochure);
    if (this.state.eBrochure) {
      return (
        <Container>
          <Row>
            <h2 style={{width: '100%', 'text-align': 'center'}}>CHARTER ASSISTANT - {this.state.eBrochure.name.toUpperCase()}</h2>
          </Row>
          <Row>
            <h5 style={{'margin-left': '15px'}}>Welcome. Please choose a yacht to request further information about chartering:</h5>
          </Row>
          <AllBoats eBrochure={this.state.eBrochure}/>
          <Row>
            <i>These yachts were specifically chosen for you by your Travel Agent: {this.travelAgentName()}, and all communication will be with them, on your behalf.</i>
          </Row>
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
