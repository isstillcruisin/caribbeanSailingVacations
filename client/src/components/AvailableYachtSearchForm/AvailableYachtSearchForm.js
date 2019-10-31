import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { formatDate, parseDate } from 'react-day-picker/moment'
import PropTypes from 'prop-types'

class AvailableYachtSearchForm extends Component {
  state = this.props.filters || {}

  handleSearchForAvailableYachts = event => {
    event.preventDefault()
    this.props.onSearch(this.state)
  }

  handleInputChange = event => {
    const { name, value } = event.target
    if (name === 'numPassengers') {
      this.setState({numPassengers: Number.parseInt(value)})
    } else {
      this.setState({
        [name]: value,
      })
    }
  }

  handleStartDateChange = (day) => {
    this.setState({startDate: day})
  }

  handleEndDateChange = (day) => {
    this.setState({endDate: day})
  }

  componentDidUpdate = () => {
    if (!this.state.startDate && !this.state.endDate && !this.state.numPasssengers && this.props.filters.startDate) {
      this.setState(this.props.filters)
    }
  }

  dayPickerInput = (name, onDayChange) => (
    <DayPickerInput
      formatDate={formatDate}
      parseDate={parseDate}
      format='D-MMM-YYYY'
      placeholder={`${formatDate(new Date(), 'D-MMM-YYYY')}`}
      name='startDate'
      value={this.state[name]}
      onDayChange={onDayChange}
    />
  )

  render() {
    return (
      <Container className='mb-2 zindex-100'>
        <Form>
          <Row>
            <Col xs={3} className='text-left'>
              <div>Check In</div>
              {this.dayPickerInput('startDate', this.handleStartDateChange)}  
            </Col>
            <Col xs={3} className='text-left'>
              <div>Check Out</div>
              {this.dayPickerInput('endDate', this.handleEndDateChange)}
            </Col>
            <Col xs={3}>
              <div className='text-left'>Passengers</div>
              <Form.Control name='numPassengers' type='number' value={this.state.numPassengers} onChange={this.handleInputChange} />
            </Col>
            <Col xs={3} className='mt-4'>
              <Button onClick={this.handleSearchForAvailableYachts}>Search</Button>
            </Col>
          </Row> 
        </Form>
      </Container>
    )
  }
}

AvailableYachtSearchForm.propTypes = {
  filters: PropTypes.object,
  onSearch: PropTypes.func,
}

export default AvailableYachtSearchForm
