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

  handleSubmitInquiry = async event => {
    event.preventDefault();
    console.log("event (╯°□°)╯︵ ┻━┻ ", event.data);
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
      whiteLabel: this.state.whiteLabel,
      yacht: this.state.boat,   
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleDateRangeChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
  }

  showWhiteLabelInquiry = () => {
    if (this.state.done) {
      return <p>Your Inquiry has been submitted to {this.state.whiteLabel._travelAgent.firstName} {this.state.whiteLabel._travelAgent.lasttName}.</p>
    } else if (this.state.boat) {
      return <YachtInquiryForm whiteLabel={this.state.whiteLabel} boat={this.state.boat} handleInputChange={this.handleInputChange} handleSubmitInquiry={this.handleSubmitInquiry} handleDateRangeChange={this.handleDateRangeChange}/>
    } else {
      return <Loader />
    }
  };

  render() {
    return <div>{this.showWhiteLabelInquiry()}</div>;
  }
}

export default WhiteLabelYachtInquiry;
