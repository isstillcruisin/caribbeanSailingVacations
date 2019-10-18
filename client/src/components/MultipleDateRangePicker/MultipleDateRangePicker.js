import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import Alert from '../Alert';

class MultipleDateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    //this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }

  handleEndOfRangeClick(day) {
    const newRange = DateUtils.addDayToRange(day, {from: this.state.from}), 
      foundRange = this.props.ranges.find(range => {
        return !(
          (newRange.from <= range.from && newRange.to <= range.from) ||
          (newRange.to >= range.to && newRange.from >= range.to)
        )
      })
    if (foundRange) {
      this.setState({from: null, message: 'New unavailable date ranges can not overlap an existing unavailable date range'})
    } else {
      this.props.handleAddRange(newRange)
      this.setState({from: null, message: 'Unavailable Date Range Added'})
    }
  }

  handleUnselectRange() {
    this.setState({selectedRange: null, message: null})
  }

  handleFirstClick(day) {
    //Special case: if this day is mid-way through an existing range, select it instead of starting an new range
    const foundRange = this.props.ranges.find(function(range) {
      return range.from && range.to && day &&
             range.from <= day && 
             range.to >= day
    });
    if (foundRange) {
      //Select the found range for deletion:
      this.setState({
        selectedRange: foundRange,
        message: null
      })
    } else {
      this.setState({from: day, message: null})
    }

  }

  handleDayClick(day) {
    if (this.state.from) {
      //Started a range, maybe finish selecting it
      this.handleEndOfRangeClick(day)
    } else {
      if (this.state.selectedRange) {
        //Selected a range, so unselect it first
        this.handleUnselectRange()
      }
      //Start a range OR select an existing range
      this.handleFirstClick(day)
    } 
  }

  handleDeleteRangeClick = () => {
    this.props.handleDeleteRange(this.state.selectedRange);
    this.setState({selectedRange: null, message: 'Unavailable Date Range Deleted'})
  }

  render() {
    const { from, to, selectedRange, message } = this.state,
      modifiers = selectedRange ? { start: selectedRange.from, end: selectedRange.to } : { start: from }

    return <div>
      <Alert alert={message} />
      <p>
        {!from && !to && !selectedRange && 'Please select the first day in a new unavailable range OR an unavailable date range to delete.'}
        {from && !to && !selectedRange && 'Please select the last day in the new unavailable range.'}
        {from &&
          to &&
          `Selected from ${from.toLocaleDateString()} to
              ${to.toLocaleDateString()}`}{' '}
        {from && to && (
          <button className="link" onClick={this.handleResetClick}>
            Reset
          </button>
        )}
        {selectedRange && (
          <button className="link" onClick={this.handleDeleteRangeClick}>
            Delete Selected Range
          </button>
        )}
      </p>
     <DayPicker
        className="UnavailableDateRangePicker"
        numberOfMonths={6}
        selectedDays={[...this.props.ranges,from, { from, to }]}
        modifiers={modifiers}
        onDayClick={this.handleDayClick}
      />
    </div>
  }
}

export default MultipleDateRangePicker