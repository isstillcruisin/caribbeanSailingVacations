import React from "react";
import { create } from "react-test-renderer";
import Alert from '../components/Alert';

describe("Alert component", () => {
  test("Matches the snapshot", () => {
    const alert = create(<Alert alert='test' />);
    expect(alert.toJSON()).toMatchSnapshot();
  });
});