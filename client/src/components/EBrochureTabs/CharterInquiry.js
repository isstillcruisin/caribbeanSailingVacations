import React, { Component } from 'react'
import API from '../../utils/API'
import CharterInquiryForm from '../CharterInquiryForm'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

class CharterInquiry extends Component {
  state = {};

  componentDidMount() {
    API.getUnavailableDateRanges(this.props.yacht._id).then(ranges => {
      this.setState({
        disableSubmit: true,
        submitText: 'Fill All Entry Fields',
        unavailableDateRanges: ranges,
      })
    })
  }

  handleSubmitInquiry = async event => {
    event.preventDefault()
    try {
      let newCharterInquiry = await this.saveCharterInquiry()
      if (newCharterInquiry) {
        this.setState({
          alert: `Success! Your Inquiry has been submitted to ${this.props.eBrochure._whiteLabel._travelAgent.firstName} ${this.props.eBrochure._whiteLabel._travelAgent.lastName}`,
          disableSubmit: true,
          submitText: 'Fill All Entry Fields',
          email: '',
          firstName: '',
          lastName: '',
          numberOfPassengers: null,
          estimatedPrice: null,
          startDate: null,
          endDate: null,
        })
        this.setState({done: true})
      }
    } catch (error) {
      console.error('error (╯°□°)╯︵ ┻━┻ ', error.message)
    }
  };

  saveCharterInquiry = () => {
    return API.charterInquiryCreate({
      yacht: this.props.yacht,
      eBrochure: this.props.eBrochure,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      estimatedPrice: this.state.estimatedPrice,
      numberOfPassengers: this.state.numberOfPassengers,
    })
  };

  handleInputChange = event => {
    const { name, value } = event.target
    //Special case: max number of passengers:
    if (name === 'numberOfPassengers' && value > this.props.yacht.maxPassengers) {
      this.setState({
        alert: `Error: Number of passengers on this yacht must not be greater than ${this.props.yacht.maxPassengers}.`,
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
    var oneWeekInMsecs = 7*24*60*60*1000
    if (from && to) {
      return this.props.yacht.pricePerWeek * (to.getTime() - from.getTime())/oneWeekInMsecs
    } else {
      return null
    }
  }

  handleBack = () => {
    this.setState({back: true})
  }

  handleDateRangeChange = ({ from, to }) => {
    if (from && to) {
      this.applyChangesAndValidateInquiry({ startDate: from, endDate: to, estimatedPrice: this.calculateEstimatedPrice(from, to) })
    } else {
      this.setState({startDate: from})
    }
  }

  showWhiteLabelInquiry = () => {
    if (this.state.back) {
      return <Redirect to={`/e-brochure/${this.props.eBrochure._id}`}/>
    } else {
      return <CharterInquiryForm
        whiteLabel={this.props.eBrochure._whiteLabel} 
        yacht={this.props.yacht} 
        estimatedPrice={this.state.estimatedPrice} 
        numberOfPassengers={this.state.numberOfPassengers}
        month={new Date()}
        handleInputChange={this.handleInputChange} 
        handleSubmitInquiry={this.handleSubmitInquiry} 
        handleDateRangeChange={this.handleDateRangeChange}
        disableSubmit={this.state.disableSubmit}
        submitText={this.state.submitText}
        eBrochurePath={`/e-brochure/${this.props.eBrochure._id}`}
        alert={this.state.alert}
        handleBack={this.handleBack}
        unavailableDateRanges={this.state.unavailableDateRanges}
        eBrochure={this.props.eBrochure}
        startDate={this.state.startDate}
        endDate={this.state.endDate}
      />
    }
  };

  render() {
    return this.showWhiteLabelInquiry()
  }
}

CharterInquiry.propTypes = {
  eBrochure: PropTypes.shape({
    _id: PropTypes.string,
    _whiteLabel: PropTypes.shape({      
      _travelAgent: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
      }),
    }),
  }),
  yacht: PropTypes.shape({
    _id: PropTypes.string,
    pricePerWeek: PropTypes.number,
    maxPassengers: PropTypes.number,
  }),
}

export default CharterInquiry
