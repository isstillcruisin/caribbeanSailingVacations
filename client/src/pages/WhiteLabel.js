import React, { Component } from "react";
import API from "../utils/API";
import Fade from "react-reveal/Fade";
import AllBoats from "./AllBoats";
import Alert from '../components/Alert';
import Loader from '../components/Loader';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class WhiteLabel extends Component {
  state = {};

  componentDidMount() {
    let { name } = this.props.match.params;
    API.getWhiteLabel(name).then(res => {
      this.setState({
        whiteLabel: res.data
      });
    });
  }

  showWhiteLabel = () => {
    if (this.state.whiteLabel) {
      if (this.state.whiteLabel.isConfirmed) {
        return (
          <Container>
            <Row>
              <h2 style={{width: '100%', 'text-align': 'center'}}>CHARTER ASSISTANT - {this.state.whiteLabel.name.toUpperCase()}</h2>
            </Row>
            <Row>
              <h5>Welcome. Please choose a yacht to Charter:</h5>
            </Row>
            <AllBoats whiteLabel={this.state.whiteLabel.name}/>
            <Row>
              <i>These yachts were specifically chosen for you by your Travel Agent: {this.state.whiteLabel._travelAgent.firstName} {this.state.whiteLabel._travelAgent.lastName}, and all communication will be with them, on your behalf.</i>
            </Row>
          </Container>
        )
      } else {
        return (
          <div>
            This WhiteLabel has been built, but hasn't been confirmed yet. For now, please peruse the yachts:
            <AllBoats />
          </div>
        )
      }
    } else {
      return <Loader />;
    }
  };

  render() {
    return <div>
      <Alert {...this.props}/>
      {this.showWhiteLabel()}
    </div>;
  }
}

export default WhiteLabel;
