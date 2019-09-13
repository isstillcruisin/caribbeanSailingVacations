import React, { Component } from "react";
import API from "../utils/API";
import Fade from "react-reveal/Fade";
import Loader from '../components/Loader';
import YachtInquiryForm from '../components/YachtInquiryForm';

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
    return this.state.boat ? (
      <YachtInquiryForm whiteLabel={this.state.whiteLabel} boat={this.state.boat}/>
    ) : (
      <Loader />
    );
  };

  render() {
    return <div>{this.showWhiteLabelInquiry()}</div>;
  }
}

export default WhiteLabelYachtInquiry;
