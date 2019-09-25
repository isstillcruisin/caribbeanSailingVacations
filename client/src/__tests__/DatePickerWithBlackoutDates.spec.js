import React from "react";
import { create } from "react-test-renderer";
import DatePickerWithBlackoutDates from '../components/DatePickerWithBlackoutDates';

describe("DatePickerWithBlackoutDates component", () => {
  test("Matches the snapshot", () => {
    const alert = create(
      <DatePickerWithBlackoutDates 
        blackoutDates={[
          { from: new Date("December 24, 2019"), to: new Date("January 2, 2020") }
        ]}
        numberOfMonths={1}
      />
    );
    expect(alert.toJSON()).toMatchSnapshot();
  });
});