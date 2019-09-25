import React, { Component } from "react";
import API from "../utils/API";
import Loader from '../components/Loader';
import CharterInquiryForm from '../components/CharterInquiryForm';
import TravelAgentInfo from '../utils/travelAgentInfo'

class WhiteLabelCharterInquiry extends Component {
  state = {};

  componentDidMount() {
    let { eBrochureId, boatId } = this.props.match.params;
    API.getEBrochure(eBrochureId).then(res => {
      API.getBoat(boatId).then(res2 => {
        this.setState({
          eBrochure: res.data,
          boat: res2.data,
        });
      });
    });
  }

  handleSubmitInquiry = async event => {
    event.preventDefault();
    try {
      let newCharterInquiry = await this.saveCharterInquiry();
      if (newCharterInquiry) {
        this.setState({done: true});
      }
    } catch (error) {
      console.log("error (╯°□°)╯︵ ┻━┻ ", error.message);
    }
  };

  saveCharterInquiry = () => {
    return API.charterInquiryCreate({
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      eBrochure: this.state.eBrochure,
      yacht: this.state.boat,   
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleDateRangeChange = ({ from, to }) => {
    this.setState({ startDate: from, endDate: to });
  }

  showWhiteLabelInquiry = () => {
    if (this.state.done) {
      return <div><p>You're All Set!</p><p>Your Inquiry has been submitted to {TravelAgentInfo(this.state.eBrochure._whiteLabel._travelAgent).fullName}.</p></div>
    } else if (this.state.boat && this.state.eBrochure) {
      return <CharterInquiryForm whiteLabel={this.state.eBrochure._whiteLabel} boat={this.state.boat} handleInputChange={this.handleInputChange} handleSubmitInquiry={this.handleSubmitInquiry} handleDateRangeChange={this.handleDateRangeChange}/>
    } else {
      return <Loader />
    }
  };

  render() {
    return <div>{this.showWhiteLabelInquiry()}</div>;
  }
}

export default WhiteLabelCharterInquiry;
