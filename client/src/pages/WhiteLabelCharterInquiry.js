import React, { Component } from "react";
import API from "../utils/API";
import Loader from '../components/Loader';
import CharterInquiryForm from '../components/CharterInquiryForm';
import TravelAgentInfo from '../utils/travelAgentInfo'
import Alert from '../components/Alert'

class WhiteLabelCharterInquiry extends Component {
  state = {};

  componentDidMount() {
    let { eBrochureId, boatId } = this.props.match.params;
    API.getEBrochure(eBrochureId).then(res => {
      API.getBoat(boatId).then(res2 => {
        this.setState({
          eBrochure: res.data,
          boat: res2.data,
          disableSubmit: true,
          submitText: 'Fill All Entry Fields',
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
      estimatedPrice: this.state.estimatedPrice,
      numberOfPassengers: this.state.numberOfPassengers,
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    //Special case: max number of passengers:
    if (name === 'numberOfPassengers' && value > this.state.boat.maxPassengers) {
      this.setState({
        alert: `Error: Number of passengers on this yacht must not be greater than ${this.state.boat.maxPassengers}.`,
        disableSubmit: true,
        submitText: 'Please Fix Errors',
        [name]: value,
      })
    } else {
      this.applyChangesAndValidateInquiry({[name]: value})
    }
  }

  applyChangesAndValidateInquiry = (changes) => {
    let newState = Object.assign({}, this.state, changes)
    if (newState.email && newState.firstName && newState.lastName && newState.startDate && newState.endDate && newState.numberOfPassengers) {
      this.setState(Object.assign({}, newState, {
        alert: '',
        disableSubmit: false,
        submitText: 'Submit Inquiry',
      }))
    } else {
      this.setState(Object.assign({}, newState, {
        alert: '',
        disableSubmit: true,
        submitText: 'Fill All Entry Fields',
      }))
    }
  }

  calculateEstimatedPrice = (from, to) => {
    var oneWeekInMsecs = 7*24*60*60*1000;
    if (from && to) {
      return this.state.boat.pricePerWeek * (to.getTime() - from.getTime())/oneWeekInMsecs
    } else {
      return null
    }
  }

  handleDateRangeChange = ({ from, to }) => {
    this.applyChangesAndValidateInquiry({ startDate: from, endDate: to, estimatedPrice: this.calculateEstimatedPrice(from, to) });
  }

  showWhiteLabelInquiry = () => {
    if (this.state.done) {
      return <div><p>You're All Set!</p><p>Your Inquiry has been submitted to {TravelAgentInfo(this.state.eBrochure._whiteLabel._travelAgent).fullName}.</p></div>
    } else if (this.state.boat && this.state.eBrochure) {
      return <CharterInquiryForm 
        whiteLabel={this.state.eBrochure._whiteLabel} 
        boat={this.state.boat} 
        estimatedPrice={this.state.estimatedPrice} 
        numberOfPassengers={this.state.numberOfPassengers}
        month={new Date()}
        handleInputChange={this.handleInputChange} 
        handleSubmitInquiry={this.handleSubmitInquiry} 
        handleDateRangeChange={this.handleDateRangeChange}
        disableSubmit={this.state.disableSubmit}
        submitText={this.state.submitText}
        eBrochurePath={`/e-brochure/${this.state.eBrochure._id}`}
      />
    } else {
      return <Loader />
    }
  };

  render() {
    return <div>    
      <Alert location={{state: { alert: this.state.alert }}} />
      {this.showWhiteLabelInquiry()}
    </div>;
  }
}

export default WhiteLabelCharterInquiry;
