import React, { Component } from "react";
import API from "../utils/API";
import Fade from "react-reveal/Fade";
import Loader from '../components/Loader';

class WhiteLabelYachtInquiry extends Component {
  state = {};

  componentDidMount() {
    let { name, boatId } = this.props.match.params;
    API.getWhiteLabel(name).then(res => {
      API.getBoat(boatId).then(res2 => {
        this.setState({
          whiteLabel: res.data,
          boat: res2.data,
        });
      });
    });
  }

  showWhiteLabelInquiry = () => {
    return this.state.whiteLabel ? (
      <div>
        <h3>A WhiteLabel Page For Yacht Charter Inquiry</h3>
        <div>NAME: {this.state.whiteLabel.name}</div>
        <div>RECIPIENT EMAIL: {this.state.whiteLabel._travelAgent.email}</div>
        <div>BOAT NAME: {this.state.boat.boatName}</div>
        <p style={{fontSize: 10 + 'px'}}>BOAT CREW BIO: {this.state.boat.crewBio}</p>
      </div>
    ) : (
      <Loader />
    );
  };

  render() {
    return <div>{this.showWhiteLabelInquiry()}</div>;
  }
}

export default WhiteLabelYachtInquiry;
