import React from "react";
import DayPicker, { DateUtils } from 'react-day-picker';

class DatePickerWithBlackoutDates extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    let blackoutDates = this.props.blackoutDates;
    //Are any of the days in the range overlapping the days in the blackoutDates?
    let found = blackoutDates.find(function(blackoutDate) {
      return blackoutDate.from && blackoutDate.to && 
             range.from && range.to && 
             blackoutDate.from <= range.to && 
             blackoutDate.to >= range.from
    });
    if (!found) {
      this.setState(range);
      this.props.handleSelectedRange(range);
    } else {
      this.setState(Object.assign({}, this.state, { message: 'Unfortunately, those days include some blacked-out dates'}));
    }
  }

  handleResetClick() {
    this.setState(this.getInitialState())
    this.props.handleSelectedRange(this.getInitialState())
  }

  render() {
    const { from, to, message } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className="DatePickerWithBlackoutDates">
        <i>{message}</i>
        <p>
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
          {from &&
            to &&
            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
          {from && to && (
            <button className="link" onClick={this.handleResetClick}>
              Reset
            </button>
          )}
        </p>
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths || 2}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          disabledDays={this.props.blackoutDates}
          month={this.props.month}
        />
      </div>
    )    
  }
}

export default DatePickerWithBlackoutDates;
