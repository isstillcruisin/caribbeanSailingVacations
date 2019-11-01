import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import DatePickerWithBlackoutDates from '../DatePickerWithBlackoutDates'
import formatPrice from '../../utils/formatPrice'
import Alert from '../Alert'
import PropTypes from 'prop-types'
import BoatDetailDisplay from '../../components/BoatDetailDisplay'

class CharterInquiryForm extends Component {
  renderEstimatedPrice=() => {
    if (this.props.estimatedPrice) {
      return <h4>{formatPrice(this.props.estimatedPrice)}</h4>
    } else {
      return <i>Choose dates first.</i>
    }
  }

  renderPricePerWeek=() => {
    return <h4>{formatPrice(this.props.yacht.pricePerWeek)}</h4>
  }

  renderSubmitButton=() => {
    if (this.props.disableSubmit) {
      return (<Button
        onClick={this.props.handleSubmitInquiry}
        type="submit"
        className="btn btn-lg"
        disabled
      >
        {this.props.submitText}
      </Button>)
    } else {
      return (<Button
        onClick={this.props.handleSubmitInquiry}
        type="submit"
        className="btn btn-lg">
        Submit Inquiry
      </Button>)
    }
  }

  renderImages = images => {
    return images && images.map((image, i) => {
      const imageParts = image.split('/upload/'),
        imgUrl = `${imageParts[0]}/upload/w_500,h_300,c_fill/${imageParts[1]}`
      return (
        <Carousel.Item key={`${i+1}`}>
          <img src={imgUrl} alt="" className='d-block' />
        </Carousel.Item>
      )
    })
  }

  render() {
    return (
      <Row className='bg-lightgreen'>
        <Col>
          <BoatDetailDisplay boat={this.props.yacht} />
        </Col>
        <Col style={{flexGrow: '2'}}>
          <p>To inquire about chartering this yacht, please fill out the following form and an email will be sent to your Travel Agent,&nbsp;
            {this.props.whiteLabel._travelAgent.firstName} {this.props.whiteLabel._travelAgent.lastName}: </p>
          <Card style={{color: 'black'}}>
            <Card.Body>
              <Alert alert={this.props.alert} />
              <Form>
                <Form.Row>
                  <Form.Label column xs={3}>
                    Name
                  </Form.Label>
                  <Col>
                    <Form.Control placeholder='First name' name='firstName' onChange={this.props.handleInputChange} />
                  </Col>
                  <Col>
                    <Form.Control placeholder='Last name' name='lastName' onChange={this.props.handleInputChange} />
                  </Col>
                </Form.Row>
                <Form.Row controlid='formEmail'>
                  <Form.Label column xs={3}>
                    Email
                  </Form.Label>
                  <Col xs={9}>
                    <Form.Control type='email' placeholder='Email Address' name='email' onChange={this.props.handleInputChange}  />
                  </Col>
                </Form.Row>
                <Form.Row controlid='numberOfPassengers'>
                  <Form.Label column xs={3}>
                    Number of Passengers (max: {this.props.yacht.maxPassengers})
                  </Form.Label>
                  <Col xs={9}>
                    <Form.Control type='number' placeholder={`Number of Passengers (max: ${this.props.yacht.maxPassengers})`} name='numberOfPassengers' value={this.props.numberOfPassengers} onChange={this.props.handleInputChange}  />
                  </Col>
                </Form.Row>
                <Form.Row controlid='dates'>
                  <Form.Label column xs={3}>
                    Desired Dates
                  </Form.Label>
                  <Col xs={9}>
                    <DatePickerWithBlackoutDates 
                      blackoutDates={this.props.unavailableDateRanges} 
                      handleSelectedRange={this.props.handleDateRangeChange} 
                      month={this.props.month}
                      startDate={this.props.startDate}
                      endDate={this.props.endDate}
                    />
                  </Col>     
                  <Col>
                    <i>All fields are required unless otherwise stated.</i>
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Form.Label column xs={3}>
                    <b>Price Per Week</b>
                  </Form.Label>
                  <Col xs={9}>
                    {this.renderPricePerWeek()}
                  </Col>
                </Form.Row>   
                <Form.Row>
                  <Form.Label column xs={3}>
                    <b>Calculated Price (other fees may apply)</b>
                  </Form.Label>
                  <Col xs={9}>
                    {this.renderEstimatedPrice()}
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col>
                    {this.renderSubmitButton()}
                  </Col>
                  <Col pullright>
                    <Button onClick={this.props.handleBack}  className="btn btn-lg">Back</Button>
                  </Col>
                </Form.Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    )
  }
}

CharterInquiryForm.propTypes = {
  month: PropTypes.instanceOf(Date),
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  yacht: PropTypes.shape({
    maxPassengers: PropTypes.number,
    imgs: PropTypes.arrayOf(PropTypes.string),
    pricePerWeek: PropTypes.number,
  }),
  estimatedPrice: PropTypes.number,
  unavailableDateRanges: PropTypes.arrayOf(PropTypes.shape({
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date),
  })),
  whiteLabel: PropTypes.shape({
    _travelAgent: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  }),
  alert: PropTypes.string,
  submitText: PropTypes.string,
  disableSubmit: PropTypes.bool,
  handleBack: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleDateRangeChange: PropTypes.func,
  handleSubmitInquiry: PropTypes.func,
  numberOfPassengers: PropTypes.number,
}

export default CharterInquiryForm
