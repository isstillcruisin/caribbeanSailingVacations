import React from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import PropTypes from 'prop-types'

class DatePickerWithBlackoutDates extends React.Component {
  constructor(props) {
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleResetClick = this.handleResetClick.bind(this)
    this.state = this.getInitialState()
  }

  getInitialState() {
    return {}
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, {from: this.props.startDate, to: this.props.endDate})
    let blackoutDates = this.props.blackoutDates
    //Are any of the days in the range overlapping the days in the blackoutDates?
    let found = blackoutDates.find(function(blackoutDate) {
      return blackoutDate.from && blackoutDate.to && 
             range.from && range.to && 
             blackoutDate.from <= range.to && 
             blackoutDate.to >= range.from
    })
    if (!found) {
      this.props.handleSelectedRange(range)
    } else {
      this.setState(Object.assign({}, this.state, { message: 'Unfortunately, those days include some unavailable dates'}))
    }
  }

  handleResetClick() {
    this.setState(this.getInitialState())
    this.props.handleSelectedRange(this.getInitialState())
  }

  render() {
    const { message } = this.state
    const modifiers = { start: this.props.startDate, end: this.props.endDate }
    return (
      <div className="DatePickerWithBlackoutDates">
        <i>{message}</i>
        <p>
          {!this.props.startDate && !this.props.endDate && 'Please select the first day.'}
          {this.props.startDate && !this.props.endDate && 'Please select the last day.'}
          {this.props.startDate &&
            this.props.endDate &&
            `Selected from ${this.props.startDate.toLocaleDateString()} to
                ${this.props.endDate.toLocaleDateString()}`}{' '}
          {this.props.startDate && this.props.endDate && (
            <button className="link" onClick={this.handleResetClick}>
              Reset
            </button>
          )}
        </p>
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths || 2}
          selectedDays={[this.props.startDate, { to: this.props.startDate, from: this.props.endDate }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          disabledDays={this.props.blackoutDates}
          month={this.props.month}
          fromMonth={new Date()}
        />
      </div>
    )    
  }
}

DatePickerWithBlackoutDates.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  month: PropTypes.instanceOf(Date),
  blackoutDates: PropTypes.arrayOf(PropTypes.shape({
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date),
  })),
  numberOfMonths: PropTypes.number,
  handleSelectedRange: PropTypes.func,
}

export default DatePickerWithBlackoutDates
